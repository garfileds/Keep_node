<template>
  <section class="schedule l-schedule"
   @click="handleSelectDay">
    <div class="schedule__item"
     v-for="(day, index) in daysArr"
     :data-day="day"
     :class="{'schedule__item--unselected': marked.indexOf(day) === -1}">
      <p>Day&nbsp;{{day}}</p>
      <p>{{datesArr[index]}}</p>
    </div>
    <p class="icon icon--info">计划创建后，无法修改。奔跑吧，少年。</p>
  </section>
</template>

<style lang="scss" scoped>
  @import '../../style/blocks/schedule';
</style>

<script>
  import { formatDate, getParentEl } from '../../js/module/utils'

  export default {
    props: ['startDay', 'days', 'marked', 'editable'],

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