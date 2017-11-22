/**
 * Created by adoug on 2017/7/13.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '../store'
import welcome from '../../components/user/welcome'

const router =  new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: welcome,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userLogin',
      component: function (resolve) {
        require.async('../../components/user/login.vue', resolve)
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userRegister',
      component: function (resolve) {
        require.async('../../components/user/register.vue', resolve)
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setting',
      component: function (resolve) {
        require.async('../../components/user/setting.vue', resolve)
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/pokemen',
      component: function (resolve) {
        require.async('../../components/user/pokemen.vue', resolve)
      },
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home',
      component: function (resolve) {
        require.async('../../components/home/home.vue', resolve)
      },
      meta: {
        keepAlive: true
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

router.beforeEach((to, from, next) => {
  if (checkCache(to, from)) {
    store.commit('changeCache', false)

    Vue.nextTick(() => {
      store.commit('changeCache', true)
    })
  }

  switchTransitionName(to, from, next)
})

function checkCache(to, from) {
  const fromPath = ['/userRegister', '/userLogin']

  return to.path === '/home' && fromPath.indexOf(from.path) > -1
}

function switchTransitionName(to, from, cb) {
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
    store.commit('changeTransitionName', 'slide-right')
  } else if (backRouteFrom.indexOf(toPath) > -1 && backRoute[toPath].indexOf(fromPath) > -1) {
    store.commit('changeTransitionName', 'slide-left')
  } else {
    store.commit('changeTransitionName', 'slide-up')
  }

  Vue.nextTick(() => {
    cb()
  })
}

export default router