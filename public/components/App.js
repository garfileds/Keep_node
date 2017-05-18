define('public/components/App.vue', function(require, exports, module) {

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
  
  var apiGetPlans = '/api/plans';
  
  module.exports = {
    data: function data() {
      return {
        plans: [],
        plansDone: [],
        plansIng: []
      };
    },
  
    created: function created() {
      var self = this;
  
      this.$http.get(apiGetPlans, {
        responseType: 'json'
      }).then(function (response) {
        self.plans = response.body;
  
        self.plans.forEach(function (plan) {
          if (plan.statu === 'done') {
            self.plansDone.push(plan);
          } else {
            self.plansIng.push(plan);
          }
        });
      });
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('router-view',{attrs:{"plans":_vm.plans,"plansDone":_vm.plansDone,"plansIng":_vm.plansIng}})],1)}
  __vue__options__.staticRenderFns =[]
  

});
