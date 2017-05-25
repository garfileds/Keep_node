define('public/components/App.vue', function(require, exports, module) {

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
  
  var apiGetPlans = '/api/plans';
  
  exports.default = {
    name: 'App',
  
    data: function data() {
      return {
        plans: []
      };
    },
  
    computed: {
      plansDone: function plansDone() {
        return this.plans.filter(function (plan) {
          return plan.status === 'done';
        });
      },
      plansIng: function plansIng() {
        return this.plans.filter(function (plan) {
          return plan.status === 'ing';
        });
      }
    },
  
    created: function created() {
      var self = this;
  
      this.$http.get(apiGetPlans, {
        responseType: 'json'
      }).then(function (response) {
        self.plans = response.body;
      });
    },
  
    methods: {
      handlePostPlan: function handlePostPlan(plan) {
        this.plans.push(plan);
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view',{attrs:{"plans":_vm.plans,"plansDone":_vm.plansDone,"plansIng":_vm.plansIng,"planId":_vm.$route.params.id},on:{"postPlan":_vm.handlePostPlan}})],1)}
  __vue__options__.staticRenderFns =[]
  

});
