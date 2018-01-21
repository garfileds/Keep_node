/**
 * Created by adoug on 2017/7/13.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '../store'
import welcome from '@/components/user/welcome'

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
      component: () => import(/* webpackChunkName: "login" */'@/components/user/login.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userRegister',
      component: () => import(/* webpackChunkName: "register" */'@/components/user/register.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/setting',
      component: () => import(/* webpackChunkName: "setting" */'@/components/user/setting.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/pokemen',
      component: () => import(/* webpackChunkName: "pokemen" */'@/components/user/pokemen.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */'@/components/home/home.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/planAdd',
      component: () => import(/* webpackChunkName: "planAdd" */'@/components/plan/planAdd.vue')
    },
    {
      path: '/planDetail/:id',
      component: () => import(/* webpackChunkName: "planDetail" */'@/components/plan/planDetail.vue')
    },
    {
      path: '/planEdit/:id',
      component: () => import(/* webpackChunkName: "planEdit" */'@/components/plan/planEdit.vue')
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
  } else if (toPath === '/') {
    store.commit('changeTransitionName', '')
  } else {
    store.commit('changeTransitionName', 'slide-up')
  }

  Vue.nextTick(() => {
    cb()
  })
}

export default router