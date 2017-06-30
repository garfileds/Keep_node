<template>
  <header class="header">
    <div class="l-box-shadow l-grid">
      <router-link to="/setting" class="l-header__side l-grid__item--1">
        <img class="response-img" src="../../images/svg/setting.svg" alt="设置">
      </router-link>
      <h1 class="header__center l-grid__item--8">Up! Up!</h1>
      <router-link to="/myCup" class="l-header__side l-grid__item--1">
        <img class="response-img" src="../../images/svg/cup.svg" alt="图鉴">
      </router-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .l-header__side {
    padding: .5em;
  }
</style>

<script>
  export default {
    name: 'kHeader'
  }
</script>