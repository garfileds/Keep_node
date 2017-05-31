/**
 * Created by chenpeng on 2017/5/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

const apiGetPlans = '/api/plans'
const store = new Vuex.Store({
  state: {
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
    },

    addPlan(state, payload) {
      state.plans.push(payload.plan)
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
    },

    donePlan(state, payload) {
      let plan, index

      plan = state.plans.filter(plan => {
        return plan.id === payload.planId
      })[0]

      index = plan.progress.done.indexOf(payload.day)
      index === -1 ? plan.progress.done.push(payload.day) : plan.progress.done.splice(index, 1)
    }
  }
})

Vue.http.get(apiGetPlans)
.then(response => {
  store.commit('initPlans', response.body)
})

export default store

