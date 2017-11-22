<template>
  <section class="schedule"
           @click="handleSelectDay">
    <div class="schedule__progress" :style="progressWidth" v-if="progressVisible"></div>
    <div class="schedule__item"
         v-for="(day, index) in daysArr"
         :data-day="day"
         :class="{'schedule__item--unselected': marked.indexOf(day) === -1,
           'schedule__item--overdue': overdue.indexOf(day) > -1,
           'schedule__item--done': done.indexOf(day) > -1}">
      <p>Day&nbsp;{{day}}</p>
      <p>{{datesArr[index]}}</p>
    </div>
    <p class="icon icon--info" v-if="tipVisible">计划创建后，无法修改。奔跑吧，少年。</p>
  </section>
</template>

<style lang="scss" scoped>
  @import '../../modules/style/blocks/schedule';
</style>

<script>
  import { formatDate, getParentEl } from '../../modules/helper/utils'

  export default {
    props: {
      'startDay': [Number, String],
      'days': [Number, String],
      'marked': {
        type: Array,
        default: () => []
      },
      'done': {
        type: Array,
        default: () => []
      },
      editable: Boolean,
      progressVisible: {
        type: Boolean,
        default: true
      },
      tipVisible: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      daysArr() {
        let i = 1,
          result = []

        while (i <= this.days) {
          result.push(i++)
        }

        return result
      },

      datesArr() {
        let baseDate = new Date(this.startDay),
          result = [],
          i = 0

        result.push(formatDate(baseDate, 'mm/dd'))

        while (i++ < this.days) {
          baseDate.setDate(baseDate.getDate() + 1)
          result.push(formatDate(baseDate, 'mm/dd'))
        }

        return result
      },

      overdue() {
        const timeOfDay = 24 * 60 * 60 * 1000
        const today = new Date(formatDate(new Date()))
        return this.marked.filter(day => {
          let markedDate = new Date(this.startDay)
          markedDate.setDate(markedDate.getDate() + day - 1)

          return today.getTime() - markedDate.getTime() >= timeOfDay
        })
      },

      progressWidth() {
        const doneRatio = Math.ceil(this.done.length / this.marked.length * 100)
        return {
          width: doneRatio + '%'
        }
      }
    },

    methods: {
      handleSelectDay(event) {
        let targetEl = event.target,
          parent

        if (!this.editable) return

        if (targetEl.className.indexOf('.schedule__item') > -1) {
          parent = targetEl
        } else {
          parent = getParentEl('.schedule__item', targetEl)
        }

        this.$emit('changeDay', parseInt(parent.dataset.day))
      }
    }
  }
</script>