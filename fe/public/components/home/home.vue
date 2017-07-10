<template>
  <main>
    <kHeader></kHeader>
    <section class="content">
      <section class="plans-ing">
        <planThumbnail
         v-for="plan in plansIng"
         :plan="plan"
         @click.native="catPlan(plan.id, 'ing')"></planThumbnail>
      </section>

      <section class="l-plans-switch"
       v-show="plansDone.length > 0"
       @click="switcher">
        <button class="c-button c-button--small c-button--success">{{plansSwitchMsg}}</button>
      </section>

      <section class="plans-done"
       v-show="plansDoneShow">
        <planThumbnail
         v-for="planDone in plansDone"
         :plan="planDone"
         @click.native="catPlan(planDone.id, 'done')"></planThumbnail>
      </section>

      <section class="add-plan-btn" @click="routerPlanAdd"></section>
    </section>
  </main>
</template>

<style lang="scss">
  @import '../../style/blocks/button';

  .l-plans-switch {
    text-align: center;
    margin: .5em 0;
  }

  .add-plan-btn {
    position: fixed;
    bottom: 2em;
    left: 0;
    right: 0;

    width: 72px;
    height: 72px;
    margin-left: auto;
    margin-right: auto;

    background-image: url(../../images/svg/addition_fill.svg);
    background-size: 100%;
  }
</style>

<script>
  import kHeader from './kHeader'
  import planThumbnail from './planThumbnail'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'home',

    data: function() {
      return {
        plansDoneShow: false,
      }
    },

    computed: {
      plansSwitchMsg() {
        return this.plansDoneShow ? '隐藏已完成的计划' : "显示已完成的计划"
      },

      ...mapState([
        'needInit',
        'plans'
      ]),

      ...mapGetters([
        'plansDone',
        'plansIng'
      ])
    },

    methods: {
      switcher() {
        this.plansDoneShow = !this.plansDoneShow
      },

      catPlan(planId, status) {
        router.push(`/planDetail/${planId}?status=${status}`)
      },

      routerPlanAdd() {
        router.push('/planAdd')
      },

      ...mapActions([
        'getPlans',
        'startSyncTimer'
      ])
    },

    created: function() {
      if (this.needInit) {
        this.getPlans().then(this.startSyncTimer)
      }
    },

    components: { planThumbnail, kHeader }
  }
</script>