define('public/components/plan/planDetail.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _schedule = require('public/components/plan/schedule2.vue');
  
  var _schedule2 = _interopRequireDefault(_schedule);
  
  var _utils = require('public/js/module/utils');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
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
  
  var apiUpdateDone = '/api/plan/{/id}/done';
  
  exports.default = {
    name: 'planDetail',
  
    props: ['plans'],
  
    data: function data() {
      return {
        editAreaVisible: false
      };
    },
  
    computed: {
      plan: function plan() {
        var planId = this.$route.params.id;
        return this.plans.filter(function (plan) {
          return plan.id === planId;
        })[0];
      },
      nextDay: function nextDay() {
        var baseDate = new Date(this.plan.progress.start_day),
            today = new Date((0, _utils.formatDate)(new Date())),
            timeOfDay = 24 * 60 * 60 * 1000,
            marked = this.plan.progress.marked;
  
        var i = 0,
            tempDate = void 0;
        while (i < marked.length) {
          tempDate = new Date(this.plan.progress.start_day);
          tempDate.setDate(baseDate.getDate() + marked[i] - 1);
  
          if (today.getTime() - tempDate.getTime() <= timeOfDay && this.plan.progress.done.indexOf(marked[i]) === -1) {
            break;
          }
  
          i++;
        }
        return (0, _utils.formatDate)(tempDate, 'mm/dd/yy');
      }
    },
  
    methods: {
      handleChangeDay: function handleChangeDay(day) {
        var _this = this;
  
        var planId = this.$route.params.id;
  
        var index = this.plan.progress.done.indexOf(day);
        var updateInfo = { day: day },
            updateResource = this.$resource(apiUpdateDone);
  
        if (this.plan.progress.marked.indexOf(day) > -1) {
          updateResource.save({ id: planId }, {
            body: JSON.stringify(updateInfo)
          }).then(function (response) {
            var code = response.body.code;
            if (code === 'ok') {
              index === -1 ? _this.plan.progress.done.push(day) : _this.plan.progress.done.splice(index, 1);
            }
          });
        }
      },
      toggleEditArea: function toggleEditArea(event) {
        var target = event.target;
        //editArea show
        if (!this.editAreaVisible && !(0, _utils.withinParent)('#scheduleWrap', target)) {
          this.editAreaVisible = true;
        } else if (this.editAreaVisible && target.className.indexOf('filed2__content') === -1) {
          this.editAreaVisible = false;
        }
      },
      handleEdit: function handleEdit() {
        router.push('/planEdit/' + this.plan.id);
      },
      navHome: function navHome() {
        router.push('/');
      }
    },
  
    components: { schedule: _schedule2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main',{on:{"click":_vm.toggleEditArea}},[_c('img',{staticClass:"full-screen-img",attrs:{"src":"/images/planAdd_bg.jpg","alt":"背景图片:在海边"}}),_vm._v(" "),_c('nav',{directives:[{name:"show",rawName:"v-show",value:(!_vm.editAreaVisible),expression:"!editAreaVisible"}],staticClass:"nav"},[_c('p',{staticClass:"icon icon--menu icon--large",on:{"click":_vm.navHome}},[_vm._v("Up!Up!")])]),_vm._v(" "),_c('article',{directives:[{name:"show",rawName:"v-show",value:(!_vm.editAreaVisible),expression:"!editAreaVisible"}]},[_c('header',{staticClass:"header"},[_c('h1',{staticClass:"header__title"},[_vm._v(_vm._s(_vm.plan.title))]),_vm._v(" "),_c('p',[_vm._v("Next: "+_vm._s(_vm.nextDay))])]),_vm._v(" "),_c('main',{attrs:{"id":"scheduleWrap"}},[_c('schedule',{attrs:{"startDay":_vm.plan.progress.start_day,"days":_vm.plan.progress.days,"marked":_vm.plan.progress.marked,"done":_vm.plan.progress.done,"editable":true},on:{"changeDay":_vm.handleChangeDay}})],1)]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.editAreaVisible),expression:"editAreaVisible"}],staticClass:"edit-area"},[_c('div',{staticClass:"filed2"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"filed2__content",on:{"click":function($event){$event.stopPropagation();_vm.handleEdit($event)}}},[_vm._v("\n        编辑\n      ")])]),_vm._v(" "),_c('div',{staticClass:"filed2"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"filed2__content filed2__content--warn",on:{"click":function($event){$event.stopPropagation();_vm.handleDelete($event)}}},[_vm._v("\n        删除\n      ")])]),_vm._v(" "),_c('div',{staticClass:"filed2"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"filed2__content--flex",on:{"click":function($event){$event.stopPropagation();_vm.handleShare($event)}}},[_vm._m(3),_vm._v(" "),_vm._m(4),_vm._v(" "),_vm._m(5),_vm._v(" "),_vm._m(6),_vm._v(" "),_vm._m(7)])]),_vm._v(" "),_c('div',{staticClass:"filed2"},[_vm._m(8),_vm._v(" "),_c('div',{staticClass:"filed2__content filed2__content--success",on:{"click":function($event){$event.stopPropagation();_vm.handleAdd($event)}}},[_vm._v("\n        新建\n      ")])])])])}
  __vue__options__.staticRenderFns =[function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"filed2__name"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/edit.svg","alt":"编辑"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"filed2__name"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/delete.svg","alt":"删除"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"filed2__name"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/share.svg","alt":"分享"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon--padding"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/wechat.svg","alt":"微信"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon--padding"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/moments.svg","alt":"朋友圈"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon--padding"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/sina.svg","alt":"新浪微博"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon--padding"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/qq.svg","alt":"腾讯QQ"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"icon--padding"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/douban.svg","alt":"豆瓣"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"filed2__name"},[_c('img',{staticClass:"full-width-img",attrs:{"src":"/images/svg/add.svg","alt":"新建"}})])}]
  __vue__options__._scopeId = "_v-59315907"
  

});