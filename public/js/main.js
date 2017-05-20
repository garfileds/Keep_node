'use strict';

/**
 * Created by adoug on 2017/5/15.
 */

var Vue = require('node_modules/vue/dist/vue.common');
var VueRouter = require('node_modules/vue-router/dist/vue-router.common');
var VueResource = require('node_modules/vue-resource/dist/vue-resource.common');

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.config.productionTip = false;

var App = require('public/components/App.vue');
var home = require('public/components/home/home.vue');
var planAdd = require('public/components/plan/planAdd.vue');

var routes = [{ path: '/', component: home }, { path: '/plan/add', component: planAdd } /*,
                                                                                        { path: '/setting', component: Setting },
                                                                                        { path: '/cup', component: Cup }*/
];

var router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  render: function render(h) {
    return h(App);
  },
  router: router
});