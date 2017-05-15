/**
 * Created by adoug on 2017/5/15.
 */

const Vue = require('vue')
const App = require('../components/App')
const a = require('./module/a')

Vue.config.productionTip = false

a.say()

new Vue({
  el: '#app',
  components: { App }
})