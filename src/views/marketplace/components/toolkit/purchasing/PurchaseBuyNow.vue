<template>
<b-container>
    <!-- <div >
    <a @click="$router.go(-0)" class="backBtn" >
    <b-icon icon="chevron-left" shift-h="-3"></b-icon> Back </a></div> -->
  <b-row class="p-3 row mt-1">
    <b-col cols="12" style="text-align: center;">
      <h1 style="font: normal normal 300 30px/55px Montserrat;"> Confirm </h1>
      <!-- <h4 style="font: normal normal normal 14px/18px Montserrat;"> You're going to buy</h4> -->
      <h4 style="font: normal normal 300 20px/24px Montserrat;"> {{gaiaAsset.name}}</h4>
          <div class="modal-contentt">
          <!-- <span class="closeBtn"  @click="closeModel">&times;</span> -->
          <img class="modelImage" :src="gaiaAsset.image" >
          </div>
      <p style="font: normal normal normal 14px/18px Montserrat;"></p>
      <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX</span></p>
      <!-- <div style="max-width: 200px; margin: auto;">
        <p class="basePrice"> Price <span> STX  <span> {{(gaiaAsset.contractAsset.listingInUstx.price / 1.10).toFixed(0)}}</span></span></p>
        <p class="feePrice"> Fees <span>STX {{gaiaAsset.contractAsset.listingInUstx.price - (gaiaAsset.contractAsset.listingInUstx.price / 1.10).toFixed(0)}}</span></p>
        <hr/>
        <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX</span></p>
      </div> -->
    </b-col>
    <b-col cols="9" class=" ">
      <RatesListing :message="''" :amount="contractAsset.listingInUstx.price"/>
    </b-col>
    <b-col class="mt-5" cols="12" v-if="iAmOwner">
      <p style="text-align: center;">You already own this NFT!</p>
    </b-col>
    <b-col class="mt-5" cols="12" v-else>
      <button class="button notFilledBlue" @click="$emit('nextPage')" >PLACE YOUR ORDER</button>
      <p style="font: normal normal 600 12px/15px Montserrat; padding-left: 80px;">or <span style="font: normal normal bold 14px/16px Montserrat; cursor: pointer;" class="cyanText" @click="$emit('buyNow')">Use Connect Wallet</span> <br/></p>
         <img style="width: 300px; margin-left: 30px;" :src="progress" alt="progres" class="">
    <p style="font: normal normal 500 9px Montserrat;"  class="order" ><span>Place Order</span></p>
    <p style="font: normal normal 500 9px Montserrat;"  class="payment" ><span>Make the payement</span></p>
    <p style="font: normal normal 500 9px Montserrat;"  class="Confirmation" ><span>Confirmation</span></p>

    </b-col>
  </b-row>
</b-container>
</template>

<script>
import RatesListing from '@/views/marketplace/components/toolkit/RatesListing'
export default {
  name: 'PurchaseBuyNow',
  components: {
    RatesListing
  },
  props: ['contractAsset', 'gaiaAsset', 'flowType'],
  data () {
    return {
      loading: true,
      formSubmitted: false,
      errorMessage: null,
      defaultRate: null,
      progress: require('@/assets/img/ProgressLine.png')
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
.modal-contentt {
  display: flex;
  flex-direction: column;
  width: 200px;
  position: relative;
  margin: auto;
  // padding: 20px;
}
.payment{
  position: relative;
  left: 135px;
  top: -22px;
}.Confirmation{
  position: relative;
  left: 290px;
  top: -42px;
}
.button{
  width: 120px;
  padding: 0;
  display: grid;
  place-items: center;
  width: 277px;
  bottom: 10px;
  height: 47px;
  margin: auto;
  margin-bottom: 10px;
}
.backBtn {
    color: #170a6d;
    font: normal normal bold 11px/14px Montserrat;
    cursor: pointer;
    position: relative;
}
.cyanText {
    color: #14127B;
    padding-left: 10px;
}
.notFilledBlue {
    color: #FFFFFF;
    background: #14127B;
}
.progress{
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
