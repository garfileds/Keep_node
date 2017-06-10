<template>
  <header class="header">
    <router-link to="/setting" class="header__side">
      <img class="response-img" src="../../images/svg/setting.svg" alt="设置">
    </router-link>
    <h1 class="header__center">Up! Up!</h1>
    <router-link to="/myCup" class="header__side">
      <img class="response-img" src="../../images/svg/cup.svg" alt="图鉴">
    </router-link>
  </header>
</template>

<style scoped>
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    width: 100%;
    border-bottom: 1px solid #dcd7d7;
    box-shadow: 0 2px 10px #dcd7d7;
    margin-bottom: 1em;
  }

  .header__side {
    width: 10%;
    padding: .5em;
  }
  .header__center {
    width: 80%;
    text-align: center;

    font-size: 1em;
    font-weight: 400;
    color: #000000;
  }
</style>

<script>
  export default {
    name: 'kHeader'
  }
</script>