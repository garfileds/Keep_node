define('public/components/App.vue', function(require, exports, module) {

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
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  exports.default = {
    name: 'App',
  
    computed: _extends({}, (0, _vuex.mapState)(['loading', 'plans']))
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('keep-alive',[(_vm.$route.meta.keepAlive)?_c('router-view'):_vm._e()],1),_vm._v(" "),(!_vm.$route.meta.keepAlive)?_c('router-view'):_vm._e(),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading.isLoading),expression:"loading.isLoading"}],staticClass:"c-loader l-loader"},[_vm._m(0),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.loading.tip))])])],1)}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-loader__content pacman"},[_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div')])}]
  __vue__options__._scopeId = "_v-9c5af8b7"
  

});
