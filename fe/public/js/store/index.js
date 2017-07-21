/**
 * Created by chenpeng on 2017/5/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import { isEqual, cloneDeep } from 'lodash'

import { isPureObject, isEmpty } from '../module/utils'
import { md5 } from '../module/esModule'
import { runQueue } from '../module/async'

Vue.use(Vuex)
Vue.use(VueResource)
/** @namespace Vue.http */

let updateQueue = [initQueueItem()]
let plansBackup, commitId
let syncTimer = 0

const apiGetPlans = '/api/plans'
const apiPostPlans = '/api/plans'
const synTime = 500

const store = new Vuex.Store({
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
      state.plans = plans || []
      state.needInit = false
    },

    changeNeedInit(state, change) {
      state.needInit = change
    },

    changeQueueIsRunning(state, change) {
      state.queueIsRunning = change
    },

    changeLoading(state, payload) {
      state.loading.isLoading = payload.isLoading
      state.loading.tip = payload.tip || ''
    },

    coverPlans(state, plans) {
      state.plans = plans || []
    },

    addPlan(state, payload) {
      state.plans.push(payload.plan)
      let result = backupPlans(state.plans)
      plansBackup = result[0]
      commitId = result[1]
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

      inQueue('update', payload)
    },

    deletePlan(state, payload) {
      state.plans = state.plans.filter(plan => {
        return plan.id !== payload.planId
      })

      inQueue('delete', payload.planId)
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

      inQueue('done', {
        planId: payload.planId,
        status: plan.status,
        done: plan.progress.done
      })
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
      return Vue.http.get(apiGetPlans).then(response => {
        clearTimeout(syncTimer)

        let plans = response.body
        commit('initPlans', plans)

        let result = backupPlans(plans)
        plansBackup = result[0]
        commitId = result[1]
      })
    },

    syncPlansOnce({}, cb) {
      let copyUpdateQueue = cloneDeep(updateQueue)
      updateQueue = [initQueueItem()]
      runQueue(copyUpdateQueue, processQueueItem, cb)
    },

    stopSyncTimer() {
      clearTimeout(syncTimer)
    },

    startSyncTimer() {
      syncPlans()
    }
  }
})

//统一处理同步逻辑（除了addPlans）
function syncPlans() {
  if (isEqual([initQueueItem()], updateQueue)) {
    store.commit('changeQueueIsRunning', false)
    syncTimer = setTimeout(syncPlans, synTime)
    return
  }

  store.commit('changeQueueIsRunning', true)

  let copyUpdateQueue = cloneDeep(updateQueue)
  updateQueue = [initQueueItem()]
  runQueue(copyUpdateQueue, processQueueItem, error => {
    if (error) {
      updateQueue.unshift(...copyUpdateQueue.slice(error.index))
    }

    store.commit('changeQueueIsRunning', false)

    copyUpdateQueue = null
    syncTimer = setTimeout(syncPlans, synTime)
  })
}

/**
 * @fn 增量更新队列中的更新信息
 * @param item updateQueue中的元素
 * @param index
 * @param next
 */
function processQueueItem(item, index, next) {
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
      let result = backupPlans(store.state.plans)
      plansStr = result[0]
      commitIdTemp = result[1]

      if (commitIdTemp !== response.body.commit_id) {
        console.error('expected synchronization')
        next({
          index: index,
          message: 'synchronize fail'
        })
      } else {
        plansBackup = plansStr
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
          let result = backupPlans(plansMerge)
          plansStr = result[0]
          commitIdTemp = result[1]

          if (commitIdTemp !== response.body.commit_id) {
            console.error('expected synchronization after merge')
            next({
              index: index,
              message: 'synchronize fail'
            })
          } else {
            plansBackup = plansStr
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
    'update': {},
    'remove': []
  }
}

/**
 * @fn 合并plans，以serverPlans为主，serverPlans一般是最新的
 * @fn 当localPlans中有serverPlans没有的key-value时，添加到serverPlans
 * @param serverPlans（已按plan.id递增排序）
 * @param clientPlans（已按plan.id递增排序）
 */
function mergePlans(serverPlans, clientPlans) {
  let result = [],
      basePlans = cloneDeep(serverPlans),
      localPlans = cloneDeep(clientPlans)

  let i = 0, j = 0,
      lenBase = basePlans.length,
      lenLocal = localPlans.length

  while (i < lenBase && j < lenLocal) {
    if (basePlans[i].id === localPlans[j].id) {
      mergePlan(basePlans[i], localPlans[j])
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

function mergePlan(basePlan, localPlan) {
  Object.keys(localPlan).forEach(key => {
    isEmpty(basePlan[key]) ? basePlan[key] = localPlan[key]
      : isPureObject(localPlan[key]) && mergePlan(basePlan[key], localPlan[key])
  })
}

function backupPlans(plans) {
  const planTemplate = {
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
    status: '',
    pokeman_id: '',
    pokeman_img: ''
  }

  let plansStr = ''
  plans.forEach(plan => {
    let planTemp = Object.assign({}, planTemplate, plan)
    plansStr += JSON.stringify(planTemp)
  })

  let commitId = md5(plansStr)

  return [plansStr, commitId]
}

/**
 * 统一处理store接受actions的commit后对updateQueue的操作
 * @deps 依赖updateQueue变量
 * @param operation
 * @param info
 * @returns
 */
function inQueue(operation, info) {
  let queueItem = updateQueue[updateQueue.length - 1]

  if (operation === 'delete') {
    return queueItem.remove.push(info)
  }

  let plan = queueItem.update[info.planId]
  plan || (plan = queueItem.update[info.planId] = {})

  if (operation === 'update') {
    Object.assign(plan, info.updateInfo)
  } else if (operation === 'done') {
    /** @namespace info.plandId */
    delete info.plandId
    Object.assign(plan, {
      'progress.done': info.done,
      status: info.status
    })
  }
}

export default store

