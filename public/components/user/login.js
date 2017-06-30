define('public/components/user/login.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
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
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  var _async = require('public/js/module/async');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var apiPostToken = '/api/user/token';
  
  exports.default = {
    name: 'userLogin',
    data: function data() {
      return {
        email: '',
        password: '',
  
        //以后写表单验证插件的配置项
        validRule: {
          submitEl: '#btnLogin',
          submitHandler: 'submitLoginHandler',
          msgAlert: 'alert',
          rules: {
            email: [{
              pattern: 'required',
              errMsg: '邮箱不能为空'
            }, {
              pattern: /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
              errMsg: '请输入有效的邮箱格式'
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
          ruleValidFn = function ruleValidFn(field, rule, resolveMsgAlert, next) {
            if (this[field].length > 0) {
              next();
            } else {
              resolveMsgAlert(this.validRule.msgAlert)(rule.errMsg);
              next({ err: rule.errMsg });
            }
          };
        } else if (rule.pattern instanceof RegExp) {
          ruleValidFn = function ruleValidFn(field, rule, resolveMsgAlert, next) {
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
        (0, _async.runQueue)(validQueue, function (fn, index, next) {
          return fn(next);
        }, function (error) {
          self[self.validRule.submitHandler](!error);
        });
      }, false);
    },
  
    methods: _extends({
      //以后写表单验证插件的接口，传入validateResult
      submitLoginHandler: function submitLoginHandler(validateResult) {
        var self = this;
  
        if (!validateResult) return;
  
        this.$http.post(apiPostToken, {
          email: self.email,
          password: self.password
        }).then(function (response) {
          if (response.status === 200) {
            _vue2.default.http.headers.common['Authorization'] = 'Bearer ' + response.body.token;
            self.changeNeedInit(true);
            self.initUser(response.body);
            router.push('/home');
          }
        }, function () {
          window.alert('用户名或密码不正确');
        });
      },
      navBack: function navBack() {
        router.go(-1);
      }
    }, (0, _vuex.mapMutations)(['changeNeedInit', 'initUser']))
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"main--bg"},[_c('header',{staticClass:"header l-grid"},[_c('div',{staticClass:"l-header__side l-grid__item--15"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return.svg","alt":"返回"},on:{"click":_vm.navBack}})])]),_vm._v(" "),_c('div',{staticClass:"l-wrap content"},[_c('section',{staticClass:"c-form"},[_vm._m(0),_vm._v(" "),_c('form',{staticClass:"c-form__content"},[_c('fieldset',{staticClass:"c-form__group"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],staticClass:"c-form__input c-form__input--group c-form__input--full",attrs:{"type":"email","placeholder":"邮箱地址"},domProps:{"value":(_vm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.email=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"c-form__input c-form__input--group c-form__input--full",attrs:{"type":"password","placeholder":"密码"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}})]),_vm._v(" "),_vm._m(1)])])])])}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-form__title"},[_c('p',{staticClass:"font--large"},[_vm._v("登录到Up!Up!")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"l-fieldset"},[_c('button',{staticClass:"c-button l-button--full",attrs:{"id":"btnLogin"}},[_vm._v("登录")])])}]
  __vue__options__._scopeId = "_v-441dc2a4"
  

});
