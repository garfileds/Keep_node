<template>
  <main class="content">
    <header class="header">
      <span class="header__side floatL">
        <img class="response-img" src="../../images/svg/return.svg" alt="返回">
      </span>
      <span class="header__side floatR">
        <img class="response-img" src="../../images/svg/right.svg" alt="确认创建">
      </span>
    </header>

    <section>
      <form id="addPlanForm">
        <filedInputText></filedInputText>
        <section class="filed"></section>
        <section class="filed"></section>
        <section class="filed"></section>
      </form>
    </section>
  </main>
</template>

<style>
  .header {
    overflow: hidden;
  }

  .header__side {
    width: 15%;
    padding: 1em;
  }

  .content {
    width: 100vw;
    height: 100vh;

    color: #ffffff;

    background: url(../../images/planAdd_bg.jpg)
  }
</style>

<script>
  const filedInputText = require('./filedInputText')

  module.exports = {
    components: { filedInputText }
  }
</script>