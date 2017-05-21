define('public/components/plan/filedInputText.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
  
  exports.default = {
    name: 'filedInput',
  
    data: function data() {
      return {
        styleObj: {
          width: '78%'
        },
  
        clearBtnShow: true,
  
        val: ''
      };
    },
  
    methods: {
      toggleFlex: function toggleFlex(statu) {
        var computedWidth = void 0;
  
        if (!!statu) {
          this.styleObj.width = '78%';
        } else {
          computedWidth = this.val.length ? this.val.length + 2 + 'em' : '20%';
          this.styleObj.width = computedWidth;
        }
  
        this.clearBtnShow = !!statu;
      },
  
      clearInput: function clearInput() {
        this.val = '';
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"filed"},[_c('div',{staticClass:"filed__name"},[_vm._v("标题")]),_vm._v(" "),_c('div',{staticClass:"filed__content filed__content--input",style:(_vm.styleObj)},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.val),expression:"val"}],staticClass:"filed__input",attrs:{"type":"text","placeholder":"请输入标题"},domProps:{"value":(_vm.val)},on:{"focus":function($event){_vm.toggleFlex(true)},"blur":function($event){_vm.toggleFlex(false)},"input":function($event){if($event.target.composing){ return; }_vm.val=$event.target.value}}}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.clearBtnShow),expression:"clearBtnShow"}],staticClass:"filed__clear",on:{"click":_vm.clearInput}})])])}
  __vue__options__.staticRenderFns =[]
  __vue__options__._scopeId = "_v-62a91f24"
  

});
