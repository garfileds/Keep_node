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

    <section
     @click="checkDatePicker">
      <form id="addPlanForm">
        <filedInputText></filedInputText>
        <filedDatepicker></filedDatepicker>

        <div class="filed--other"
         v-show="!nowDatePicker">
          <p>haha</p>
          <p>uiui</p>
        </div>
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
  const filedDatepicker = require('./filedDatepicker')

  import utils from '../../js/module/utils'

  module.exports = {
    name: 'planAdd',

    data: function () {
      return {
        nowDatePicker: false
      }
    },

    methods: {
      checkDatePicker: function () {
        const pannelEl = document.querySelector('.el-picker-panel.el-date-picker')

        this.nowDatePicker = pannelEl && pannelEl.style.display !== 'none'
      }
    },

    components: { filedInputText, filedDatepicker }
  }
</script>