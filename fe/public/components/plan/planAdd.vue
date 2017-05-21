<template>
  <main class="content"
   @click="handleClickOutside">
    <header class="header">
      <span class="header__side floatL">
        <img class="response-img" src="../../images/svg/return.svg" alt="返回">
      </span>
      <span class="header__side floatR">
        <img class="response-img" src="../../images/svg/right.svg" alt="确认创建">
      </span>
    </header>

    <section>
      <form id="addPlanForm">
        <filedInputText></filedInputText>

        <filedDatepicker
         @changeVisible="handleChangeVisible"
         @changeDate="handleChangeDate"></filedDatepicker>

        <filedColor v-show="!datePickerVisible"></filedColor>

        <filedSchedule
         ref="filedSchedule"
         v-show="!datePickerVisible"
         :selectedDay="selectedDay"
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
  import filedDatepicker from './filedDatepicker'
  import filedColor from './filedColor'
  import filedSchedule from './filedSchedule'

  import { formatDate, isDescendant } from '../../js/module/utils'

  module.exports = {
    name: 'planAdd',

    data: function () {
      let defaultDay = formatDate(new Date())

      return {
        datePickerVisible: false,
        scheduleVisible: false,

        selectedDay: defaultDay
      }
    },

    methods: {
      handleChangeVisible(status) {
        this.datePickerVisible = status
      },

      handleChangeDate(selectedDay) {
        this.selectedDay = selectedDay
      },

      handleClickOutside(event) {
        let targetEl = event.target;

        if (this.scheduleVisible && !isDescendant(this.$refs.filedSchedule.$el, targetEl)) {
          this.scheduleVisible = false
        }
      },

      handleChangeScheduleVisible(status) {
        this.scheduleVisible = status
      }
    },

    components: { filedInputText, filedDatepicker, filedColor, filedSchedule }
  }
</script>