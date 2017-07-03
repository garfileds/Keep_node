define('public/components/user/setting.vue', function(require, exports, module) {

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
  
  var _setHttp = require('public/js/global/setHttp');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var apiDeleteToken = '/api/user/token';
  
  exports.default = {
    name: 'setting',
  
    data: function data() {
      return {
        loaderVisible: false
      };
    },
  
    computed: _extends({}, (0, _vuex.mapState)(['user', 'queueIsRunning'])),
  
    methods: _extends({
      logout: function logout() {
        var self = this;
  
        this.loaderVisible = true;
  
        //如果有更新未同步，先同步再登出
        this.stopSyncTimer();
        if (this.queueIsRunning) {
          var queryTimer = setInterval(function () {
            if (!self.queueIsRunning) {
              clearInterval(queryTimer);
              logoutHandler(self);
            }
          });
        } else {
          logoutHandler(self);
        }
      }
    }, (0, _vuex.mapMutations)(['clear']), (0, _vuex.mapActions)(['syncPlansOnce', 'stopSyncTimer', 'startSyncTimer']))
  };
  
  
  function logoutHandler(self) {
    self.syncPlansOnce(function (error) {
      if (error) {
        self.loaderVisible = false;
        alert('有些记录未同步成功，登出会丢失记录。');
        self.startSyncTimer();
        return;
      }
  
      self.$http.delete(apiDeleteToken).then(function (response) {
        if (response.status === 200) {
          self.loaderVisible = false;
  
          self.clear();
          (0, _setHttp.setJWT)('');
          router.push('/');
        }
      });
    });
  }
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('header',{staticClass:"header"},[_c('div',{staticClass:"l-box-shadow l-grid"},[_c('router-link',{staticClass:"l-header__side l-grid__item--1",attrs:{"to":"/home"}},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return_black.svg","alt":"返回"}})]),_vm._v(" "),_c('h1',{staticClass:"header__center l-grid__item--8"},[_vm._v("设置")])],1)]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('section',{staticClass:"c-info"},[_c('img',{staticClass:"c-info__avatar",attrs:{"src":"/images/avatar_default.jpg","alt":"默认头像：富贵儿与少奶奶"}}),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.user.nickname))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.user.email))])]),_vm._v(" "),_c('section',{staticClass:"c-list"},[_c('div',{staticClass:"c-list__item l-grid",on:{"click":_vm.logout}},[_vm._m(0),_vm._v(" "),_c('span',{staticClass:"c-list__content l-grid__item l-grid__item--8"},[_vm._v("登出")]),_vm._v(" "),_vm._m(1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loaderVisible),expression:"loaderVisible"}],staticClass:"c-loader l-loader"},[_vm._m(2),_vm._v(" "),_c('p',[_vm._v("正在登出，我们会同步你最后的更改...")])])])])}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"c-list__icon"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/logout.svg","alt":"登出"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"c-list__content c-list__icon l-grid__item l-grid__item--1"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return.svg","alt":"返回"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-loader__content pacman"},[_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div')])}]
  __vue__options__._scopeId = "_v-a1b48074"
  

});
