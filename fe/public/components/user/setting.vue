<template>
  <main>
    <header class="header">
      <div class="l-box-shadow l-grid">
        <router-link to="/home" class="l-header__side l-grid__item--1">
          <img class="response-img" src="../../images/svg/return_black.svg" alt="返回">
        </router-link>
        <h1 class="header__center l-grid__item--8">设置</h1>
      </div>
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
      <div class="c-loader l-loader" v-show="loaderVisible">
        <div class="c-loader__content pacman">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>正在登出，我们会同步你最后的更改...</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  @import '../../style/blocks/loader';
  @import '../../style/blocks/list';

  .l-header__side {
    padding: .5em;
  }

  .content {
    color: var(--color-black);
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

  import { setJWT } from '../../js/global/setHttp'

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
          setJWT('')
          router.push('/')
        }
      })
    })
  }
</script>