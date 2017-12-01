<template>
  <main>
    <kHeader></kHeader>
    <section class="content">
      <section class="plans-ing">
        <draggable
         v-model="plansIng"
         :options="draggableOption"
         :move="onPlanMove"
         @choose="onPlanChoose"
         @end="onPlanDragEnd">
          <transition-group name="plansList" tag="div">
            <planThumbnail
             v-for="plan in plansIng"
             :plan="plan"
             :key="plan.id"
             @click.native="catPlan(plan.id, 'ing')"></planThumbnail>
          </transition-group>
        </draggable>
      </section>

      <section class="l-plans-switch"
       v-show="plansDone.length > 0"
       @click="switcher">
        <button class="c-button c-button--small c-button--success">{{plansSwitchMsg}}</button>
      </section>

      <section class="plans-done"
       v-show="plansDoneShow">
        <draggable
         v-model="plansIng"
         :options="draggableOption"
         :move="onPlanMove"
         @choose="onPlanChoose"
         @end="onPlanDragEnd">
          <transition-group name="plansList" tag="div">
            <planThumbnail
             v-for="planDone in plansDone"
             :key="planDone.id"
             :plan="planDone"
             @click.native="catPlan(planDone.id, 'done')"></planThumbnail>
          </transition-group>
        </draggable>
      </section>

      <section>
        <transition name="fade">
          <div v-if="!isDeleting" class="btn-first add-plan-btn" @click="routerPlanAdd" key="add"></div>

          <draggable
            key="remove"
            :options="draggableOption"
            class="btn-first delete-plan-btn"
            id="removeBtn"
            :class="{'hover-btn': deleteBtnIsHover}"
            @add="onPlanDrop"
            v-else>
          </draggable>

        </transition>

        <transition name="bounceInRight">
          <div
           class="btn-second cancel-btn"
           @click="onCancelDel"
           v-if="needOpt"></div>
        </transition>

        <transition name="bounceInLeft">
          <div
           class="btn-second confirm-btn"
           @click="onConfirmDel"
           v-if="needOpt"></div>
        </transition>
      </section>

      <draggable
       class="outside-area"
       :options="draggableOption"></draggable>
    </section>

    <transition name="fade">
      <section v-if="needOpt" class="mask"></section>
    </transition>
  </main>
</template>

<style lang="scss">
  @import '../../modules/style/transitions';
  @import '../../modules/style/blocks/button';

  .l-plans-switch {
    text-align: center;
    margin: .5em 0;
  }

  .btn-first {
    position: fixed;
    bottom: 2rem;
    left: 0;
    right: 0;

    width: 72px;
    height: 72px;
    margin-left: auto;
    margin-right: auto;

    background-size: 100%;

    z-index: 100001;
    transition: width 1s, height 1s;
  }

  .btn-second {
    position: fixed;
    bottom: 43px;
    left: 0;
    right: 0;

    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;

    background-size: 100%;

    z-index: 100001;
  }

  .add-plan-btn {
    background-image: url(../../images/svg/addition_fill.svg);
  }

  .delete-plan-btn {
    background-image: url(../../images/svg/delete_fill.svg);
  }
  
  .delete-plan-btn .c-plan {
    display: none;
  }

  .cancel-btn {
    right: 10rem;
    background-image: url(../../images/svg/cancel.svg);
  }

  .confirm-btn {
    left: 10rem;
    background-image: url(../../images/svg/confirm.svg);
  }

  .hover-btn {
    width: 100px;
    height: 100px;
  }

  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgba(0, 0, 0, .2);
  }

  .outside-area {
    position: fixed;
    width: 100%;
    height: 100%;
    display: block;
    min-height: 600px;
  }

  .outside-area .c-plan {
    display: none;
  }

  /* for cancel-btn / confirm-btn */
  .bounceInRight-enter-active {
    animation: bounceInRight 1s;
  }
  .bounceInRight-leave-active {
    animation: bounceOutRight 1s;
  }
  .bounceInLeft-enter-active {
    animation: bounceInLeft 1s;
  }
  .bounceInLeft-leave-active {
    animation: bounceOutLeft 1s;
  }

  .fade-enter-active {
    animation: fade-in 1s;
  }
  .fade-leave-active {
    animation: fade-in 1s reverse;
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
      return {
        isDeleting: false,

        deleteBtnIsHover: false,

        needOpt: false,

        draggableOption: {
          group: 'plansIng'
        },

        toDeleteId: ''
      }
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
      onPlanChoose() {
        this.isDeleting = true
      },

      onPlanMove(evt) {
        const movedId = evt.relatedContext.component.$el.id

        this.deleteBtnIsHover = movedId === 'removeBtn'
      },

      onPlanDrop(evt) {
        this.deleteBtnIsHover = false
        this.needOpt = true
        this.toDeleteId = evt.item.dataset.planid
      },

      onPlanDragEnd() {
        if (!this.needOpt) this.isDeleting = false
      },

      onCancelDel() {
        this.isDeleting = false
        this.needOpt = false
        this.deleteBtnIsHover = false
        this.toDeleteId = ''
      },

      onConfirmDel() {
        if (this.toDeleteId) {
          this.deletePlan({ planId: this.toDeleteId })
          this.cancelDelHandler()
        }
      },

      switcher() {
        this.changePlansDoneShow(!this.plansDoneShow)
      },

      catPlan(planId, status) {
        this.isDeleting = false
        this.$router.push(`/planDetail/${planId}?status=${status}`)
      },

      routerPlanAdd() {
        this.$router.push('/planAdd')
      },

      ...mapMutations([
        'changePlansDoneShow',
        'deletePlan'
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