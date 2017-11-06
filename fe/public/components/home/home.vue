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

      <transition name="fade">
        <section class="add-plan-btn" @click="routerPlanAdd"></section>
      </transition>
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

  .fade-enter-active {
    animation: fade-in .5s .5s;
  }
  .fade-leave-active {
    animation: fade-in .5s reverse;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>

<script>
  import kHeader from './kHeader'
  import planThumbnail from './planThumbnail'
  import draggable from 'vuedraggable'

  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  module.exports = {
    name: 'home',

    data: function() {
      return {}
    },

    computed: {
      plansSwitchMsg() {
        return this.plansDoneShow ? '隐藏已完成的计划' : "显示已完成的计划"
      },

      ...mapState([
        'needInit',
        'plans',
        'plansDoneShow'
      ]),

      ...mapGetters([
        'plansDone',
        'plansIng'
      ])
    },

    methods: {
      switcher() {
        this.changePlansDoneShow(!this.plansDoneShow)
      },

      catPlan(planId, status) {
        this.$router.push(`/planDetail/${planId}?status=${status}`)
      },

      routerPlanAdd() {
        this.$router.push('/planAdd')
      },

      ...mapMutations([
        'changePlansDoneShow'
      ]),

      ...mapActions([
        'getPlans',
        'startSyncTimer',
        'getPokemen'
      ])
    },

    created: function() {
      if (this.needInit) {
        this.getPlans().then(this.startSyncTimer)
        this.getPokemen()
      }
    },

    components: { planThumbnail, kHeader, draggable }
  }
</script>