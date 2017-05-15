define('public/components/App.vue', function(require, exports, module) {

  'use strict';
  
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
  
  module.exports = {
    data: function data() {
      return {
        message: 'Hi, I\'m vue.'
      };
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h2',[_vm._v(_vm._s(_vm.message))])}
  __vue__options__.staticRenderFns =[]
  

});
