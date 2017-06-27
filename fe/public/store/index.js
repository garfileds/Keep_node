/**
 * Created by chenpeng on 2017/5/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import { isEqual, cloneDeep } from 'lodash'

import { isPureObject, isEmpty } from '../js/module/utils'
import { md5 } from '../js/module/esModule'
import { runQueue } from '../js/module/async'

Vue.use(Vuex)
Vue.use(VueResource)

let updateQueue = [initQueueItem()]
let plansBackup, commitId
let syncTimer

const apiGetPlans = '/api/plans'
const apiPostPlans = '/api/plans'
const synTime = 500

const store = new Vuex.Store({
  state: {
    //每当由/userLogin或/userRegister进入/home时，需dispatch('getPlans')
    needInit: true,
    plans: [],
    user: {}
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
      state.needInit = false
    },

    changeNeedInit(state, change) {
      state.needInit = change
    },

    coverPlans(state, plans) {
      state.plans = plans
    },

    addPlan(state, payload) {
      state.plans.push(payload.plan)
      backupPlans(state.plans)
    },

    updatePlan(state, payload) {
      let i = 0, plan
      while (i < state.plans.length) {
        if (state.plans[i].id === payload.planId) {
          plan = state.plans[i]

          Object.keys(payload.updateInfo).forEach(key => {
            plan[key] = payload.updateInfo[key]
          })
          break
        }

        i++
      }

      updateQueue[updateQueue.length - 1].update.push(payload)
    },

    deletePlan(state, payload) {
      state.plans = state.plans.filter(plan => {
        return plan.id !== payload.planId
      })

      updateQueue[updateQueue.length - 1].remove.push(payload.planId)
    },

    donePlan(state, payload) {
      let plan, index

      plan = state.plans.filter(plan => {
        return plan.id === payload.planId
      })[0]

      index = plan.progress.done.indexOf(payload.day)
      index === -1 ? plan.progress.done.push(payload.day) : plan.progress.done.splice(index, 1)

      if (plan.progress.done.length === plan.progress.marked.length) {
        plan.status = 'done'
      } else {
        plan.status = 'ing'
      }

      updateQueue[updateQueue.length - 1].done[payload.planId] = plan.progress.done
    },

    initUser(state, user) {
      state.user.nickname = user.nickname
      state.user.email = user.email
    },

    clear(state) {
      state.needInit = true
      state.user = {}
      state.plans = []
    }
  },

  actions: {
    getPlans({ commit }) {
      Vue.http.get(apiGetPlans).then(response => {
        clearTimeout(syncTimer)

        let plans = response.body.plans
        commit('initPlans', plans)

        //cloneDeep plans
        plansBackup = JSON.parse(JSON.stringify(plans))
        commitId = response.body.commit_id
        syncPlans()
      }, response => {
        if (response.status === 401) {
          router.push('/')
        }
      })
    }
  }
})

//统一处理同步逻辑（除了addPlans）
function syncPlans() {
  if (isEqual([initQueueItem()], updateQueue)) {
    syncTimer = setTimeout(syncPlans, synTime)
    return
  }

  let copyUpdateQueue = cloneDeep(updateQueue)
  updateQueue = [initQueueItem()]
  runQueue(copyUpdateQueue, processQueueItem, (error) => {
    if (error) {
      updateQueue.unshift(...copyUpdateQueue.slice(error.index))
    }

    copyUpdateQueue = null
    syncTimer = setTimeout(syncPlans, synTime)
  })
}

/**
 * @fn 增量更新队列中的更新信息
 * @param item updateQueue中的元素
 * @param next
 */
function processQueueItem(item, next) {
  if (isEqual(initQueueItem(), item)) {
    return next()
  }

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
        if (response.status === 200) {
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
      }, () => {
        next({
          index: index,
          message: 'synchronize fail'
        })
      })
    }
  }, () => {
    //同步过程中出错，交给cb处理
    next({
      index: index,
      message: 'synchronize fail'
    })
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
      basePlans = cloneDeep(serverPlans),
      localPlans = cloneDeep(clientPlans)

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

