<template>
<b-container>
  <div class="background">
    <!-- <h1 style="font: normal normal 300 18px Montserrat;" class="ordertitle"> Your Order: </h1> -->
    <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX tokens</span></p>
    <p style="font: normal normal 500 12px Montserrat;"  class="edit" @click="$emit('previousPage')" ><span>Edit</span></p>
    <img :src="edit" alt="edit" class="edit-img">
  </div>
  <div>
    <img  v-if="currPage === 0" :src="square" alt="square" class="icon">
    <img v-else-if="currPage === 2" :src="square" alt="QRCode" class="icon">
    <img style="width: 150px; margin-bottom: 40px;" v-else-if="currPage === 1" :src="stacks" alt="stacks" class="icon">
  </div>
  <p style="text-align: center; position: relative; top: -30px; padding-bottom: 10px; font: normal normal 600 15px Montserrat;">Select your payment method</p>
  <div>
    <button :class="['button', 'flat', currPage === 0 ? 'blue' : 'white']" @click="currPage = 0">Fiat</button>
    <button :class="['button', 'bit', currPage === 1 ? 'blue' : 'white']" @click="currPage = 1" >Bitcoin</button>
    <button :class="['button', 'light', currPage === 2 ? 'blue' : 'white']"  @click="currPage = 2">Lightning</button>
  </div>
  <div class="progressbar">
     <img style="width: 300px; margin-left: 30px;" :src="progress" alt="progres" class="">
    <p style="font: normal normal 500 9px Montserrat;"  class="order" ><span>Place Order</span></p>
    <p style="font: normal normal 500 9px Montserrat;"  class="payment" ><span>Make the payement</span></p>
    <p style="font: normal normal 500 9px Montserrat;"  class="Confirmation" ><span>Confirmation</span></p>
  </div>
  <FiatPayment  v-if="currPage === 0"/>
  <BitcoinPayment   v-if="currPage === 1"/>
  <LightningPayment v-if="currPage === 2"/>
  <PaymentConfirm v-if="currPage === 3" />
</b-container>
</template>

<script>
import FiatPayment from './currencyFlow/fiatPayment.vue'
import BitcoinPayment from './currencyFlow/bitcoinPayment.vue'
import LightningPayment from './currencyFlow/lightningPayment.vue'
import PaymentConfirm from './currencyFlow/paymentConfirm.vue'
export default {
  name: 'PurchaseBuyNow',
  components: {
    FiatPayment,
    BitcoinPayment,
    LightningPayment,
    PaymentConfirm
  },
  props: ['contractAsset', 'gaiaAsset', 'currpage', 'previousPage'],
  data () {
    return {
      square: require('@/assets/img/square1.png'),
      QrCode: require('@/assets/img/QR-Code.png'),
      stacks: require('@/assets/img/stacks-icon.png'),
      edit: require('@/assets/img/edit.png'),
      progress: require('@/assets/img/ProgressLine2.png'),
      loading: true,
      formSubmitted: false,
      errorMessage: null,
      defaultRate: null,
      currPage: 0
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
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
.blue{
  background: #170a6d;
  color: white;
}
.white{
 background: #F7F7F7;
 color: black;
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
.payment{
  position: relative;
  left: 135px;
  top: -22px;
}.Confirmation{
  position: relative;
  left: 290px;
  top: -42px;
}
.progressbar{
  position:absolute;
  bottom: -40px;
}
.backBtn {
    color: #170a6d;
    font: normal normal bold 11px/14px Montserrat;
    cursor: pointer;
    position: relative;
}
// .button:hover {
//   background: #170a6d;
//   color: white;
// }
.background{
  position: relative;
  top: -69px;
  background: #F7F7F7;
  height: 100px;
  border-radius: 25px;
  margin-left: -45px;
  width: 458px;
  background:#F7F7F7;
  color: #000;
;
}
.cyanText {
    color: #14127B;
    padding-left: 10px;
}
.notFilledBlue {
    color: #FFFFFF;
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
.edit{
  position: relative;
  left: 400px;
  top: 15px;
  cursor: pointer;
}
.edit-img{
position: relative;
width: 13px;
left: 430px;
top: -20px;
}
.fullPrice{
    position: absolute;
    top: 40px;
    left: 160px;
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
