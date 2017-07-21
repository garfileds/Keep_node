<template>
  <main>
    <header class="header">
      <div class="l-box-shadow l-grid">
        <router-link to="/home" class="l-header__side l-grid__item--1">
          <img class="response-img" src="../../images/svg/return_black.svg" alt="返回">
        </router-link>
        <h1 class="header__center l-grid__item--8">出战吧!</h1>
      </div>
    </header>

    <div class="content l-grid"
     @click.stop="catPokeman">
      <pokemanThumbnail class="l-grid__item--3 l-pokeman-thumbnail"
       v-for="pokeman in pokemen"
       :pokeman="pokeman || {}"></pokemanThumbnail>

      <pokeman class="l-grid__item--9 l-pokeman"
       :pokeman="selectedPokeman"
       v-show="pokemanVisible"></pokeman>
      <div class="l-mask" v-show="pokemanVisible" @click.stop="hidePokeman"></div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .l-header__side {
    padding: .5em;
  }

  .content {
    position: relative;
  }

  .l-pokeman-thumbnail {
    margin-right: 5%;
  }

  .l-pokeman-thumbnail:nth-of-type(3n) {
    margin-right: 0;
  }

  .l-pokeman {
    position: fixed;
    width: 90%;
    height: 539px;

    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1001;
  }
</style>

<script>
  import pokemanThumbnail from './pokemanThumbnail'
  import pokeman from './pokeman'

  import { getParentEl } from '../../js/module/utils'

  const apiGetPokemen = '/api/pokemen'

  module.exports = {
    name: 'pokemen',

    data: function() {
      return {
        pokemen: [],

        selectedPokemanId: '',

        pokemanVisible: false
      }
    },

    computed: {
      selectedPokeman() {
        let self = this

        return this.pokemen.filter(pokeman => pokeman.id === self.selectedPokemanId)[0] || {}
      }
    },

    methods: {
      catPokeman(event) {
        let target = event.target,
          parent = getParentEl('.c-pokeman-thumbnail', target)

        if (!parent) return

        this.selectedPokemanId = parent.dataset.pokemanid
        this.pokemanVisible = true
      },

      hidePokeman() {
        this.pokemanVisible = false
      }
    },

    created: function() {
      const self = this

      this.$http.get(apiGetPokemen)
        .then(response => {
          self.pokemen = response.body
        })
    },

    components: { pokemanThumbnail, pokeman }
  }
</script>