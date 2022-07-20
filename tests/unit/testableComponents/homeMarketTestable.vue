<template>
<div class="homeMarket">
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
        <DefaultNFT ref="defaultNFTComponentOnSmallWidth" v-bind:gaiaAssets="gaiaAssets.slice(0, 2)"/>
      </div>
      <div class="" v-else-if="activeLoopRuns && activeLoopRuns.length > 0 && tab === 'collections'">
        <CollectionsDisplay ref="collectionsDisplayOnSmallWidth" v-bind:activeLoopRuns="activeLoopRuns" />
      </div>
      <div class="galleryContainer1" v-if="tab === 'collections' && !activeLoopRuns || activeLoopRuns.length === 0">
        <div class="comingSoon">
          <h1 ref="comingSoonHeadingOnSmallWidth" style="margin: auto; text-align: center;">Coming soon!</h1>
        </div>
      </div>
        <router-link style="color:white" class="button filled see-more-collectables-button routerL" to="/nft-marketplace">See More Collectables</router-link>
    </div>
  </div>
  <div v-else>
    <div class="homeMarketItems">
      <div v-if="gaiaAssets && gaiaAssets.length > 0 && tab === 'discover' && shownAssets.length == 0">
        <DefaultNFT ref="defaultNFTComponentOnLargeWidth" v-bind:gaiaAssets="gaiaAssets.slice(0, 8)"/>
      </div>
      <div v-else-if="activeLoopRuns && activeLoopRuns.length > 0 && tab === 'collections'">
        <CollectionsDisplay ref="collectionsDisplayOnLargeWidth" v-bind:activeLoopRuns="activeLoopRuns" />
      </div>
      <div class="galleryContainer1" v-if="tab === 'collections' && !activeLoopRuns || activeLoopRuns.length === 0">
        <div class="comingSoon">
          <h1 ref="comingSoonHeadingOnLargeWidth" style="margin: auto; text-align: center;">Coming soon!</h1>
        </div>
      </div>
        <router-link style="color:white" class="routerL button filled see-more-collectables-button" to="/nft-marketplace"> See More Collectables</router-link>
    </div>
  </div>
  <!-- Method Test Buttons -->
  <button @click="checkScreen" class="test-check-screen">Check Screen</button>
  <button @click="findAssets" class="test-find-assets">Find Assets</button>
</div>
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
      currency: null,
      loading: true
    }
  },
  mounted () {
    window.addEventListener('mouse-move', this.checkScreen)
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
    this.mobileAssets = this.gaiaAssets
    // this.findAssets()
    this.loading = false
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    // this.checkScreen()
  },
  methods: {
    tabChange (tab) {
      this.$emit('Tab-Change-Method-Activated', 'Tab')
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
      // this.$store.dispatch('rpayStacksContractStore/fetchContractDataFirstEditions').then(() => {
      //   this.loaded = true
      // })
      this.$emit('Find-Assets-Method-Activated', 'Tab')
      this.loaded = true
    },
    checkScreen () {
      this.$emit('Check-Screen-Method-Activated', 'Tab')
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
.see-more-collectables-button {
  width: 186.91px;
}
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
.galleryNav {
    margin: auto;
    margin-top: 10px;
    margin-bottom: 30px;
    width: 100%;
    justify-items: center;
    align-items: center;
    border-bottom: solid rgba(128, 128, 128, 0.112) 1px;
}
.homeMarketItems {
  max-width: 1800px;
  margin: auto;
}
.galleryNavContainer{
  width: 500px;
  justify-content: space-between;
}
.comingSoon {
  display: grid;
  place-items: center;
  max-width: 400px;
  margin: auto;
}
.button {
  margin: 50px auto;
  font: normal bold 11px/14px Montserrat;
}

#discover {
  margin-right: 50px;
}
</style>
