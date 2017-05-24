<template>
  <div id="app">
    <router-view
     :plans="plans"
     :plansDone="plansDone"
     :plansIng="plansIng"
     @postPlan="handlePostPlan"></router-view>
  </div>
</template>

<script>
  const apiGetPlans = '/api/plans'

  module.exports = {
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

        self.plans.forEach(plan => {
          if (plan.statu === 'done') {
            self.plansDone.push(plan)
          } else {
            self.plansIng.push(plan)
          }
        })
      })
    },

    methods: {
      handlePostPlan(plan) {
        this.plans.push(plan)
      }
    }
  }
</script>