define('public/components/home/home.vue', function(require, exports, module) {

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
  //
  //
  
  var _kHeader = require('public/components/home/kHeader.vue');
  
  var _kHeader2 = _interopRequireDefault(_kHeader);
  
  var _planThumbnail = require('public/components/home/planThumbnail.vue');
  
  var _planThumbnail2 = _interopRequireDefault(_planThumbnail);
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    name: 'home',
  
    data: function data() {
      return {
        plansDoneShow: false
      };
    },
  
    computed: _extends({
      plansSwitchMsg: function plansSwitchMsg() {
        return this.plansDoneShow ? '隐藏已完成的计划' : "显示已完成的计划";
      }
    }, (0, _vuex.mapState)(['plans']), (0, _vuex.mapGetters)(['plansDone', 'plansIng'])),
  
    methods: _extends({
      switcher: function switcher() {
        this.plansDoneShow = !this.plansDoneShow;
      },
      catPlan: function catPlan(planId, status) {
        router.push('/planDetail/' + planId + '?status=' + status);
      }
    }, (0, _vuex.mapActions)(['getPlans'])),
  
    created: function created() {
      this.getPlans();
    },
  
    components: { planThumbnail: _planThumbnail2.default, kHeader: _kHeader2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('kHeader'),_vm._v(" "),_c('section',{staticClass:"content"},[_c('section',{staticClass:"plans-ing"},_vm._l((_vm.plansIng),function(plan){return _c('planThumbnail',{attrs:{"plan":plan},nativeOn:{"click":function($event){_vm.catPlan(plan.id, 'ing')}}})})),_vm._v(" "),_c('section',{directives:[{name:"show",rawName:"v-show",value:(_vm.plansDone.length > 0),expression:"plansDone.length > 0"}],staticClass:"plans-switch",on:{"click":_vm.switcher}},[_c('span',{staticClass:"plans-switch__content"},[_vm._v(_vm._s(_vm.plansSwitchMsg))])]),_vm._v(" "),_c('section',{directives:[{name:"show",rawName:"v-show",value:(_vm.plansDoneShow),expression:"plansDoneShow"}],staticClass:"plans-done"},_vm._l((_vm.plansDone),function(planDone){return _c('planThumbnail',{attrs:{"plan":planDone},nativeOn:{"click":function($event){_vm.catPlan(planDone.id, 'done')}}})})),_vm._v(" "),_c('section',{staticClass:"add-plan-btn"},[_c('router-link',{attrs:{"to":"/planAdd"}},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/addition_fill.svg","alt":"添加计划"}})])],1)])],1)}
  __vue__options__.staticRenderFns =[]
  

});
