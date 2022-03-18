<template>
    <div class="launchS2">
        <div>
            <b-nav class="galleryNav" >
                <div class="galleryNavContainer" >
                <b-nav-item class="galleryNavItem active" id="items" @click="tabChange('items')">Items</b-nav-item>
                <b-nav-item class="galleryNavItem" id="activity" @click="tabChange('Activity')">activity</b-nav-item>
                <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
                </div>
            </b-nav>
        </div>
        <div class="homeMarketItems">
            <div class="galleryContainer" v-if="resultSet.length > 0 && tab === 'activity'">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                        <b-link class="galleryNFTContainer" v-if="item && item.contractAsset" :to="assetUrl(item)">
                            <img class="nftGeneralView" v-on="$listeners" :src="item.image"/>
                    <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                    <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                    <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <div class="galleryContainer" v-if="resultSet.length > 0 && tab === 'items'">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                        <b-link class="galleryNFTContainer" v-if="item && item.contractAsset" :to="assetUrl(item)">
                        <img class="nftGeneralView" v-on="$listeners" :src="item.image"/>
                      <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
                      <p class="nFTArtist">By <span>{{!item.properties.collection ? "Anonymous" : item.properties.collection }}</span><span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset.listingInUstx.price) || 0}}</span></p>
                    </b-link>
                    </div>
                </div>
            </div>
            <router-link to="/nft-marketplace/risidio/launch_collection_t1"><button class="button notFilledBlue"> See More </button></router-link>
        </div>
    </div>
</template>

<script>
import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'Launch-Collection-S2',
  props: ['content', 'resultSet'],
  components: {
  },
  data () {
    return {
      tab: 'items',
      currencyPreference: null
    }
  },
  mounted () {
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
      document.getElementById('items').classList.remove('active')
      document.getElementById('activity').classList.remove('active')
      document.getElementById(tab).classList.add('active')
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
      if (this.currencyPreference.text === 'GBP') {
        return '£'
      } else if (this.currencyPreference.text === 'USD') {
        return '$'
      } else if (this.currencyPreference.text === 'CNY') {
        return '¥'
      } else if (this.currencyPreference.text === 'JPY') {
        return '¥'
      } else if (this.currencyPreference.text === 'EUR') {
        return '€'
      } else {
        return this.currencyPreference.text || 'GBP'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS2{
    min-height: 50rem;
  padding: 20px;
}
.container{
    text-align: center;
    max-width: 800px;
    h1{
        font: normal normal 300 40px/55px Montserrat;
        padding: 10px;
    }
    :nth-child(2){
        font: normal normal bolder 17px/20px Montserrat;
        padding: 10px;
    }
    :nth-child(3){
        font: normal normal normal 14px/20px Montserrat;
        padding: 10px;
    }
}
p{padding:0; margin:0;}

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
// .homeNFTView{
//   display: flex;
//   flex-wrap: wrap;
//   // margin: 4rem;
//   border-radius: 25px;
//   // padding: 4rem;
//   margin: auto;
// }
// .homeNFTView > *{
//   flex: 1 1 300px;
//   padding: 30px;
//   min-width: 300px;
//   max-height: 400px;
// }
.button{
  margin: 50px auto 50px auto;
}
#unsold {
  margin-right: 20px;
}

</style>
