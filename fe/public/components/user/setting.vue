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
      <div class="c-loader" v-show="loaderVisible">
        <div class="c-loader__content pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>正在登出，我们会同步你最后的更改...</p>
      </div>
      <div class="dimer" v-show="loaderVisible"></div>
    </div>
  </main>
</template>

<style scoped>
  @import url(../../style/loaders.min.css);

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
  import { mapState, mapMutations, mapActions } from 'vuex'

  const apiDeleteToken = `/api/user/token`

  export default {
    name: 'setting',

    data: function () {
      return {
        loaderVisible: false
      }
    },

    computed: {
      ...mapState([
        'user',
        'queueIsRunning'
      ])
    },

    methods: {
      logout() {
        const self = this

        this.loaderVisible = true

        //如果有更新未同步，先同步再登出
        this.stopSyncTimer()
        if (this.queueIsRunning) {
          let queryTimer = setInterval(() => {
            if (!self.queueIsRunning) {
              clearInterval(queryTimer)
              logoutHandler(self)
            }
          })
        } else {
          logoutHandler(self)
        }
      },

      ...mapMutations([
        'clear'
      ]),

      ...mapActions([
        'syncPlansOnce',
        'stopSyncTimer',
        'startSyncTimer'
      ])
    }
  }

  function logoutHandler(self) {
    self.syncPlansOnce(error => {
      if (error) {
        self.loaderVisible = false
        alert('有些记录未同步成功，登出会丢失记录。')
        self.startSyncTimer()
        return
      }

      self.$http.delete(apiDeleteToken).then(response => {
        if (response.status === 200) {
          self.loaderVisible = false

          self.clear()
          Vue.http.headers.common['Authorization'] = ''
          router.push('/')
        }
      })
    })
  }
</script>