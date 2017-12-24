<template>
  <section>
    <div class="stage">
      <img class="response-img stage__item" src="../../images/all-devices_medium@1x.png"
           alt="多端适用"
           srcset="../../images/all-devices_medium@1x.png 720w, ../../images/all-devices_medium@2x.png 1440w, ../../images/all-devices_xlarge@2x.png 2048w"
           sizes="100vw">
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