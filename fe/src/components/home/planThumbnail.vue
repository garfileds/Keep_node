<template>
  <div class="c-plan"
   :style="colorStyle"
   :data-planid="plan.id">
    <div class="c-plan__progress"
     :style="progressStyle"></div>

    <div class="c-plan__content">
      <p class="c-plan__content__name">
        {{plan.title}}
      </p>
      <p class="c-plan__content__next">
        下一次：{{nextDay}}
      </p>
    </div>
    <div class="c-plan__badge">
      <img class="response-img" :src="plan.pokeman_img" :alt="plan.pokeman_name"
       :style="pokemanStyle">
    </div>
  </div>
</template>

<style lang="scss">
  @import '~style/blocks/plan';
</style>

<script>
  import { formatDate } from '@/modules/helper/utils'

  export default {
    name: 'planThumbnail',

    props: ['plan'],

    data: function() {
      return {
        colorStyle: {
          'background-color': this.plan.color
        }
      }
    },

    computed: {
      progressStyle() {
        let doneRatio = Math.ceil(this.plan.progress.done.length / this.plan.progress.marked.length * 100)
        return {
          'background-color': this.plan.progress_color,
          width: doneRatio + '%'
        }
      },

      pokemanStyle() {
        let doneRatio = Math.ceil(this.plan.progress.done.length / this.plan.progress.marked.length * 100),
          opacity = doneRatio === 100 ? 1 : doneRatio >= 60 ? 0.6 : 0.2

        return { opacity }
      },

      nextDay() {
        const baseDate = new Date(this.plan.progress.start_day),
              today = new Date(formatDate(new Date())),
              timeOfDay = 24 * 60 * 60 * 1000,
              marked = this.plan.progress.marked

        let i = 0, tempDate
        while (i < marked.length) {
          tempDate = new Date(this.plan.progress.start_day)
          tempDate.setDate(baseDate.getDate() + marked[i] - 1)

          if (today.getTime() - tempDate.getTime() <= timeOfDay && this.plan.progress.done.indexOf(marked[i]) === -1) {
            break
          }

          i++
        }
       return formatDate(tempDate, 'mm/dd/yy')
      }
    }
  }
</script>