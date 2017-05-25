define('public/components/home/home.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  var kHeader = require('public/components/home/kHeader.vue');
  var planThumbnail = require('public/components/home/planThumbnail.vue');
  
  exports.default = {
    name: 'home',
  
    props: ['plans', 'plansDone', 'plansIng'],
  
    data: function data() {
      return {
        plansDoneShow: false
      };
    },
  
    computed: {
      plansSwitchMsg: function plansSwitchMsg() {
        return this.plansDoneShow ? '隐藏已完成的计划' : "显示已完成的计划";
      }
    },
  
    methods: {
      switcher: function switcher() {
        this.plansDoneShow = !this.plansDoneShow;
      }
    },
  
    components: { planThumbnail: planThumbnail, kHeader: kHeader }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',[_c('kHeader'),_vm._v(" "),_c('section',{staticClass:"content"},[_c('section',{staticClass:"plans-ing"},_vm._l((_vm.plansIng),function(plan){return _c('planThumbnail',{attrs:{"plan":plan}})})),_vm._v(" "),_c('section',{directives:[{name:"show",rawName:"v-show",value:(_vm.plansDone.length > 0),expression:"plansDone.length > 0"}],staticClass:"plans-switch",on:{"click":_vm.switcher}},[_c('span',{staticClass:"plans-switch__content"},[_vm._v(_vm._s(_vm.plansSwitchMsg))])]),_vm._v(" "),_c('section',{directives:[{name:"show",rawName:"v-show",value:(_vm.plansDoneShow),expression:"plansDoneShow"}],staticClass:"plans-done"},_vm._l((_vm.plansDone),function(planDone){return _c('planThumbnail',{attrs:{"plan":planDone}})})),_vm._v(" "),_c('section',{staticClass:"add-plan-btn"},[_c('router-link',{attrs:{"to":"/planAdd"}},[_c('img',{staticClass:"response-img",attrs:{"src":"/images/svg/addition_fill.svg","alt":"添加计划"}})])],1)])],1)}
  __vue__options__.staticRenderFns =[]
  

});
