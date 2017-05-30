<template>
  <main class="content">
    <header class="header">
      <span class="header__side floatL">
        <img class="response-img" src="../../images/svg/return.svg" alt="返回"
             @click="navBack">
      </span>
      <span class="header__side floatR">
        <img class="response-img" src="../../images/svg/right.svg" alt="确认修改"
             @click="handleConfirm">
      </span>
    </header>

    <section>
      <form id="editPlanForm">
        <filedInputText
         title="标题"
         inputName="title"
         :defaultValue="plan.title"></filedInputText>

        <filedInputText
          title="时间"
          inputName="start_day"
          :defaultValue="plan.progress.start_day"
          :disabled="true"></filedInputText>

        <filedColor :defaultColor="plan.color"></filedColor>

        <schedule
          :startDay="plan.progress.start_day"
          :days="plan.progress.days"
          :marked="plan.progress.marked"
          :done="plan.progress.done"
          :editable="false"></schedule>
      </form>
    </section>
  </main>
</template>

<style>
  .header {
    overflow: hidden;
  }

  .header__side {
    width: 15%;
    padding: 1em;
  }

  .content {
    width: 100vw;
    height: 100vh;

    color: #ffffff;

    background: url(../../images/planAdd_bg.jpg)
  }
</style>

<script>
  import filedInputText from './filedInputText'
  import filedColor from './filedColor'
  import schedule from './schedule2'

  import { formatDate, isDescendant, form2 } from '../../js/module/utils'

  const apiUpdatePlan = '/api/plan'

  export default {
    name: 'planEdit',

    props: ['plans'],

    data: function () {
      return {}
    },

    computed: {
      plan() {
        const planId = this.$route.params.id
        return this.plans.filter(plan => plan.id === planId)[0]
      }
    },

    methods: {
      handleConfirm() {
        const self = this,
              planId = this.plan.id
        let updateInfo = form2('#editPlanForm', 'object')
        delete updateInfo.start_day

        this.$http.post(`${apiUpdatePlan}/${planId}`, {
          body: JSON.stringify(updateInfo)
        })
        .then(response => {
          if (response.body.code === 'ok') {
            self.$emit('updatePlan', updateInfo, planId)
            router.push(`/planDetail/${planId}`)
          }
        })
      },

      navBack() {
        router.go(-1)
      }
    },

    components: { filedInputText, filedColor, schedule }
  }
</script>