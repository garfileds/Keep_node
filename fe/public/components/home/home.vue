<template>
  <main>
    <kHeader></kHeader>
    <section class="content">
      <section class="plans-ing">
        <planThumbnail v-for="plan in plansIng"
         :plan="plan"></planThumbnail>
      </section>

      <section class="plans-switch"
       v-show="plansDone.length > 0"
       @click="switcher">
        <span class="plans-switch__content">{{plansSwitchMsg}}</span>
      </section>

      <section class="plans-done"
       v-show="plansDoneShow">
        <planThumbnail v-for="planDone in plansDone"
         :plan="planDone"></planThumbnail>
      </section>

      <section class="add-plan-btn">
        <router-link to="/planAdd">
          <img class="response-img" src="../../images/svg/addition_fill.svg" alt="添加计划">
        </router-link>
      </section>
    </section>
  </main>
</template>

<style>
  .plans-switch {
    text-align: center;
    margin: .5em 0;
  }

  .plans-switch__content {
    display: inline-block;
    font-size: .625em;

    padding: .5em;
    background: #76FF7B;
    color: #ffffff;
  }

  .add-plan-btn {
    position: fixed;
    bottom: 2em;
    left: 0;
    right: 0;

    width: 72px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
  import kHeader from './kHeader'
  import planThumbnail from './planThumbnail'

  export default {
    name: 'home',

    props: ['plans', 'plansDone', 'plansIng'],

    data: function() {
      return {
        plansDoneShow: false
      }
    },

    computed: {
      plansSwitchMsg() {
        return this.plansDoneShow ? '隐藏已完成的计划' : "显示已完成的计划"
      }
    },

    methods: {
      switcher() {
        this.plansDoneShow = !this.plansDoneShow
      }
    },

    components: { planThumbnail, kHeader }
  }
</script>