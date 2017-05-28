<template>
  <main>
    <img class="full-screen-img" src="../../images/planAdd_bg.jpg" alt="背景图片:在海边">
    <nav class="nav">
      <p class="icon icon--menu icon--large"
       @click="navBack">Up!Up!</p>
    </nav>
    <article>
      <header class="header">
        <h1 class="header__title">{{plan.title}}</h1>
        <p>Next: {{nextDay}}</p>
      </header>
      <main>
        <schedule
         :startDay="plan.progress.start_day"
         :days="plan.progress.days"
         :marked="plan.progress.marked"
         :done="plan.progress.done"
         :editable="true"
         @changeDay="handleChangeDay"></schedule>
      </main>
    </article>
  </main>
</template>

<style scoped>
  .nav {
    margin: 1em;
  }

  .header {
    padding: 2em 0 0 1em;
  }

  .header__title {
    font-weight: 400;
    margin-bottom: .5em;

    font-size: 2em;
  }
</style>

<script>
  import schedule from './schedule2'

  import { formatDate } from '../../js/module/utils'

  const apiUpdateDone = '/api/plan/{/id}/done'

  export default {
    name: 'planDetail',

    props: ['plans'],

    data: function () {
      return {}
    },

    computed: {
      plan() {
        const planId = this.$route.params.id
        return this.plans.filter(plan => plan.id === planId)[0]
      },

      nextDay() {
        const baseDate = new Date(this.plan.progress.start_day),
            today = new Date(formatDate(new Date())),
            timeOfDay = 24 * 60 * 60 * 1000,
            marked = this.plan.progress.marked

        let i = 0, tempDate
        while (i < marked.length) {
          tempDate = new Date(this.plan.progress.start_day)
          tempDate.setDate(baseDate.getDate() + marked[i] - 1)

          if (today.getTime() - tempDate.getTime() <= timeOfDay && this.plan.progress.done.indexOf(marked[i]) === -1) {
            break
          }

          i++
        }
        return formatDate(tempDate, 'mm/dd/yy')
      }
    },

    methods: {
      handleChangeDay(day) {
        const planId = this.$route.params.id

        let index = this.plan.progress.done.indexOf(day)
        const updateInfo = { day },
              updateResource = this.$resource(apiUpdateDone);

        if (this.plan.progress.marked.indexOf(day) > -1) {
          updateResource.save({ id: planId }, {
            body: JSON.stringify(updateInfo)
          })
          .then(response => {
            const code = response.body.code
            if (code === 'ok') {
              index === -1 ? this.plan.progress.done.push(day) : this.plan.progress.done.splice(index, 1)
            }
          })
        }
      },

      navBack() {
        router.go(-1)
      }
    },

    components: { schedule }
  }
</script>