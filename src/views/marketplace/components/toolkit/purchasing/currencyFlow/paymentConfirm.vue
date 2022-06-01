<template>
  <div class="paymentConfirm">
     <img :src="paymentConfirm" alt="payment" class="icon">
       <p style="text-align: center; position: relative; top: -50px; padding-bottom: 10px; font: normal normal 800 15px Montserrat;"> Your Payment Successful</p>
        <p class="fullPrice"><span>  <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span> STX tokens</span></p>
        <p> <span style="font: normal normal bold 14px/16px Montserrat;  cursor: pointer;" class="cyanText">Copy The Receive</span> <br/></p>
      <img :src="copy" alt="copy-icon" class="icon1">
    <button class="btn notFilledBlue"  @click="$emit('hideModule')">Done</button>
      <div class="progressbar">
     <img style="width: 300px; margin-left: 50px;" :src="progressFinal" alt="progres" class="">
    <p style="font: normal normal 500 9px Montserrat;"  class="order" ><span>Place Order</span></p>
    <p style="font: normal normal 500 9px Montserrat;"  class="payment" ><span>Make the payement</span></p>
    <p style="font: normal normal 500 9px Montserrat;"  class="Confirmation" ><span>Confirmation</span></p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentConfirm',
  props: ['gaiaAsset', 'openPurchaseDialog'],
  data () {
    return {
      paymentConfirm: require('@/assets/img/bitcoin-icon.png'),
      copy: require('@/assets/img/Copy-icon.png'),
      progressFinal: require('@/assets/img/ProgressFinal.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.paymentConfirm{
  height: 650px;
}
.cyanText{
  position: relative;
  top: -5px;
  left: 120px;
  color: #14127B;
  padding-left: 10px;
}
.icon1{
  display: block;
  position: relative;
  margin-left: 255px;
  top: -35px;
  left: 10px;
  margin-right: auto;
  width: 20px;
}
.icon{
  display: block;
  position: relative;
  margin-left: -30px;
  top: -63px;
  margin-right: auto;
  width: 458px;
}
.progressbar{
  position:absolute;
  bottom: -40px;
}
.payment{
  position: relative;
  left: 145px;
  top: -22px;
}.Confirmation{
  position: relative;
  left: 310px;
  top: -42px;
}
.order{
   position: relative;
   left: 25px;
}
.fullPrice{
    position: absolute;
    top: 380px;
    left: 150px;
   font: normal normal 300 19px/29px Montserrat;
     span{
      font: normal normal 300 15px/29px Montserrat;
    // padding-left: 80px;
      span{
        font: normal normal bold 15px/29px Montserrat;
        color:#5154A1;
      }
    }
}
.btn{
  position: relative;
  width: 120px;
  display: grid;
  place-items: center;
  width: 298px;
  height: 57px;
  margin: auto;
  border-radius: 20px;
  border: none;
  font: normal normal bold 15px/14px Montserrat;
  font-weight: 500;
}
.notFilledBlue {
    color: #FFFFFF;
    background: #14127B;
}
</style>
