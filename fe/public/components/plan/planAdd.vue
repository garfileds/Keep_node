<template>
  <main class="content"
   @click="handleClickOutside">
    <header class="header">
      <span class="header__side floatL">
        <img class="response-img" src="../../images/svg/return.svg" alt="返回"
         @click="navBack">
      </span>
      <span class="header__side floatR">
        <img class="response-img" src="../../images/svg/right.svg" alt="确认创建"
         @click="handleConfirm">
      </span>
    </header>

    <section>
      <form id="addPlanForm">
        <filedInputText
         title="标题"
         inputName="title"></filedInputText>

        <filedDatePicker
         @changeVisible="handleChangeVisible"
         @changeDate="handleChangeDate"></filedDatePicker>

        <filedColor v-show="!datePickerVisible"></filedColor>

        <filedSchedule
         ref="filedSchedule"
         v-show="!datePickerVisible"
         :startDay="startDay"
         :scheduleVisible="scheduleVisible"
         @changeScheduleVisible="handleChangeScheduleVisible"></filedSchedule>
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
  import filedDatePicker from './filedDatePicker'
  import filedColor from './filedColor'
  import filedSchedule from './filedSchedule'

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

        if (this.scheduleVisible && !isDescendant(this.$refs.filedSchedule.$el, targetEl)) {
          this.scheduleVisible = false
        }
      },

      handleChangeScheduleVisible(status) {
        this.scheduleVisible = status
      },

      handleConfirm() {
        const self = this
        const formValue = form2('#addPlanForm', 'object')

        this.$http.post(apiCreatePlan, {
          responseType: 'json',
          headers: {
            'Content-Type': 'application/json'
          },
          body: formValue
        })
        .then(response => {
          let plan = self._mixinPlanForm(formValue)
          plan.id = response.body.message.planId

          self.$emit('postPlan', plan)
          router.push(`/`)
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

        formValue.marked = formValue.marked.split(',').map(parseInt)

        keySearch(plan)

        return plan
      }
    },

    components: { filedInputText, filedDatePicker, filedColor, filedSchedule }
  }
</script>