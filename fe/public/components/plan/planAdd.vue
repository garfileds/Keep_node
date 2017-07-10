<template>
  <main class="main--bg"
   @click="handleClickOutside">
    <header class="header">
      <div class="l-grid l-grid--between">
        <span class="header__side">
          <img class="response-img" src="../../images/svg/return.svg" alt="返回"
             @click="navBack">
        </span>
        <span class="header__side">
          <img class="response-img" src="../../images/svg/right.svg" alt="确认创建"
             @click="handleConfirm">
        </span>
      </div>
    </header>

    <section>
      <form id="addPlanForm">
        <fieldInputText
         title="标题"
         inputName="title"></fieldInputText>

        <fieldDatePicker
         @changeVisible="handleChangeVisible"
         @changeDate="handleChangeDate"></fieldDatePicker>

        <fieldColor v-show="!datePickerVisible"></fieldColor>

        <fieldSchedule
         ref="fieldSchedule"
         v-show="!datePickerVisible"
         :startDay="startDay"
         :scheduleVisible="scheduleVisible"
         @changeScheduleVisible="handleChangeScheduleVisible"></fieldSchedule>
      </form>
    </section>
  </main>
</template>

<style scoped>
  .header__side {
    width: 15%;
    padding: 1em;
  }
</style>

<script>
  import fieldInputText from './fieldInputText'
  import fieldDatePicker from './fieldDatePicker'
  import fieldColor from './fieldColor'
  import fieldSchedule from './fieldSchedule'

  import { mapMutations } from 'vuex'
  import { formatDate, isDescendant, form2, isPureObject } from '../../js/module/utils'

  const apiCreatePlan = '/api/plan'

  export default {
    name: 'planAdd',

    data: function () {
      let defaultDay = formatDate(new Date())

      return {
        datePickerVisible: false,
        scheduleVisible: false,

        startDay: defaultDay
      }
    },

    methods: {
      handleChangeVisible(status) {
        this.datePickerVisible = status
      },

      handleChangeDate(startDay) {
        this.startDay = startDay
      },

      handleClickOutside(event) {
        let targetEl = event.target;

        if (this.scheduleVisible && !isDescendant(this.$refs.fieldSchedule.$el, targetEl)) {
          this.scheduleVisible = false
        }
      },

      handleChangeScheduleVisible(status) {
        this.scheduleVisible = status
      },

      handleConfirm() {
        const self = this
        let formValue = form2('#addPlanForm', 'object')

        formValue['marked'] = formValue.marked.split(',').map(el => {
          return parseInt(el)
        })
        formValue['days'] = parseInt(formValue.days)

        this.$http.post(apiCreatePlan, formValue)
        .then(response => {
          if (response.status === 201) {
            let plan = self._mixinPlanForm(formValue)
            plan._id = plan.id = response.body.plan_id

            self.$store.commit('addPlan', { plan })
            self.$router.push(`/home`)
          }
        })
      },

      navBack() {
        router.go(-1)
      },
      
      _mixinPlanForm(formValue) {
        let plan = {
          _id: '',
          id: '',
          title: '',
          bg_image: '',
          color: '',
          progress_color: "#fff",
          progress: {
            days: 21,
            start_day: '',
            done: [],
            marked: []
          },
          status: 'ing'
        }

        const keySearch = function keySearch(obj) {
          Object.keys(obj).forEach(key => {
            plan.hasOwnProperty(key) ? plan[key] = obj[key]
              : plan.progress[key] = obj[key]
          })
        }

        keySearch(formValue)

        return plan
      }
    },

    components: { fieldInputText, fieldDatePicker, fieldColor, fieldSchedule }
  }
</script>