<template>
  <main>
    <welcomeSlide class="slide"></welcomeSlide>
    <section class="btn-group">
      <router-link to="/userRegister" class="button button--full">创建账户</router-link>
      <router-link to="/userLogin" class="button button--full button--login">登录</router-link>
    </section>
  </main>
</template>

<style scoped>
  .slide {
    margin-top: 2em;
  }

  .btn-group {
    padding: 0 1em;
    margin-top: 4em;
  }

  .button--login {
    margin-top: 1em;
    background: #EAECEB;
    color: #000000;
  }
</style>

<script>
  import welcomeSlide from './welcomeSlide'

  export default {
    name: 'welcome',
    components: { welcomeSlide }
  }
</script>