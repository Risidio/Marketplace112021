<template>
  <div class="">
      <b-link class="galleryNFTContainer" to="/indige_mirror">
      <!-- <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/> -->
      <img alt="Collection Image" :src="item.image || image" class="nftGeneralView" loading="lazy"/>
      <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset && item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price || 0}} STX</span></p>
      <p class="nFTArtist">By <span>{{!item.properties.collection ? "Anonymous" : item.properties.collection }}</span><span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset && item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price) || 0}}</span></p>
  </b-link>
  </div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'ResultSet',
  props: {
    item: Object
  },
  data () {
    return {
      currencyPreference: null,
      image: '@/assets/img/indigeImages/indige-40.jpg'
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
  }
}
</script>

<style lang="scss" scoped>
</style>
