define('public/components/plan/filedSchedule.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _vue = require('node_modules/vue/dist/vue.runtime.common');
  
  var _vue2 = _interopRequireDefault(_vue);
  
  var _vueSmoothPicker = require('node_modules/vue-smooth-picker/dist/smooth-picker');
  
  var _vueSmoothPicker2 = _interopRequireDefault(_vueSmoothPicker);
  
  var _schedule = require('public/components/plan/schedule.vue');
  
  var _schedule2 = _interopRequireDefault(_schedule);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
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
  
  _vue2.default.use(_vueSmoothPicker2.default);
  
  exports.default = {
    name: 'filedSchedule',
  
    props: ['startDay', 'scheduleVisible'],
  
    data: function data() {
      return {
        config: [{
          currentIndex: 2,
          list: ['欢乐7', '走心14', '自定义'],
          textAlign: 'center',
          className: 'schedule-group'
        }],
  
        days: 7,
        marked: [1, 2, 4, 7],
        editable: false
      };
    },
  
    created: function created() {
      if (this.config[0].currentIndex !== 0) {
        this.dataChange(0, this.config[0].currentIndex);
      }
    },
  
    computed: {
      selectedSchedule: function selectedSchedule() {
        var currentIndex = this.config[0].currentIndex;
        return this.config[0].list[currentIndex];
      }
    },
  
    methods: {
      dataChange: function dataChange(gIndex, itemIndex) {
        switch (itemIndex) {
          case 0:
            this.days = 7;
            this.marked = [1, 2, 4, 7];
            this.editable = false;
            break;
          case 1:
            this.days = 14;
            this.marked = [1, 2, 4, 6, 9, 12, 14];
            this.editable = false;
            break;
          case 2:
            this.days = 21;
            this.marked = [];
            this.editable = true;
            break;
        }
      },
      togglePicker: function togglePicker(status) {
        this.$emit('changeScheduleVisible', status);
      },
      handleChangeDay: function handleChangeDay(day) {
        var index = this.marked.indexOf(parseInt(day));
  
        if (index === -1) {
          this.marked.push(day);
        } else {
          this.marked.splice(index, 1);
        }
      }
    },
  
    components: { schedule: _schedule2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"filed"},[_c('div',{staticClass:"filed__name"},[_vm._v("套餐")]),_vm._v(" "),_c('div',{staticClass:"filed__content"},[_c('p',{directives:[{name:"show",rawName:"v-show",value:(!_vm.scheduleVisible),expression:"!scheduleVisible"}],staticClass:"filed__text",on:{"click":function($event){$event.stopPropagation();_vm.togglePicker(true)}}},[_vm._v(_vm._s(_vm.selectedSchedule))]),_vm._v(" "),_c('smooth-picker',{directives:[{name:"show",rawName:"v-show",value:(_vm.scheduleVisible),expression:"scheduleVisible"}],ref:"picker",attrs:{"data":_vm.config,"change":_vm.dataChange}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"days"},domProps:{"value":_vm.days}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"marked"},domProps:{"value":_vm.marked}})],1),_vm._v(" "),_c('schedule',{directives:[{name:"show",rawName:"v-show",value:(_vm.scheduleVisible),expression:"scheduleVisible"}],attrs:{"days":_vm.days,"startDay":_vm.startDay,"marked":_vm.marked,"editable":_vm.editable},on:{"changeDay":_vm.handleChangeDay}})],1)}
  __vue__options__.staticRenderFns =[]
  

});
