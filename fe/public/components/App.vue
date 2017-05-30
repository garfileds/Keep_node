<template>
  <div id="app">
    <router-view
     :plans="plans"
     :plansDone="plansDone"
     :plansIng="plansIng"
     @postPlan="handlePostPlan"
     @updatePlan="handleUpdatePlan"></router-view>
  </div>
</template>

<script>
  const apiGetPlans = '/api/plans'

  export default {
    name: 'App',

    data: function () {
      return {
        plans: []
      }
    },

    computed: {
      plansDone() {
        return this.plans.filter(function (plan) {
          return plan.status === 'done'
        })
      },

      plansIng() {
        return this.plans.filter(function (plan) {
          return plan.status === 'ing'
        })
      }
    },

    created: function() {
      const self = this;

      this.$http.get(apiGetPlans, {
        responseType: 'json'
      })
      .then(response => {
        self.plans = response.body
      })
    },

    methods: {
      handlePostPlan(plan) {
        this.plans.push(plan)
      },

      handleUpdatePlan(updateInfo, planId) {
        let i = 0, key, plan
        while (i < this.plans.length) {
          if (this.plans[i].id === planId) {
            plan = this.plans[i]
            for (key in updateInfo) {
              if (updateInfo.hasOwnProperty(key)) {
                plan[key] = updateInfo[key]
              }
            }
          }
          i++
        }
      },

      _nextDay(plan) {

      }
    }
  }
</script>