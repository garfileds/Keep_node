/**
 * Created by adoug on 2017/5/15.
 */
require('es6-promise').polyfill()

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false

import { setLoadingAndError } from './global/setHttp'

import store from './store'
import router from './router'

import App from '../components/App'


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created: function() {
    setLoadingAndError(router)
  }
})