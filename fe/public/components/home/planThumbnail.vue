<template>
  <div class="plan"
   :style="colorStyle">
    <div class="plan__progress"
     :style="progressStyle"></div>

    <div class="plan__content">
      <p class="plan__content__name">
        {{plan.name}}
      </p>
      <p class="plan__content__next">
        下一次：05/18/2017
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
  module.exports = {
    props: ['plan'],

    data: function() {
      return {
        colorStyle: {
          'background-color': this.plan.color
        }
      }
    },

    computed: {
      progressStyle: function() {
        const doneRatio = Math.ceil(this.plan.progress.done.length / this.plan.progress.marked.length * 100)
        return {
          'background-color': this.plan.progress_color,
          width: doneRatio + '%'
        }
      }
    }
  }
</script>