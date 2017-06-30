define('public/components/plan/schedule2.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _utils = require('public/js/module/utils');
  
  exports.default = {
    props: ['startDay', 'days', 'marked', 'done', 'editable'],
  
    computed: {
      daysArr: function daysArr() {
        var i = 1,
            result = [];
  
        while (i <= this.days) {
          result.push(i++);
        }
  
        return result;
      },
      datesArr: function datesArr() {
        var baseDate = new Date(this.startDay),
            result = [],
            i = 0;
  
        result.push((0, _utils.formatDate)(baseDate, 'mm/dd'));
  
        while (i++ < this.days) {
          baseDate.setDate(baseDate.getDate() + 1);
          result.push((0, _utils.formatDate)(baseDate, 'mm/dd'));
        }
  
        return result;
      },
      overdue: function overdue() {
        var _this = this;
  
        var timeOfDay = 24 * 60 * 60 * 1000;
        var today = new Date((0, _utils.formatDate)(new Date()));
        return this.marked.filter(function (day) {
          var markedDate = new Date(_this.startDay);
          markedDate.setDate(markedDate.getDate() + day - 1);
  
          return today.getTime() - markedDate.getTime() >= timeOfDay;
        });
      },
      progressWidth: function progressWidth() {
        var doneRatio = Math.ceil(this.done.length / this.marked.length * 100);
        return {
          width: doneRatio + '%'
        };
      }
    },
  
    methods: {
      handleSelectDay: function handleSelectDay(event) {
        var targetEl = event.target,
            parent = void 0;
  
        if (!this.editable) return;
  
        if (targetEl.className.indexOf('.schedule__item') > -1) {
          parent = targetEl;
        } else {
          parent = (0, _utils.getParentEl)('.schedule__item', targetEl);
        }
  
        this.$emit('changeDay', parseInt(parent.dataset.day));
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"schedule l-schedule",on:{"click":_vm.handleSelectDay}},[_c('div',{staticClass:"schedule__progress",style:(_vm.progressWidth)}),_vm._v(" "),_vm._l((_vm.daysArr),function(day,index){return _c('div',{staticClass:"schedule__item",class:{'schedule__item--unselected': _vm.marked.indexOf(day) === -1,
           'schedule__item--overdue': _vm.overdue.indexOf(day) > -1,
           'schedule__item--done': _vm.done.indexOf(day) > -1},attrs:{"data-day":day}},[_c('p',[_vm._v("Day "+_vm._s(day))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.datesArr[index]))])])})],2)}
  __vue__options__.staticRenderFns =[]
  __vue__options__._scopeId = "_v-b55f7b2e"
  

});
