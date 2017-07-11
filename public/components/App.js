define('public/components/App.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  var _vuex = require('node_modules/vuex/dist/vuex');
  
  exports.default = {
    name: 'App',
  
    data: function data() {
      return {
        transitionName: ''
      };
    },
  
    computed: _extends({}, (0, _vuex.mapState)(['loading', 'plans'])),
  
    watch: {
      $route: function $route(to, from) {
        switchTransitionName.call(this, to, from);
      }
    }
  };
  
  
  function switchTransitionName(to, from) {
    var backRoute = {
      '/userRegister': '/',
      '/userLogin': '/',
      '/planAdd': '/home',
      '/setting': '/home',
      '/planEdit': '/planDetail',
      '/planDetail': '/home'
    };
    var backRouteFrom = Object.keys(backRoute);
  
    var fromPath = from.path,
        toPath = to.path;
  
    //planEdit和planDetail路由含/:planId
  
    var _map = [fromPath, toPath].map(function (path) {
      return path.replace(/^((\/planEdit)|(\/planDetail))\/.+$/, function (match, group) {
        return group;
      });
    });
  
    var _map2 = _slicedToArray(_map, 2);
  
    fromPath = _map2[0];
    toPath = _map2[1];
  
  
    if (backRouteFrom.indexOf(fromPath) > -1 && backRoute[fromPath] === toPath) {
      this.transitionName = 'slide-right';
    } else if (backRouteFrom.indexOf(toPath) > -1 && backRoute[toPath] === fromPath) {
      this.transitionName = 'slide-left';
    } else {
      this.transitionName = 'slide-up';
    }
  }
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('transition',{attrs:{"name":_vm.transitionName}},[_c('router-view',{staticClass:"l-absolute"})],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading.isLoading),expression:"loading.isLoading"}],staticClass:"c-loader l-loader"},[_vm._m(0),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.loading.tip))])])],1)}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"c-loader__content pacman"},[_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div'),_vm._v(" "),_c('div')])}]
  __vue__options__._scopeId = "_v-9c5af8b7"
  

});
