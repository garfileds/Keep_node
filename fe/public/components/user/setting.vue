<template>
  <main>
    <header class="header">
      <router-link to="/home" class="header__side">
        <img class="response-img" src="../../images/svg/return_black.svg" alt="返回">
      </router-link>
      <h1 class="header__center">设置</h1>
    </header>
    <div class="content">
      <section class="c-info">
        <img class="c-info__avatar" src="../../images/avatar_default.jpg" alt="默认头像：富贵儿与少奶奶">
        <p>{{user.nickname}}</p>
        <p>{{user.email}}</p>
      </section>
      <section class="c-list">
        <div class="c-list__item l-grid" @click="logout">
          <span class="c-list__icon">
            <img class="response-img" src="../../images/svg/logout.svg" alt="登出">
          </span>
          <span class="c-list__content l-grid__item l-grid__item--8">登出</span>
          <span class="c-list__content c-list__icon l-grid__item l-grid__item--1">
            <img class="response-img" src="../../images/svg/return.svg" alt="返回">
          </span>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    width: 100%;
    border-bottom: 1px solid #dcd7d7;
    box-shadow: 0 2px 10px #dcd7d7;
    margin-bottom: 1em;
  }

  .header__side {
    width: 10%;
    padding: .5em;
  }
  .header__center {
    width: 80%;
    text-align: center;

    font-size: 1em;
    font-weight: 400;
    color: #000000;
  }

  .content {
    color: #000000;
  }

  .c-info {
    text-align: center;
  }
  .c-info__avatar {
    width: 30%;
    border-radius: 50%;
  }
</style>

<script>
  import Vue from 'vue'
  import { mapState, mapMutations } from 'vuex'

  const apiDeleteToken = `/api/user/token`

  export default {
    name: 'setting',

    data: function () {
      return {

      }
    },

    computed: {
      ...mapState([
        'user'
      ])
    },

    methods: {
      logout() {
        const self = this

        this.$http.delete(apiDeleteToken).then(response => {
          if (response.body.code === 'ok') {
            self.clear()
            Vue.http.headers.common['Authorization'] = ''
            router.push('/')
          }
        })
      },

      ...mapMutations([
        'clear'
      ])
    }
  }
</script>