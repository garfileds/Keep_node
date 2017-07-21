<template>
  <div class="c-pokeman-thumbnail" :data-pokemanid="pokeman.id">
    <div class="c-pokeman-thumbnail__content" :class="[bgMain]">
      <img class="response-img" :src="pokeman.img" :alt="pokeman.name">
    </div>
    <div class="c-pokeman-thumbnail__title">
      <p>{{pokeman.name}} <img class="floatR" :src="pokeman.nature_img" :alt="pokeman.attr[0]">
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../style/blocks/pokeman';
</style>

<script>
  import { ch2enPokeman } from '../../js/helper/ch2enPokeman'

  export default {
    name: 'pokemanThumbnail',

    props: ['pokeman'],

    computed: {
      bgMain() {
        return this.pokeman ? ch2enPokeman(this.pokeman.attr).bgMain : ''
      }
    }
  }
</script>