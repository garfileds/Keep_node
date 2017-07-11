define('public/components/plan/planAdd.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _kBg = require('public/components/plan/kBg.vue');
  
  var _kBg2 = _interopRequireDefault(_kBg);
  
  var _fieldInputText = require('public/components/plan/fieldInputText.vue');
  
  var _fieldInputText2 = _interopRequireDefault(_fieldInputText);
  
  var _fieldDatePicker = require('public/components/plan/fieldDatePicker.vue');
  
  var _fieldDatePicker2 = _interopRequireDefault(_fieldDatePicker);
  
  var _fieldColor = require('public/components/plan/fieldColor.vue');
  
  var _fieldColor2 = _interopRequireDefault(_fieldColor);
  
  var _fieldSchedule = require('public/components/plan/fieldSchedule.vue');
  
  var _fieldSchedule2 = _interopRequireDefault(_fieldSchedule);
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  var _utils = require('public/js/module/utils');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var apiCreatePlan = '/api/plan'; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
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
  
        if (this.scheduleVisible && !(0, _utils.isDescendant)(this.$refs.fieldSchedule.$el, targetEl)) {
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
        formValue['days'] = parseInt(formValue.days);
  
        this.$http.post(apiCreatePlan, formValue).then(function (response) {
          if (response.status === 201) {
            var plan = self._mixinPlanForm(formValue);
            plan._id = plan.id = response.body.plan_id;
  
            self.$store.commit('addPlan', { plan: plan });
            self.$router.push('/home');
          }
        });
      },
      navBack: function navBack() {
        router.go(-1);
      },
      _mixinPlanForm: function _mixinPlanForm(formValue) {
        var plan = {
          _id: '',
          id: '',
          title: '',
          bg_image: '',
          color: '',
          progress_color: "#fff",
          progress: {
            days: 21,
            start_day: '',
            done: [],
            marked: []
          },
          status: 'ing'
        };
  
        var keySearch = function keySearch(obj) {
          Object.keys(obj).forEach(function (key) {
            plan.hasOwnProperty(key) ? plan[key] = obj[key] : plan.progress[key] = obj[key];
          });
        };
  
        keySearch(formValue);
  
        return plan;
      }
    },
  
    components: { kBg: _kBg2.default, fieldInputText: _fieldInputText2.default, fieldDatePicker: _fieldDatePicker2.default, fieldColor: _fieldColor2.default, fieldSchedule: _fieldSchedule2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{on:{"click":_vm.handleClickOutside}},[_c('kBg'),_vm._v(" "),_c('header',{staticClass:"header"},[_c('div',{staticClass:"l-grid l-grid--between"},[_c('span',{staticClass:"header__side"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return.svg","alt":"返回"},on:{"click":_vm.navBack}})]),_vm._v(" "),_c('span',{staticClass:"header__side"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/right.svg","alt":"确认创建"},on:{"click":_vm.handleConfirm}})])])]),_vm._v(" "),_c('section',{staticClass:"l-wrap"},[_c('form',{attrs:{"id":"addPlanForm"}},[_c('fieldInputText',{attrs:{"title":"标题","inputName":"title"}}),_vm._v(" "),_c('fieldDatePicker',{on:{"changeVisible":_vm.handleChangeVisible,"changeDate":_vm.handleChangeDate}}),_vm._v(" "),_c('fieldColor',{directives:[{name:"show",rawName:"v-show",value:(!_vm.datePickerVisible),expression:"!datePickerVisible"}]}),_vm._v(" "),_c('fieldSchedule',{directives:[{name:"show",rawName:"v-show",value:(!_vm.datePickerVisible),expression:"!datePickerVisible"}],ref:"fieldSchedule",attrs:{"startDay":_vm.startDay,"scheduleVisible":_vm.scheduleVisible},on:{"changeScheduleVisible":_vm.handleChangeScheduleVisible}})],1)])],1)}
  __vue__options__.staticRenderFns =[]
  __vue__options__._scopeId = "_v-7ab53f60"
  

});
