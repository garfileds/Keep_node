<template functional>
  <div class="color-panel__item"
   :style="{ backgroundColor: props.color}"></div>
</template>

<style>
  .color-panel__item {
    width: 100%;
    height: 3em;
  }
</style>

<script>
  export default {
    name: 'colorPanelItem',

    props: {
      color: String
    }
  }
</script>