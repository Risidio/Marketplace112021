<template>
<div class="galleryContainer" >
  <div v-for="(item, index) in gaiaAssets" :key="index" class="NFTbackgroundColour">
    <div class="">
      <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset">
        <img class="nftGeneralView" :src="item.image || loadingImage" :ref="index" alt="NFTimage"/>
        <p class="nFTName"> {{!item.name ? "NFT" : artName(item.name) }} <span style="float: right;">{{item.contractAsset && item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price || 0}} STX</span></p>
        <p class="nFTArtist">By
          <span v-if="item && item.properties && item.properties.collection">{{item.properties.collection }}</span>
          <span v-else>Anonymous</span>
          <span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset && item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price) || 0}}</span>
        </p>
      </b-link>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
import loadingImage from '@/assets/img/sticksnstones_logo.png'

export default {
  name: 'DefaultNFT',
  props: ['gaiaAssets'],
  data () {
    return {
      currencyPreference: null,
      loadingImage: loadingImage,
      loaded: false
    }
  },
  mounted () {
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
  },
  methods: {
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    },
    artName (name) {
      if (name.length > 15) {
        return `${name.slice(0, 15)}...`
      } else {
        return name
      }
    },
    changeCurrency (price) {
      if (!price) return 0
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
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
</style>
