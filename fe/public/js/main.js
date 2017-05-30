/**
 * Created by adoug on 2017/5/15.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false

import App from '../components/App'
import home from '../components/home/home'
import planAdd from '../components/plan/planAdd'
import planDetail from '../components/plan/planDetail'
import planEdit from '../components/plan/planEdit'

const routes = [
  { path: '/', component: home },
  { path: '/planAdd', component: planAdd },
  { path: '/planDetail/:id', component: planDetail },
  { path: '/planEdit/:id', component: planEdit }/*,
  { path: '/setting', component: Setting },
  { path: '/cup', component: Cup }*/
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})