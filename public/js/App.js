'use strict';

/**
 * Created by adoug on 2017/5/15.
 */

var Vue = require('node_modules/vue/dist/vue.common');
var App = require('public/components/App.vue');
var a = require('public/js/module/a');

Vue.config.productionTip = false;

a.say();

new Vue({
  el: '#app',
  components: { App: App }
});