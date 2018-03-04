/**
 * Created by adoug on 2017/5/15.
 */

// 所需css
import '@/modules/style/firstScreen.scss'
import '@/modules/style/common.scss'

import Vue from 'vue'
import VueResource from 'vue-resource'

import { setLoadingAndError } from './modules/global/setHttp'

import store from '@/modules/store'
import router from '@/modules/router'

import App from '@/components/App'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created() {
    setLoadingAndError(router)
  },
  mounted() {
    document.getElementById('appTemp').style.display = 'none'
  }
})
