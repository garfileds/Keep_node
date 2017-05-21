define('public/components/plan/filedColor.vue', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _utils = require('public/js/module/utils');
  
  var _colorPanelItem = require('public/components/plan/colorPanelItem.vue');
  
  var _colorPanelItem2 = _interopRequireDefault(_colorPanelItem);
  
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
  
  exports.default = {
    name: 'filedColor',
  
    data: function data() {
      return {
        selectedColor: {
          'backgroundColor': '#76FF7B'
        },
  
        panelVisible: false
      };
    },
  
    computed: {
      colors: function colors() {
        return (0, _utils.colorGenerator)();
      }
    },
  
    methods: {
      togglePanel: function togglePanel(statu) {
        this.panelVisible = statu;
      },
      selectColor: function selectColor(event) {
        var targetEl = event.target;
  
        if (targetEl.className === 'color-panel__item') {
          this.selectedColor['backgroundColor'] = targetEl.style.backgroundColor;
          this.panelVisible = false;
        }
      }
    },
  
    components: { colorPanelItem: _colorPanelItem2.default }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"filed"},[_c('div',{staticClass:"filed__name"},[_vm._v("颜色")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedColor.backgroundColor),expression:"selectedColor.backgroundColor"}],attrs:{"type":"hidden"},domProps:{"value":(_vm.selectedColor.backgroundColor)},on:{"input":function($event){if($event.target.composing){ return; }_vm.selectedColor.backgroundColor=$event.target.value}}}),_vm._v(" "),_c('div',{staticClass:"filed__content",style:(_vm.selectedColor),on:{"click":function($event){_vm.togglePanel(true)}}}),_vm._v(" "),_c('section',{directives:[{name:"show",rawName:"v-show",value:(_vm.panelVisible),expression:"panelVisible"}],staticClass:"color-panel",on:{"click":_vm.selectColor}},[_c('div',{staticClass:"color-panel__return",on:{"click":function($event){_vm.togglePanel(false)}}}),_vm._v(" "),_vm._l((_vm.colors),function(color){return _c('color-panel-item',{attrs:{"color":color}})})],2)])}
  __vue__options__.staticRenderFns =[]
  __vue__options__._scopeId = "_v-0a367195"
  

});
