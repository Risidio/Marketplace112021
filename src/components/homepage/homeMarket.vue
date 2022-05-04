<template>
<section class="homeMarket">
  <b-nav class="galleryNav" >
    <div class="galleryNavContainer" >
      <b-nav-item class="galleryNavItem active" id="discover" @click="tabChange('discover')">Discover</b-nav-item>
      <b-nav-item class="galleryNavItem" id="collections" @click="tabChange('collections')">Collections</b-nav-item>
      <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
    </div>
  </b-nav>
  <div v-if="windowWidth < 600">
    <div class="homeMarketItems">
      <div v-if="gaiaAssets && gaiaAssets.length > 0 && tab === 'discover'">
        <DefaultNFT v-bind:gaiaAssets="gaiaAssets.slice(0, 2)"/>
      </div>
      <div class="" v-else-if="activeLoopRuns && activeLoopRuns.length > 0 && tab === 'collections'">
        <CollectionsDisplay v-bind:activeLoopRuns="activeLoopRuns" />
      </div>
      <div class="galleryContainer1" v-if="tab === 'collections' && !activeLoopRuns || activeLoopRuns.length === 0">
        <div class="comingSoon">
          <h1 style="margin: auto; text-align: center;">Coming soon!</h1>
        </div>
      </div>
        <router-link style="color:white" class="routerL" to="/nft-marketplace"> <button class="button filled">See More Collectables</button></router-link>
    </div>
  </div>
  <div v-else>
    <div class="homeMarketItems">
      <div v-if="gaiaAssets && gaiaAssets.length > 0 && tab === 'discover' && shownAssets.length == 0">
        <DefaultNFT v-bind:gaiaAssets="gaiaAssets.slice(0, 8)"/>
      </div>
      <div v-else-if="activeLoopRuns && activeLoopRuns.length > 0 && tab === 'collections'">
        <CollectionsDisplay v-bind:activeLoopRuns="activeLoopRuns" />
      </div>
      <div class="galleryContainer1" v-if="tab === 'collections' && !activeLoopRuns || activeLoopRuns.length === 0">
        <div class="comingSoon">
          <h1 style="margin: auto; text-align: center;">Coming soon!</h1>
        </div>
      </div>
        <router-link style="color:white" class="routerL" to="/nft-marketplace"> <button class="button filled">See More Collectables</button></router-link>
    </div>
  </div>
</section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import DefaultNFT from '../smallcomponents/DefaultNFT.vue'
import CollectionsDisplay from '../smallcomponents/CollectionsDisplay.vue'

export default {
  name: 'HomeMarket',
  props: ['gaiaAssets', 'profile'],
  components: {
    DefaultNFT,
    CollectionsDisplay
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      resultSet: [],
      loaded: false,
      placeHolderItems: [],
      shownAssets: [],
      tab: 'discover',
      loopRuns: [],
      currency: null
    }
  },
  mounted () {
    window.addEventListener('mouse-move', this.checkScreen)
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
    this.mobileAssets = this.gaiaAssets
    this.findAssets()
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    // this.checkScreen()
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
      document.getElementById('discover').classList.remove('active')
      document.getElementById('collections').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    showCollections () {
      const collection = document.getElementsByClassName('collectionsMenu')[0]
      const arrow = document.getElementsByClassName('arrow1')[0]
      collection.classList.toggle('active')
      arrow.classList.toggle('active')
    },
    showCategories () {
      const categories = document.getElementsByClassName('galleryCategories')[0]
      const arrow = document.getElementsByClassName('arrow2')[0]
      categories.classList.toggle('active')
      arrow.classList.toggle('active')
    },
    findAssets () {
      this.$store.dispatch('rpayStacksContractStore/fetchContractDataFirstEditions').then(() => {
        this.loaded = true
      })
    },
    checkScreen () {
      this.windowWidth = window.innerWidth
    }
  },
  computed: {
    activeLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS].filter((loopRun) => loopRun.status === 'active')
      return loopRuns
    }
  }
}

</script>

<style lang="scss" scoped>
p {
  padding: 0;
  margin: 0;
}
.homeMarket {
  width: 90%;
  min-height: 80rem;
  margin: 10px auto 70px auto;
}
.galleryContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, max-content));
  gap: 20px;
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
.homeMarketItems {
  max-width: 1800px;
  margin: auto;
}
.comingSoon {
  display: grid;
  place-items: center;
  max-width: 400px;
  margin: auto;
}
.button {
  margin: 50px auto;
  font: normal normal bold 11px/14px Montserrat;
}

#discover {
  margin-right: 50px;
}
</style>
