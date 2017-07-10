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
  
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
  
  function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); } /**
                                                                                                                     * Created by chenpeng on 2017/5/31.
                                                                                                                     */
  
  _vue2.default.use(_vuex2.default);
  _vue2.default.use(_vueResource2.default);
  /** @namespace Vue.http */
  
  var updateQueue = [initQueueItem()];
  var plansBackup = void 0,
      commitId = void 0;
  var syncTimer = 0;
  
  var apiGetPlans = '/api/plans';
  var apiPostPlans = '/api/plans';
  var synTime = 500;
  
  var store = new _vuex2.default.Store({
    state: {
      //每当由/userLogin或/userRegister进入/home时，需dispatch('getPlans')
      needInit: true,
  
      queueIsRunning: false,
  
      //加载动画统一全局管理
      loading: {
        isLoading: false,
        tip: ''
      },
  
      plans: [],
      user: {}
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
        state.plans = plans || [];
        state.needInit = false;
      },
      changeNeedInit: function changeNeedInit(state, change) {
        state.needInit = change;
      },
      changeQueueIsRunning: function changeQueueIsRunning(state, change) {
        state.queueIsRunning = change;
      },
      changeLoading: function changeLoading(state, payload) {
        state.loading.isLoading = payload.isLoading;
        state.loading.tip = payload.tip || '';
      },
      coverPlans: function coverPlans(state, plans) {
        state.plans = plans || [];
      },
      addPlan: function addPlan(state, payload) {
        state.plans.push(payload.plan);
        var result = backupPlans(state.plans);
        plansBackup = result[0];
        commitId = result[1];
      },
      updatePlan: function updatePlan(state, payload) {
        var i = 0,
            plan = void 0;
        while (i < state.plans.length) {
          if (state.plans[i].id === payload.planId) {
            plan = state.plans[i];
  
            Object.keys(payload.updateInfo).forEach(function (key) {
              plan[key] = payload.updateInfo[key];
            });
            break;
          }
  
          i++;
        }
  
        inQueue('update', payload);
      },
      deletePlan: function deletePlan(state, payload) {
        state.plans = state.plans.filter(function (plan) {
          return plan.id !== payload.planId;
        });
  
        inQueue('delete', payload.planId);
      },
      donePlan: function donePlan(state, payload) {
        var plan = void 0,
            index = void 0;
  
        plan = state.plans.filter(function (plan) {
          return plan.id === payload.planId;
        })[0];
  
        index = plan.progress.done.indexOf(payload.day);
        index === -1 ? plan.progress.done.push(payload.day) : plan.progress.done.splice(index, 1);
  
        if (plan.progress.done.length === plan.progress.marked.length) {
          plan.status = 'done';
        } else {
          plan.status = 'ing';
        }
  
        inQueue('done', {
          planId: payload.planId,
          status: plan.status,
          done: plan.progress.done
        });
      },
      initUser: function initUser(state, user) {
        state.user.nickname = user.nickname;
        state.user.email = user.email;
      },
      clear: function clear(state) {
        state.needInit = true;
        state.user = {};
        state.plans = [];
      }
    },
  
    actions: {
      getPlans: function getPlans(_ref) {
        var commit = _ref.commit;
  
        return _vue2.default.http.get(apiGetPlans).then(function (response) {
          clearTimeout(syncTimer);
  
          var plans = response.body;
          commit('initPlans', plans);
  
          var result = backupPlans(plans);
          plansBackup = result[0];
          commitId = result[1];
        });
      },
      syncPlansOnce: function syncPlansOnce(_ref2, cb) {
        _objectDestructuringEmpty(_ref2);
  
        var copyUpdateQueue = (0, _lodash.cloneDeep)(updateQueue);
        updateQueue = [initQueueItem()];
        (0, _async.runQueue)(copyUpdateQueue, processQueueItem, cb);
      },
      stopSyncTimer: function stopSyncTimer() {
        clearTimeout(syncTimer);
      },
      startSyncTimer: function startSyncTimer() {
        syncPlans();
      }
    }
  });
  
  //统一处理同步逻辑（除了addPlans）
  function syncPlans() {
    if ((0, _lodash.isEqual)([initQueueItem()], updateQueue)) {
      store.commit('changeQueueIsRunning', false);
      syncTimer = setTimeout(syncPlans, synTime);
      return;
    }
  
    store.commit('changeQueueIsRunning', true);
  
    var copyUpdateQueue = (0, _lodash.cloneDeep)(updateQueue);
    updateQueue = [initQueueItem()];
    (0, _async.runQueue)(copyUpdateQueue, processQueueItem, function (error) {
      if (error) {
        var _updateQueue;
  
        (_updateQueue = updateQueue).unshift.apply(_updateQueue, _toConsumableArray(copyUpdateQueue.slice(error.index)));
      }
  
      store.commit('changeQueueIsRunning', false);
  
      copyUpdateQueue = null;
      syncTimer = setTimeout(syncPlans, synTime);
    });
  }
  
  /**
   * @fn 增量更新队列中的更新信息
   * @param item updateQueue中的元素
   * @param index
   * @param next
   */
  function processQueueItem(item, index, next) {
    if ((0, _lodash.isEqual)(initQueueItem(), item)) {
      return next();
    }
  
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
        var result = backupPlans(store.state.plans);
        plansStr = result[0];
        commitIdTemp = result[1];
  
        if (commitIdTemp !== response.body.commit_id) {
          console.error('expected synchronization');
          next({
            index: index,
            message: 'synchronize fail'
          });
        } else {
          plansBackup = plansStr;
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
          if (response.status === 200) {
            var _result = backupPlans(plansMerge);
            plansStr = _result[0];
            commitIdTemp = _result[1];
  
            if (commitIdTemp !== response.body.commit_id) {
              console.error('expected synchronization after merge');
              next({
                index: index,
                message: 'synchronize fail'
              });
            } else {
              plansBackup = plansStr;
              commitId = commitIdTemp;
              store.commit('coverPlans', plansMerge);
  
              next();
            }
          }
        }, function () {
          next({
            index: index,
            message: 'synchronize fail'
          });
        });
      }
    }, function () {
      //同步过程中出错，交给cb处理
      next({
        index: index,
        message: 'synchronize fail'
      });
    });
  }
  
  function initQueueItem() {
    return {
      'update': {},
      'remove': []
    };
  }
  
  /**
   * @fn 合并plans，以serverPlans为主，serverPlans一般是最新的
   * @fn 当localPlans中有serverPlans没有的key-value时，添加到serverPlans
   * @param serverPlans（已按plan.id递增排序）
   * @param clientPlans（已按plan.id递增排序）
   */
  function mergePlans(serverPlans, clientPlans) {
    var result = [],
        basePlans = (0, _lodash.cloneDeep)(serverPlans),
        localPlans = (0, _lodash.cloneDeep)(clientPlans);
  
    var i = 0,
        j = 0,
        lenBase = basePlans.length,
        lenLocal = localPlans.length;
  
    while (i < lenBase && j < lenLocal) {
      if (basePlans[i].id === localPlans[j].id) {
        mergePlan(basePlans[i], localPlans[j]);
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
      var _result2;
  
      result = (_result2 = result).concat.apply(_result2, _toConsumableArray(localPlans.slice(j, lenLocal)));
    } else {
      var _result3;
  
      result = (_result3 = result).concat.apply(_result3, _toConsumableArray(basePlans.slice(i, lenBase)));
    }
  
    return result;
  }
  
  function mergePlan(basePlan, localPlan) {
    Object.keys(localPlan).forEach(function (key) {
      (0, _utils.isEmpty)(basePlan[key]) ? basePlan[key] = localPlan[key] : (0, _utils.isPureObject)(localPlan[key]) && mergePlan(basePlan[key], localPlan[key]);
    });
  }
  
  function backupPlans(plans) {
    var planTemplate = {
      _id: '',
      id: '',
      title: '',
      bg_image: '',
      color: 'rgb(255, 204, 51)',
      progress_color: "#fff",
      progress: {
        days: 21,
        start_day: '',
        done: [],
        marked: []
      },
      status: ''
    };
  
    var plansStr = '';
    plans.forEach(function (plan) {
      var planTemp = Object.assign({}, planTemplate, plan);
      plansStr += JSON.stringify(planTemp);
    });
  
    var commitId = (0, _esModule.md5)(plansStr);
  
    return [plansStr, commitId];
  }
  
  /**
   * 统一处理store接受actions的commit后对updateQueue的操作
   * @deps 依赖updateQueue变量
   * @param operation
   * @param info
   * @returns
   */
  function inQueue(operation, info) {
    var queueItem = updateQueue[updateQueue.length - 1];
  
    if (operation === 'delete') {
      return queueItem.remove.push(info);
    }
  
    var plan = queueItem.update[info.planId];
    plan || (plan = queueItem.update[info.planId] = {});
  
    if (operation === 'update') {
      Object.assign(plan, info.updateInfo);
    } else if (operation === 'done') {
      /** @namespace info.plandId */
      delete info.plandId;
      Object.assign(plan, {
        'progress.done': info.done,
        status: info.status
      });
    }
  }
  
  exports.default = store;

});
