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
        <filedDatepicker @changeVisible="handleChangeVisible"></filedDatepicker>
        <filedColor v-show="!datePickerVisible"></filedColor>
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
  import filedInputText from './filedInputText'
  import filedDatepicker from './filedDatepicker'
  import filedColor from './filedColor'

  module.exports = {
    name: 'planAdd',

    data: function () {
      return {
        datePickerVisible: false
      }
    },

    methods: {
      handleChangeVisible(statu) {
        this.datePickerVisible = statu
      }
    },

    components: { filedInputText, filedDatepicker, filedColor }
  }
</script>