<template>
  <section class="field">
    <div class="field__name">{{title}}</div>
    <div class="field__content field__content--input"
         :style="styleObj">
      <input type="text" :name="inputName" class="field__input" :placeholder="'请输入' + title"
             @focus="toggleFlex(true)"
             @blur="toggleFlex(false)"
             v-model="val"
             :disabled="disabled">
      <span v-show="clearBtnShow" class="field__clear"
            @click="clearInput"></span>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '../../modules/style/blocks/field';
</style>

<script>
  export default {
    name: 'fieldInput',

    props: ['title', 'defaultValue', 'inputName', 'disabled'],

    data: function() {
      let defaultWidth
      defaultWidth = this.defaultValue ? this.defaultValue.length + 2 + 'em' : '30%'

      return {
        styleObj: {
          width: defaultWidth
        },

        clearBtnShow: false,

        val: this.defaultValue || ''
      }
    },

    methods: {
      toggleFlex: function (statu) {
        let computedWidth

        if (!!statu) {
          this.styleObj.width = '76%'
        } else {
          computedWidth = this.val.length ? this.val.length + 2 + 'em' : '30%'
          this.styleObj.width = computedWidth
        }

        this.clearBtnShow = !!statu
      },

      clearInput: function() {
        this.val = ''
      }
    }
  }
</script>