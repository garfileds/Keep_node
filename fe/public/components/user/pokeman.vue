<template>
  <div class="c-pokeman" :class="[styleAttr.bgMain, styleAttr.bSen]">
    <div class="l-grid">
      <div class="c-pokeman__name l-grid__item--6" :class="[styleAttr.bdMain]">
        <p>{{pokeman.name}}</p>
        <p><span lang="ja">{{pokeman.jp_name}}</span>&nbsp;{{pokeman.en_name}}</p>
      </div>
      <div class="c-pokeman__nature l-grid__item--1">
        <img class="response-img" :src="pokeman.nature_img" :alt="pokeman.attr && pokeman.attr[0]">
      </div>
      <div class="c-pokeman__num l-grid__item--2" :class="[styleAttr.bdMain]">{{pokeman.number}}</div>
      <div class="c-pokeman__img l-grid__item--10">
        <img class="response-img" :src="pokeman.img" :alt="pokeman.name">
      </div>
      <div class="c-pokeman__attr l-grid__item--45" :class="[styleAttr.bglMain, styleAttr.bSlimSen]">
        <p class="c-pokeman__sub-title">属性</p>
        <div>
          <span class="c-pokeman__description"
           v-for="(attribute, index) in pokeman.attr"
           :class="index === 0 ? [styleAttr.bgMain] : [styleAttr.bgSen]">{{attribute}}</span>
        </div>
      </div>
      <div class="c-pokeman__category l-grid__item--45" :class="[styleAttr.bSlimSen, styleAttr.bglMain]">
        <p class="c-pokeman__sub-title">分类</p>
        <div>
          <span class="c-pokeman__description" :class="[styleAttr.bgMain]">{{pokeman.category}}</span>
        </div>
      </div>
      <div class="c-pokeman__feature l-grid__item--10" :class="[styleAttr.bSlimSen, styleAttr.bglMain]">
        <p class="c-pokeman__sub-title">特性</p>
        <div class="l-grid">
          <div class="l-grid__item--45 c-pokeman__description c-pokeman__description--item"
           v-for="fea in pokeman.features"
           :class="[styleAttr.bSlimSen]">
            <span v-for="subFea in fea.split(' ')">{{subFea}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../style/blocks/pokeman';
</style>

<script>
  import { ch2enPokeman } from '../../js/helper/ch2enPokeman'

  export default {
    name: 'pokeman',

    props: ['pokeman'],

    data: function() {
      return {

      }
    },

    computed: {
      styleAttr() {
        return this.pokeman ? ch2enPokeman(this.pokeman.attr) : {}
      }
    }
  }
</script>