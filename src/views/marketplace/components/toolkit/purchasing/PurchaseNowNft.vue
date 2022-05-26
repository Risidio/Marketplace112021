<template>
<b-container>
    <div class="background">
       <h1 style="font: normal normal 300 18px Montserrat;" class="ordertitle"> Your Order: </h1>
      <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX tokens</span></p>
    </div>
    <img :src="square" alt="square" class="icon">
    <p style="text-align: center; position: relative; top: -30px; padding-bottom: 10px; font: normal normal 600 15px Montserrat;">Select your payement method</p>
    <div>
        <button class="button notFilledBlue flat">Flat</button>
        <button class="button notFilledBlue bit" @click="$emit('nextPage')" >Bitcoin</button>
        <button class="button notFilledBlue light" @click="$emit('currPage')">Ligntning</button>
    </div>
<p style="text-align: center;  font: normal normal 600 15px Montserrat;">Enter your payement informations</p>
<div class="currency-table" style="background: #F0EFEF">
    <div class="card-num" >
        <input type="text" placeholder="xxxx xxxx xxxx xxxx"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
    <div class="card-detail date" >
        <input type="text" placeholder="MM / YY"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
        <div class="card-detail ccv" >
        <input type="text" placeholder="CVV"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
        <div class="card-detail zip" >
        <input type="text" placeholder="Zip code"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);"></span>
    </div>
</div>
      <button class="btn notFilledBlue" @click="$emit('nextPage')" >SEND $</button>

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
// margin-left: 30px;
padding-left: 23px;
padding-top: 150px;
// width: 290px;
height: 180px;
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
  margin-left: 60px;
  margin-bottom: -20px;
  border-radius: 10px;
}
.btn{
  position: relative;
  top: -30px;
  width: 120px;
  display: grid;
  place-items: center;
  width: 300px;
  height: 57px;
  margin: auto;
  margin-bottom: 110px;
  border-radius: 20px;
  border: none;
  font: normal normal bold 15px/14px Montserrat;
  font-weight: 500;
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
  width: 25%;
  height: 40px;
  padding: 15px;
  top: -120px;
  left: 18px;
  // padding-left: 35px;
  outline: none;
  font-weight: 200;
  font-size: 1.2rem;
}
.date{
  position: relative;
  padding-top: 10px;
  right: 0px;
}
.ccv{
  position: relative;
  left:95px;
  top: -40px;
}
.zip{
  position: relative;
  top: -80px;
  left: 190px;
  }
.backBtn {
    color: #170a6d;
    font: normal normal bold 11px/14px Montserrat;
    cursor: pointer;
    position: relative;
}
.background{
  position: relative;
  top: -69px;
  background: #F7F7F7;
  height: 100px;
  border-radius: 25px;
  margin-left: -45px;
  width: 458px;
}
.cyanText {
    color: #14127B;
    padding-left: 10px;
}
.notFilledBlue {
    color: #FFFFFF;
    background: #14127B;
    text-align: center;
}
.bit{
    margin-left: 140px;
        top: -40px;
}
.light{
    margin-left: 200px;
    left: 20px;
    top: -57px;
}
.flat{
  top: -23px;
}
.icon{
  display: block;
  position: relative;
  margin-left: auto;
  top: -35px;
  margin-right: auto;
  width: 200px;
}
// .icon1{
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   width: 180px;
//   border: 15px solid #D1D1D1;
//   border-radius: 15px;
//   opacity: 1;
// }
.ordertitle{
position: absolute;
margin-left: 40px;
top: 30px;

}
.fullPrice{
    position: absolute;
    top: 25px;
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
