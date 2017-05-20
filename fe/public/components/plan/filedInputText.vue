<template>
  <section class="filed">
    <div class="filed__name">标题</div>
    <div class="filed__content"
     :style="styleObj">
      <input type="text" class="filed__input" placeholder="请输入标题"
       @focus="toggleFlex(true)"
       @blur="toggleFlex(false)"
       v-model="val">
      <span v-show="clearBtnShow" class="filed__clear"
       @click="clearInput"></span>
    </div>
  </section>
</template>

<style scoped>
  .filed {
    width: 100%;
  }

  .filed__name {
    display: inline-block;

    width: 20%;
    text-align: center;
    padding: 1em;

    background-color: rgba(0, 0, 0, 0.4);
  }

  .filed__content {
    display: inline-block;
    position: relative;

    min-width: 20%;
    max-width: 78%;
    width: 78%;
    text-align: center;
    height: 3em;
    vertical-align: top;

    transition: width .5s ease-in-out;
  }

  .filed__input {
    height: 100%;
    border: none;
    background-color: rgba(98, 186, 206, 0.8);
    color: #ffffff;
    text-align: center;
    width: 100%;
    font-size: 1em;
  }

  .filed__clear {
    position: absolute;
    width: 1em;
    height: 1em;

    right: .5em;
    top: 0;
    bottom: 0;
    margin: auto;

    background-image: url(../../images/svg/error.svg);
    background-size: 100%;
  }
</style>

<script>
  module.exports = {
    data: function() {
      return {
        styleObj: {
          width: '78%'
        },

        clearBtnShow: true,

        val: ''
      }
    },

    methods: {
      toggleFlex: function (statu) {
        let computedWidth

        if (!!statu) {
          this.styleObj.width = '78%'
        } else {
          computedWidth = this.val.length ? this.val.length + 2 + 'em' : '20%'
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