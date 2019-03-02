import {Component, OnInit} from '@angular/core';
import {PcsService} from '../../providers/pcs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showLogin = false;
  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
  ]);
  username = '';
  password = '';
  vcode = '';
  verifycode = '';
  verifyTypeOptions = [];
  showVcodeInput = false;
  codeUrl = '';
  codeString = '';

  constructor(public pcsService: PcsService,
              private router: Router, private activatedRoute: ActivatedRoute) {

  }

  async ngOnInit() {
    const success = await this.pcsService.initPcs();
    if (success) {
      const user = this.pcsService.getCurrentUser();
      if (user) {
        this.showLogin = false;
        this.goToHome(this.username);
      } else {
        this.showLogin = true;
      }
    } else {
      this.showLogin = true;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      const showLogin = params['showLogin'];
      if (showLogin) {
        this.showLogin = showLogin;
      }
    });
  }

  async login() {
    function _strTrim(t) {
      return '[object string]' === Object.prototype.toString.call(t).toLowerCase() ? t.replace(/\s/g, '') : void 0;
    }

    const res = await this.pcsService.login(_strTrim(this.username), _strTrim(this.password), _strTrim(this.verifycode));
    // console.log(res);
    this.handleLoginResult(res);
  }

  async verifyCode() {
    const result = await this.pcsService.verifyCode(this.vcode);
    const notification = new Notification('通知', {
      body: result.msg
    });
    if (result.success) {
      console.log('登录成功');
      this.pcsService.addUser(this.username);
      this.goToHome(this.username);
    }
  }


  updateUsername(value: string) {
    this.username = value;
  }

  updatePassword(value: string) {
    this.password = value;
  }

  updateVcode(value: string) {
    this.vcode = value;
  }

  updateVerifycode(value: string) {
    this.verifycode = value;
  }

  async handleLoginResult(logResult) {
    switch (logResult.errInfo.no) {
      case '0':
        this.pcsService.addUser(this.username);
        this.goToHome(this.username);
        console.log('登录成功');
        return true;
      case '400023':
      case '400101': // 需要验证手机或邮箱
        const verifyTypeOptions = await this.pcsService.getVerifyType();
        this.verifyTypeOptions = verifyTypeOptions;
        console.log(verifyTypeOptions);
        return false;
      case '500001':
      case '500002': // 验证码
        this.codeString = logResult.data.codeString;
        this.genImageUrl();
        console.warn(logResult.errInfo.no, logResult.errInfo.msg);
        return false;
      default:
        console.warn(logResult.errInfo.no, logResult.errInfo.msg);
        return false;
    }
  };

  async sendCodeToUser(option) {
    console.log(option);
    let result;
    if (option.indexOf('邮箱') > -1) {
      result = await this.pcsService.sendCodeToUser('email');
    } else if (option.indexOf('手机') > -1) {
      result = await this.pcsService.sendCodeToUser('mobile');
    }
    const notification = new Notification('通知', {
      body: result.msg
    });
    this.showVcodeInput = true;
  }

  private goToHome(username) {
    this.router.navigate(['home'], {queryParams: {username: username}}).then((e) => {
    });
  }

  genImageUrl() {
    this.codeUrl = `https://wappass.baidu.com/cgi-bin/genimage?${this.codeString}&v=${new Date().getTime()}`;
  }
}
