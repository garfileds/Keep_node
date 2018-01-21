<template>
  <div
   id="app"
   @touchstart="onTouchstart"
   @touchmove="onTouchmove"
   @touchend="onTouchend">
    <transition :name="transitionName">
      <keep-alive v-if="needCache">
        <router-view class="l-absolute" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition :name="transitionName">
      <router-view class="l-absolute" v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <div class="c-loader l-loader" v-show="loading.isLoading">
      <div class="c-loader__content pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>{{loading.tip}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~style/blocks/loader';
  @import '~style/transitions';
</style>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',

    data: function () {
      return {
        // 是否右滑触发后退路由
        isRightSlide: false,
        startScreenX: 0,
        startScreenY: 0
      }
    },

    computed: {
      ...mapState([
        'loading',
        'plans',
        'needCache',
        'transitionName'
      ])
    },

    methods: {
      onTouchstart(evt) {
        let touch

        if (evt.changedTouches.length === 1) {
          touch = evt.changedTouches[0]

          this.isRightSlide = false
          this.startScreenX = touch.screenX
          this.startScreenY = touch.screenY
        }
      },

      onTouchmove(evt) {
        evt.changedTouches.length === 1
        && this._isRightSlide(evt.changedTouches[0])
        && evt.preventDefault()
      },

      onTouchend(evt) {
        evt.changedTouches.length === 1
        && this._isRightSlide(evt.changedTouches[0])
        && this.$router.go(-1)
      },

      _isRightSlide(targetTouch) {
        const tranverse = targetTouch.screenX - this.startScreenX,
          vertical = Math.abs(targetTouch.screenY - this.startScreenY)

        return tranverse >= 50 && tranverse > vertical
      }
    }
  }
</script>