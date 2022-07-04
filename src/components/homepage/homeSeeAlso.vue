<template>
    <section class='seeAlso'>
        <h2> See Also</h2>
        <div class='seeAlsoContainer'>
        <div
            class="no-shadow swiper"
            ref="swiper"
            >
            <div class="swiper-wrapper">
              <div class="swiper-slide NFTbackgroundColour" v-for="(item, index) in gaiaAssets" :key="index" >
              <template>
                  <div>
                    <router-link v-bind:to="'/nfts/' + item.contractId + '/' + item.contractAsset.nftIndex" >
                    <!-- <img :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]" class="nftGeneralView" style="margin-top: 15px;"/> -->
                    <img :src="item.image" class="nftGeneralView" style="margin-top: 15px;"/>
                      <p class="nFTName" style="margin-top: -5px;"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx ? item.contractAsset.listingInUstx.price : 0}} STX</span></p>
                      <p class="nFTArtist">By
                        <span v-if="item && item.properties && item.properties.collection">{{item.properties.collection }}</span>
                        <span v-else>Anonymous</span>
                        <span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset && item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price) || 0}}</span>
                      </p>
                    </router-link>
                  </div>
              </template>
          </div>
            </div>
            <div class="swiper-pagination-see-also">
              <span class="swiper-pagination-bullet-see-also swiper-pagination-clickable-see-also"></span>
            </div>
        </div>
        <div class="swiper-button-prev-see-also swiper-arrow">
                <img src="https://res.cloudinary.com/risidio/image/upload/v1633609469/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_v37pyt.svg" alt="arrow-icon" class="arrow"/>
            </div>
            <div class="swiper-button-next-see-also swiper-arrow">
                <img src="https://res.cloudinary.com/risidio/image/upload/v1633609474/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle-1_oclpff.svg" alt="arrow-icon" class="arrow"/>
            </div>
        </div>
    </section>
</template>

<script>
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper'
import '@/assets/scss/swiper-bundle.css'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'homeSeeAlso',
  props: ['gaiaAssets'],
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
    const swiper = new Swiper(this.$refs.swiper, {
      // configure Swiper to use modules
      modules: [Navigation, Pagination, Thumbs],
      // Optional parameters
      rewind: true,
      slidesPerView: 'auto',
      speed: 400,
      sensitivity: 0.5,
      spaceBetween: 20,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination-see-also',
        clickable: true,
        type: 'bullets',
        bulletActiveClass: 'swiper-pagination-bullet-active-see-also',
        bulletClass: 'swiper-pagination-bullet-see-also',
        bulletElement: 'span',
        clickableClass: 'swiper-pagination-clickable-see-also'
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-see-also',
        prevEl: '.swiper-button-prev-see-also'
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      }
    })
  },
  methods: {
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
.seeAlso {
  min-height: 40rem;
  margin: 0 5% 10px 5%;
  padding-bottom: 100px;
  h2 {
    font: normal normal 300 37px/45px Montserrat;
    margin: 100px 20px 50px 20px;
    text-align: center;
  }
}
.swiper-slide {
  cursor: grab;
}
.swiper-button-prev-see-also,
.swiper-button-next-see-also {
  position: absolute;
  width: calc(var(--swiper-navigation-size) / 44 * 27);
  height: var(--swiper-navigation-size);
  margin-bottom: 100px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
}
.swiper-button-next-see-also,
.swiper-rtl .swiper-button-prev-see-also {
  right: -39px;
  left: auto;
  top: 50%;
}
.swiper-button-prev-see-also,
.swiper-rtl .swiper-button-next-see-also {
  left: -39px;
  right: auto;
  top: 50%;
}
.seeAlsoContainer {
  max-width: 1170px;
  margin: auto;
  min-height: 200px;
  position: relative;
  display: block;
}
.galleryItem {
  display: block;
  margin: 0 auto;
  max-width: 255px;
}
.galleryContainer {
  margin: auto;
  width: 100%;
}
.NFTbackgroundColour {
  max-width: 255px;
  max-height: 319px;
}
@media only screen and (max-width: 1400px) {
  .seeAlsoContainer {
    max-width: 1000px;
    margin: auto;
    min-height: 200px;
  }
}
@media only screen and (max-width: 900px) {
  .swiper-button-prev-see-also,
.swiper-button-next-see-also {
  display: none;
}
}
</style>
