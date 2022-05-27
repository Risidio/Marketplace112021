<template>
  <div class="lightning">
    <p style="text-align: center;  font: normal normal 700 15px Montserrat;">Scan the QR code</p>
    <div class="qr-background">
    <img :src="QrCode" alt="square" class="icon">
    </div>
    <p class="code">Code is valid for 59:59</p>
      <p style="font: normal normal 600 12px/15px Montserrat; padding-left: 100px;" class="cyanText1">or <span style="font: normal normal bold 16px/16px Montserrat; cursor: pointer;" class="cyanText">Copy The Link</span> <br/></p>
      <img :src="copy" alt="copy-icon" class="icon1">

  </div>
</template>

<script>
export default {
  name: 'lightningPayment',
  data () {
    return {
      QrCode: require('@/assets/img/QR-Code.png'),
      copy: require('@/assets/img/Copy-icon.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.lightning{
  height: 350px;
}
.cyanText {
  color: #14127B;
  padding-left: 10px;
}
.cyanText1{
  position: relative;
  top: -20px;
}
.icon{
  display: block;
  position: relative;
  margin-left: auto;
  top: -35px;
  margin-right: auto;
  width: 230px;
  border: 18px solid #F0EFEF;
  background: #F0EFEF;
  border-radius: 15px;
}
.icon1{
  display: block;
  position: relative;
  margin-left: 255px;
  top: -45px;
  margin-right: auto;
  width: 20px;
}
.code{
  text-align: center;
  font: normal normal 400 9px Montserrat;
  position: relative;
  top: -20px;
}
</style>
