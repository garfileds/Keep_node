<template>
  <div class="plan"
   :style="colorStyle">
    <div class="plan__progress"
     :style="progressStyle"></div>

    <div class="plan__content">
      <p class="plan__content__name">
        {{plan.title}}
      </p>
      <p class="plan__content__next">
        下一次：{{nextDay}}
      </p>
    </div>
    <div class="plan__badge">
      <img class="response-img" src="../../images/Bulbasaur.png" alt="Bulbasaur">
    </div>
  </div>
</template>

<style>
  .plan {
    display: flex;
    align-items: center;

    position: relative;

    color: #ffffff;
  }

  .plan__content {
    width: 80%;
    padding: .5em;
    text-align: left;
  }

  .plan__content__name, .plan__content__next {
    padding: .5em;
  }

  .plan__badge {
    width: 20%;
    padding: .5em;
  }

  .plan__progress {
    position: absolute;
    top: 0;

    height: 2px;
  }
</style>

<script>
  import { formatDate } from '../../js/module/utils'

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
        const doneRatio = Math.ceil(this.plan.progress.done.length / this.plan.progress.marked.length * 100)
        return {
          'background-color': this.plan.progress_color,
          width: doneRatio + '%'
        }
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