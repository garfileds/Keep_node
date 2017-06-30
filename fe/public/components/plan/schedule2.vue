<template>
  <section class="schedule l-schedule"
           @click="handleSelectDay">
    <div class="schedule__progress" :style="progressWidth"></div>
    <div class="schedule__item"
         v-for="(day, index) in daysArr"
         :data-day="day"
         :class="{'schedule__item--unselected': marked.indexOf(day) === -1,
           'schedule__item--overdue': overdue.indexOf(day) > -1,
           'schedule__item--done': done.indexOf(day) > -1}">
      <p>Day&nbsp;{{day}}</p>
      <p>{{datesArr[index]}}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '../../style/blocks/schedule';

  .l-schedule {
    position: absolute;
    bottom: 8rem
  }
</style>

<script>
  import { formatDate, getParentEl } from '../../js/module/utils'

  export default {
    props: ['startDay', 'days', 'marked', 'done', 'editable'],

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