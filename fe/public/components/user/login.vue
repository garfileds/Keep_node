<template>
  <main class="main">
    <header class="header">
      <span class="header__side floatL">
        <img class="response-img" src="../../images/svg/return.svg" alt="返回"
             @click="navBack">
      </span>
    </header>
    <div class="content">
      <section class="c-form">
        <div class="c-form__title">
          <p class="font--large">登录到Up!Up!</p>
        </div>
        <form class="c-form__content">
          <fieldset class="c-form__group">
            <input class="c-form__input c-form__input--group c-form__input--full" type="email" placeholder="邮箱地址" v-model="email">
            <input class="c-form__input c-form__input--group c-form__input--full" type="password" placeholder="密码" v-model="password">
          </fieldset>
        </form>
        <button id="btnLogin" class="button button--full">登录</button>
      </section>
    </div>
  </main>
</template>

<style scoped>
  .main {
    background: url(../../images/planAdd_bg.jpg);
  }

  .header {
    overflow: hidden;
  }

  .header__side {
    width: 15%;
    padding: 1em;
  }

  .content {
    padding: 0 1em;
  }
</style>

<script>
  import Vue from 'vue'
  import { mapMutations } from 'vuex'
  import { runQueue } from '../../js/module/async'

  const apiPostToken = `/api/user/token`

  export default {
    name: 'userLogin',
    data: function() {
      return {
        email: '',
        password: '',

        //以后写表单验证插件的配置项
        validRule: {
          submitEl: '#btnLogin',
          submitHandler: 'submitLoginHandler',
          msgAlert: 'alert',
          rules: {
            email: [{
              pattern: 'required',
              errMsg: '邮箱不能为空'
            }, {
              pattern: /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
              errMsg: '请输入有效的邮箱格式'
            }],
            password: [{
              pattern: 'required',
              errMsg: '密码不能为空'
            }]
          }
        }
      }
    },

    //以后写表单验证插件的幕后工作
    mounted: function() {
      let self = this,
        validQueue = [],
        fields = Object.keys(this.validRule.rules)

      const resolveMsgAlert = alertConfig => {
        if (alertConfig === 'alert') {
          return alert.bind(window)
        } else if (typeof alertConfig === 'function') {
          return alertConfig
        }
      }

      /**
       * @fn 对每一条rule生成验证函数
       * @param rule
       * @param field
       * @return rule的验证函数，每个函数的this与Vue实例绑定，并绑定了(field, rule)参数， 接受(next)参数
       */
      const ruleValidFnGene = (rule, field) => {
        let ruleValidFn
        if (rule.pattern === 'required') {
          ruleValidFn = function(field, rule, resolveMsgAlert, next) {
            if (this[field].length > 0) {
              next()
            } else {
              resolveMsgAlert(this.validRule.msgAlert)(rule.errMsg)
              next({err: rule.errMsg})
            }
          }
        } else if (rule.pattern instanceof RegExp) {
          ruleValidFn = function(field, rule, resolveMsgAlert, next) {
            if (rule.pattern.test(this[field])) {
              next()
            } else {
              resolveMsgAlert(this.validRule.msgAlert)(rule.errMsg)
              next({err: rule.errMsg})
            }
          }
        } else if (typeof rule.pattern === 'function') {
          ruleValidFn = rule.pattern
        }

        return ruleValidFn.bind(self, field, rule, resolveMsgAlert)
      }

      fields.forEach((field) => {
        self.validRule.rules[field].forEach(rule => {
          let ruleValidFn = ruleValidFnGene(rule, field)

          return validQueue.push(ruleValidFn)
        })
      })

      this.$el.querySelector(this.validRule.submitEl).addEventListener('click', () => {
        runQueue(validQueue, (fn, next) => fn(next), (error) => {
          self[self.validRule.submitHandler](!error)
        })
      }, false)
    },

    methods: {
      //以后写表单验证插件的接口，传入validateResult
      submitLoginHandler(validateResult) {
        let self = this

        if (!validateResult) return

        this.$http.post(apiPostToken, {
          email: self.email,
          password: self.password
        }).then(response => {
          if (response.status === 200) {
            Vue.http.headers.common['Authorization'] = `Bearer ${response.body.token}`
            self.changeNeedInit(true)
            router.push('/home')
          }
        }, () => {
          window.alert('用户名或密码不正确')
        })
      },

      navBack() {
        router.go(-1)
      },

      ...mapMutations([
        'changeNeedInit'
      ])
    }
  }
</script>