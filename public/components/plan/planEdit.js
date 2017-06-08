define('public/components/plan/planEdit.vue', function(require, exports, module) {

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
  
  var _filedInputText = require('public/components/plan/filedInputText.vue');
  
  var _filedInputText2 = _interopRequireDefault(_filedInputText);
  
  var _filedColor = require('public/components/plan/filedColor.vue');
  
  var _filedColor2 = _interopRequireDefault(_filedColor);
  
  var _schedule = require('public/components/plan/schedule2.vue');
  
  var _schedule2 = _interopRequireDefault(_schedule);
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  var _utils = require('public/js/module/utils');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    name: 'planEdit',
  
    data: function data() {
      return {};
    },
  
    computed: {
      plan: function plan() {
        var planId = this.$route.params.id;
        return this.$store.state.plans.filter(function (plan) {
          return plan.id === planId;
        })[0];
      }
    },
  
    methods: _extends({}, (0, _vuex.mapMutations)(['updatePlan']), {
      handleConfirm: function handleConfirm() {
        var self = this,
            planId = this.plan.id;
        var updateInfo = (0, _utils.form2)('#editPlanForm', 'object');
        delete updateInfo.start_day;
  
        self.updatePlan({ updateInfo: updateInfo, planId: planId });
        router.push('/planDetail/' + planId);
      },
      navBack: function navBack() {
        router.go(-1);
      }
    }),
  
    components: { filedInputText: _filedInputText2.default, filedColor: _filedColor2.default, schedule: _schedule2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{staticClass:"content"},[_c('header',{staticClass:"header"},[_c('span',{staticClass:"header__side floatL"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/return.svg","alt":"返回"},on:{"click":_vm.navBack}})]),_vm._v(" "),_c('span',{staticClass:"header__side floatR"},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/right.svg","alt":"确认修改"},on:{"click":_vm.handleConfirm}})])]),_vm._v(" "),_c('section',[_c('form',{attrs:{"id":"editPlanForm"}},[_c('filedInputText',{attrs:{"title":"标题","inputName":"title","defaultValue":_vm.plan.title}}),_vm._v(" "),_c('filedInputText',{attrs:{"title":"时间","inputName":"start_day","defaultValue":_vm.plan.progress.start_day,"disabled":true}}),_vm._v(" "),_c('filedColor',{attrs:{"defaultColor":_vm.plan.color}}),_vm._v(" "),_c('schedule',{attrs:{"startDay":_vm.plan.progress.start_day,"days":_vm.plan.progress.days,"marked":_vm.plan.progress.marked,"done":_vm.plan.progress.done,"editable":false}})],1)])])}
  __vue__options__.staticRenderFns =[]
  __vue__options__._scopeId = "_v-93f7987f"
  

});
