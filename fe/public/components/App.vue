<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="l-absolute"></router-view>
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
  @import '../style/blocks/loader';
  @import '../style/animations/animation';
</style>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'App',

    data: function () {
      return {
        transitionName: ''
      }
    },

    computed: {
      ...mapState([
        'loading',
        'plans'
      ])
    },

    watch: {
      $route(to, from) {
        switchTransitionName.call(this, to, from)
      }
    }
  }

  function switchTransitionName(to, from) {
    const backRoute = {
      '/userRegister': '/',
      '/userLogin': '/',
      '/planAdd': ['/home', '/planDetail'],
      '/setting': '/home',
      '/pokemen': '/home',
      '/planEdit': '/planDetail',
      '/planDetail': '/home'
    }
    const backRouteFrom = Object.keys(backRoute)

    let fromPath = from.path,
      toPath = to.path;

    //planEdit和planDetail路由含/:planId
    [fromPath, toPath] = [fromPath, toPath].map(path => {
      return path.replace(/^((\/planEdit)|(\/planDetail))\/.+$/, (match, group) => {
        return group
      })
    })

    if (backRouteFrom.indexOf(fromPath) > -1 && backRoute[fromPath].indexOf(toPath) > -1) {
      this.transitionName = 'slide-right'
    } else if (backRouteFrom.indexOf(toPath) > -1 && backRoute[toPath].indexOf(fromPath) > -1) {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-up'
    }
  }
</script>