<template>
  <div id="app">
    <router-view
     :plans="plans"
     :plansDone="plansDone"
     :plansIng="plansIng"
     @addPlan="handleAddPlan"
     @updatePlan="handleUpdatePlan"
     @deletePlan="handleDeletePlan"></router-view>
  </div>
</template>

<script>
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
      handleAddPlan(plan) {
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

      handleDeletePlan(planId) {
        let i = 0
        while (i < this.plans.length) {
          if (this.plans[i].id === planId) {
            this.plans.splice(i, 1)
            break
          }

          i++
        }
      }
    }
  }
</script>