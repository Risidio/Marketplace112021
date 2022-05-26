<template>
  <div>
    <p style="text-align: center;  font: normal normal 600 15px Montserrat;">Enter your payment informations</p>
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
    <button class="btn notFilledBlue" >SEND $</button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
