/**
 * Created by adoug on 2017/5/15.
 */

const Vue = require('vue')
const VueRouter = require('vue-router')
const VueResource = require('vue-resource')

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.config.productionTip = false

const App = require('../components/App')
const home = require('../components/home/home')
const planAdd = require('../components/plan/planAdd')

const routes = [
  { path: '/', component: home },
  { path: '/plan/add', component: planAdd }/*,
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