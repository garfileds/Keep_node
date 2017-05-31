'use strict';

var _vue = require('node_modules/vue/dist/vue.runtime.common');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('node_modules/vue-router/dist/vue-router.common');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = require('node_modules/vue-resource/dist/vue-resource.common');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _App = require('public/components/App.vue');

var _App2 = _interopRequireDefault(_App);

var _home = require('public/components/home/home.vue');

var _home2 = _interopRequireDefault(_home);

var _planAdd = require('public/components/plan/planAdd.vue');

var _planAdd2 = _interopRequireDefault(_planAdd);

var _planDetail = require('public/components/plan/planDetail.vue');

var _planDetail2 = _interopRequireDefault(_planDetail);

var _planEdit = require('public/components/plan/planEdit.vue');

var _planEdit2 = _interopRequireDefault(_planEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default); /**
                                         * Created by adoug on 2017/5/15.
                                         */

_vue2.default.use(_vueResource2.default);
_vue2.default.config.productionTip = false;

var routes = [{ path: '/', component: _home2.default }, { path: '/planAdd', component: _planAdd2.default }, { path: '/planDetail/:id', component: _planDetail2.default }, { path: '/planEdit/:id', component: _planEdit2.default } /*,
                                                                                                                                                                                                                                   { path: '/setting', component: Setting },
                                                                                                                                                                                                                                   { path: '/cup', component: Cup }*/
];

var router = new _vueRouter2.default({
  routes: routes
});

new _vue2.default({
  el: '#app',
  render: function render(h) {
    return h(_App2.default);
  },
  router: router
});