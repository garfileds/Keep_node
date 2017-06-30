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
  import { formatDate, isDescendant, form2 } from '../../js/module/utils'

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

        this.$http.post(apiCreatePlan, formValue)
        .then(response => {
          let plan = self._mixinPlanForm(formValue)
          plan.id = response.body.message.plan_id

          self.$store.commit('addPlan', { plan })
          router.push(`/home`)
        })
      },

      navBack() {
        router.go(-1)
      },
      
      _mixinPlanForm(formValue) {
        let plan = {
          id: '',
          title: '',
          bg_image: '',
          color: '',
          progress_color: '#ffffff',
          progress: {
            start_day: '05/17/2017',
            days: 7,
            marked: [1, 2, 4, 7],
            done: []
          },
          status: 'ing'
        }

        let key, isOnlyObject
        let keySearch = function (obj) {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              isOnlyObject = Object.prototype.toString.call(obj[key]) === '[object Object]'
              isOnlyObject ? keySearch(obj[key]) : obj[key] = formValue[key] || obj[key]
            }
          }
        }

        keySearch(plan)

        return plan
      }
    },

    components: { fieldInputText, fieldDatePicker, fieldColor, fieldSchedule }
  }
</script>