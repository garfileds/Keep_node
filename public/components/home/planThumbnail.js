define('public/components/home/planThumbnail.vue', function(require, exports, module) {

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
  
  module.exports = {
    props: ['plan'],
  
    data: function data() {
      return {
        colorStyle: {
          'background-color': this.plan.color
        }
      };
    },
  
    computed: {
      progressStyle: function progressStyle() {
        var doneRatio = Math.ceil(this.plan.progress.done.length / this.plan.progress.marked.length * 100);
        return {
          'background-color': this.plan.progress_color,
          width: doneRatio + '%'
        };
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plan",style:(_vm.colorStyle)},[_c('div',{staticClass:"plan__progress",style:(_vm.progressStyle)}),_vm._v(" "),_c('div',{staticClass:"plan__content"},[_c('p',{staticClass:"plan__content__name"},[_vm._v("\n      "+_vm._s(_vm.plan.name)+"\n    ")]),_vm._v(" "),_c('p',{staticClass:"plan__content__next"},[_vm._v("\n      下一次：05/18/2017\n    ")])]),_vm._v(" "),_vm._m(0)])}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plan__badge"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/Bulbasaur.png","alt":"Bulbasaur"}})])}]
  

});
