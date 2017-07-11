define('public/components/user/welcome.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _welcomeSlide = require('public/components/user/welcomeSlide.vue');
  
  var _welcomeSlide2 = _interopRequireDefault(_welcomeSlide);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    name: 'welcome',
    components: { welcomeSlide: _welcomeSlide2.default }
  }; //
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"l-wrap"},[_c('welcomeSlide',{staticClass:"l-slide"}),_vm._v(" "),_c('section',{staticClass:"c-button-group"},[_c('router-link',{staticClass:"c-button l-button--full",attrs:{"to":"/userRegister"}},[_vm._v("创建账户")]),_vm._v(" "),_c('router-link',{staticClass:"c-button l-button--full button--login",attrs:{"to":"/userLogin"}},[_vm._v("登录")])],1)],1)}
  __vue__options__.staticRenderFns =[]
  __vue__options__._scopeId = "_v-2ea9ab8b"
  

});
