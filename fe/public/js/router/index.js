/**
 * Created by adoug on 2017/7/13.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import welcome from '../../components/user/welcome'

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: welcome
    },
    {
      path: '/userLogin',
      component: function (resolve) {
        require.async('../../components/user/login.vue', resolve)
      }
    },
    {
      path: '/userRegister',
      component: function (resolve) {
        require.async('../../components/user/register.vue', resolve)
      }
    },
    {
      path: '/setting',
      component: function (resolve) {
        require.async('../../components/user/setting.vue', resolve)
      }
    },
    {
      path: '/home',
      component: function (resolve) {
        require.async('../../components/home/home.vue', resolve)
      }
    },
    {
      path: '/planAdd',
      component: function (resolve) {
        require.async('../../components/plan/planAdd.vue', resolve)
      }
    },
    {
      path: '/planDetail/:id',
      component: function (resolve) {
        require.async('../../components/plan/planDetail.vue', resolve)
      }
    },
    {
      path: '/planEdit/:id',
      component: function (resolve) {
        require.async('../../components/plan/planEdit.vue', resolve)
      }
    }
  ]
})