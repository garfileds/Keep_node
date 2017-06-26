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
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _utils = require('public/js/module/utils');
  
  var _esModule = require('public/js/module/esModule');
  
  var _async = require('public/js/module/async');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                       * Created by chenpeng on 2017/5/31.
                                                                                                                                                                                                       */
  
  _vue2.default.use(_vuex2.default);
  _vue2.default.use(_vueResource2.default);
  
  var updateQueue = [initQueueItem()];
  var plansBackup = void 0,
      commitId = void 0;
  
  var apiGetPlans = '/api/plans';
  var apiPostPlans = '/api/plans';
  var synTime = 500;
  
  var store = new _vuex2.default.Store({
    state: {
      isInitialized: false,
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
        state.isInitialized = true;
      },
      coverPlans: function coverPlans(state, plans) {
        state.plans = plans;
      },
      addPlan: function addPlan(state, payload) {
        state.plans.push(payload.plan);
        backupPlans(state.plans);
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
  
        updateQueue[updateQueue.length - 1].update.push(payload);
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
  
        updateQueue[updateQueue.length - 1].remove.push(payload.planId);
      },
      donePlan: function donePlan(state, payload) {
        var plan = void 0,
            index = void 0;
  
        plan = state.plans.filter(function (plan) {
          return plan.id === payload.planId;
        })[0];
  
        index = plan.progress.done.indexOf(payload.day);
        index === -1 ? plan.progress.done.push(payload.day) : plan.progress.done.splice(index, 1);
  
        updateQueue[updateQueue.length - 1].done[payload.planId] = plan.progress.done;
      }
    },
  
    actions: {
      //拉取plans：在/home时使用
      getPlans: function getPlans(_ref) {
        var commit = _ref.commit;
  
        _vue2.default.http.get(apiGetPlans).then(function (response) {
          var plans = response.body.plans;
  
          commit('initPlans', plans);
  
          //deepCopy plans
          plansBackup = JSON.parse(JSON.stringify(plans));
          commitId = response.body.commit_id;
          syncPlans();
        }, function () {
          router.push('/');
        });
      }
    }
  });
  
  //统一处理同步逻辑（除了addPlans）
  function syncPlans() {
    if ((0, _lodash.isEqual)([initQueueItem()], updateQueue)) {
      return setTimeout(syncPlans, synTime);
    }
  
    var copyUpdateQueue = (0, _utils.deepCopy)(updateQueue);
    updateQueue = [initQueueItem()];
    (0, _async.runQueue)(copyUpdateQueue, processQueueItem, function () {
      copyUpdateQueue = null;
      setTimeout(syncPlans, synTime);
    });
  }
  
  /**
   * @fn 增量更新队列中的更新信息
   * @param item updateQueue中的元素
   * @param next
   */
  function processQueueItem(item, next) {
    _vue2.default.http.post(apiPostPlans, {
      commit_id: commitId,
      type: 'local',
      update_info: item
    }).then(function (response) {
      var plansStr = void 0,
          commitIdTemp = void 0,
          plansServer = void 0,
          plansMerge = void 0;
  
      if (response.body.code === 'ok') {
        //如果服务器端和plansBackup一致
        plansStr = JSON.stringify(store.state.plans);
        commitIdTemp = (0, _esModule.md5)(plansStr);
  
        if (commitIdTemp !== response.body.commit_id) {
          console.error('expected synchronization');
        } else {
          plansBackup = JSON.parse(plansStr);
          commitId = commitIdTemp;
  
          next();
        }
      } else if (response.body.code === 'not synchronized') {
        //如果服务器端和plansBackup不一致
        plansServer = response.body.plans;
        plansMerge = mergePlans(plansServer, store.state.plans);
        commitIdTemp = response.body.commit_id;
  
        return _vue2.default.http.post(apiPostPlans, {
          type: 'global',
          commit_id: commitIdTemp,
          update_info: plansMerge
        }).then(function (response) {
          if (response.body.code === 'ok') {
            plansStr = JSON.stringify(plansMerge);
            commitIdTemp = (0, _esModule.md5)(plansStr);
  
            if (commitIdTemp !== response.body.commit_id) {
              console.error('expected synchronization after merge');
            } else {
              plansBackup = JSON.parse(plansStr);
              commitId = commitIdTemp;
              store.commit('coverPlans', plansMerge);
  
              next();
            }
          }
        });
      }
    });
  }
  
  function initQueueItem() {
    return {
      update: [],
      remove: [],
      done: {}
    };
  }
  
  /**
   * @fn 合并plans，以serverPlans为主，serverPlans一般是最新的
   * @fn 当localPlans中有serverPlans没有的key-value时，添加到serverPlans
   * @param serverPlans（已按plan.id递增排序）
   * @param clientPlans（已按plan.id递增排序）
   * @returns plans
   */
  function mergePlans(serverPlans, clientPlans) {
    var result = [],
        basePlans = (0, _utils.deepCopy)(serverPlans),
        localPlans = (0, _utils.deepCopy)(clientPlans);
  
    var i = 0,
        j = 0,
        lenBase = basePlans.length,
        lenLocal = localPlans.length;
  
    var search = function search(basePlans, localPlans) {
      var key = void 0;
      for (key in localPlans) {
        if (localPlans.hasOwnProperty(key)) {
          if (localPlans.hasOwnProperty(key)) {
            (0, _utils.isEmpty)(basePlans[key]) ? basePlans = localPlans[key] : (0, _utils.isPureObject)(localPlans[key]) && search(localPlans[key]);
          }
        }
      }
    };
  
    while (i < lenBase && j < lenLocal) {
      if (basePlans[i].id === localPlans[j].id) {
        search(basePlans, localPlans);
        result.push(basePlans[i]);
        i++;
        j++;
      } else if (basePlans[i].id > localPlans[j].id) {
        result.push(localPlans[j]);
        j++;
      } else {
        result.push(basePlans[i]);
        i++;
      }
    }
  
    if (i === lenBase) {
      var _result;
  
      result = (_result = result).concat.apply(_result, _toConsumableArray(localPlans.slice(j, lenLocal)));
    } else {
      var _result2;
  
      result = (_result2 = result).concat.apply(_result2, _toConsumableArray(basePlans.slice(i, lenBase)));
    }
  
    return result;
  }
  
  function backupPlans(plans) {
    var plansStr = JSON.stringify(plans);
    plansBackup = JSON.parse(plansStr);
    commitId = (0, _esModule.md5)(plansStr);
  }
  
  exports.default = store;

});
