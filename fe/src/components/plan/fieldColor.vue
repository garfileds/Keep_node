<template>
  <section class="field">
    <div class="field__name">颜色</div>
    <input type="hidden" name="color" v-model="selectedColor.backgroundColor">
    <input type="hidden" name="progress_color" :value="progressColor">
    <div class="field__content"
     :style="selectedColor"
     @click="togglePanel(true)"></div>

    <transition name="slide">
      <section class="color-panel"
       v-show="panelVisible"
       @click="selectColor">
        <div class="color-panel__return"
         @click="togglePanel(false)"></div>

        <color-panel-item
         v-for="color in colors"
         :key="color"
         :color="color"></color-panel-item>
      </section>
    </transition>
  </section>
</template>

<style lang="scss" scoped>
  @import '~style/blocks/field';
  @import '~style/transitions';

  .field__content {
    width: 3em;
    height: 3em;
    min-width: 3em;
  }

  .color-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 101;
    overflow: scroll;
  }

  .color-panel__return {
    background-image: url(~images/svg/return.svg);
    background-size: 100%;

    position: fixed;
    top: 1em;
    left: 1em;

    width: 3em;
    height: 3em;
  }
</style>

<script>
  import { colorGenerator } from '@/modules/helper/utils'

  import colorPanelItem from './colorPanelItem'

  export default {
    name: 'fieldColor',

    props: ['defaultColor'],

    data: function () {
      return {
        selectedColor: {
          'backgroundColor': this.defaultColor || '#76FF7B'
        },

        panelVisible: false
      }
    },

    computed: {
      colors: function () {
        return colorGenerator()
      },

      progressColor() {
        return '#fff'
      }
    },

    methods: {
      togglePanel(statu) {
        this.panelVisible = statu
      },

      selectColor(event) {
        const targetEl = event.target

        if (targetEl.className === 'color-panel__item') {
          this.selectedColor['backgroundColor'] = targetEl.style.backgroundColor
          this.panelVisible = false
        }
      }
    },

    components: { colorPanelItem }
  }
</script>