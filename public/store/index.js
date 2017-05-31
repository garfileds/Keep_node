define('public/store/index', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _vue = require('node_modules/vue/dist/vue.runtime.common');
  
  var _vue2 = _interopRequireDefault(_vue);
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  var _vuex2 = _interopRequireDefault(_vuex);
  
  var _vueResource = require('node_modules/vue-resource/dist/vue-resource.common');
  
  var _vueResource2 = _interopRequireDefault(_vueResource);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _vue2.default.use(_vuex2.default); /**
                                      * Created by chenpeng on 2017/5/31.
                                      */
  
  _vue2.default.use(_vueResource2.default);
  
  var apiGetPlans = '/api/plans';
  var store = new _vuex2.default.Store({
    state: {
      plans: []
    },
  
    getters: {
      plansDone: function plansDone(state) {
        return state.plans.filter(function (plan) {
          return plan.status === 'done';
        });
      },
      plansIng: function plansIng(state) {
        return state.plans.filter(function (plan) {
          return plan.status === 'ing';
        });
      }
    },
  
    mutations: {
      initPlans: function initPlans(state, plans) {
        state.plans = plans;
      },
      addPlan: function addPlan(state, payload) {
        state.plans.push(payload.plan);
      },
      updatePlan: function updatePlan(state, payload) {
        var i = 0,
            key = void 0,
            plan = void 0;
        while (i < state.plans.length) {
          if (state.plans[i].id === payload.planId) {
            plan = state.plans[i];
  
            for (key in payload.updateInfo) {
              if (payload.updateInfo.hasOwnProperty(key)) {
                plan[key] = payload.updateInfo[key];
              }
            }
          }
          i++;
        }
      },
      deletePlan: function deletePlan(state, payload) {
        var i = 0;
        while (i < state.plans.length) {
          if (state.plans[i].id === payload.planId) {
            state.plans.splice(i, 1);
            break;
          }
  
          i++;
        }
      },
      donePlan: function donePlan(state, payload) {
        var plan = void 0,
            index = void 0;
  
        plan = state.plans.filter(function (plan) {
          return plan.id === payload.planId;
        })[0];
  
        index = plan.progress.done.indexOf(payload.day);
        index === -1 ? plan.progress.done.push(payload.day) : plan.progress.done.splice(index, 1);
      }
    }
  });
  
  _vue2.default.http.get(apiGetPlans).then(function (response) {
    store.commit('initPlans', response.body);
  });
  
  exports.default = store;

});
