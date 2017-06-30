<template>
  <main class="main--bg">
    <header class="header">
      <div class="l-grid l-grid--between">
        <span class="header__side floatL">
          <img class="response-img" src="../../images/svg/return.svg" alt="返回"
             @click="navBack">
        </span>
        <span class="header__side floatR">
          <img class="response-img" src="../../images/svg/right.svg" alt="确认修改"
             @click="handleConfirm">
        </span>
      </div>
    </header>

    <section>
      <form id="editPlanForm">
        <fieldInputText
         title="标题"
         inputName="title"
         :defaultValue="plan.title"></fieldInputText>

        <fieldInputText
          title="时间"
          inputName="start_day"
          :defaultValue="plan.progress.start_day"
          :disabled="true"></fieldInputText>

        <fieldColor :defaultColor="plan.color"></fieldColor>

        <schedule class="l-schedule"
          :startDay="plan.progress.start_day"
          :days="plan.progress.days"
          :marked="plan.progress.marked"
          :done="plan.progress.done"
          :editable="false"
          :tipVisible="false"></schedule>
      </form>
    </section>
  </main>
</template>

<style scoped>
  .header__side {
    width: 15%;
    padding: 1em;
  }

  .l-schedule {
    position: absolute;
    bottom: 8rem
  }
</style>

<script>
  import fieldInputText from './fieldInputText'
  import fieldColor from './fieldColor'
  import schedule from './schedule'

  import { mapMutations } from 'vuex'
  import { formatDate, isDescendant, form2 } from '../../js/module/utils'

  export default {
    name: 'planEdit',

    data: function () {
      return {}
    },

    computed: {
      plan() {
        const planId = this.$route.params.id
        return this.$store.state.plans.filter(plan => plan.id === planId)[0]
      }
    },

    methods: {
      ...mapMutations([
        'updatePlan'
      ]),

      handleConfirm() {
        const self = this,
              planId = this.plan.id
        let updateInfo = form2('#editPlanForm', 'object')
        delete updateInfo.start_day

        self.updatePlan({ updateInfo, planId })
        router.push(`/planDetail/${planId}`)
      },

      navBack() {
        router.go(-1)
      }
    },

    components: { fieldInputText, fieldColor, schedule }
  }
</script>