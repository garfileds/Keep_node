<template>
  <div id="app">
    <router-view
     :plans="plans"
     :plansDone="plansDone"
     :plansIng="plansIng"></router-view>
  </div>
</template>

<script>
  const apiGetPlans = '/api/plans'

  module.exports = {
    data: function () {
      return {
        plans: [],
        plansDone: [],
        plansIng: []
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
    }
  }
</script>