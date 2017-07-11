<template>
  <main>
    <kBg></kBg>
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

    <section class="l-wrap">
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

        <schedule class="l-schedule l-wrap"
          :startDay="plan.progress.start_day"
          :days="plan.progress.days"
          :marked="plan.progress.marked"
          :done="plan.progress.done"
          :editable="false"
          :tipVisible="false"
          @changeDay="handleChangeDay"></schedule>
      </form>
    </section>
  </main>
</template>

<style scoped>
  .header__side {
    width: 15%;
    padding: 1em;
    max-width: 64px;
  }

  .l-schedule {
    position: fixed;
    bottom: 8rem
  }
</style>

<script>
  import kBg from './kBg'
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
        'updatePlan',
        'donePlan'
      ]),

      handleConfirm() {
        const self = this,
              planId = this.plan.id
        let updateInfo = form2('#editPlanForm', 'object')
        delete updateInfo.start_day

        self.updatePlan({ updateInfo, planId })
        router.push(`/planDetail/${planId}`)
      },

      handleChangeDay(day) {
        const planId = this.plan.id
        this.donePlan({ planId, day })
      },

      navBack() {
        router.go(-1)
      }
    },

    components: { kBg, fieldInputText, fieldColor, schedule }
  }
</script>