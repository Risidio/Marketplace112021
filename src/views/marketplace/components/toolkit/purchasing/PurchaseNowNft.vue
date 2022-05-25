<template>
<b-container>
    <!-- <div >
    <a @click="$emit('nextPage')" class="backBtn" >
    <b-icon icon="chevron-left" shift-h="-3"></b-icon> Back </a></div> -->
    <div class="background">
       <h1 style="font: normal normal 300 15px Montserrat;" class="ordertitle"> Your Order: </h1>
      <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX tokens</span></p>
    </div>
    <img :src="square" alt="discord-logo" class="icon">
    <p style="text-align: center; padding-bottom: 10px; font: normal normal 600 15px Montserrat;">Select your payement method</p>
    <div>
        <button class="button notFilledBlue">Flat</button>
        <button class="button notFilledBlue bit"  >Bitcoin</button>
        <button class="button notFilledBlue light" >Ligntning</button>
    </div>
<p style="text-align: center; padding-top: 10px; font: normal normal 600 15px Montserrat;">Enter your payement informations</p>
<div class="currency-table" style="background: #F0EFEF">
    <div class="card-num" >
        <input type="text" placeholder="xxxx xxxx xxxx xxxx"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
    <div class="card-detail" >
        <input type="text" placeholder="MM / YY"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
        <div class="card-detail" >
        <input type="text" placeholder="CVV"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
        <div class="card-detail" >
        <input type="text" placeholder="Zip code"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
</div>
</b-container>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'PurchaseBuyNow',
  components: {
  },
  props: ['contractAsset', 'gaiaAsset'],
  data () {
    return {
      square: require('@/assets/img/square.png'),
      QrCode: require('@/assets/img/QR-Code.png'),
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
    // rateMessage: function () {
    //   return 'Buy now for' + this.contractAsset.saleData.buyNowOrStartingPrice + ' STX'
    // }
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
.currency-table{
margin-left: 30px;
padding-left: 23px;
padding-top: 150px;
width: 290px;
border-radius: 12px;
}
.button{
 position: relative;
  min-width: 70px;
  padding: 0;
  display: grid;
  place-items: center;
  bottom: 10px;
  height: 37px;
  margin: auto;
  margin-left: 30px;
  margin-bottom: -20px;
  border-radius: 10px;
}
.card-num > input {
  position: relative;
  background:#FFFFFF;
  border-radius: 7px;
  border: solid 1px rgb(235, 235, 235);
  width: 80%;
  height: 40px;
  padding: 5px;
  top: -120px;
  left: 18px;
  padding-left: 35px;
  outline: none;
  font-weight: 200;
  font-size: 1.2rem;
}
.card-detail > input {
  position: relative;
  background:#FFFFFF;
  border-radius: 7px;
  border: solid 1px rgb(235, 235, 235);
  width: 35%;
  height: 40px;
  padding: 5px;
  top: -120px;
  left: 18px;
  padding-left: 35px;
  outline: none;
  font-weight: 200;
  font-size: 1.2rem;
}
.backBtn {
    color: #170a6d;
    font: normal normal bold 11px/14px Montserrat;
    cursor: pointer;
    position: relative;
}
.background{
}
.cyanText {
    color: #14127B;
    padding-left: 10px;
}
.notFilledBlue {
    color: #FFFFFF;
    background: #14127B;
}
.bit{
    margin-left: 150px;
        top: -24.5px;
}
.light{
    margin-left: 260px;
    left: 20px;
    top: -41.5px;
}
.icon{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  padding-top: 20px;
}
.icon1{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 180px;
  border: 15px solid #D1D1D1;
  border-radius: 15px;
  opacity: 1;
}
.ordertitle{
    display: block;
    margin-left: 40px;

}
.fullPrice{
    position: absolute;
    top: 05px;
    left: 220px;
   font: normal normal 300 19px/29px Montserrat;
     span{
      font: normal normal 300 19px/29px Montserrat;
    // padding-left: 80px;
      span{
        font: normal normal bold 19px/29px Montserrat;
        color:#5154A1;
      }
    }
}
</style>
