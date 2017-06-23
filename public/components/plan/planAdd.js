define('public/components/plan/planAdd.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _filedInputText = require('public/components/plan/filedInputText.vue');
  
  var _filedInputText2 = _interopRequireDefault(_filedInputText);
  
  var _filedDatePicker = require('public/components/plan/filedDatePicker.vue');
  
  var _filedDatePicker2 = _interopRequireDefault(_filedDatePicker);
  
  var _filedColor = require('public/components/plan/filedColor.vue');
  
  var _filedColor2 = _interopRequireDefault(_filedColor);
  
  var _filedSchedule = require('public/components/plan/filedSchedule.vue');
  
  var _filedSchedule2 = _interopRequireDefault(_filedSchedule);
  
  var _vuex = require('vuex');
  
  var _utils = require('public/js/module/utils');
  
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  var apiCreatePlan = '/api/plan';
  
  exports.default = {
    name: 'planAdd',
  
    data: function data() {
      var defaultDay = (0, _utils.formatDate)(new Date());
  
      return {
        datePickerVisible: false,
        scheduleVisible: false,
  
        startDay: defaultDay
      };
    },
  
    methods: {
      handleChangeVisible: function handleChangeVisible(status) {
        this.datePickerVisible = status;
      },
      handleChangeDate: function handleChangeDate(startDay) {
        this.startDay = startDay;
      },
      handleClickOutside: function handleClickOutside(event) {
        var targetEl = event.target;
  
        if (this.scheduleVisible && !(0, _utils.isDescendant)(this.$refs.filedSchedule.$el, targetEl)) {
          this.scheduleVisible = false;
        }
      },
      handleChangeScheduleVisible: function handleChangeScheduleVisible(status) {
        this.scheduleVisible = status;
      },
      handleConfirm: function handleConfirm() {
        var self = this;
        var formValue = (0, _utils.form2)('#addPlanForm', 'object');
  
        formValue['marked'] = formValue.marked.split(',').map(function (el) {
          return parseInt(el);
        });
  
        this.$http.post(apiCreatePlan, formValue).then(function (response) {
          var plan = self._mixinPlanForm(formValue);
          plan.id = response.body.message.plan_id;
  
          self.$store.commit('addPlan', { plan: plan });
          router.push('/');
        });
      },
      navBack: function navBack() {
        router.go(-1);
      },
      _mixinPlanForm: function _mixinPlanForm(formValue) {
        var plan = {
          id: '',
          title: '',
          bg_image: '',
          color: '',
          progress_color: '#ffffff',
          progress: {
            start_day: '05/17/2017',
            days: 7,
            marked: [1, 2, 4, 7],
            done: []
          },
          status: 'ing'
        };
  
        var key = void 0,
            isOnlyObject = void 0;
        var keySearch = function keySearch(obj) {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              isOnlyObject = Object.prototype.toString.call(obj[key]) === '[object Object]';
              isOnlyObject ? keySearch(obj[key]) : obj[key] = formValue[key] || obj[key];
            }
          }
        };
  
        keySearch(plan);
  
        return plan;
      }
    },
  
    components: { filedInputText: _filedInputText2.default, filedDatePicker: _filedDatePicker2.default, filedColor: _filedColor2.default, filedSchedule: _filedSchedule2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"content",on:{"click":_vm.handleClickOutside}},[_c('header',{staticClass:"header"},[_c('span',{staticClass:"header__side floatL"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return.svg","alt":"返回"},on:{"click":_vm.navBack}})]),_vm._v(" "),_c('span',{staticClass:"header__side floatR"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/right.svg","alt":"确认创建"},on:{"click":_vm.handleConfirm}})])]),_vm._v(" "),_c('section',[_c('form',{attrs:{"id":"addPlanForm"}},[_c('filedInputText',{attrs:{"title":"标题","inputName":"title"}}),_vm._v(" "),_c('filedDatePicker',{on:{"changeVisible":_vm.handleChangeVisible,"changeDate":_vm.handleChangeDate}}),_vm._v(" "),_c('filedColor',{directives:[{name:"show",rawName:"v-show",value:(!_vm.datePickerVisible),expression:"!datePickerVisible"}]}),_vm._v(" "),_c('filedSchedule',{directives:[{name:"show",rawName:"v-show",value:(!_vm.datePickerVisible),expression:"!datePickerVisible"}],ref:"filedSchedule",attrs:{"startDay":_vm.startDay,"scheduleVisible":_vm.scheduleVisible},on:{"changeScheduleVisible":_vm.handleChangeScheduleVisible}})],1)])])}
  __vue__options__.staticRenderFns =[]
  

});
