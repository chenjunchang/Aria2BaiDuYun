import {Injectable} from '@angular/core';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as childProcess from 'child_process';
import * as fs from 'fs';
import {ipcRenderer, remote, webFrame} from 'electron';
import * as path from 'path';
import * as tough from 'tough-cookie';
import * as util from 'util';
import * as mkdirp from 'mkdirp';
import * as request from 'request';
import {JSDOM} from 'jsdom';
import * as CryptoJS from 'crypto-js';
import * as url from 'url';
import {PageEvent} from '@angular/material';
import * as os from 'os';

const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36';

function guideRandom() {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (e) {
    const t = 16 * Math.random() | 0;
    const n = 'x' === e ? t : 3 & t | 8;
    return n.toString(16);
  }).toUpperCase();
}

class CookieStoreRequest {
  public asyncGet;
  public asyncHead;
  public asyncPost;
  public asyncPut;
  public asyncPatch;
  public asyncDel;
  public get;
  public head;
  public post;
  public put;
  public patch;
  public del;

  constructor(cookieStore: typeof FileCookieStore, _request: typeof request, _util: typeof util) {
    const jar = _request.jar(cookieStore);
    const req = _request.defaults({jar: jar});
    this.asyncGet = _util.promisify(req.get);
    this.asyncHead = _util.promisify(req.head);
    this.asyncPost = _util.promisify(req.post);
    this.asyncPut = _util.promisify(req.put);
    this.asyncPatch = _util.promisify(req.patch);
    this.asyncDel = _util.promisify(req.del);
    this.get = req.get;
    this.head = req.head;
    this.post = req.post;
    this.put = req.put;
    this.patch = req.patch;
    this.del = req.del;
  }

}

const FileCookieStore = function (filePath, _tough, _fs, _util) {
  this.filePath = filePath;
  const self = this;
  this.idx = {}; // idx is memory cache
  loadFromFile(this.filePath, function (dataJson) {
    if (dataJson) {
      self.idx = dataJson;
    }
  });

  const Store = _tough.Store;
  const permuteDomain = _tough.permuteDomain;
  const permutePath = _tough.permutePath;

  Store.call(this);

  _util.inherits(FileCookieStore, Store);

  this.synchronous = true;

  this.findCookie = function (domain, fpath, key, cb) {

    if (!this.idx[domain]) {
      return cb(null, undefined);
    }
    if (!this.idx[domain][fpath]) {
      return cb(null, undefined);
    }
    return cb(null, this.idx[domain][fpath][key] || null);
  };


  this.inspect = function () {
    return '{ idx: ' + _util.inspect(this.idx, false, 2) + ' }';
  };


  this.findCookies = function (domain, fpath, cb) {
    const results = [];
    if (!domain) {
      return cb(null, []);
    }

    let pathMatcher;
    if (!fpath) {
      // null or '/' means "all paths"
      pathMatcher = function matchAll(domainIndex) {
        for (const curPath in domainIndex) {
          const pathIndex = domainIndex[curPath];
          for (const key in pathIndex) {
            results.push(pathIndex[key]);
          }
        }
      };

    } else if (fpath === '/') {
      pathMatcher = function matchSlash(domainIndex) {
        const pathIndex = domainIndex['/'];
        if (!pathIndex) {
          return;
        }
        for (const key in pathIndex) {
          results.push(pathIndex[key]);
        }
      };

    } else {
      const paths = permutePath(fpath) || [fpath];
      pathMatcher = function matchRFC(domainIndex) {
        paths.forEach(function (curPath) {
          const pathIndex = domainIndex[curPath];
          if (!pathIndex) {
            return;
          }
          for (const key in pathIndex) {
            results.push(pathIndex[key]);
          }
        });
      };
    }

    const domains = permuteDomain(domain) || [domain];
    const idx = this.idx;

    domains.forEach(function (curDomain) {
      const domainIndex = idx[curDomain];
      if (!domainIndex) {
        return;
      }
      pathMatcher(domainIndex);
    });

    cb(null, results);
  };

  this.putCookie = function (cookie, cb) {

    if (!this.idx[cookie.domain]) {
      this.idx[cookie.domain] = {};
    }
    if (!this.idx[cookie.domain][cookie.path]) {
      this.idx[cookie.domain][cookie.path] = {};
    }
    this.idx[cookie.domain][cookie.path][cookie.key] = cookie;
    saveToFile(this.filePath, function () {
      cb(null);
    });
  };

  this.updateCookie = function updateCookie(oldCookie, newCookie, cb) {

    // updateCookie() may avoid updating cookies that are identical.  For example,
    // lastAccessed may not be important to some stores and an equality
    // comparison could exclude that field.
    this.putCookie(newCookie, cb);
  };

  this.removeCookie = function removeCookie(domain, fpath, key, cb) {
    if (this.idx[domain] && this.idx[domain][fpath] && this.idx[domain][fpath][key]) {
      delete this.idx[domain][fpath][key];
    }
    saveToFile(this.filePath, function () {
      cb(null);
    });
  };

  this.removeCookies = function removeCookies(domain, fpath, cb) {
    if (this.idx[domain]) {
      if (fpath) {
        delete this.idx[domain][fpath];
      } else {
        delete this.idx[domain];
      }
    }
    saveToFile(this.filePath, function () {
      return cb(null);
    });
  };

  function saveToFile(fpath, cb) {
    const dataJson = JSON.stringify(self.idx);
    _fs.writeFileSync(fpath, dataJson);
    cb();
  }

  function loadFromFile(fpath, cb) {
    const data = _fs.readFileSync(filePath, 'utf8');
    const dataJson = data ? JSON.parse(data) : null;
    for (const domainName in dataJson) {
      for (const pathName in dataJson[domainName]) {
        for (const cookieName in dataJson[domainName][pathName]) {
          dataJson[domainName][pathName][cookieName] = _tough.fromJSON(JSON.stringify(dataJson[domainName][pathName][cookieName]));
        }
      }
    }
    cb(dataJson);
  }
};

export interface LoginPrepareData {
  traceid: string,
  antireplaytoken: any,
  servertime: string
}

/**
 1. 登录前调用的第一个接口 获取到
 traceid B8040203
 antireplaytoken {"errno":110000,"errmsg":"","time":"a5c218f03c"}
 @returns {Promise<void>}
 **/
async function prepareLogin(req): Promise<LoginPrepareData> {
  let res = await req.asyncGet({
    url: 'https://wappass.baidu.com/',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    }
  }).catch((err) => {
    console.error(err);
  });
  const traceid = res.headers['trace-id'];
  res = await req.asyncGet({
    url: `https://wappass.baidu.com/wp/api/security/antireplaytoken?tpl=&v=${new Date().getTime()}&traceid=${traceid}`,
    gzip: true,
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Pragma': 'no-cache',
      'Referer': 'https://wappass.baidu.com/',
      'User-Agent': ua,
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).catch((err) => {
    console.error(err);
  });
  // console.log(res.body);
  const antireplaytoken = JSON.parse(res.body);
  const servertime = antireplaytoken.time;

  return {
    traceid, antireplaytoken, servertime
  };
}

/**
 * 2.登录前调用
 * @returns {Promise<string>}
 */
async function getCodeString(req, gid, username, traceid) {
  const res = await req.asyncGet({
    url: 'https://wappass.baidu.com/wp/api/login/check',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    },
    qs: {
      'gid': gid,
      'tt': new Date().getTime(),
      'username': username,
      'countrycode': '',
      'clientfrom': 'wap',
      'sub_source': 'leadsetpwd',
      'tpl': '',
      'traceid': traceid
    }
  }).catch((err) => {
    console.error(err);
  });

  const data = JSON.parse(res.body);
  return data.data.codeString;
}

/**
 * 3.获取验证码图片 base64 string
 * @returns {Promise<string>}
 */
async function genimage(req, _fs, codeString, captchaSavePath) {
  const option = {
    url: `https://wappass.baidu.com/cgi-bin/genimage?${codeString}&v=${new Date().getTime()}`,
    gzip: true,
    headers: {
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Pragma': 'no-cache',
      'Referer': 'https://wappass.baidu.com/',
      'User-Agent': ua
    }
  };

  const stream = req.get(option).pipe(_fs.createWriteStream(captchaSavePath));
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      const imageBase64 = _fs.readFileSync(captchaSavePath).toString('base64');
      resolve(imageBase64);
    });
    stream.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * 加密密码
 * @param password 原始密码
 */
async function encryptPass(password) {
  const bitsPerDigit = 16;
  const biRadix = 65536;
  const biHalfRadix = biRadix >>> 1;
  const biRadixSquared = biRadix * biRadix;
  const maxDigitVal = biRadix - 1;
  let maxDigits;
  let ZERO_ARRAY;
  let bigZero;
  let bigOne;
// 初始化
  setMaxDigits(20);

  const dpl10 = 15;
  const lr10 = biFromNumber(1e15);
  const hexatrigesimalToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const hexToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  const highBitMasks = [0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535];
  const lowBitMasks = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];

  function BarrettMu(t) {
    this.modulus = biCopy(t);
    this.k = biHighIndex(this.modulus) + 1;
    const e = new BigInt(false);
    e.digits[2 * this.k] = 1;
    this.mu = biDivide(e, this.modulus);
    this.bkplus1 = new BigInt(false);
    this.bkplus1.digits[this.k + 1] = 1;
    this.modulo = BarrettMu_modulo;
    this.multiplyMod = BarrettMu_multiplyMod;
    this.powMod = BarrettMu_powMod;
  }

  function BarrettMu_modulo(t) {
    const e = biDivideByRadixPower(t, this.k - 1);
    const i = biMultiply(e, this.mu);
    const n = biDivideByRadixPower(i, this.k + 1);
    const _r = biModuloByRadixPower(t, this.k + 1);
    const o = biMultiply(n, this.modulus);
    const a = biModuloByRadixPower(o, this.k + 1);
    let s = biSubtract(_r, a);
    if (s.isNeg) {
      (s = biAdd(s, this.bkplus1));
    }
    for (let c = biCompare(s, this.modulus) >= 0; c;) {
      s = biSubtract(s, this.modulus);
      c = biCompare(s, this.modulus) >= 0;
    }
    return s;
  }

  function BarrettMu_multiplyMod(t, e) {
    const i = biMultiply(t, e);
    return this.modulo(i);
  }

  function BarrettMu_powMod(t, e) {
    let i = new BigInt(false);
    i.digits[0] = 1;
    for (let n = t, _r = e;
         0 !== (1 & _r.digits[0]) && (i = this.multiplyMod(i, n)), _r = biShiftRight(_r, 1), 0 !== _r.digits[0] || 0 !== biHighIndex(_r);) {
      n = this.multiplyMod(n, n);
    }
    return i;
  }

  function setMaxDigits(t) {
    maxDigits = t;
    ZERO_ARRAY = new Array(maxDigits);
    for (let e = 0; e < ZERO_ARRAY.length; e++) {
      ZERO_ARRAY[e] = 0;
    }
    bigZero = new BigInt(false);
    bigOne = new BigInt(false);
    bigOne.digits[0] = 1;
  }

  function BigInt(t) {
    this.digits = t ? null : ZERO_ARRAY.slice(0);
    this.isNeg = false;

  }

  function biCopy(t) {
    const e = new BigInt(true);
    e.digits = t.digits.slice(0);
    e.isNeg = t.isNeg;
    return e;
  }

  function biFromNumber(t) {
    const e = new BigInt(false);
    e.isNeg = 0 > t;
    t = Math.abs(t);
    for (let i = 0; t > 0;) {
      e.digits[i++] = t & maxDigitVal;
      t >>= 16;
    }
    return e;
  }

  function reverseStr(t) {
    let e = '';
    for (let i = t.length - 1; i > -1; --i) {
      e += t.charAt(i);
    }
    return e;
  }

  function biToString(t, e) {
    const i = new BigInt(false);
    i.digits[0] = e;
    for (let n = biDivideModulo(t, i), _r = hexatrigesimalToChar[n[1].digits[0]]; 1 === biCompare(n[0], bigZero);) {
      n = biDivideModulo(n[0], i);
      _r += hexatrigesimalToChar[n[1].digits[0]];
    }
    return (t.isNeg ? '-' : '') + reverseStr(r);
  }

  function digitToHex(t) {
    const e = 15;
    let n = '';
    for (let i = 0; 4 > i; ++i) {
      n += hexToChar[t & e];
      t >>>= 4;
    }
    return reverseStr(n);
  }

  function biToHex(t) {
    let e = '';
    for (let i = biHighIndex(t); i > -1; --i) {
      e += digitToHex(t.digits[i]);
    }
    return e;
  }

  function charToHex(t) {
    let e;
    const i = 48;
    const n = i + 9;
    const _r = 97;
    const o = _r + 25;
    const a = 65;
    const s = 90;
    return e = t >= i && n >= t ? t - i : t >= a && s >= t ? 10 + t - a : t >= _r && o >= t ? 10 + t - _r : 0;
  }

  function hexToDigit(t) {
    let e = 0;
    for (let i = Math.min(t.length, 4), n = 0; i > n; ++n) {
      e <<= 4;
      e |= charToHex(t.charCodeAt(n));
    }
    return e;
  }

  function biFromHex(t) {
    const e = new BigInt(false);
    for (let i = t.length, n = i, _r = 0; n > 0; n -= 4, ++_r) {
      e.digits[_r] = hexToDigit(t.substr(Math.max(n - 4, 0), Math.min(n, 4)));
    }
    return e;
  }

  function biAdd(t, e) {
    let i;
    if (t.isNeg !== e.isNeg) {
      e.isNeg = !e.isNeg;
      i = biSubtract(t, e);
      e.isNeg = !e.isNeg;
    } else {
      i = new BigInt(false);
      for (let n, _r = 0, o = 0; o < t.digits.length; ++o) {
        n = t.digits[o] + e.digits[o] + _r;
        i.digits[o] = 65535 & n;
        _r = Number(n >= biRadix);
      }
      i.isNeg = t.isNeg;
    }
    return i;
  }

  function biSubtract(t, e) {
    let i;
    if (t.isNeg !== e.isNeg) {
      e.isNeg = !e.isNeg;
      i = biAdd(t, e);
      e.isNeg = !e.isNeg;
    } else {
      i = new BigInt(false);
      let n, _r;
      _r = 0;
      for (let o = 0; o < t.digits.length; ++o) {
        n = t.digits[o] - e.digits[o] + _r;
        i.digits[o] = 65535 & n;
        if (i.digits[o] < 0) {
          i.digits[o] += biRadix;
        }
        _r = 0 - Number(0 > n);
      }
      if (-1 === _r) {
        _r = 0;
        for (let o = 0; o < t.digits.length; ++o) {
          n = 0 - i.digits[o] + _r;
          i.digits[o] = 65535 & n;
          if (i.digits[o] < 0) {
            i.digits[o] += biRadix;
          }
          _r = 0 - Number(0 > n);
        }
        i.isNeg = !t.isNeg;
      } else {
        i.isNeg = t.isNeg;
      }
    }
    return i;
  }

  function biHighIndex(t) {
    let e;
    for (e = t.digits.length - 1; e > 0 && 0 === t.digits[e];) {
      --e;
    }
    return e;
  }

  function biNumBits(t) {
    let e;
    const i = biHighIndex(t);
    let n = t.digits[i];
    const _r = (i + 1) * bitsPerDigit;
    for (e = _r; e > _r - bitsPerDigit && 0 === (32768 & n); --e) {
      n <<= 1;
    }
    return e;
  }

  function biMultiply(t, e) {
    const o = new BigInt(false);
    for (let i, n, _r, a = biHighIndex(t), s = biHighIndex(e), c = 0; s >= c; ++c) {
      let j;
      for (i = 0, _r = c, j = 0; a >= j; ++j, ++_r) {
        n = o.digits[_r] + t.digits[j] * e.digits[c] + i;
        o.digits[_r] = n & maxDigitVal;
        i = n >>> 16;
      }
      o.digits[c + a + 1] = i;
    }
    o.isNeg = t.isNeg !== e.isNeg;
    return o;
  }

  function biMultiplyDigit(t, e) {
    let _r;
    const result = new BigInt(false);
    const i = biHighIndex(t);
    let n = 0;
    for (let o = 0; i >= o; ++o) {
      _r = result.digits[o] + t.digits[o] * e + n;
      result.digits[o] = _r & maxDigitVal;
      n = _r >>> 16;
    }
    result.digits[1 + i] = n;
    return result;
  }

  function arrayCopy(t, e, i, n, r) {
    for (let o = Math.min(e + r, t.length), a = e, s = n; o > a; ++a, ++s) {
      i[s] = t[a];
    }
  }

  function biShiftLeft(t, e) {
    const i = Math.floor(e / bitsPerDigit), n = new BigInt(false);
    arrayCopy(t.digits, 0, n.digits, i, n.digits.length - i);
    let a = n.digits.length - 1;
    for (let _r = e % bitsPerDigit, o = bitsPerDigit - _r, s = a - 1; a > 0; --a, --s) {
      n.digits[a] = n.digits[a] << _r & maxDigitVal | (n.digits[s] & highBitMasks[_r]) >>> o;
    }
    n.digits[0] = n.digits[a] << r & maxDigitVal;
    n.isNeg = t.isNeg;
    return n;
  }

  function biShiftRight(t, e) {
    const i = Math.floor(e / bitsPerDigit), n = new BigInt(false);
    arrayCopy(t.digits, i, n.digits, 0, t.digits.length - i);
    for (let _r = e % bitsPerDigit, o = bitsPerDigit - _r, a = 0, s = a + 1; a < n.digits.length - 1; ++a, ++s) {
      n.digits[a] = n.digits[a] >>> _r | (n.digits[s] & lowBitMasks[_r]) << o;
    }
    n.digits[n.digits.length - 1] >>>= r;
    n.isNeg = t.isNeg;
    return n;
  }

  function biMultiplyByRadixPower(t, e) {
    const i = new BigInt(false);
    arrayCopy(t.digits, 0, i.digits, e, i.digits.length - e);
    return i;
  }

  function biDivideByRadixPower(t, e) {
    const i = new BigInt(false);
    arrayCopy(t.digits, e, i.digits, 0, i.digits.length - e);
    return i;
  }

  function biModuloByRadixPower(t, e) {
    const i = new BigInt(false);
    arrayCopy(t.digits, 0, i.digits, 0, e);
    return i;
  }

  function biCompare(t, e) {
    if (t.isNeg !== e.isNeg) {
      return 1 - 2 * Number(t.isNeg);
    }
    for (let i = t.digits.length - 1; i >= 0; --i) {
      if (t.digits[i] !== e.digits[i]) {
        return t.isNeg ? 1 - 2 * Number(t.digits[i] > e.digits[i]) : 1 - 2 * Number(t.digits[i] < e.digits[i]);
      }
    }
    return 0;
  }

  function biDivideModulo(t, e) {
    let i;
    let n;
    let _r = biNumBits(t);
    let o = biNumBits(e);
    const a = e.isNeg;
    if (o > _r) {
      if (t.isNeg) {
        i = biCopy(bigOne);
        i.isNeg = !e.isNeg;
        t.isNeg = !1;
        e.isNeg = !1;
        n = biSubtract(e, t);
        t.isNeg = !0;
        return e.isNeg = a;
      } else {
        i = new BigInt(false);
        n = biCopy(t);
        return [i, n];
      }
    }
    i = new BigInt(false);
    n = t;
    let c = 0;
    let s;
    for (s = Math.ceil(o / bitsPerDigit) - 1; e.digits[s] < biHalfRadix;) {
      e = biShiftLeft(e, 1);
      ++c;
      ++o;
      s = Math.ceil(o / bitsPerDigit) - 1;
    }
    n = biShiftLeft(n, c);
    _r += c;
    let u, l;
    for (u = Math.ceil(_r / bitsPerDigit) - 1, l = biMultiplyByRadixPower(e, u - s); -1 !== biCompare(n, l);) {
      ++i.digits[u - s];
      n = biSubtract(n, l);
    }

    for (let d = u; d > s; --d) {
      const f = d >= n.digits.length ? 0 : n.digits[d], h = d - 1 >= n.digits.length ? 0 : n.digits[d - 1],
        p = d - 2 >= n.digits.length ? 0 : n.digits[d - 2], g = s >= e.digits.length ? 0 : e.digits[s],
        m = s - 1 >= e.digits.length ? 0 : e.digits[s - 1];
      i.digits[d - s - 1] = f === g ? maxDigitVal : Math.floor((f * biRadix + h) / g);
      for (let v = i.digits[d - s - 1] * (g * biRadix + m), b = f * biRadixSquared + (h * biRadix + p); v > b;) {
        --i.digits[d - s - 1];
        v = i.digits[d - s - 1] * (g * biRadix | m);
        b = f * biRadix * biRadix + (h * biRadix + p);
      }
      l = biMultiplyByRadixPower(e, d - s - 1);
      n = biSubtract(n, biMultiplyDigit(l, i.digits[d - s - 1]));
      if (n.isNeg) {
        n = biAdd(n, l);
        --i.digits[d - s - 1];
      }
    }
    n = biShiftRight(n, c);
    i.isNeg = t.isNeg !== a;
    return t.isNeg && (i = a ? biAdd(i, bigOne) : biSubtract(i, bigOne), e = biShiftRight(e, c), n = biSubtract(e, n)),
    0 === n.digits[0] && 0 === biHighIndex(n) && (n.isNeg = !1), [i, n];
  }

  function biDivide(t, e) {
    return biDivideModulo(t, e)[0];
  }

  function encryptedString(t, e) {
    let i, n;
    for (i = [], n = e.length, r = 0; n > r;) {
      i[r] = e.charCodeAt(r);
      r++;
    }
    for (; i.length % t.chunkSize !== 0;) {
      i[r++] = 0;
    }
    let o;
    let a;
    let s;
    const c = i.length;
    let u = '';
    for (r = 0; c > r; r += t.chunkSize) {
      for (s = new BigInt(false), o = 0, a = r; a < r + t.chunkSize; ++o) {
        s.digits[o] = i[a++];
        s.digits[o] += i[a++] << 8;
      }
      const l = t.barrett.powMod(s, t.e), d = 16 === t.radix ? biToHex(l) : biToString(l, t.radix);
      u += d + ' ';
    }
    return u.substring(0, u.length - 1);
  }

  function RSAKeyPair(t, e, i) {
    this.e = biFromHex(t);
    this.d = biFromHex(e);
    this.m = biFromHex(i);
    this.chunkSize = 2 * biHighIndex(this.m);
    this.radix = 16;
    this.barrett = new BarrettMu(this.m);
  }

  function _SBCtoDBC(e) {
    let t = '';
    if (e) {
      for (let n = e.length, s = 0; n > s; s++) {
        let o = e.charCodeAt(s);
        o = o >= 65281 && 65374 >= o ? o - 65248 : o;
        o = 12288 === o ? 32 : o;
        t += String.fromCharCode(o);
      }
      return t;
    }
  }

  function _strTrim(t) {
    return '[object string]' === Object.prototype.toString.call(t).toLowerCase() ? t.replace(/\s/g, '') : void 0;
  }

  const rsa = 'B3C61EBBA4659C4CE3639287EE871F1F48F7930EA977991C7AFE3CC442FEA49643212E7D570C853F368065CC57A201466' +
    '6DA8AE7D493FD47D171C0D894EEE3ED7F99F6798B7FFD7B5873227038AD23E3197631A8CB642213B9F27D4901AB0D92BFA27542AE89' +
    '0855396ED92775255C977F5C302F1E7ED4B1E369C12CB6B1822F';
  setMaxDigits(131);
  // 加密密码
  let r = new RSAKeyPair('10001', '', rsa);
  return encryptedString(r, password);
}

/**
 * 获取参数 ds tk
 * @param req
 * @param win
 * @param _CryptoJS
 * @constructor
 */
async function getDsTk(req, win, _CryptoJS) {
  const _document = win.document;
  let _store: any = {};
  const rzData = {cl: [], mv: [], sc: [], kb: [], cr: getScreenInfo(), ac_c: 0};
  let dsData = {ds: '', tk: ''};

  function encrypt(t) {
    const e = _store.aesKeyLeft + _store.aesKeyRight, i = _CryptoJS.enc.Utf8.parse(e),
      n = _CryptoJS.enc.Utf8.parse(t), r = _CryptoJS.AES.encrypt(n, i, {
        mode: _CryptoJS.mode.ECB,
        padding: _CryptoJS.pad.Pkcs7
      });
    return r.toString();
  }

  function initConfig(t) {
    _store = {
      storeVer: '1.0.1',
      count: 1,
      countnum: 10,
      ak: '1e3f2dd1c81f2075171a547893391274',
      aesKeyLeft: '6bffae1c',
      aesKeyRight: 'appsapi0',
      sendUrl: 'https://wappass.baidu.com/viewlog'
    };
    _store.ak = t.ak || '';
  }

  function getScreenInfo() {
    try {
      let i = win.mozInnerScreenY || win.screenTop;
      let n = win.mozInnerScreenX || win.screenLeft;
      if ('undefined' === typeof i) {
        i = 0;
      }
      if ('undefined' === typeof n) {
        n = 0;
      }
      const r = _document.documentElement.clientWidth || _document.body.clientWidth,
        o = _document.documentElement.clientHeight || _document.body.clientHeight, a = win.screen.width,
        s = win.screen.height, c = win.screen.availWidth, u = win.screen.availHeight, l = win.outerWidth,
        d = win.outerHeight, f = _document.documentElement.scrollWidth || _document.body.scrollWidth,
        h = _document.documentElement.scrollWidth || _document.body.scrollHeight;
      return {
        screenTop: i,
        screenLeft: n,
        clientWidth: r,
        clientHeight: o,
        screenWidth: a,
        screenHeight: s,
        availWidth: c,
        availHeight: u,
        outerWidth: l,
        outerHeight: d,
        scrollWidth: f,
        scrollHeight: h
      };
    } catch (p) {
    }
  }

  async function postData(t) {

    const i = JSON.stringify(rzData), n = encrypt(i), r = {ak: '', as: '', fs: ''};
    r.ak = _store.ak;
    r.as = _store.aesKeyLeft || '';
    r.fs = n;
    _store.count = 0;
    await ajax({
      url: _store.sendUrl,
      jsonp: false,
      data: r,
      success: function (res) {
        if (0 === res.code && res.data && res.data.ds && res.data.tk) {
          dsData = res.data || {};
          _store.aesKeyLeft = res.data.as || '6bffae1c';
          if (t) {
            t(res);
          }
        } else {
          errorData();
          if (t) {
            t(dsData);
          }
        }
      },
      error: function () {
        errorData();
        if (t) {
          t(dsData);
        }
      }
    });
  }

  async function getDataAsync(t) {
    if (_store.count > 0) {
      await postData(function (i) {
        if (i.data) {
          if (t) {
            t(i.data);
          }
        } else {
          if (t) {
            t(dsData);
          }
        }
      });
    } else {
      if (t) {
        t(dsData);
      }
    }
    return dsData;
  }

  function errorData() {
    dsData.ds = 'iggkFNY5Z8odmaVWu0oRjsneNUhc65bBgY7IeyRqe6S++zbDz3JlV99QbnGMERCkRH57fRY77K4T0r5PTAk/Xoi21K1UoYgR' +
      'M089xf8wdrl+FzMEwt13AaO5Dq4G0u5I49RTUPfwr4/MuB6b6hOcPwItorZarOJw+1yy7pp4LUUwmk1kqy5LXHQ2vXVRRIzBmEYkAd4LEM' +
      'WB3TNN/Ehb/v2mIBHtw+V8prcJi637saZP2NZL2qVarc81Js3Ls1ICNon1ghv5Vly2IjvClAg1oFtLIYqQN5/lojRrg11ajOBnVkwrC/Mb' +
      'VsQ+paftGrOl9PHjBbRFq8+5LwAmVysU+83iZLMBC3M7NhKKlIiTJpvDAR+KrUAG1HP8GTH8L8mrVjuno9MIfX6oloTXcpZHfXZln2FwwT' +
      'osFnTHZ0iaqdnCklq7W+xuSUyIYydL72/hi34W2QIyEh6PilSgac2Mgjh80ygOrj9hrR7+0rlc5c+cpeILmTUI3FNlzY0degKH81V3dYUS' +
      'NO27zcZ2KG3Zxb4I5SCnxYbEigiJJQkemNNAT+GiX2Je2XR9Xivcn0pFkdxEReHb2uHStsvaCaI+AxmHXc8PBV6X6CdAtRtSLnA+NBYrRr' +
      'VGBmZIQd112r6eSjJeO7R9ItEXpKnAb2jhyZ+dyBeQNYee3JeyNZpofxAsXyHLFkrKOqaceZBzhvxL9SZwADneJcVSYvLS9Fbf9RAo0FHH' +
      'rAFjphDmLe3wPcIgyiAKnpvgw58Z13bY1LYKEM3QYt+U974GYlahfJpett38TeJSbfcn3f1sk1+Q00jb46ivKadXTztpkD0z++pKJtMCgc' +
      '5pLJg40QLb6wbTpqa4wVULYnCouw6/9H5+COUDC0RKfLDhYzdcCCygSGlA';
    dsData.tk = '3338yojP4YX/CPjsNQpSEls3CchneKTLKfp9KvCfkBgWNCk=';
  }

  async function ajax(t) {
    async function e(_t) {
      await req.asyncGet({url: _t.url, qs: _t.data}).then(function (res) {
        _t.success(res.body);
      }).catch(function (err) {
        _t.error(err);
      });
    }

    function i(_t) {
      const _e = _t.jsonp + r(), _i = win.document.getElementsByTagName('head')[0];
      _t.data.callback = _e;
      const o = n(_t.data), a = win.document.createElement('script');
      a.onload = function () {
        setTimeout(function () {
          if (win[_e] && _t.error) {
            _t.error();
          }
        }, 200);
      };
      _i.appendChild(a);
      win[_e] = function (_n) {
        _i.removeChild(a);
        clearTimeout(a.timer);
        win[_e] = null;
        if (_t.success) {
          _t.success(_n);
        }
      };
      a.onerror = function (err) {
        if (_t.error) {
          _t.error(err);
        }
      };
      a.src = _t.url + '?' + o;
      if (_t.time) {
        a.timer = setTimeout(function () {
          win[_e] = null;
          _i.removeChild(a);
          if (_t.error) {
            _t.error({message: '超时'});
          }
        }, _t.time);
      }

    }

    function n(_t) {
      const _e = [];
      for (const _i in _t) {
        if (_t.hasOwnProperty(_i)) {
          _e.push(encodeURIComponent(_i) + '=' + encodeURIComponent(_t[_i]));
        }
      }
      _e.push('v=' + r());
      return _e.join('&');
    }

    function r() {
      return Math.floor(1e4 * Math.random() + 500);
    }

    t = t || {};
    t.data = t.data || {};
    t.jsonp ? i(t) : await e(t);
  }

  initConfig({ak: '1e3f2dd1c81f2075171a547893391274'});
  const result = {ds: '', tk: ''};
  await getDataAsync(function (e) {
    result.ds = e.ds || '';
    result.tk = e.tk || '';
  });
  return result;
}

/**
 * 登录
 * @returns {Promise<*>}
 */
async function doLogin(req, wappass) {
  const uid = new Date().getTime() + '_725';
  const option = {
    url: `https://wappass.baidu.com/wp/api/login?tt=${new Date().getTime()}`,
    gzip: true,
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Length': '2786',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'wappass.baidu.com',
      'Origin': 'https://wappass.baidu.com',
      'Pragma': 'no-cache',
      'Referer': 'https://wappass.baidu.com/',
      'User-Agent': ua,
      'X-Requested-With': 'XMLHttpRequest'
    },
    form: {
      'username': encodeURIComponent(wappass.username),
      'password': wappass.password,
      'verifycode': wappass.verifycode,
      'vcodestr': wappass.vcodestr ? wappass.vcodestr : wappass.codeString,
      'action': 'login',
      'u': `https%253A%252F%252Fwap.baidu.com%253Fuid%253D${uid}%2526traceid%253D${wappass.traceid}`,
      'tpl': '',
      'tn': '',
      'pu': '',
      'ssid': '',
      'from': '',
      'bd_page_type': '',
      'uid': uid,
      'type': '',
      'regtype': '',
      'subpro': '',
      'adapter': '0',
      'skin': 'default_v2',
      'regist_mode': '',
      'login_share_strategy': '',
      'client': '',
      'clientfrom': '',
      'connect': '0',
      'bindToSmsLogin': '',
      'extrajson': '',
      'isphone': '0',
      'loginmerge': '1',
      'getpassUrl': '/passport/getpass?clientfrom=&adapter=0&ssid=&from=&authsite=&bd_page_type=&uid=' + uid + '&pu=&tpl=wimn&u=https://m.baidu.com/usrprofile%3Fuid%3D' + uid + '%23logined&type=&bdcm=060d5ffd462309f7e5529822720e0cf3d7cad665&tn=&regist_mode=&login_share_strategy=&subpro=wimn&skin=default_v2&client=&connect=0&smsLoginLink=1&loginLink=&bindToSmsLogin=&overseas=&is_voice_sms=&subpro=wimn&hideSLogin=&forcesetpwd=&regdomestic=',
      'dv': 'tk0.212279999327005031549900644631%40wwf0BlAkqZQ4yXJIliN0p3sExLQIDZpks-pHNYAkqZQ4yXJIlis4nVsgNWsE2Zpks-p1GY7kRZBmdZQ-NeQUu-O0veOX31Q-G3Akof7kqzBgzgBUzzA4dWO-3jA0O3sE3ETIpWO4DZBHtlBVCVSkClAkqZQ4yXJIliNE5fJIOxC-yROrzdB1KlpkpYlf0TlBHKfAkDxpUz~7ktV7mdZQ-NeQUu-O0veOX31Q-G3SkoVBmz-pkRZpkRlBk2ZQ4yXJIliNE5fJIOxC-yRO0zfBkKZpVtuAkszp1t-A4dWO-3jAIOWsEu0sEnzs45fSko~pfzfpktZpVKfp1qZSktgBfzupkoZBHtgBkBgA4dWO-3jA0hLsgpgQgvRSq__ynnJxnERiOCshEfiBfzfAksfGfeN4ZzA1tdB1tg7HRx7HBfpVqzpHqVBHD~7HRzBkC~pkCVB2__ifeJ6G~s6BMAfygC0hzC0pVAEvLJIGuAEpWQrYZNIxROIOeQE5RufjB1DZB1KlAko~pkqZ7HCVAko~pkqZ7HqzAko~pkqZBH2~BmzlB1B_',
      'countrycode': wappass.countrycode,
      'mobilenum': wappass.mobilenum,
      'servertime': wappass.servertime,
      'gid': wappass.gid,
      'ds': wappass.ds,
      'tk': wappass.tk,
      'logLoginType': 'wap_loginTouch',
      'FP_UID': '',
      'vcodefrom': 'checkuname',
      'traceid': wappass.traceid
    }
  };
  const res = await req.asyncPost(option).catch((err) => {
    console.error(err);
  });
  return JSON.parse(res.body);
}

/**
 * 获取验证的手机或邮箱
 * @param req
 * @param gotoUrl
 * @param _JSDOM
 */
async function getVerifyTypeOptions(req, gotoUrl, _JSDOM) {
  const option = {
    url: gotoUrl,
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    }
  };
  const res = await req.asyncGet(option).catch((err) => {
    console.error(err);
  });
  const win = (new _JSDOM(res.body)).window;
  // console.log(res.body)
  const verifyTypeOption = [];
  const verifyTypes = win.document.getElementsByClassName('verify-type-li-content');
  for (let i = 0; i < verifyTypes.length; i++) {
    const liContent = verifyTypes.item(i);
    const value = liContent.getElementsByTagName('p').item(0).textContent;
    const desc = liContent.getElementsByTagName('p').item(1).textContent;
    if (desc.indexOf('手机') > -1 || desc.indexOf('邮箱') > -1) {
      verifyTypeOption.push(`${value},${desc}`);
    }
  }
  return verifyTypeOption;
}

/**
 * 发送验证码到手机或邮箱
 * @param req
 * @param type: mobile , email
 * @param gotoUrl
 * @param traceid
 * @returns {Promise<void>}
 */
async function sendCodeToUser(req, type, gotoUrl, traceid) {
  const url1 = url.parse(gotoUrl, true);
  const qs: any = {
    'action': 'send',
    'type': type,
    'tpl': url1.query.tpl,
    'u': url1.query.u,
    'token': url1.query.token,
    'from': '',
    'client': '',
    'clientfrom': '',
    'adapter': '0',
    'updatessn': '',
    'bindToSmsLogin': '',
    'upsms': '',
    'finance': '',
    'subpro': '',
    'isnew': 'true',
    'verifycenter': '',
    'traceid': traceid,
    'pagefrom': 'login',
  };
  if (type === 'email') {
    qs.moduleFrom = '';
  }
  const option = {
    url: 'https://wappass.baidu.com/passport/authwidget',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Referer': gotoUrl,
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    },
    qs: qs
  };
  const res = await req.asyncGet(option).catch((err) => {
    console.error(err);
  });
  // console.log(res.body);
  const str = res.body.match(/noti =.*;/)[0].replace('noti =', '').replace(';', '');
  if (str.indexOf('success') > -1) {
    return {
      success: true,
      msg: '验证码发送成功!'
    };
  } else {
    console.error(str);
    return {
      success: false,
      msg: str
    };
  }
}

/**
 *
 * @returns {Promise<boolean>}
 * @param req
 * @param vcode
 * @param type
 * @param gotoUrl
 * @param traceid
 */
async function verifyCode(req, vcode, type, gotoUrl, traceid) {
  let url1 = url.parse(gotoUrl, true);
  let option: any = {
    url: 'https://wappass.baidu.com/passport/authwidget',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Referer': gotoUrl,
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    },
    qs: {
      'v': new Date().getTime(),
      'vcode': vcode,
      'token': url1.query.token,
      'action': 'check',
      'type': type,
      'u': url1.query.u,
      'ori_u': '',
      'lstr': '',
      'ltoken': '',
      'tpl': url1.query.tpl,
      'skin': '',
      'clientfrom': '',
      'adapter': '2',
      'updatessn': '',
      'bindToSmsLogin': '',
      'isnew': 'true',
      'card_no': '',
      'finance': '',
      'traceid': traceid,
      'callback': 'jsonp1'
    }
  };
  let res = await req.asyncGet(option).catch((err) => {
    console.error(err);
  });

  const body = JSON.parse(res.body.replace('jsonp1(', '').replace(')', ''));
  // console.log(body);
  if (body.errInfo.no === '0') {
    console.log('身份验证成功');
  }
  url1 = url.parse(body.data.u, true);
  option = {
    url: url1.href,
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'wappass.baidu.com',
      'Referer': gotoUrl,
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    }
  };
  res = await req.asyncGet(option).catch((err) => {
    console.error(err);
  });

  const success = res.body.indexOf('window.passUiWebLoginSucceed(rspJson);') > -1;
  const msg = success ? '登录成功' : '验证码错误';
  return {
    success, msg
  };
}

function get_logid() {
  const exp = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&';
  const r = String.fromCharCode;
  const a = function (e) {
    if (e.length < 2) {
      const _t = e.charCodeAt(0);
      return 128 > _t ?
        e : 2048 > _t ? r(192 | _t >>> 6) + r(128 | 63 & _t)
          : r(224 | _t >>> 12 & 15) + r(128 | _t >>> 6 & 63) + r(128 | 63 & _t);
    }
    const t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
    return r(240 | t >>> 18 & 7) + r(128 | t >>> 12 & 63) + r(128 | t >>> 6 & 63) + r(128 | 63 & t);
  };
  const i = function (e) {
    const t = [0, 2, 1][e.length % 3]
      , _r = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0)
      ,
      _a = [str.charAt(_r >>> 18), str.charAt(_r >>> 12 & 63), t >= 2 ? '=' : str.charAt(_r >>> 6 & 63), t >= 1 ? '=' : str.charAt(63 & _r)];
    return _a.join('');
  };
  const o = function (e) {
    return (e + '' + Math.random()).replace(exp, a);
  };
  const u = function (e) {
    return e.replace(/[\s\S]{1,3}/g, i);
  };

  return u(o((new Date).getTime()));
}

async function get_quota(req, bdstoken) {

  const qs = {
    'checkexpire': '1',
    'checkfree': '1',
    'channel': 'chunlei',
    'web': '1',
    'app_id': '250528',
    'bdstoken': bdstoken,
    'logid': get_logid(),
    'clienttype': '0'
  };
  const res = await req.asyncGet({
    url: 'https://pan.baidu.com/api/quota',
    gzip: true,
    headers: {
      'Host': 'pan.baidu.com',
      'Referer': 'https://pan.baidu.com/disk/home?',
      'User-Agent': ua,
      'X-Requested-With': 'XMLHttpRequest'
    },
    qs: qs
  }).catch((err) => {
    console.error(err);
  });
  return res.body;
}

async function get_list(req, bdstoken, dir = '/') {
  const qs = {
    'dir': dir,
    'bdstoken': bdstoken,
    'logid': get_logid(),
    'num': '100',
    'order': 'time',
    'desc': '1',
    'clienttype': '0',
    'showempty': '0',
    'page': '1',
    'channel': 'chunlei',
    'web': '1',
    'app_id': '250528'
  };
  const res = await req.asyncGet({
    url: 'https://pan.baidu.com/api/list',
    gzip: true,
    headers: {
      'Host': 'pan.baidu.com',
      'Referer': 'https://pan.baidu.com/disk/home?',
      'User-Agent': ua,
      'X-Requested-With': 'XMLHttpRequest'
    },
    qs: qs
  }).catch((err) => {
    console.error(err);
  });
  return res.body;
}

function getCurrentUser(_fs, USERSINDEXPATH): UserInfo {
  const str = _fs.readFileSync(USERSINDEXPATH, 'utf-8');
  if (str && str.startsWith('[')) {
    const users = JSON.parse(str);
    for (const user of users) {
      if (user.currentUser) {
        return user;
      }
    }
  }
  return null;
}

export interface UserInfo {
  username: string;
  currentUser: boolean;
  cookieStorePath: string;
  context: any
}

function addOrUpdateUser(user: UserInfo, _fs, _path, UserindexFilePath: string) {
  const str = _fs.readFileSync(UserindexFilePath, 'utf-8');
  let usersList;
  if (str && str.startsWith('[')) {
    usersList = JSON.parse(str);
  } else {
    usersList = [];
  }
  let isNew = true;
  for (const i in usersList) {
    usersList[i].currentUser = false;
    if (usersList[i].username === user.username) {
      usersList[i].currentUser = user.currentUser;
      usersList[i].cookieStorePath = user.cookieStorePath;
      usersList[i].context = user.context;
      isNew = false;
    }
  }
  if (isNew) {
    usersList.push(user);
  }
  _fs.writeFileSync(UserindexFilePath, JSON.stringify(usersList));
}

function delUser(username: string, _fs, _path, UserindexFilePath: string, UserCookiePath: string) {
  const str = _fs.readFileSync(UserindexFilePath, 'utf-8');
  let usersList;
  if (str && str.startsWith('[')) {
    usersList = JSON.parse(str);
  } else {
    usersList = [];
  }
  for (const i in usersList) {
    if (usersList[i].username === username) {
      usersList[i].currentUser = false;
    }
  }
  _fs.writeFileSync(UserindexFilePath, JSON.stringify(usersList));
  _fs.writeFileSync(UserCookiePath, '');
}

async function updateContext(req, _fs, _path, USERSINDEXPATH) {
  const user: UserInfo = getCurrentUser(_fs, USERSINDEXPATH);
  user.context = await getContext(req);
  addOrUpdateUser(user, _fs, _path, USERSINDEXPATH);
}

async function getContext(req): Promise<any> {
  const res = await req.asyncGet({
    url: 'https://pan.baidu.com/disk/home?',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'pan.baidu.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': ua
    }
  }).catch(err => {
    console.error(err);
  });
  const str = res.body.match(/context=.*(?=;)/);
  if (str) {
    return JSON.parse(str[0].replace('context=', ''));
  } else {
    return null;
  }
}

export interface FileUri {
  'status': string,
  'uri': string
}

export interface Files {
  'completedLength': string,
  'index': string,
  'length': string,
  'path': string,
  'selected': string,
  'uris': FileUri[]
}

export interface DownloadStatus {
  fileName: string
  bitfield: string
  completedLength: string
  connections: string
  dir: string
  downloadSpeed: string
  errorCode: string
  errorMessage: string
  files: Files[]
  gid: string
  numPieces: string
  pieceLength: string
  status: string
  totalLength: string
  uploadLength: string
  uploadSpeed: string
}

@Injectable()
export class PcsService {


  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
    this.webFrame = window.require('electron').webFrame;
    this.remote = window.require('electron').remote;
    this.childProcess = window.require('child_process');
    this.fs = window.require('fs');
    this.path = window.require('path');
    this.os = window.require('os');
    this.find = window.require('find-process');
    this.util = window.require('util');
    this.tough = window.require('tough-cookie');
    this.mkdirp = window.require('mkdirp');
    this.request = window.require('request');
    this.JSDOM = window.require('jsdom').JSDOM;
    this.PCSDATADIR = this.path.join(this.remote.app.getPath('userData'), 'pcs');
    this.mkdirp(this.PCSDATADIR, (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log('PCSDATADIR', this.PCSDATADIR);
    const binName = this.os.platform() === 'darwin' ? 'aria2c' : 'aria2c.exe';
    this.Aria2cBinPath = this.path.join(this.PCSDATADIR, binName);
    this.Aria2cConfPath = this.path.join(this.PCSDATADIR, 'aria2.conf');
    console.log(this.Aria2cBinPath);
    const Aria2 = window.require('aria2');
    window.aria2 = this.aria2 = new Aria2({
      host: 'localhost',
      port: 6800,
      secure: false,
      secret: '',
      path: '/jsonrpc'
    });
    this.initAria2c(() => {
      this.aria2
        .open()
        .then(() => console.log('open'))
        .catch(err => console.log('error', err));
    });

    // emitted when the WebSocket is open.
    this.aria2.on('open', () => {
      console.log('aria2 OPEN');
    });

    // emitted when the WebSocket is closed.
    this.aria2.on('close', () => {
      console.log('aria2 CLOSE');
    });

    // emitted for every message sent.
    this.aria2.on('output', m => {
      console.log('aria2 OUT', m);
    });

    // emitted for every message received.
    this.aria2.on('input', m => {
      console.log('aria2 IN', m);
    });
  }
  ;

  PCSDATADIR = '';
  COOKIESTOREPATH = ''; // cookie文件名
  USERSINDEXPATH = ''; // 用户索引文件
  USERDATAPATH = ''; // 单个用户的文件夹
  Aria2cBinPath = ''; // Aria2c Bin Path
  Aria2cConfPath = ''; // Aria2c Conf Path
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  path: typeof path;
  os: typeof os;
  find: any;
  util: typeof util;
  tough: typeof tough;
  mkdirp: typeof mkdirp;
  request: typeof request;
  JSDOM: typeof JSDOM;
  cookieStore: typeof FileCookieStore;
  req: CookieStoreRequest;
  aria2: any;

  wappass = {
    gid: '',
    username: '',
    password: '',
    mobilenum: '',
    verifycode: '',
    servertime: '',
    countrycode: '',
    traceid: '',
    codeString: '',
    tk: '',
    ds: '',
    vtype: '',
    vcodestr: '',
    antireplaytoken: {}
  };
  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  private touchFileIfNotExists(filePath) {
    if (!this.fs.existsSync(filePath)) {
      const wstream = this.fs.createWriteStream(filePath);
      wstream.end();
    }
  }

  public async login(username, password, verifycode) {
    this.USERDATAPATH = this.path.join(this.PCSDATADIR, `${username}`);
    this.COOKIESTOREPATH = this.path.join(this.USERDATAPATH, 'cookie.json');
    this.mkdirp(this.USERDATAPATH, (err) => {
      if (err) {
        console.error(err);
      }
    });
    this.touchFileIfNotExists(this.COOKIESTOREPATH);

    this.wappass.gid = guideRandom();
    this.wappass.verifycode = verifycode;
    this.wappass.username = username;
    this.cookieStore = new FileCookieStore(this.COOKIESTOREPATH, this.tough, this.fs, this.util);
    this.req = new CookieStoreRequest(this.cookieStore, this.request, this.util);

    const loginPrepareData: LoginPrepareData = await prepareLogin(this.req);
    this.wappass.password = await encryptPass(password + loginPrepareData.servertime);

    this.wappass.traceid = loginPrepareData.traceid;
    this.wappass.servertime = loginPrepareData.servertime;
    this.wappass.antireplaytoken = loginPrepareData.antireplaytoken;

    this.wappass.codeString = await getCodeString(this.req, this.wappass.gid, this.wappass.username, this.wappass.traceid);

    if (this.wappass.codeString) {
      const captchaPath = this.path.join(this.USERDATAPATH, 'captcha.jpg');
      console.warn(`需要输入验证码图片, 验证码图片路径： ${captchaPath}`);
      await genimage(this.req, this.fs, captchaPath, captchaPath);
    }

    const data = await getDsTk(this.req, window, CryptoJS);
    this.wappass.ds = data.ds;
    this.wappass.tk = data.tk;

    const result = await doLogin(this.req, this.wappass);
    this.wappass.vcodestr = result.data.codeString;
    this.wappass.codeString = result.data.codeString;
    this.fs.writeFileSync(this.path.join(this.USERDATAPATH, 'loginResult.json'), JSON.stringify(result));

    return result;

  }

  public async getVerifyType() {
    const loginResult: string = this.fs.readFileSync(this.path.join(this.USERDATAPATH, 'loginResult.json'), 'utf-8');
    if (loginResult && loginResult.startsWith('{')) {
      return await getVerifyTypeOptions(this.req, JSON.parse(loginResult).data.gotoUrl, this.JSDOM);
    }

    return [];
  }

  /**
   *
   * @param type: email mobile card
   */
  public async sendCodeToUser(type) {
    this.wappass.vtype = type;
    const loginResult: string = this.fs.readFileSync(this.path.join(this.USERDATAPATH, 'loginResult.json'), 'utf-8');
    const result = await sendCodeToUser(this.req, type, JSON.parse(loginResult).data.gotoUrl, this.wappass.traceid);
    console.log(result);
    return result;
  }

  public async verifyCode(vcode) {
    const loginResult: string = this.fs.readFileSync(this.path.join(this.USERDATAPATH, 'loginResult.json'), 'utf-8');
    const result = await verifyCode(this.req, vcode, this.wappass.vtype, JSON.parse(loginResult).data.gotoUrl, this.wappass.traceid);
    console.log(result);
    return result;
  }

  public async getQuota() {
    let currentUser = this.getCurrentUser();
    if (currentUser != null) {
      this.cookieStore = new FileCookieStore(this.path.join(currentUser.cookieStorePath), this.tough, this.fs, this.util);
      this.req = new CookieStoreRequest(this.cookieStore, this.request, this.util);
      await updateContext(this.req, this.fs, this.path, this.USERSINDEXPATH);
    }
    currentUser = this.getCurrentUser();
    if (currentUser && currentUser.context) {
      const res = await get_quota(this.req, currentUser.context.bdstoken);
      return JSON.parse(res);
    } else {
      return null;
    }
  }

  public async getList(dir) {
    let currentUser = this.getCurrentUser();
    if (currentUser != null) {
      this.cookieStore = new FileCookieStore(this.path.join(currentUser.cookieStorePath), this.tough, this.fs, this.util);
      this.req = new CookieStoreRequest(this.cookieStore, this.request, this.util);
      await updateContext(this.req, this.fs, this.path, this.USERSINDEXPATH);
    }
    currentUser = this.getCurrentUser();
    if (currentUser && currentUser.context) {
      const res = await get_list(this.req, currentUser.context.bdstoken, dir);
      return JSON.parse(res);
    } else {
      return null;
    }
  }

  public getCurrentUser(): UserInfo {
    if (this.USERSINDEXPATH) {
      return getCurrentUser(this.fs, this.USERSINDEXPATH);
    } else {
      return null;
    }
  }

  public addUser(username) {
    const user: UserInfo = {
      username: username,
      currentUser: true,
      cookieStorePath: this.COOKIESTOREPATH,
      context: {}
    };
    addOrUpdateUser(user, this.fs, this.path, this.USERSINDEXPATH);
  }

  logout(username) {
    delUser(username, this.fs, this.path, this.USERSINDEXPATH, this.COOKIESTOREPATH);
  }

  public async initPcs() {
    this.USERSINDEXPATH = this.path.join(this.PCSDATADIR, 'users.json');
    if (!this.fs.existsSync(this.USERSINDEXPATH)) {
      const wstream = this.fs.createWriteStream(this.USERSINDEXPATH);
      wstream.end();
    } else {
      const str = this.fs.readFileSync(this.USERSINDEXPATH, 'utf-8');
      if (str && str.startsWith('[')) {
        const users = JSON.parse(str);
        for (const user of users) {
          if (user.currentUser) {
            this.USERDATAPATH = this.path.join(this.PCSDATADIR, `${user.username}`);
            this.mkdirp(this.USERDATAPATH, function (err) {
              if (err) {
                console.error(err);
              }
            });
            this.COOKIESTOREPATH = this.path.join(this.USERDATAPATH, 'cookie.json');
          }
        }
      }
    }

    let currentUser = this.getCurrentUser();
    if (currentUser != null) {
      this.cookieStore = new FileCookieStore(currentUser.cookieStorePath, this.tough, this.fs, this.util);
      this.req = new CookieStoreRequest(this.cookieStore, this.request, this.util);
      await updateContext(this.req, this.fs, this.path, this.USERSINDEXPATH);
    }
    currentUser = this.getCurrentUser();
    return currentUser && currentUser.context;
  }

  private isDev() {
    const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
    return isEnvSet ? getFromEnv : !this.remote.app.isPackaged;
  }

  private checkAria2cBin(cb) {
    if (!this.fs.existsSync(this.Aria2cConfPath)) {
      let confPath;
      if (this.isDev()) {
        confPath = this.path.join(__dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'aria2c', 'aria2.conf');
      } else {
        confPath = this.path.join(process.resourcesPath, '..', 'aria2c', 'aria2.conf');
      }
      let conf = this.fs.readFileSync(confPath, 'utf-8');

      conf = conf.replace(/\/etc\/aria2/g, this.PCSDATADIR);
      console.log(conf);
      this.fs.writeFileSync(this.Aria2cConfPath, conf);

      this.fs.writeFileSync(this.path.join(this.PCSDATADIR, 'aria2.session'), '');
    }
    if (!this.fs.existsSync(this.Aria2cBinPath)) {
      let binPath;
      const binName = this.os.platform() === 'darwin' ? 'aria2c' : 'aria2c.exe';
      if (this.isDev()) {
        binPath = this.path.join(__dirname, '..', '..', '..', '..', '..', '..', '..', '..', 'aria2c', binName);
      } else {
        binPath = this.path.join(process.resourcesPath, '..', 'aria2c', binName);
      }
      this.fs.copyFileSync(binPath, this.Aria2cBinPath);
    }
    cb();
  }

  private initAria2c(cb) {
    this.checkAria2cBin(() => {
      this.find('name', this.Aria2cBinPath)
        .then((list) => {
          console.log(list);
          if (list && list.length > 0) {
            console.log('aria2c already running ');
            cb();
          } else {
            console.log('start aria2c');
            const cookie = this.getCookieString();
            this.childProcess.execFile(this.Aria2cBinPath, [`--conf-path=${this.Aria2cConfPath}`], (error, out, stderror) => {
              if (error) {
                console.error('stderr', stderror);
                throw error;
              }
              console.log('stdout', out);
              cb();
            });
          }
        }, function (err) {
          console.log(err.stack || err);
        });
    });
  }

  private getCookieString() {
    const user = this.getCurrentUser();
    if (user === null) {
      return '';
    }
    let result = '';
    const data = this.fs.readFileSync(user.cookieStorePath, 'utf8');
    const dataJson = data ? JSON.parse(data) : null;
    for (const domain in dataJson) {
      if (!dataJson[domain]) {
        continue;
      }
      for (const p in dataJson[domain]) {
        if (!dataJson[domain][p]) {
          continue;
        }
        for (const key in dataJson[domain][p]) {
          if (!dataJson[domain][p][key]) {
            continue;
          }
          result = result + dataJson[domain][p][key].key + '=' + dataJson[domain][p][key].value + '; ';
        }
      }
    }
    return result;
  }

  /**
   *
   * @param pathInServer
   * @param savePath
   */
  public async download(pathInServer: string, savePath: string) {
    console.log(pathInServer, savePath);
    const _url = `http://d.pcs.baidu.com/rest/2.0/pcs/file?method=download&app_id=250528&path=${encodeURIComponent(pathInServer)}&ver=2.0&clienttype=1`;
    const cookie = this.getCookieString();
    const h = {
      'User-Agent': 'netdisk;5.3.1.3;PC;PC-Windows;5.1.2600;WindowsBaiduYunGuanJia',
      'X-Download-From': 'baiduyun',
      'Connection': 'keep-alive',
      'Cookie': cookie
    };
    const header = [];
    for (const i in h) {
      header.push(i + ':' + h[i]);
    }
    const p = this.path.parse(savePath);
    const [guid] = await this.aria2.call('addUri', [_url], {dir: p.dir, out: p.base, header: header});
    console.log('guid', guid);
  }


  public async getGlobalStat() {
    console.log(await this.aria2.call('getGlobalStat'));
  }

  public async tellStatus(gid: string) {
    console.log(await this.aria2.call('tellStatus', gid));
  }

  public async tellActive(): Promise<DownloadStatus[]> {
    return await this.aria2.call('tellActive');
  }

  public async tellStopped(offset: number, num: number): Promise<DownloadStatus[]> {
    return await this.aria2.call('tellStopped', offset, num);
  }

  public async tellWaiting(offset: number, num: number): Promise<DownloadStatus[]> {
    return await this.aria2.call('tellWaiting', offset, num);
  }

  public async remove(gid: string) {
    return await this.aria2.call('remove', gid);
  }

  public async forceRemove(gid: string) {
    return await this.aria2.call('forceRemove', gid);
  }

  public async pause(gid: string) {
    return await this.aria2.call('pause', gid);
  }

  public async pauseAll() {
    return await this.aria2.call('pauseAll');
  }

  public async forcePause(gid: string) {
    return await this.aria2.call('forcePause', gid);
  }

  public async forcePauseAll() {
    return await this.aria2.call('forcePauseAll');
  }

  public async unpause(gid: string) {
    return await this.aria2.call('unpause', gid);
  }

  public async unpauseAll() {
    return await this.aria2.call('unpauseAll');
  }

  public async getUris(gid: string) {
    return await this.aria2.call('getUris', gid);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  private existAria2Server() {
    this.childProcess.exec('pkill ' + this.Aria2cBinPath, (e, stdout, stderr) => {
      if (e instanceof Error) {
        console.error(e);
        throw e;
      }
    });
  }
}

