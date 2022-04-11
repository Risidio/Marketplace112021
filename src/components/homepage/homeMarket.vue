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
        <div class="galleryContainer" v-if="gaiaAssets && gaiaAssets.length > 0 && tab === 'discover' && shownAssets.length == 0">
            <div v-for="(item, index) in gaiaAssets.slice(0,2)" :key="index" class="NFTbackgroundColour" >
                <div class="">
                    <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset">
                  <img class="nftGeneralView" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]"/>
                  <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
                  <p class="nFTArtist">By <span>{{!item.properties.collection ? "Anonymous" : item.properties.collection }}</span><span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset.listingInUstx.price) || 0}}</span></p>
                </b-link>
                </div>
            </div>
        </div>
        <div class="galleryContainer" v-else-if="activeLoopRuns && activeLoopRuns.length > 0 && tab === 'collections'">
          <div v-for="(item, index) in activeLoopRuns" :key="index" class="NFTbackgroundColour NFTbackgroundColour-collection">
            <div class="">
                <b-link class="galleryNFTContainer" :to="item.currentRunKey" >
                  <img class="nftGeneralView" :src="item.image"/>
                  <p class="nFTName" style="color: white;"> {{!item.currentRun ? "Collection" : item.currentRun }} </p>
                  <p class="nFTArtist" style="color: white;">By <span>{{!item.makerName ? 'unknown' : item.makerName }}</span></p>
                </b-link>
              </div>
          </div>
          <div class="NFTbackgroundColour NFTbackgroundColour-collection createCollection" >
            <p class="title"> Your Collection </p>
            <p class="text"> You have a good idea for a collection? Want to collaborate with use on that ? <br/> Awesome </p>
            <button class="button notFilledBlue"> Get In Touch </button>
          </div>
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
        <div class="galleryContainer" v-if="gaiaAssets && gaiaAssets.length > 0 && tab === 'discover' && shownAssets.length == 0">
            <div v-for="(item, index) in gaiaAssets" :key="index" class="NFTbackgroundColour" >
                <div class="">
                    <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset">
                  <img class="nftGeneralView" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]"/>
                  <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
                  <p class="nFTArtist">By <span>{{!item.properties.collection ? "Anonymous" : item.properties.collection }}</span><span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset.listingInUstx.price) || 0}}</span></p>
                </b-link>
                </div>
            </div>
        </div>
        <div class="galleryContainer" v-else-if="activeLoopRuns && activeLoopRuns.length > 0 && tab === 'collections'">
          <div v-for="(item, index) in activeLoopRuns" :key="index" class="NFTbackgroundColour NFTbackgroundColour-collection">
            <div class="">
                <b-link class="galleryNFTContainer" :to="item.currentRunKey" >
                  <img class="nftGeneralView" :src="item.image"/>
                  <p class="nFTName" style="color: white;"> {{!item.currentRun ? "Collection" : item.currentRun }} </p>
                  <p class="nFTArtist" style="color: white;">By <span>{{!item.makerName ? 'unknown' : item.makerName }}</span></p>
                </b-link>
              </div>
          </div>
          <div class="NFTbackgroundColour NFTbackgroundColour-collection createCollection" >
            <p class="title"> Your Collection </p>
            <p class="text"> You have a good idea for a collection? Want to collaborate with use on that ? <br/> Awesome </p>
            <button class="button notFilledBlue"> Get In Touch </button>
          </div>
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
import utils from '@/services/utils'

export default {
  name: 'HomeMarket',
  props: ['gaiaAssets', 'profile'],
  components: {
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
      mobileAssets: [],
      currency: null,
      currencyPreference: null
    }
  },
  mounted () {
    window.addEventListener('mouse-move', this.checkScreen)
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
    this.mobileAssets = this.gaiaAssets.slice(0, 2)
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
      console.log(this.tab)
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
      if (this.windowWidth < 600) {
        this.mobileAssets = []
      } else if (this.windowWidth > 600) {
        this.shownAssets = []
      }
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    },
    changeCurrency (price) {
      if (this.currencyPreference) {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rates = tickerRates.find((rate) => rate.currency === this.currencyPreference.text)
        const nFTPrice = utils.toDecimals(rates.stxPrice * price)
        return nFTPrice
      } else {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rates = tickerRates.find((rate) => rate.currency === 'GBP')
        const nFTPrice = utils.toDecimals(rates.stxPrice * price)
        return nFTPrice
      }
    },
    changeCurrencyTag () {
      if (this.currencyPreference && this.currencyPreference.text === 'GBP') {
        return '£'
      } else if (this.currencyPreference && this.currencyPreference.text === 'USD') {
        return '$'
      } else if (this.currencyPreference && this.currencyPreference.text === 'CNY') {
        return '¥'
      } else if (this.currencyPreference && this.currencyPreference.text === 'JPY') {
        return '¥'
      } else if (this.currencyPreference && this.currencyPreference.text === 'EUR') {
        return '€'
      } else {
        return '£'
      }
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
p{padding:0; margin:0;}
.homeMarket{
  width: 90%;
  min-height: 80rem;
  margin: 10px auto 70px auto;
}
.galleryContainer{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, max-content));
  gap: 20px;
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
.homeMarketItems{
  max-width: 1800px;
  margin: auto;
}
.comingSoon{
  display: grid;
  place-items: center;
  max-width: 400px;
  margin: auto;
}
.button{
  margin: 50px auto;
  font: normal normal bold 11px/14px Montserrat;
}
.createCollection{
  text-align: center;
  .title{
    margin-top: 35px;
    color: white;
    font: normal normal medium 14px/18px Montserrat;
  }
  .text{
    color: white;
    font: normal normal normal 12px/20px Montserrat;
  }
  button{
    padding: 15px 40px;
    background: rgba(255, 255, 255, 0.20);
    transition: all 0.5s ease-in-out;

    &:hover{
      transform: scale(1.1);
    }
  }
}
#discover {
  margin-right: 50px;
}
</style>
