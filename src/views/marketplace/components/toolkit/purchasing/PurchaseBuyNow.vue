<template>
<b-container>
  <b-row class="p-3 row mt-1">
    <b-col cols="12" style="text-align: center;">
      <h1 style="font: normal normal 300 30px/55px Montserrat;"> Confirm </h1>
      <h4 style="font: normal normal normal 14px/18px Montserrat;"> You're going to buy</h4>
      <h4 style="font: normal normal 300 20px/24px Montserrat;"> {{gaiaAsset.name}}</h4>
      <p style="font: normal normal normal 14px/18px Montserrat;"> For </p>
      <div style="max-width: 200px; margin: auto;">
        <p class="basePrice"> Price <span> STX  <span> {{(gaiaAsset.contractAsset.listingInUstx.price / 1.10).toFixed(0)}}</span></span></p>
        <p class="feePrice"> Fees <span>STX {{gaiaAsset.contractAsset.listingInUstx.price - (gaiaAsset.contractAsset.listingInUstx.price / 1.10).toFixed(0)}}</span></p>
        <hr/>
        <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX</span></p>
      </div>
    </b-col>
    <b-col cols="12" class=" ">
      <RatesListing :message="''" :amount="contractAsset.listingInUstx.price"/>
    </b-col>
    <!-- <b-row class="text-small mt-5">
      <b-col cols="3" class="text-right">
        Transfer from:
      </b-col>
      <b-col cols="9">
        <p class="stx-address">{{contractAsset.owner}}</p>
      </b-col>
      <b-col cols="3" class="text-right">
        to
      </b-col>
      <b-col cols="9">
        <p class="stx-address">{{profile.stxAddress}}</p>
      </b-col>
    </b-row> -->
    <b-col class="mt-5" cols="12" v-if="iAmOwner">
      <p style="text-align: center;">You already own this NFT!</p>
    </b-col>
    <b-col class="mt-5" cols="12" v-else>
      <button class="button notFilledBlue" @click="$emit('buyNow')">BUY NOW</button>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import RatesListing from '@/views/marketplace/components/toolkit/RatesListing'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'PurchaseBuyNow',
  components: {
    RatesListing
  },
  props: ['contractAsset', 'gaiaAsset', 'listing'],
  data () {
    return {
      loading: true,
      formSubmitted: false,
      errorMessage: null,
      defaultRate: null
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    rateMessage: function () {
      return 'Buy now for' + this.contractAsset.saleData.buyNowOrStartingPrice + ' STX'
    }
  },
  computed: {
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
    },
    // fbet () {
    //   return this.$store.getters[APP_CONSTANTS.KEY_FORMATTED_BIDDING_END_TIME](this.contractAsset)
    // },
    iAmOwner () {
      return this.contractAsset && this.contractAsset.owner === this.profile.stxAddress
    }
  }
}
</script>
<style lang="scss" scoped>
.input-group-text {
  background: #fff;
  color: #000;
}
.button{
  width: 120px;
  padding: 0;
  display: grid;
  place-items: center;
  width: 251px;
  height: 43px;
  margin: auto;
}
.priceSection{
  }
.basePrice, .feePrice{
  text-align: left;
  font: normal normal 300 12px/18px Montserrat;
  span{
    float: right;
    margin-left: auto;
    span{
      margin-left: 4px;
      color: #5154A1;
      font: normal normal bold 16px/19px Montserrat;
    }
  }
}
.fullPrice{
  font: normal normal 300 20px/29px Montserrat;
  text-align: center;
    span{
      font: normal normal 300 20px/29px Montserrat;
      span{
        font: normal normal bold 24px/29px Montserrat;
        color:#5154A1;
      }
    }
}
</style>
