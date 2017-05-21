<template>
  <section class="filed">
    <div class="filed__name">套餐</div>
    <div class="filed__content">
      <p class="filed__text"
         v-show="!scheduleVisible"
         @click.stop="togglePicker(true)">{{selectedSchedule}}</p>

      <smooth-picker ref="picker"
       :data="config"
       :change="dataChange"
       v-show="scheduleVisible"></smooth-picker>
      <input type="hidden" name="days" v-model="days">
      <input type="hidden" name="selected" v-model="selected">
    </div>
    <schedule
     :days="days"
     :startDay="selectedDay"
     :selected="selected"
     :editable="editable"
     v-show="scheduleVisible"
     @changeDay="handleChangeDay"></schedule>
  </section>
</template>

<style>
  @import url(/node_modules/vue-smooth-picker/dist/css/style.css);

  .filed {
    position: relative;
  }

  .schedule-group {
    background: rgba(98, 186, 206, 0.8);
  }

  .filed__text {
    background: rgba(98, 186, 206, 0.5);
    width: 130px;
    height: 100%;
    line-height: 3em;
  }
</style>

<script>
  import SmoothPicker from 'vue-smooth-picker'
  Vue.use(SmoothPicker)

  import schedule from './schedule'

  export default {
    name: 'filedSchedule',

    props: ['selectedDay', 'scheduleVisible'],

    data: function () {
      return {
        config: [{
          currentIndex: 2,
          list: [
            '欢乐7', '走心14', '自定义'
          ],
          textAlign: 'center',
          className: 'schedule-group'
        }],

        days: 7,
        selected: [1, 2, 4, 7],
        editable: false
      }
    },

    created: function () {
      if (this.config[0].currentIndex !== 0) {
        this.dataChange(0, this.config[0].currentIndex)
      }
    },

    computed: {
      selectedSchedule() {
        const currentIndex = this.config[0].currentIndex
        return this.config[0].list[currentIndex]
      }
    },

    methods: {
      dataChange(gIndex, itemIndex) {
        switch (itemIndex) {
          case 0:
            this.days = 7
            this.selected = [1, 2, 4, 7]
            this.editable = false
            break
          case 1:
            this.days = 14
            this.selected = [1, 2, 4, 6, 9, 12, 14]
            this.editable = false
            break
          case 2:
            this.days = 21
            this.selected = []
            this.editable = true
            break;
        }
      },

      togglePicker(status) {
        this.$emit('changeScheduleVisible', status)
      },

      handleChangeDay(day) {
        let index = this.selected.indexOf(parseInt(day))

        if (index === -1) {
          this.selected.push(day)
        } else {
          this.selected.splice(index, 1)
        }
      }
    },

    components: { schedule }
  }
</script>