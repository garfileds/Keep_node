<template>
  <main class="l-wrap">
    <welcomeSlide class="l-slide"></welcomeSlide>
    <section class="c-button-group">
      <router-link to="/userRegister" class="c-button l-button--full">创建账户</router-link>
      <router-link to="/userLogin" class="c-button l-button--full button--login">登录</router-link>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  @import '../../modules/style/blocks/button';

  .l-slide {
    margin: 2em 0;
  }

  .button--login {
    margin-top: 1em;
    background: #eaeceb;
    color: var(--color-black);
  }
</style>

<script>
  import welcomeSlide from './welcomeSlide'

  import { reset401HasHappened } from '../../modules/global/setHttp'

  module.exports = {
    name: 'welcome',

    components: { welcomeSlide }
  }
</script>