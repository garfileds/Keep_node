define('public/components/user/register.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  var _vue = require('node_modules/vue/dist/vue.runtime.common');
  
  var _vue2 = _interopRequireDefault(_vue);
  
  var _async = require('public/js/module/async');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var apiCreateUser = '/api/user',
      apiPostToken = '/api/user/token',
      apiGetEmailStatus = '/api/user/emailStatus';
  
  var isUsed = function isUsed(next) {
    var field = void 0,
        rule = void 0,
        resolveMsgAlert = void 0;
  
    var _Array$prototype$slic = Array.prototype.slice.call(arguments);
  
    var _Array$prototype$slic2 = _slicedToArray(_Array$prototype$slic, 4);
  
    field = _Array$prototype$slic2[0];
    rule = _Array$prototype$slic2[1];
    resolveMsgAlert = _Array$prototype$slic2[2];
    next = _Array$prototype$slic2[3];
  
  
    var self = this;
  
    _vue2.default.http.get(apiGetEmailStatus, {
      params: {
        email: self[field]
      }
    }).then(function (response) {
      if (response.body.isUsed) {
        resolveMsgAlert(self.validRule.msgAlert)(rule.errMsg);
        next({ error: rule.errMsg });
      } else {
        next();
      }
    });
  };
  
  exports.default = {
    name: 'userRegister',
    data: function data() {
      return {
        nickname: '',
        email: '',
        password: '',
  
        //以后写表单验证插件的配置项
        validRule: {
          submitEl: '#btnRegister',
          submitHandler: 'submitRegisterHandler',
          msgAlert: 'alert',
          rules: {
            nickname: [{
              pattern: 'required',
              errMsg: '昵称不能为空'
            }],
            email: [{
              pattern: 'required',
              errMsg: '邮箱不能为空'
            }, {
              pattern: /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
              errMsg: '请输入有效的邮箱格式哦'
            }, {
              pattern: isUsed,
              errMsg: '该邮箱已被注册'
            }],
            password: [{
              pattern: 'required',
              errMsg: '密码不能为空'
            }]
          }
        }
      };
    },
  
    //以后写表单验证插件的幕后工作
    mounted: function mounted() {
      var self = this,
          validQueue = [],
          fields = Object.keys(this.validRule.rules);
  
      var resolveMsgAlert = function resolveMsgAlert(alertConfig) {
        if (alertConfig === 'alert') {
          return alert.bind(window);
        } else if (typeof alertConfig === 'function') {
          return alertConfig;
        }
      };
  
      /**
       * @fn 对每一条rule生成验证函数
       * @param rule
       * @param field
       * @return rule的验证函数，每个函数的this与Vue实例绑定，并绑定了(field, rule)参数， 接受(next)参数
       */
      var ruleValidFnGene = function ruleValidFnGene(rule, field) {
        var ruleValidFn = void 0;
        if (rule.pattern === 'required') {
          ruleValidFn = function ruleValidFn(next) {
            var field = void 0,
                rule = void 0,
                resolveMsgAlert = void 0;
  
            var _Array$prototype$slic3 = Array.prototype.slice.call(arguments);
  
            var _Array$prototype$slic4 = _slicedToArray(_Array$prototype$slic3, 4);
  
            field = _Array$prototype$slic4[0];
            rule = _Array$prototype$slic4[1];
            resolveMsgAlert = _Array$prototype$slic4[2];
            next = _Array$prototype$slic4[3];
  
  
            if (this[field].length > 0) {
              next();
            } else {
              resolveMsgAlert(this.validRule.msgAlert)(rule.errMsg);
              next({ err: rule.errMsg });
            }
          };
        } else if (rule.pattern instanceof RegExp) {
          ruleValidFn = function ruleValidFn(next) {
            var field = void 0,
                rule = void 0,
                resolveMsgAlert = void 0;
  
            var _Array$prototype$slic5 = Array.prototype.slice.call(arguments);
  
            var _Array$prototype$slic6 = _slicedToArray(_Array$prototype$slic5, 4);
  
            field = _Array$prototype$slic6[0];
            rule = _Array$prototype$slic6[1];
            resolveMsgAlert = _Array$prototype$slic6[2];
            next = _Array$prototype$slic6[3];
  
  
            if (rule.pattern.test(this[field])) {
              next();
            } else {
              resolveMsgAlert(this.validRule.msgAlert)(rule.errMsg);
              next({ err: rule.errMsg });
            }
          };
        } else if (typeof rule.pattern === 'function') {
          ruleValidFn = rule.pattern;
        }
  
        return ruleValidFn.bind(self, field, rule, resolveMsgAlert);
      };
  
      fields.forEach(function (field) {
        self.validRule.rules[field].forEach(function (rule) {
          var ruleValidFn = ruleValidFnGene(rule, field);
  
          return validQueue.push(ruleValidFn);
        });
      });
  
      this.$el.querySelector(this.validRule.submitEl).addEventListener('click', function () {
        (0, _async.runQueue)(validQueue, function (fn, next) {
          return fn(next);
        }, function (error) {
          self[self.validRule.submitHandler](!error);
        });
      }, false);
    },
  
    methods: {
      //以后写表单验证插件的接口，传入validateResult
      submitRegisterHandler: function submitRegisterHandler(validateResult) {
        var self = this;
  
        if (!validateResult) return;
  
        this.$http.post(apiCreateUser, {
          nickname: self.nickname,
          email: self.email,
          password: self.password
        }).then(function (response) {
          if (response.status === 200) {
            self.$http.post(apiPostToken, {
              email: self.email,
              password: self.password
            }).then(function (response) {
              _vue2.default.http.headers.common['Authorization'] = 'Bearer ' + response.body.token;
              router.push('/home');
            });
          }
        });
      },
      navBack: function navBack() {
        router.go(-1);
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"main"},[_c('header',{staticClass:"header"},[_c('span',{staticClass:"header__side floatL"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return.svg","alt":"返回"},on:{"click":_vm.navBack}})])]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('section',{staticClass:"c-form"},[_vm._m(0),_vm._v(" "),_c('form',{staticClass:"c-form__content"},[_c('fieldset',{staticClass:"c-form__group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nickname),expression:"nickname"}],staticClass:"c-form__input c-form__input--group c-form__input--full",attrs:{"type":"text","placeholder":"昵称"},domProps:{"value":(_vm.nickname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nickname=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],staticClass:"c-form__input c-form__input--group c-form__input--full",attrs:{"type":"email","placeholder":"邮箱地址"},domProps:{"value":(_vm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.email=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"c-form__input c-form__input--group c-form__input--full",attrs:{"type":"password","placeholder":"密码"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}})])]),_vm._v(" "),_c('button',{staticClass:"button button--full",attrs:{"id":"btnRegister"}},[_vm._v("创建账户")])])])])}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-form__title"},[_c('p',{staticClass:"font--large"},[_vm._v("创建账户")]),_vm._v(" "),_c('p',{staticClass:"font--small font--secondary"},[_vm._v("创建账户，在所有设备上同步你的计划。")])])}]
  __vue__options__._scopeId = "_v-f6839639"
  

});
