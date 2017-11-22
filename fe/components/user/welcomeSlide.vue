<template>
  <section>
    <div class="stage">
      <img class="response-img stage__item" src="../../images/all-devices.png" alt="随时随地使用">
    </div>
    <p class="description">随时随地使用...</p>
    <div class="bar"></div>
  </section>
</template>

<style scoped>
  .stage {
    position: relative;
    width: 100%;
  }

  .stage::before {
    content: '';
    padding-bottom: 56.25%;
    width: 1px;
    vertical-align: middle;
  }

  .stage__item {
    max-height: 100%;
  }

  .description {
    color: #000000;
    text-align: center;
    margin-top: 2em;
  }
</style>

<script>
  export default {
    name: 'welcomeSlide'
  }
</script>