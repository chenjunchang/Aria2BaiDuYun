export interface IconConfig {
  _name: string,
  _pattern: string,
  _icon: string
}

export const IconAssociations: IconConfig[] = [
  {
    '_name': 'Archive',
    '_pattern': '.*\\.(zip|7z|7zip|gzip|rar|tar|gz|pzip|saz|tgz)$',
    '_icon': '/icons/archive.svg'
  },
  {
    '_name': 'Audio',
    '_pattern': '.*\\.(mp3|aac|aiff|au|flac|m4a|mpc|mp+|mpp|ogg|oga|opus|ra|rm|wav|wma|snd|mid|cda)$',
    '_icon': '/icons/audio.svg'
  },
  {
    '_name': 'Video',
    '_pattern': '.*\\.(avi|mp4|mpg|mpeg|mov|mkv|flv|h264|webm|wmv|ogv|3gp|m4v|3gpp|ogm|dvd|divx)$',
    '_icon': '/icons/video.svg'
  },
  {
    '_name': 'Images',
    '_pattern': '.*\\.(gif|jpg|jpeg|tiff|png|GIF|JPG|JPEG|TIFF|PNG)$',
    '_icon': '/icons/image.svg'
  },
  {
    '_name': 'PDF',
    '_pattern': '.*\\.pdf$',
    '_icon': '/icons/pdf.svg'
  },
  {
    '_name': 'Word',
    '_pattern': '.*\\.(doc|docx|docm|docxml|dotm|dotx|wri|odt|odtx)$',
    '_icon': '/icons/word.svg'
  },
  {
    '_name': 'OneNote',
    '_pattern': '.*\\.(one|onenote)$',
    '_icon': '/icons/onenote.svg'
  },
  {
    '_name': 'OpenOffice',
    '_pattern': '.*\\.(odf|ods)$',
    '_icon': '/icons/openoffice.svg'
  },
  {
    '_name': 'Access',
    '_pattern': '.*\\.(adn|accdb|accdr|accdt|accda|mdw|accde|mam|maq|mar|mat|maf|laccdb)$',
    '_icon': '/icons/access.svg'
  },
  {
    '_name': 'APK',
    '_pattern': '.*\\.apk$',
    '_icon': '/icons/android.svg'
  },
  {
    '_name': 'Text',
    '_pattern': '.*\\.(txt|rtf)$',
    '_icon': '/icons/text.svg'
  },
  {
    '_name': 'JSON',
    '_pattern': '.*\\.(json|cson)$',
    '_icon': '/icons/json.svg'
  },
  {
    '_name': 'SVG',
    '_pattern': '.*\\.(svg|SVG)$',
    '_icon': '/icons/svg.svg'
  },
  {
    '_name': 'README',
    '_pattern': '^README\\.md$',
    '_icon': '/icons/readme.svg'
  },
  {
    '_name': 'ActionScript',
    '_pattern': '.*\\.as$',
    '_icon': '/icons/actionscript.svg'
  },
  {
    '_name': 'Adobe Elements',
    '_pattern': '.*\\.ae(p|t)$',
    '_icon': '/icons/ae.svg'
  },
  {
    '_name': 'Adobe Illustrator',
    '_pattern': '.*\\.ai$',
    '_icon': '/icons/ai.svg'
  },
  {
    '_name': 'Ada',
    '_pattern': '.*\\.(ada|adb)$',
    '_icon': '/icons/ada.svg'
  },
  {
    '_name': 'Akka',
    '_pattern': '.*\\.akka$',
    '_icon': '/icons/akka.svg'
  },
  {
    '_name': 'Android Manifest',
    '_pattern': '^AndroidManifest\\.xml$',
    '_icon': '/icons/android.svg'
  },
  {
    '_name': 'Android Main',
    '_pattern': '^MainActivity\\.java$',
    '_icon': '/icons/android.svg'
  },
  {
    '_name': 'Angular-CLI',
    '_pattern': '^angular(-cli)?\\.json$',
    '_icon': '/icons/angular.svg'
  },
  {
    '_name': 'AngularJS',
    '_pattern': '^angular\\.(min\\.)?js$',
    '_icon': '/icons/angular.svg'
  },
  {
    '_name': 'Angular',
    '_pattern': '.*\\.(ng\\.html|ng\\.js|module\\.[tj]s|ng-template)$',
    '_icon': '/icons/angular.svg'
  },
  {
    '_name': 'Angular Component',
    '_pattern': '.*\\.component\\.[tj]s$',
    '_icon': '/icons/angularcomponent.svg'
  },
  {
    '_name': 'Angular Directive',
    '_pattern': '.*\\.directive\\.[tj]s$',
    '_icon': '/icons/angulardirective.svg'
  },
  {
    '_name': 'Angular Guard',
    '_pattern': '.*\\.guard\\.[tj]s$',
    '_icon': '/icons/angularguard.svg'
  },
  {
    '_name': 'Angular Service',
    '_pattern': '.*\\.service\\.[tj]s$',
    '_icon': '/icons/angularservice.svg'
  },
  {
    '_name': 'Angular Pipe',
    '_pattern': '.*\\.pipe\\.[tj]s$',
    '_icon': '/icons/angularpipe.svg'
  },
  {
    '_name': 'Angular Routing',
    '_pattern': '.*\\.routing\\.[tj]s$',
    '_icon': '/icons/angularrouting.svg'
  },
  {
    '_name': 'Angular Resolver',
    '_pattern': '.*\\.resolver\\.[tj]s$',
    '_icon': '/icons/angularresolver.svg'
  },
  {
    '_name': 'Ansible',
    '_pattern': '^site\\.yml$',
    '_icon': '/icons/ansible.svg'
  },
  {
    '_name': 'ANTLR',
    '_pattern': '.*\\.g4$',
    '_icon': '/icons/antlr.svg'
  },
  {
    '_name': 'API Blueprint',
    '_pattern': '.*\\.apib$',
    '_icon': '/icons/apib.svg'
  },
  {
    '_name': 'Appveyor',
    '_pattern': '^appveyor\\.yml$',
    '_icon': '/icons/appveyor.svg'
  },
  {
    '_name': 'AppleScript',
    '_pattern': '.*\\.applescript$',
    '_icon': '/icons/applescript.svg'
  },
  {
    '_name': 'Arduino',
    '_pattern': '.*\\.(ino|pde)$',
    '_icon': '/icons/arduino.svg'
  },
  {
    '_name': 'Asciidoc',
    '_pattern': '.*\\.(ad|adoc|asciidoc)$',
    '_icon': '/icons/asciidoc.svg'
  },
  {
    '_name': 'AspectJ',
    '_pattern': '.*\\.aj$',
    '_icon': '/icons/eclipse.svg'
  },
  {
    '_name': 'ASM',
    '_pattern': '.*\\.(asm|nasm|s|ms|agc|aes|aea|argus|mitigus)$',
    '_icon': '/icons/asm.svg'
  },
  {
    '_name': 'ASP',
    '_pattern': '.*\\.(asp|asa|aspx)$',
    '_icon': '/icons/asp.svg'
  },
  {
    '_name': 'Atom',
    '_pattern': '.*\\.atom$',
    '_icon': '/icons/atom.svg'
  },
  {
    '_name': 'Aurelia',
    '_pattern': '^aurelia(file)?\\.js(on)?$',
    '_icon': '/icons/aurelia.svg'
  },
  {
    '_name': 'Authors',
    '_pattern': '^AUTHORS',
    '_icon': '/icons/authors.svg'
  },
  {
    '_name': 'AutoHotKey',
    '_pattern': '.*\\.ahk$',
    '_icon': '/icons/ahk.svg'
  },
  {
    '_name': 'Babel',
    '_pattern': '^(\\.babelrc|babel\\.json)$',
    '_icon': '/icons/babel.svg'
  },
  {
    '_name': 'Ballerina',
    '_pattern': '.*\\.balx?$',
    '_icon': '/icons/ballerina.svg'
  },
  {
    '_name': 'Basic',
    '_pattern': '.*\\.(bas|vb|vbs)$',
    '_icon': '/icons/vs.svg'
  },
  {
    '_name': 'Bazel',
    '_pattern': '.*\\.bzl$',
    '_icon': '/icons/bazel.svg'
  },
  {
    '_name': 'Bean',
    '_pattern': '.*(b|B)ean\\.java$',
    '_icon': '/icons/bean.svg'
  },
  {
    '_name': 'Behat',
    '_pattern': '.*\\.feature(\\.php)?$',
    '_icon': '/icons/behat.svg'
  },
  {
    '_name': 'Bitbucket Pipelines',
    '_pattern': '^bitbucket-pipelines\\.yml$',
    '_icon': '/icons/bitbucket.svg'
  },
  {
    '_name': 'Blade',
    '_pattern': '.*\\.blade(\\.php)?$',
    '_icon': '/icons/blade.svg'
  },
  {
    '_name': 'Bower',
    '_pattern': '^(\\.bowerrc|bower\\.json)$',
    '_icon': '/icons/bower.svg'
  },
  {
    '_name': 'Brainfuck',
    '_pattern': '.*\\.(b|bf)$',
    '_icon': '/icons/brainfuck.svg'
  },
  {
    '_name': 'Bro',
    '_pattern': '.*\\.bro$',
    '_icon': '/icons/bro.svg'
  },
  {
    '_name': 'Browserslist',
    '_pattern': '\\.browserslist(rc)?$',
    '_icon': '/icons/browserslist.svg'
  },
  {
    '_name': 'Bundler',
    '_pattern': '^Gemfile$',
    '_icon': '/icons/bundle.svg'
  },
  {
    '_name': 'C',
    '_pattern': '.*\\.(c|objc)$',
    '_icon': '/icons/c.svg'
  },
  {
    '_name': 'Cabal',
    '_pattern': '.*\\.cabal$',
    '_icon': '/icons/cabal.svg'
  },
  {
    '_name': 'Cabal Project',
    '_pattern': '^cabal\\.project$',
    '_icon': '/icons/cabal.svg'
  },
  {
    '_name': 'CakePHP',
    '_pattern': '.*\\.cake$',
    '_icon': '/icons/cakephp.svg'
  },
  {
    '_name': 'CFC',
    '_pattern': '.*\\.(cfc|cfm)$',
    '_icon': '/icons/cfc.svg'
  },
  {
    '_name': 'Changelog',
    '_pattern': '^CHANGELOG',
    '_icon': '/icons/log.svg'
  },
  {
    '_name': 'Chef Knife',
    '_pattern': '^knife.rb$',
    '_icon': '/icons/chef.svg'
  },
  {
    '_name': 'Chef Berksfile',
    '_pattern': '^Berksfile$',
    '_icon': '/icons/chef.svg'
  },
  {
    '_name': 'CircleCI',
    '_pattern': '^\\.circleci$',
    '_icon': '/icons/circleci.svg'
  },
  {
    '_name': 'CircleCI Conf',
    '_pattern': '^(circle|config)\\.yml$',
    '_icon': '/icons/circleci.svg'
  },
  {
    '_name': 'Class',
    '_pattern': '.*\\.(class|o)$',
    '_icon': '/icons/class.svg'
  },
  {
    '_name': 'Clojure',
    '_pattern': '.*\\.(cljs|clj|cljc|clojure)$',
    '_icon': '/icons/clojure.svg'
  },
  {
    '_name': 'CMake',
    '_pattern': '.*\\.cmake$',
    '_icon': '/icons/cmake.svg'
  },
  {
    '_name': 'CMakelists',
    '_pattern': '^CMakeLists',
    '_icon': '/icons/cmake.svg'
  },
  {
    '_name': 'CNAME',
    '_pattern': '^CNAME$',
    '_icon': '/icons/cname.svg'
  },
  {
    '_name': 'Cobol',
    '_pattern': '.*\\.(cobol|cbl)$',
    '_icon': '/icons/cobol.svg'
  },
  {
    '_name': 'CoffeeScript',
    '_pattern': '.*\\.coffee$',
    '_icon': '/icons/coffeescript.svg'
  },
  {
    '_name': 'ColdFusion',
    '_pattern': '.*\\.cf$',
    '_icon': '/icons/cf.svg'
  },
  {
    '_name': 'Compass',
    '_pattern': '^config\\.rb$',
    '_icon': '/icons/compass.svg'
  },
  {
    '_name': 'Composer',
    '_pattern': '^composer\\.json$',
    '_icon': '/icons/composer.svg'
  },
  {
    '_name': 'Composer Phar',
    '_pattern': '^composer\\.phar$',
    '_icon': '/icons/composer.svg'
  },
  {
    '_name': 'Cordova',
    '_pattern': '^cordova',
    '_icon': '/icons/cordova.svg'
  },
  {
    '_name': 'Crystal',
    '_pattern': '.*\\.cr$',
    '_icon': '/icons/crystal.svg'
  },
  {
    '_name': 'CSS',
    '_pattern': '.*\\.css$',
    '_icon': '/icons/css.svg'
  },
  {
    '_name': 'CSS Map',
    '_pattern': '.*\\.css\\.map$',
    '_icon': '/icons/cssmap.svg'
  },
  {
    '_name': 'CSV',
    '_pattern': '.*\\.(csv|tsv)$',
    '_icon': '/icons/csv.svg'
  },
  {
    '_name': 'Cucumber',
    '_pattern': '.*\\.feature\\.rb$',
    '_icon': '/icons/cucumber.svg'
  },
  {
    '_name': 'C++',
    '_pattern': '.*\\.(cpp|hpp|cc)$',
    '_icon': '/icons/cpp.svg'
  },
  {
    '_name': 'C#',
    '_pattern': '.*\\.csx?$',
    '_icon': '/icons/csharp.svg'
  },
  {
    '_name': 'Dart',
    '_pattern': '.*\\.dart$',
    '_icon': '/icons/dart.svg'
  },
  {
    '_name': 'DB',
    '_pattern': '.*\\.(db|ddl)$',
    '_icon': '/icons/db.svg'
  },
  {
    '_name': 'Delphi',
    '_pattern': '.*\\.delphi$',
    '_icon': '/icons/delphi.svg'
  },
  {
    '_name': 'DLang',
    '_pattern': '.*\\.d$',
    '_icon': '/icons/dlang.svg'
  },
  {
    '_name': 'Diff',
    '_pattern': '.*\\.diff$',
    '_icon': '/icons/diff.svg'
  },
  {
    '_name': 'Django',
    '_pattern': '.*\\.(flake8|djt)$',
    '_icon': '/icons/django.svg'
  },
  {
    '_name': 'Do',
    '_pattern': '.*\\.do$',
    '_icon': '/icons/tomcat.svg'
  },
  {
    '_name': 'Docker',
    '_pattern': '(^(d|D)ockerfile$)|(.*\\.dockerignore$)',
    '_icon': '/icons/docker.svg'
  },
  {
    '_name': 'DockerCompose',
    '_pattern': '^docker-compose(.*)\\.(yml|yaml)$',
    '_icon': '/icons/docker.svg'
  },
  {
    '_name': 'Dot',
    '_pattern': '.*\\.(def|dot|jst)$',
    '_icon': '/icons/dotjs.svg'
  },
  {
    '_name': 'DotNET',
    '_pattern': '.*\\.(xaml|csproj)$',
    '_icon': '/icons/dotnet.svg'
  },
  {
    '_name': 'Doxygen',
    '_pattern': '^(D|d)oxyfile$',
    '_icon': '/icons/doxygen.svg'
  },
  {
    '_name': 'Drupal',
    '_pattern': '.*\\.drupal$',
    '_icon': '/icons/drupal.svg'
  },
  {
    '_name': 'Dylib',
    '_pattern': '.*\\.dylib$',
    '_icon': '/icons/dylib.svg'
  },
  {
    '_name': 'Eclipse',
    '_pattern': '.*\\.eclipse',
    '_icon': '/icons/eclipse.svg'
  },
  {
    '_name': 'EditorConfig',
    '_pattern': '^\\.editorconfig$',
    '_icon': '/icons/editorconfig.svg'
  },
  {
    '_name': 'Eiffel',
    '_pattern': '.*\\.e$',
    '_icon': '/icons/eiffel.svg'
  },
  {
    '_name': 'Emacs',
    '_pattern': '^\\.emacs.*$',
    '_icon': '/icons/emacs.svg'
  },
  {
    '_name': 'Emacs Lisp',
    '_pattern': '^.*\\.(el|elc)$',
    '_icon': '/icons/emacs.svg'
  },
  {
    '_name': 'Ember CLI',
    '_pattern': '^\\.ember-cli$',
    '_icon': '/icons/ember.svg'
  },
  {
    '_name': 'Ember',
    '_pattern': '^\\.ember\\.json$',
    '_icon': '/icons/ember.svg'
  },
  {
    '_name': 'EJS',
    '_pattern': '.*\\.(ejs)$',
    '_icon': '/icons/ejs.svg'
  },
  {
    '_name': 'Elixir',
    '_pattern': '.*\\.(ex|exs|elixir)$',
    '_icon': '/icons/ex.svg'
  },
  {
    '_name': 'Elm',
    '_pattern': '.*\\.elm$',
    '_icon': '/icons/elm.svg'
  },
  {
    '_name': 'ESLint',
    '_pattern': '.*\\.(eslintrc|eslintignore)$',
    '_icon': '/icons/eslint.svg'
  },
  {
    '_name': 'ERB',
    '_pattern': '.*\\.(erb|ru)$',
    '_icon': '/icons/erb.svg'
  },
  {
    '_name': 'ErLang',
    '_pattern': '.*\\.(erc|erl|erlang)$',
    '_icon': '/icons/erlang.svg'
  },
  {
    '_name': 'Excel',
    '_pattern': '.*\\.(xls|xlsx|xlm|xlt|xlsb|odx)$',
    '_icon': '/icons/excel.svg'
  },
  {
    '_name': 'Favicon',
    '_pattern': '^favicon\\.(ico|png|jpg)$',
    '_icon': '/icons/favicon.svg'
  },
  {
    '_name': 'Finder',
    '_pattern': '^\\._*?MACOSX$',
    '_icon': '/icons/finder.svg'
  },
  {
    '_name': 'Firebase',
    '_pattern': '.*\\.(firebaserc)$',
    '_icon': '/icons/firebase.svg'
  },
  {
    '_name': 'Firebase JSON',
    '_pattern': '^firebase\\.json$',
    '_icon': '/icons/firebase.svg'
  },
  {
    '_name': 'Flash',
    '_pattern': '.*\\.(swf|flash)$',
    '_icon': '/icons/flash.svg'
  },
  {
    '_name': 'Flow',
    '_pattern': '.*\\.(flow|flowconfig)$',
    '_icon': '/icons/flow.svg'
  },
  {
    '_name': 'Fortran',
    '_pattern': '.*\\.(f77|f90)$',
    '_icon': '/icons/fortran.svg'
  },
  {
    '_name': 'FreeMarker',
    '_pattern': '.*\\.(ftl|freemarker)$',
    '_icon': '/icons/freemarker.svg'
  },
  {
    '_name': 'FSharp',
    '_pattern': '.*\\.(fs|fsi|fsx)$',
    '_icon': '/icons/fsharp.svg'
  },
  {
    '_name': 'Gatsby',
    '_pattern': '^gatsby\\.config\\.js',
    '_icon': '/icons/gatsby.svg'
  },
  {
    '_name': 'GhostScript',
    '_pattern': '.*\\.ghostscript$',
    '_icon': '/icons/ghostscript.svg'
  },
  {
    '_name': 'Gemfile',
    '_pattern': '^(G|g)emfile\\.lock$',
    '_icon': '/icons/gemfile.svg'
  },
  {
    '_name': 'Git',
    '_pattern': '^\\.git.*',
    '_icon': '/icons/git.svg'
  },
  {
    '_name': 'Go',
    '_pattern': '.*\\.(go|gohtml)$',
    '_icon': '/icons/go.svg'
  },
  {
    '_name': 'Godot',
    '_pattern': '.*\\.gd$',
    '_icon': '/icons/godot.svg'
  },
  {
    '_name': 'Gradle',
    '_pattern': '.*\\.gradle$',
    '_icon': '/icons/gradle.svg'
  },
  {
    '_name': 'Gradlew',
    '_pattern': 'gradlew$',
    '_icon': '/icons/gradle.svg'
  },
  {
    '_name': 'GraphQL',
    '_pattern': '.*\\.(gql|graphql)$',
    '_icon': '/icons/graphql.svg'
  },
  {
    '_name': 'Graphviz',
    '_pattern': '.*\\.(dot|graphviz)$',
    '_icon': '/icons/graphviz.svg'
  },
  {
    '_name': 'Groovy',
    '_pattern': '.*\\.(gy|gdsl|groovy)$',
    '_icon': '/icons/groovy.svg'
  },
  {
    '_name': 'Grunt',
    '_pattern': '(g|G)runtfile.*',
    '_icon': '/icons/gruntfile.svg'
  },
  {
    '_name': 'Gulp',
    '_pattern': '(g|G)ulpfile.*',
    '_icon': '/icons/gulpfile.svg'
  },
  {
    '_name': 'H',
    '_pattern': '.*\\.(objh|h)$',
    '_icon': '/icons/hh.svg'
  },
  {
    '_name': 'Hack',
    '_pattern': '.*\\.(hhconfig|hh)$',
    '_icon': '/icons/hack.svg'
  },
  {
    '_name': 'HAML',
    '_pattern': '.*\\.haml$',
    '_icon': '/icons/haml.svg'
  },
  {
    '_name': 'Hashicorp',
    '_pattern': '.*\\.hcl$',
    '_icon': '/icons/hcl.svg'
  },
  {
    '_name': 'Haskell',
    '_pattern': '.*\\.(haskell|hs)$',
    '_icon': '/icons/haskell.svg'
  },
  {
    '_name': 'Haxe',
    '_pattern': '.*\\.(haxe|hx)$',
    '_icon': '/icons/haxe.svg'
  },
  {
    '_name': 'HTAccess',
    '_pattern': '.*\\.(htaccess|htpasswd)$',
    '_icon': '/icons/htaccess.svg'
  },
  {
    '_name': 'HTML',
    '_pattern': '.*\\.(html|htm)$',
    '_icon': '/icons/html.svg'
  },
  {
    '_name': 'i18n',
    '_pattern': '.*\\.(pot|po|mo)$',
    '_icon': '/icons/i18n.svg'
  },
  {
    '_name': 'IDEA',
    '_pattern': '.*\\.(iml|icls)$',
    '_icon': '/icons/idea.svg'
  },
  {
    '_name': 'Idris',
    '_pattern': '.*\\.(idr|idris)$',
    '_icon': '/icons/idris.svg'
  },
  {
    '_name': 'InDesign',
    '_pattern': '.*\\.(id|indl|indt|indb)$',
    '_icon': '/icons/indesign.svg'
  },
  {
    '_name': 'IO',
    '_pattern': '.*\\.(io)$',
    '_icon': '/icons/io.svg'
  },
  {
    '_name': 'Ionic',
    '_pattern': '.*\\.ionic\\.config$',
    '_icon': '/icons/ionic.svg'
  },
  {
    '_name': 'J',
    '_pattern': '.*\\.(ijs)$',
    '_icon': '/icons/j.svg'
  },
  {
    '_name': 'Jade/Pug',
    '_pattern': '.*\\.(jade|pug)$',
    '_icon': '/icons/pug.svg'
  },
  {
    '_name': 'Jekyll',
    '_pattern': '^_config\\.yml$',
    '_icon': '/icons/jekyll.svg'
  },
  {
    '_name': 'Jenkins',
    '_pattern': '^(j|J)enkinsfile.*',
    '_icon': '/icons/jenkins.svg'
  },
  {
    '_name': 'Jest',
    '_pattern': '^jest\\.config.*',
    '_icon': '/icons/jest.svg'
  },
  {
    '_name': 'Jinja',
    '_pattern': '.*\\.(jinja2?|j2|jnj2?)$',
    '_icon': '/icons/jinja.svg'
  },
  {
    '_name': 'Joomla',
    '_pattern': '.*\\.smarty$',
    '_icon': '/icons/joomla.svg'
  },
  {
    '_name': 'jQuery',
    '_pattern': 'jquery.*\\.js',
    '_icon': '/icons/jquery.svg'
  },
  {
    '_name': 'JS Map',
    '_pattern': '.*\\.js\\.map$',
    '_icon': '/icons/jsmap.svg'
  },
  {
    '_name': 'JSP',
    '_pattern': '.*\\.(jsp|jsf|jspx)',
    '_icon': '/icons/jsp.svg'
  },
  {
    '_name': 'Julia',
    '_pattern': '.*\\.(julia|jl)$',
    '_icon': '/icons/julia.svg'
  },
  {
    '_name': 'Jupyter Notebook',
    '_pattern': '.*\\.ipynb$',
    '_icon': '/icons/jupyter.svg'
  },
  {
    '_name': 'Karma',
    '_pattern': '^karma\\.conf.*',
    '_icon': '/icons/karma.svg'
  },
  {
    '_name': 'Knockout',
    '_pattern': '.*\\.(knockout|ko)$',
    '_icon': '/icons/knockout.svg'
  },
  {
    '_name': 'Kotlin',
    '_pattern': '.*\\.(kt|kts|kotlin)$',
    '_icon': '/icons/kotlin.svg'
  },
  {
    '_name': 'Lerna',
    '_pattern': '^lerna\\.json$',
    '_icon': '/icons/lerna.svg'
  },
  {
    '_name': 'Less',
    '_pattern': '.*\\.less$',
    '_icon': '/icons/less.svg'
  },
  {
    '_name': 'LICENSE',
    '_pattern': '^(license|LICENSE).*',
    '_icon': '/icons/license.svg'
  },
  {
    '_name': 'LICENCE',
    '_pattern': '^(licence|LICENCE).*',
    '_icon': '/icons/license.svg'
  },
  {
    '_name': 'Liquid',
    '_pattern': '.*\\.liquid$',
    '_icon': '/icons/liquid.svg'
  },
  {
    '_name': 'LISP',
    '_pattern': '.*\\.lisp$',
    '_icon': '/icons/lisp.svg'
  },
  {
    '_name': 'Log',
    '_pattern': '.*\\.log([0-9])?',
    '_icon': '/icons/log.svg'
  },
  {
    '_name': 'LSL',
    '_pattern': '.*\\.lsl',
    '_icon': '/icons/lsl.svg'
  },
  {
    '_name': 'Lua',
    '_pattern': '.*\\.lua$',
    '_icon': '/icons/lua.svg'
  },
  {
    '_name': 'Magento',
    '_pattern': '.*\\.mage$',
    '_icon': '/icons/magento.svg'
  },
  {
    '_name': 'Makefile',
    '_pattern': '.*\\.?(m|M)akefile$',
    '_icon': '/icons/makefile.svg'
  },
  {
    '_name': 'Manpage',
    '_pattern': '.*\\.man([1-8])?$',
    '_icon': '/icons/manpage.svg'
  },
  {
    '_name': 'Markdown',
    '_pattern': '.*\\.(md|markdown|mson)$',
    '_icon': '/icons/markdown.svg'
  },
  {
    '_name': 'Markup',
    '_pattern': '.*\\.(shtml|dhtml|dtd)$',
    '_icon': '/icons/markup.svg'
  },
  {
    '_name': 'Mathematica',
    '_pattern': '.*\\.(nb|ma|mb|cdf)$',
    '_icon': '/icons/mathematica.svg'
  },
  {
    '_name': 'Matlab',
    '_pattern': '.*\\.matlab$',
    '_icon': '/icons/matlab.svg'
  },
  {
    '_name': 'Maven',
    '_pattern': '^pom\\.xml$',
    '_icon': '/icons/maven.svg'
  },
  {
    '_name': 'Maya',
    '_pattern': '.*\\.(maya|mel)$',
    '_icon': '/icons/maya.svg'
  },
  {
    '_name': 'Mercurial',
    '_pattern': '.*\\.hg$',
    '_icon': '/icons/mercurial.svg'
  },
  {
    '_name': 'Meteor',
    '_pattern': '.*\\.meteor$',
    '_icon': '/icons/meteor.svg'
  },
  {
    '_name': 'MJML',
    '_pattern': '.*\\.mjml$',
    '_icon': '/icons/mjml.svg'
  },
  {
    '_name': 'Mocha',
    '_pattern': '^(mocha\\.opts|\\.mocharc)$',
    '_icon': '/icons/mocha.svg'
  },
  {
    '_name': 'Mocha JSON',
    '_pattern': '^\\.mocha\\.(js|json|yml)$',
    '_icon': '/icons/mocha.svg'
  },
  {
    '_name': 'Mongodb',
    '_pattern': '.*\\.(mongodb|bson)$',
    '_icon': '/icons/mongodb.svg'
  },
  {
    '_name': 'Mustache',
    '_pattern': '.*\\.(mustache|handlebars|hbs|hamlbars)$',
    '_icon': '/icons/mustache.svg'
  },
  {
    '_name': 'nginx',
    '_pattern': '.*\\.(nginx|conf)$',
    '_icon': '/icons/nginx.svg'
  },
  {
    '_name': 'Nib',
    '_pattern': '.*\\.nib$',
    '_icon': '/icons/nib.svg'
  },
  {
    '_name': 'Nimble',
    '_pattern': '.*\\.(nim|nimble)$',
    '_icon': '/icons/nim.svg'
  },
  {
    '_name': 'Node',
    '_pattern': '^(server|app)\\.(js|ts|es6)$',
    '_icon': '/icons/nodejs.svg'
  },
  {
    '_name': 'Node Version',
    '_pattern': '^\\.node-version$',
    '_icon': '/icons/nodejs.svg'
  },
  {
    '_name': 'Nodemon',
    '_pattern': '.*\\.nodemon\\.(js|json)$',
    '_icon': '/icons/nodemon.svg'
  },
  {
    '_name': 'Note',
    '_pattern': '.*\\.(scratch|note)$',
    '_icon': '/icons/note.svg'
  },
  {
    '_name': 'NPM',
    '_pattern': '^package\\.json$',
    '_icon': '/icons/npm.svg'
  },
  {
    '_name': 'NPM lock',
    '_pattern': '^package-lock\\.json$',
    '_icon': '/icons/lock.svg'
  },
  {
    '_name': 'NPMFiles',
    '_pattern': '^\\.(npmignore|npmrc)$',
    '_icon': '/icons/npm.svg'
  },
  {
    '_name': 'NSIS',
    '_pattern': '.*\\.nsis?$',
    '_icon': '/icons/nsis.svg'
  },
  {
    '_name': 'NVM',
    '_pattern': '.*\\.nvmrc$',
    '_icon': '/icons/nodejs.svg'
  },
  {
    '_name': 'Nuclide',
    '_pattern': '.*\\.nuclide$',
    '_icon': '/icons/nuclide.svg'
  },
  {
    '_name': 'NuGet',
    '_pattern': '.*\\.nuspec$',
    '_icon': '/icons/nuget.svg'
  },
  {
    '_name': 'Objective-C',
    '_pattern': '.*\\.mm?$',
    '_icon': '/icons/objc.svg'
  },
  {
    '_name': 'OCaml',
    '_pattern': '.*\\.(ocaml|ml|mli|ocamllex|ocamlyacc)$',
    '_icon': '/icons/ocaml.svg'
  },
  {
    '_name': 'Pascal',
    '_pattern': '.*\\.(pas|pascal)$',
    '_icon': '/icons/pascal.svg'
  },
  {
    '_name': 'Patch',
    '_pattern': '.*\\.(patch|meld)$',
    '_icon': '/icons/patch.svg'
  },
  {
    '_name': 'Perl',
    '_pattern': '.*\\.(perl|pl|pm)$',
    '_icon': '/icons/perl.svg'
  },
  {
    '_name': 'Perforce',
    '_pattern': '^\\.p4ignore$',
    '_icon': '/icons/p4.svg'
  },
  {
    '_name': 'Phalcon',
    '_pattern': '.*\\.volt$',
    '_icon': '/icons/phalcon.svg'
  },
  {
    '_name': 'Photoshop',
    '_pattern': '.*\\.(psb|psd)$',
    '_icon': '/icons/psd.svg'
  },
  {
    '_name': 'PHPUnit',
    '_pattern': '.*(t|T)est\\.php$',
    '_icon': '/icons/phpunit.svg'
  },
  {
    '_name': 'PHTML',
    '_pattern': '.*\\.phtml$',
    '_icon': '/icons/phtml.svg'
  },
  {
    '_name': 'Pipfile',
    '_pattern': 'Pipfile$',
    '_icon': '/icons/pipfile.svg'
  },
  {
    '_name': 'Pipfile.lock',
    '_pattern': 'Pipfile\\.lock$',
    '_icon': '/icons/lock.svg'
  },
  {
    '_name': 'Play',
    '_pattern': '.*\\.play$',
    '_icon': '/icons/play.svg'
  },
  {
    '_name': 'PList',
    '_pattern': '.*\\.plist$',
    '_icon': '/icons/plist.svg'
  },
  {
    '_name': 'PostCSS',
    '_pattern': '.*\\.(pcss|postcss)$',
    '_icon': '/icons/postcss.svg'
  },
  {
    '_name': 'PostCSS Config',
    '_pattern': '^(\\.postcssrc|postcss\\.config\\.js(on)?)$',
    '_icon': '/icons/postcss.svg'
  },
  {
    '_name': 'PostScript',
    '_pattern': '.*\\.(ps|eps)$',
    '_icon': '/icons/postscript.svg'
  },
  {
    '_name': 'Polymer',
    '_pattern': '^polymer\\.json',
    '_icon': '/icons/polymer.svg'
  },
  {
    '_name': 'Powerpoint',
    '_pattern': '.*\\.(ppt|pptx|pps|ppsx)$',
    '_icon': '/icons/powerpoint.svg'
  },
  {
    '_name': 'PowerShell',
    '_pattern': '.*\\.(powershell|ps1|cmd)$',
    '_icon': '/icons/powershell.svg'
  },
  {
    '_name': 'Premiere',
    '_pattern': '.*\\.(prel|prproj|psq)$',
    '_icon': '/icons/premiere.svg'
  },
  {
    '_name': 'Prettier',
    '_pattern': '^(\\.prettierrc|prettier\\.config\\.js(on)?)$',
    '_icon': '/icons/prettier.svg'
  },
  {
    '_name': 'Prettier Config',
    '_pattern': '^\\.prettier\\.(js|json)$',
    '_icon': '/icons/prettier.svg'
  },
  {
    '_name': 'Procfile',
    '_pattern': '^(P|p)rocfile(\\.windows)?$',
    '_icon': '/icons/procfile.svg'
  },
  {
    '_name': 'Prolog',
    '_pattern': '.*\\.(pro|prolog)$',
    '_icon': '/icons/prolog.svg'
  },
  {
    '_name': 'Properties',
    '_pattern': '.*\\.properties$',
    '_icon': '/icons/source.svg'
  },
  {
    '_name': 'Protractor',
    '_pattern': '^protractor\\.js(on)?$',
    '_icon': '/icons/protractor.svg'
  },
  {
    '_name': 'Puppet',
    '_pattern': '.*\\.(puppet|pp|epp)$',
    '_icon': '/icons/puppet.svg'
  },
  {
    '_name': 'PureScript',
    '_pattern': '.*\\.(purescript|purs)$',
    '_icon': '/icons/purescript.svg'
  },
  {
    '_name': 'R',
    '_pattern': '.*\\.r$',
    '_icon': '/icons/r.svg'
  },
  {
    '_name': 'Racket',
    '_pattern': '.*\\.rkt',
    '_icon': '/icons/racket.svg'
  },
  {
    '_name': 'Raml',
    '_pattern': '.*\\.raml$',
    '_icon': '/icons/raml.svg'
  },
  {
    '_name': 'Rails',
    '_pattern': '^rails$',
    '_icon': '/icons/rails.svg'
  },
  {
    '_name': 'Rake',
    '_pattern': '.*rake$',
    '_icon': '/icons/rake.svg'
  },
  {
    '_name': 'Rakefile',
    '_pattern': 'Rakefile',
    '_icon': '/icons/rake.svg'
  },
  {
    '_name': 'Razor',
    '_pattern': '.*\\.cshtml$',
    '_icon': '/icons/razor.svg'
  },
  {
    '_name': 'RDoc',
    '_pattern': '.*\\.rdoc$',
    '_icon': '/icons/rdoc.svg'
  },
  {
    '_name': 'React',
    '_pattern': '.*\\.react-cli$',
    '_icon': '/icons/react.svg'
  },
  {
    '_name': 'ReasonML',
    '_pattern': '.*\\.rei?',
    '_icon': '/icons/reason.svg'
  },
  {
    '_name': 'Red',
    '_pattern': '.*\\.red?',
    '_icon': '/icons/red.svg'
  },
  {
    '_name': 'Redis',
    '_pattern': '^redis.*',
    '_icon': '/icons/redis.svg'
  },
  {
    '_name': 'Redux Action',
    '_pattern': '.*(a|A)ctions?\\.(js|ts)$',
    '_icon': '/icons/redux-action.svg'
  },
  {
    '_name': 'Redux Reducer',
    '_pattern': '.*(r|R)educer\\.(js|ts)$',
    '_icon': '/icons/redux-reducer.svg'
  },
  {
    '_name': 'Redux Store',
    '_pattern': '.*(s|S)tore\\.(js|ts)$',
    '_icon': '/icons/redux-store.svg'
  },
  {
    '_name': 'Restructured',
    '_pattern': '.*\\.rst$',
    '_icon': '/icons/rst.svg'
  },
  {
    '_name': 'Riot',
    '_pattern': '.*\\.riot$',
    '_icon': '/icons/riot.svg'
  },
  {
    '_name': 'Robot',
    '_pattern': '.*\\.robot$',
    '_icon': '/icons/robot.svg'
  },
  {
    '_name': 'Rollup',
    '_pattern': '^rollup.*',
    '_icon': '/icons/rollup.svg'
  },
  {
    '_name': 'RSpec',
    '_pattern': '.*_spec\\.rb$',
    '_icon': '/icons/rspec.svg'
  },
  {
    '_name': 'RSpec Config',
    '_pattern': '.*\\.rspec$',
    '_icon': '/icons/rspec.svg'
  },
  {
    '_name': 'Rubocop',
    '_pattern': '.*\\.rubocop.*\\.yml$',
    '_icon': '/icons/rubocop.svg'
  },
  {
    '_name': 'Ruby Gemset',
    '_pattern': '^\\.ruby-gemset$',
    '_icon': '/icons/gemfile.svg'
  },
  {
    '_name': 'Ruby Version',
    '_pattern': '^\\.ruby-version$',
    '_icon': '/icons/ruby.svg'
  },
  {
    '_name': 'Rust',
    '_pattern': '.*\\.(rs|rust)$',
    '_icon': '/icons/rust.svg'
  },
  {
    '_name': 'RVM',
    '_pattern': '^\\.rvmrc$',
    '_icon': '/icons/ruby.svg'
  },
  {
    '_name': 'SASS',
    '_pattern': '.*\\.sass$',
    '_icon': '/icons/sass.svg'
  },
  {
    '_name': 'SBT',
    '_pattern': '.*\\.sbt$',
    '_icon': '/icons/sbt.svg'
  },
  {
    '_name': 'Scala',
    '_pattern': '.*\\.scala$',
    '_icon': '/icons/scala.svg'
  },
  {
    '_name': 'SCSS',
    '_pattern': '.*\\.scss$',
    '_icon': '/icons/sass.svg'
  },
  {
    '_name': 'Scheme',
    '_pattern': '.*\\.(scheme|scm)$',
    '_icon': '/icons/scheme.svg'
  },
  {
    '_name': 'Settings',
    '_pattern': '.*\\.settings$',
    '_icon': '/icons/settings.svg'
  },
  {
    '_name': 'Shell',
    '_pattern': '.*\\.(sh|zsh|fish|bash|fishrc|zshrc|bashrc)$',
    '_icon': '/icons/shell.svg'
  },
  {
    '_name': 'Sketch',
    '_pattern': '.*\\.sketch$',
    '_icon': '/icons/sketch.svg'
  },
  {
    '_name': 'Slim',
    '_pattern': '.*\\.slim$',
    '_icon': '/icons/slim.svg'
  },
  {
    '_name': 'Smarty',
    '_pattern': '.*\\.tpl$',
    '_icon': '/icons/smarty.svg'
  },
  {
    '_name': 'Solidity',
    '_pattern': '.*\\.sol$',
    '_icon': '/icons/solidity.svg'
  },
  {
    '_name': 'Sonar',
    '_pattern': '.*\\.sonarrc$',
    '_icon': '/icons/sonar.svg'
  },
  {
    '_name': 'Spring',
    '_pattern': '.*\\.spring$',
    '_icon': '/icons/spring.svg'
  },
  {
    '_name': 'SQL',
    '_pattern': '.*\\.(sql|pgsql|mysql|hql|qml)$',
    '_icon': '/icons/sql.svg'
  },
  {
    '_name': 'SQLite',
    '_pattern': '.*\\.sqlite3?$',
    '_icon': '/icons/sqlite.svg'
  },
  {
    '_name': 'Stata',
    '_pattern': '.*\\.stata$',
    '_icon': '/icons/stata.svg'
  },
  {
    '_name': 'Stencil',
    '_pattern': '^stencil\\.config\\.(js|ts)$',
    '_icon': '/icons/stencil.svg'
  },
  {
    '_name': 'Storybook',
    '_pattern': '.*\\.(story|stories)\\.(jsx?|tsx?)$',
    '_icon': '/icons/storybook.svg'
  },
  {
    '_name': 'Stylelint',
    '_pattern': '^(\\.stylelintrc|stylelint\\.config\\.js(on)?)$',
    '_icon': '/icons/stylelint.svg'
  },
  {
    '_name': 'Stylus',
    '_pattern': '.*\\.styl$',
    '_icon': '/icons/stylus.svg'
  },
  {
    '_name': 'Sublime',
    '_pattern': '.*\\.sublime.*',
    '_icon': '/icons/sublime.svg'
  },
  {
    '_name': 'SuperCollider',
    '_pattern': '.*\\.scd$',
    '_icon': '/icons/scd.svg'
  },
  {
    '_name': 'SVN',
    '_pattern': '^\\.svn',
    '_icon': '/icons/svn.svg'
  },
  {
    '_name': 'Swagger',
    '_pattern': '.*\\.(swagger|swag)$',
    '_icon': '/icons/swagger.svg'
  },
  {
    '_name': 'Swagger Config',
    '_pattern': '((swagger|api)\\.(yml|yaml|json))$',
    '_icon': '/icons/swagger.svg'
  },
  {
    '_name': 'Swift',
    '_pattern': '.*\\.swift$',
    '_icon': '/icons/swift.svg'
  },
  {
    '_name': 'Swig',
    '_pattern': '.*\\.swig$',
    '_icon': '/icons/swig.svg'
  },
  {
    '_name': 'Symfony',
    '_pattern': '.*\\.symfony',
    '_icon': '/icons/symfony.svg'
  },
  {
    '_name': 'Tailwind CSS Config',
    '_pattern': '^tailwind.*\\.[jt]s$',
    '_icon': '/icons/tailwindcss.svg'
  },
  {
    '_name': 'TCL',
    '_pattern': '.*\\.tcl$',
    '_icon': '/icons/tcl.svg'
  },
  {
    '_name': 'TerraForm',
    '_pattern': '.*\\.tf$',
    '_icon': '/icons/terraform.svg'
  },
  {
    '_name': 'TeX',
    '_pattern': '.*\\.tex$',
    '_icon': '/icons/tex.svg'
  },
  {
    '_name': 'Tern',
    '_pattern': '.*\\.tern-(config|project)$',
    '_icon': '/icons/tern.svg'
  },
  {
    '_name': 'Tern Config',
    '_pattern': '^\\.ternconfig$',
    '_icon': '/icons/tern.svg'
  },
  {
    '_name': 'Test Java',
    '_pattern': '(t|T)est\\.java$',
    '_icon': '/icons/testjava.svg'
  },
  {
    '_name': 'Test JS',
    '_pattern': '.*\\.?(test|spec)\\.(js|es6)$',
    '_icon': '/icons/testjs.svg'
  },
  {
    '_name': 'Test React',
    '_pattern': '.*\\.?(test|spec)\\.(jsx|tsx)$',
    '_icon': '/icons/testreact.svg'
  },
  {
    '_name': 'Test Python',
    '_pattern': '.*\\.(test|spec)\\.py$',
    '_icon': '/icons/testpy.svg'
  },
  {
    '_name': 'Test Ruby',
    '_pattern': '_(test|spec)\\.rb$',
    '_icon': '/icons/testruby.svg'
  },
  {
    '_name': 'Test TypeScript',
    '_pattern': '.*\\.?(test|spec)\\.ts$',
    '_icon': '/icons/testts.svg'
  },
  {
    '_name': 'Textile',
    '_pattern': '.*\\.textile$',
    '_icon': '/icons/textile.svg'
  },
  {
    '_name': 'Textmate',
    '_pattern': '.*\\.(tmPreferences|tmTheme)',
    '_icon': '/icons/textmate.svg'
  },
  {
    '_name': 'Tomcat',
    '_pattern': '^tomcat.*',
    '_icon': '/icons/tomcat.svg'
  },
  {
    '_name': 'TOML',
    '_pattern': '.*\\.toml$',
    '_icon': '/icons/toml.svg'
  },
  {
    '_name': 'TODO',
    '_pattern': '^TODO',
    '_icon': '/icons/todo.svg'
  },
  {
    '_name': 'Travis',
    '_pattern': '.*\\.travis\\.yml$',
    '_icon': '/icons/travis.svg'
  },
  {
    '_name': 'Turing',
    '_pattern': '.*\\.t$',
    '_icon': '/icons/turing.svg'
  },
  {
    '_name': 'Twig',
    '_pattern': '.*\\.twig$',
    '_icon': '/icons/twig.svg'
  },
  {
    '_name': 'Typescript Defs',
    '_pattern': '.*\\.d\\.ts$',
    '_icon': '/icons/dts.svg'
  },
  {
    '_name': 'Typings',
    '_pattern': '^typings\\.json$',
    '_icon': '/icons/typings.svg'
  },
  {
    '_name': 'Unreal',
    '_pattern': '.*\\.(u|unr|utx|umx|uax|ukx|uz|upkg|uc|upl|obj|asc|lwo)$',
    '_icon': '/icons/unreal.svg'
  },
  {
    '_name': 'Vagrant',
    '_pattern': '^(V|v)agrantfile$',
    '_icon': '/icons/vagrant.svg'
  },
  {
    '_name': 'VERSION',
    '_pattern': '^(VERSION|version)$',
    '_icon': '/icons/version.svg'
  },
  {
    '_name': 'VHDL',
    '_pattern': '.*\\.(vhdl|vhd|v)$',
    '_icon': '/icons/vhdl.svg'
  },
  {
    '_name': 'Vim',
    '_pattern': '.*\\.(vim|viml|vimrc|gvimrc)$',
    '_icon': '/icons/vim.svg'
  },
  {
    '_name': 'Visio',
    '_pattern': '.*\\.visio$',
    '_icon': '/icons/visio.svg'
  },
  {
    '_name': 'Visual Studio',
    '_pattern': '.*\\.(vscode|vssettings)$',
    '_icon': '/icons/vs.svg'
  },
  {
    '_name': 'Vue',
    '_pattern': '.*\\.(vue|vuex)$',
    '_icon': '/icons/vue.svg'
  },
  {
    '_name': 'Wallaby',
    '_pattern': '^wallaby.*',
    '_icon': '/icons/wallaby.svg'
  },
  {
    '_name': 'Webpack',
    '_pattern': '^webpack\\.(common|config|dev|prod)\\.(js|es|es6|coffee|ts)$',
    '_icon': '/icons/webpack.svg'
  },
  {
    '_name': 'Windows',
    '_pattern': '.*\\.(bat|exe|dos|ms)$',
    '_icon': '/icons/windows.svg'
  },
  {
    '_name': 'Xamarin',
    '_pattern': '.*\\.xamarin',
    '_icon': '/icons/xamarin.svg'
  },
  {
    '_name': 'XCode',
    '_pattern': '.*\\.xcodeproj$',
    '_icon': '/icons/appstore.svg'
  },
  {
    '_name': 'XCode Playground',
    '_pattern': '.*\\.xcplayground$',
    '_icon': '/icons/appstore.svg'
  },
  {
    '_name': 'XCode Workspace',
    '_pattern': '.*\\.xcworkspacedata$',
    '_icon': '/icons/appstore.svg'
  },
  {
    '_name': 'XCode Storyboard',
    '_pattern': '.*\\.storyboard$',
    '_icon': '/icons/appstore.svg'
  },
  {
    '_name': 'Yarn',
    '_pattern': '(\\.yarnrc|yarn.js(on)?)',
    '_icon': '/icons/yarn.svg'
  },
  {
    '_name': 'Yarn Clean',
    '_pattern': '^\\.yarnclean$',
    '_icon': '/icons/yarn.svg'
  },
  {
    '_name': 'Binary',
    '_pattern': '^[^.]+$',
    '_icon': '/icons/binary.svg'
  },
  {
    '_name': 'Font',
    '_pattern': '.*\\.(ttf|ttc|pfb|pfm|otf|dfont|pfa|afm|eot|woff2?)$',
    '_icon': '/icons/font.svg'
  },
  {
    '_name': 'XML',
    '_pattern': '.*\\.(xml|xhtml|fxml|jrxml|jnlp|pom|rng|tld|wsdl|xsd|xsl|xslt|xul)$',
    '_icon': '/icons/xml.svg'
  },
  {
    '_name': 'YAML',
    '_pattern': '.*\\.(yml|yaml|info)$',
    '_icon': '/icons/yaml.svg'
  },
  {
    '_name': 'Javascript Minified',
    '_pattern': '.*\\.min\\.(js|es6|es|jsx|ts)$',
    '_icon': '/icons/jsmin.svg'
  },
  {
    '_name': 'Java',
    '_pattern': '.*\\.(java|jar|war)$',
    '_icon': '/icons/java.svg'
  },
  {
    '_name': 'JSX',
    '_pattern': '.*\\.(jsx|tsx)$',
    '_icon': '/icons/jsx.svg'
  },
  {
    '_name': 'TypeScript',
    '_pattern': '.*\\.(ts|tsx|tslint)$',
    '_icon': '/icons/typeScript.svg'
  },
  {
    '_name': 'Javascript',
    '_pattern': '.*\\.(js|es6|es)$',
    '_icon': '/icons/js.svg'
  },
  {
    '_name': 'Python',
    '_pattern': '.*\\.(py|python)$',
    '_icon': '/icons/python.svg'
  },
  {
    '_name': 'Ruby',
    '_pattern': '.*\\.rb$',
    '_icon': '/icons/ruby.svg'
  },
  {
    '_name': 'PHP',
    '_pattern': '.*\\.(php|phps)$',
    '_icon': '/icons/php.svg'
  },
  {
    '_name': 'Any',
    '_pattern': '',
    '_icon': '/icons/default.svg'
  }
];
