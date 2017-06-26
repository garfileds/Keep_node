/**
 * Created by chenpeng on 2017/5/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import { isEqual } from 'lodash'

import { isPureObject, isEmpty, deepCopy } from '../js/module/utils'
import { md5 } from '../js/module/esModule'
import { runQueue } from '../js/module/async'

Vue.use(Vuex)
Vue.use(VueResource)

let updateQueue = [initQueueItem()]
let plansBackup, commitId

const apiGetPlans = '/api/plans'
const apiPostPlans = '/api/plans'
const synTime = 500

const store = new Vuex.Store({
  state: {
    isInitialized: false,
    plans: []
  },

  getters: {
    plansDone(state) {
      return state.plans.filter(function (plan) {
        return plan.status === 'done'
      })
    },

    plansIng(state) {
      return state.plans.filter(function (plan) {
        return plan.status === 'ing'
      })
    }
  },

  mutations: {
    initPlans(state, plans) {
      state.plans = plans
      state.isInitialized = true
    },

    coverPlans(state, plans) {
      state.plans = plans
    },

    addPlan(state, payload) {
      state.plans.push(payload.plan)
      backupPlans(state.plans)
    },

    updatePlan(state, payload) {
      let i = 0, key, plan
      while (i < state.plans.length) {
        if (state.plans[i].id === payload.planId) {
          plan = state.plans[i]

          for (key in payload.updateInfo) {
            if (payload.updateInfo.hasOwnProperty(key)) {
              plan[key] = payload.updateInfo[key]
            }
          }
        }
        i++
      }

      updateQueue[updateQueue.length - 1].update.push(payload)
    },

    deletePlan(state, payload) {
      let i = 0
      while (i < state.plans.length) {
        if (state.plans[i].id === payload.planId) {
          state.plans.splice(i, 1)
          break
        }

        i++
      }

      updateQueue[updateQueue.length - 1].remove.push(payload.planId)
    },

    donePlan(state, payload) {
      let plan, index

      plan = state.plans.filter(plan => {
        return plan.id === payload.planId
      })[0]

      index = plan.progress.done.indexOf(payload.day)
      index === -1 ? plan.progress.done.push(payload.day) : plan.progress.done.splice(index, 1)

      updateQueue[updateQueue.length - 1].done[payload.planId] = plan.progress.done
    }
  },

  actions: {
    //拉取plans：在/home时使用
    getPlans({ commit }) {
      Vue.http.get(apiGetPlans).then(response => {
        let plans = response.body.plans

        commit('initPlans', plans)

        //deepCopy plans
        plansBackup = JSON.parse(JSON.stringify(plans))
        commitId = response.body.commit_id
        syncPlans()
      }, () => {
        router.push('/')
      })
    }
  }
})

//统一处理同步逻辑（除了addPlans）
function syncPlans() {
  if (isEqual([initQueueItem()], updateQueue)) {
    return setTimeout(syncPlans, synTime)
  }

  let copyUpdateQueue = deepCopy(updateQueue)
  updateQueue = [initQueueItem()]
  runQueue(copyUpdateQueue, processQueueItem, () => {
    copyUpdateQueue = null
    setTimeout(syncPlans, synTime)
  })
}

/**
 * @fn 增量更新队列中的更新信息
 * @param item updateQueue中的元素
 * @param next
 */
function processQueueItem(item, next) {
  Vue.http.post(apiPostPlans, {
    commit_id: commitId,
    type: 'local',
    update_info: item
  })
  .then(response => {
    let plansStr, commitIdTemp,
        plansServer, plansMerge

    if (response.body.code === 'ok') {
      //如果服务器端和plansBackup一致
      plansStr = JSON.stringify(store.state.plans)
      commitIdTemp = md5(plansStr)

      if (commitIdTemp !== response.body.commit_id) {
        console.error('expected synchronization')
      } else {
        plansBackup = JSON.parse(plansStr)
        commitId = commitIdTemp

        next()
      }
    } else if (response.body.code === 'not synchronized') {
      //如果服务器端和plansBackup不一致
      plansServer = response.body.plans
      plansMerge = mergePlans(plansServer, store.state.plans)
      commitIdTemp = response.body.commit_id

      return Vue.http.post(apiPostPlans, {
        type: 'global',
        commit_id: commitIdTemp,
        update_info: plansMerge
      }).then(response => {
        if (response.body.code === 'ok') {
          plansStr = JSON.stringify(plansMerge)
          commitIdTemp = md5(plansStr)

          if (commitIdTemp !== response.body.commit_id) {
            console.error('expected synchronization after merge')
          } else {
            plansBackup = JSON.parse(plansStr)
            commitId = commitIdTemp
            store.commit('coverPlans', plansMerge)

            next()
          }
        }
      })
    }
  })
}

function initQueueItem() {
  return {
    update: [],
    remove: [],
    done: {}
  }
}

/**
 * @fn 合并plans，以serverPlans为主，serverPlans一般是最新的
 * @fn 当localPlans中有serverPlans没有的key-value时，添加到serverPlans
 * @param serverPlans（已按plan.id递增排序）
 * @param clientPlans（已按plan.id递增排序）
 * @returns plans
 */
function mergePlans(serverPlans, clientPlans) {
  let result = [],
      basePlans = deepCopy(serverPlans),
      localPlans = deepCopy(clientPlans)

  let i = 0, j = 0,
      lenBase = basePlans.length,
      lenLocal = localPlans.length

  let search = function (basePlans, localPlans) {
    let key
    for (key in localPlans) {
      if (localPlans.hasOwnProperty(key)) {
        if (localPlans.hasOwnProperty(key)) {
          isEmpty(basePlans[key]) ? basePlans = localPlans[key]
            : isPureObject(localPlans[key]) && search(localPlans[key])
        }
      }
    }
  }

  while (i < lenBase && j < lenLocal) {
    if (basePlans[i].id === localPlans[j].id) {
      search(basePlans, localPlans)
      result.push(basePlans[i])
      i++
      j++
    } else if (basePlans[i].id > localPlans[j].id) {
      result.push(localPlans[j])
      j++
    } else {
      result.push(basePlans[i])
      i++
    }
  }

  if (i === lenBase) {
    result = result.concat(...localPlans.slice(j, lenLocal))
  } else {
    result = result.concat(...basePlans.slice(i, lenBase))
  }

  return result
}

function backupPlans(plans) {
  let plansStr = JSON.stringify(plans)
  plansBackup = JSON.parse(plansStr)
  commitId = md5(plansStr)
}

export default store

