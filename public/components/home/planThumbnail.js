define('public/components/home/planThumbnail.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _utils = require('public/js/module/utils');
  
  exports.default = {
    name: 'planThumbnail',
  
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
      },
      nextDay: function nextDay() {
        var baseDate = new Date(this.plan.progress.start_day),
            today = new Date((0, _utils.formatDate)(new Date())),
            timeOfDay = 24 * 60 * 60 * 1000,
            marked = this.plan.progress.marked;
  
        var i = 0,
            tempDate = void 0;
        while (i < marked.length) {
          tempDate = new Date(this.plan.progress.start_day);
          tempDate.setDate(baseDate.getDate() + marked[i] - 1);
  
          if (today.getTime() - tempDate.getTime() <= timeOfDay && this.plan.progress.done.indexOf(marked[i]) === -1) {
            break;
          }
  
          i++;
        }
        return (0, _utils.formatDate)(tempDate, 'mm/dd/yy');
      }
    },
  
    methods: {
      catPlan: function catPlan() {
        router.push('/planDetail/' + this.plan.id);
      }
    }
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plan",style:(_vm.colorStyle),on:{"click":function($event){$event.stopPropagation();_vm.catPlan($event)}}},[_c('div',{staticClass:"plan__progress",style:(_vm.progressStyle)}),_vm._v(" "),_c('div',{staticClass:"plan__content"},[_c('p',{staticClass:"plan__content__name"},[_vm._v("\n      "+_vm._s(_vm.plan.title)+"\n    ")]),_vm._v(" "),_c('p',{staticClass:"plan__content__next"},[_vm._v("\n      下一次："+_vm._s(_vm.nextDay)+"\n    ")])]),_vm._v(" "),_vm._m(0)])}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"plan__badge"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/Bulbasaur.png","alt":"Bulbasaur"}})])}]
  

});
