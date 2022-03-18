<template>
    <section class='seeAlso'>
        <h2> See Also</h2>
        <div class='seeAlsoContainer'>
        <vueper-slides
            class="no-shadow"
            :visible-slides="4"
            :gap="2"
            :slide-ratio="1 / 4"
            :dragging-distance="211"
            :breakpoints="breakpoints"
            fixed-height="true"
            autoplay>
            <template #arrow-left>
                <img src="https://res.cloudinary.com/risidio/image/upload/v1633609469/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_v37pyt.svg" alt="wallet" class="arrow"/>
            </template>
            <template #arrow-right>
                <img src="https://res.cloudinary.com/risidio/image/upload/v1633609474/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle-1_oclpff.svg" alt="wallet" class="arrow"/>
            </template>
            <vueper-slide v-for="(item, index) in gaiaAssets" :key="index" class="NFTbackgroundColour" >
              <template #content>

                  <div>
                    <router-link v-bind:to="'/nfts/' + item.contractId + '/' + item.contractAsset.nftIndex" >
                    <img :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]" class="nftGeneralView" style="margin-top: 15px;"/>
                        <p class="nFTName" style="margin-top: -5px;"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
                        <p class="nFTArtist">By <span>{{!item.properties.collection ? "Anonymous" : item.properties.collection }}</span><span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset.listingInUstx.price) || 0}}</span></p>
                    </router-link>
                  </div>
              </template>
          </vueper-slide>
        </vueper-slides>
        </div>
    </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'homeSeeAlso',
  props: ['gaiaAssets'],
  components: {
    VueperSlides,
    VueperSlide
  },
  data () {
    return {
      placeHolderItems: [],
      breakpoints: {
        1600: {
          visibleSlides: 4,
          slideRatio: 1 / 2.5
        },
        1400: {
          visibleSlides: 3.2,
          slideRatio: 1 / 1.8
        },
        1200: {
          visibleSlides: 3,
          slideRatio: 1 / 1.8
        },
        1000: {
          visibleSlides: 2.6,
          slideRatio: 1 / 1.8
        },
        800: {
          visibleSlides: 1.1,
          slideRatio: 1,
          arrows: false
        }
      },
      currencyPreference: null
    }
  },
  mounted () {
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
  },
  methods: {
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
.seeAlso{
    min-height: 40rem;
    margin: 0 5% 10px 5%;
    h2{
        font: normal normal 300 37px/45px Montserrat;
        margin: 100px 20px 50px 20px;
        text-align: center;
    }
}
.seeAlsoContainer{
  max-width: 1200px;
  margin: auto;
  min-height: 200px;
}
.vueperslides--fixed-height {
  height: 380px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
.vueperslide{
  background-color:rgba(226, 226, 226, 0.8);
  min-height: 319px;
  border-radius: 30px;
}
.vueperslides__arrow .arrow{
  width: 23px;
  height: 23px;
}
.galleryItem{
  display: block;
  margin: 0 auto;
  max-width: 255px;
}
.galleryContainer{
  margin: auto;
  width: 100%;
}
.NFTbackgroundColour{
  max-width: 255px;
  max-height: 319px;
}
@media only screen and (max-width: 1400px){
  .seeAlsoContainer{
    max-width: 1000px;
    margin: auto;
    min-height: 200px;
}
@media only screen and (max-width: 1150px){
.vueperslides--fixed-height {
  height: 380px;
  max-width: 90%;
}
}

}
</style>
