<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
</style>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'App',

    computed: {
      ...mapState([
        'loading',
        'plans'
      ])
    }
  }
</script>