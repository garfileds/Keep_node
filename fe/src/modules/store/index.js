/**
 * Created by adoug on 2017/5/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import { isPureObject, isEmpty } from '../helper/utils'
import { md5, cloneDeep } from '../helper/esModule'
import { runQueue } from '../helper/async'

Vue.use(Vuex)
Vue.use(VueResource)
/** @namespace Vue.http */

let updateQueue = []
let plansBackup, commitId
let syncTimer = 0

const apiGetPokemen = '/api/pokemen'

const apiGetPlans = '/api/plans'
const apiPostPlans = '/api/plans'
const synTime = 500

const store = new Vuex.Store({
  state: {
    // 每当由/userLogin或/userRegister进入/home时，需dispatch('getPlans')
    needInit: true,

    // 动态清除<keep-alive>的缓存
    needCache: true,

    // 路由的过渡效果
    transitionName: '',

    // /home路由需要记忆的状态
    plansDoneShow: false,

    queueIsRunning: false,

    //加载动画统一全局管理
    loading: {
      isLoading: false,
      tip: ''
    },

    plans: [],
    pokemen: [],

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
    },

    pokemenCollected(state) {
      let pokemenId = []

      for (const plan of state.plans) {
        plan.status === 'done' && pokemenId.push(plan.pokeman_id)
      }

      return state.pokemen.filter(pokeman => pokemenId.indexOf(pokeman.id) > -1)
    }
  },

  mutations: {
    initPlans(state, plans) {
      state.plans = plans || []
      state.needInit = false

      console.log('[done] plan init')
    },

    initPokemen(state, pokemen) {
      state.pokemen = pokemen || []
      console.log('[done] pokemen init')
    },

    changePlansDoneShow(state, status) {
      state.plansDoneShow = status
    },

    changeNeedInit(state, change) {
      state.needInit = change
    },

    changeLoading(state, payload) {
      state.loading.isLoading = payload.isLoading
      state.loading.tip = payload.tip || ''
    },

    changeCache(state, needCache) {
      state.needCache = needCache
    },

    changeTransitionName(state, transitionName) {
      state.transitionName = transitionName
    },

    coverPlans(state, plans) {
      state.plans = plans || []
    },

    addPlan(state, payload) {
      state.plans.push(payload.plan);

      [ plansBackup, commitId ] = backupPlans(state.plans)
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
      state.user.id = user._id
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
        commit('initPlans', plans);

        [plansBackup, commitId] = backupPlans(plans)
      })
    },

    getPokemen({ commit }) {
      return Vue.http.get(apiGetPokemen)
        .then(response => {
          commit('initPokemen', response.body)
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
  if (!updateQueue.length) {
    syncTimer = setTimeout(syncPlans, synTime)
    return
  }

  let toUpdateQueue = updateQueue.slice(0, 1)
  toUpdateQueue.forEach(item => {
    item.isProcessing = true

    !item.planStr && ([ item.planStr, item.commitIdTemp ] = backupPlans(store.state.plans))
  })

  runQueue(toUpdateQueue, processQueueItem, error => {
    let consoleType
    if (error) {
      consoleType = error.type === 'sync' ? 'error' : 'warn'
      console[consoleType](`type: ${error.type}\nmessage: ${error.message}`)

      if (error.type === 'sync') return
    } else {
      updateQueue.shift()
    }

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
  const localInfo = {
    update: item.update,
    remove: item.remove
  }

  Vue.http.post(apiPostPlans, {
    commit_id: commitId,
    type: 'local',
    update_info: localInfo
  })
  .then(response => {
    let commitIdTemp,
      plansServer, plansMerge

    if (response.body.code === 'ok') {
      // 如果服务器端和plansBackup一致
      if (item.commitIdTemp !== response.body.commit_id) {
        next({
          type: 'sync',
          index: index,
          message: 'expected synchronization during local update since accepting ok response'
        })
      } else {
        ({ planStr: plansBackup, commitIdTemp: commitId } = item)

        next()
      }
    } else if (response.body.code === 'not synchronized') {
      // 如果服务器端和plansBackup不一致
      plansServer = response.body.plans
      plansMerge = mergePlans(plansServer, store.state.plans)
      commitIdTemp = response.body.commit_id

      return Vue.http.post(apiPostPlans, {
        type: 'global',
        commit_id: commitIdTemp,
        update_info: plansMerge
      }).then(response => {
        if (response.status === 200) {
          let [ planStr, commitIdTemp ] = backupPlans(plansMerge)

          if (commitIdTemp !== response.body.commit_id) {
            next({
              type: 'sync',
              index: index,
              message: 'expected synchronization after merge during global update'
            })
          } else {
            [ plansBackup, commitId ] = [planStr, commitIdTemp]
            store.commit('coverPlans', plansMerge)

            // 清空updateQueue
            updateQueue = []
            next()
          }
        }
      }, () => {
        next({
          type: 'network',
          index: index,
          message: 'bad network during global update'
        })
      })
    }
  }, () => {
    next({
      type: 'network',
      index: index,
      message: 'bad network during global update'
    })
  })
}

function initQueueItem() {
  return {
    'isProcessing': false,
    'update': {},
    'remove': []
  }
}

/**
 * 合并plans
 * 当localPlans中有serverPlans没有的key-value时，添加到serverPlans
 * 当localPlans同serverPlans冲突时，以serverPlans为主
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
    pokeman_name: '',
    pokeman_img: '',
    user_id: ''
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
  let queueItem,
    needNewItem = !updateQueue.length || updateQueue[updateQueue.length - 1].isProcessing

  needNewItem && updateQueue.push(initQueueItem())
  queueItem = updateQueue[updateQueue.length - 1]

  if (operation === 'delete') {
    return queueItem.remove.push(info)
  }

  let plan = queueItem.update[info.planId]
  plan || (plan = queueItem.update[info.planId] = {})

  if (operation === 'update') {
    Object.assign(plan, info.updateInfo)
  } else if (operation === 'done') {
    Object.assign(plan, {
      'progress.done': info.done,
      status: info.status
    })
  }
}

export default store
