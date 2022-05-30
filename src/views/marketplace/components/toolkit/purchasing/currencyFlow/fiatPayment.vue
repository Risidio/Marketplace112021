<template>
  <div>
    <p style="text-align: center;  font: normal normal 600 15px Montserrat;">Enter your payment informations</p>
    <div class="currency-table" style="background: #F0EFEF">
      <div class="card-num" >
        <input type="text" placeholder="xxxx xxxx xxxx xxxx"><span class="card-details"></span>
      </div>
      <div class="card-detail date" >
        <input type="text" placeholder="MM / YY"><span class="card-details"></span>
      </div>
        <div class="card-detail ccv" >
        <input type="text" placeholder="CVV"><span class="card-details"></span>
      </div>
        <div class="card-detail zip" >
        <input type="text" placeholder="Zip code"><span class="card-details"></span>
      </div>
    </div>
    <button class="btn notFilledBlue" @click="$parent.$emit('nextPage')" >SEND $</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.currency-table{
// margin-left: 30px;
padding-left: 23px;
padding-top: 150px;
// width: 290px;
height: 180px;
border-radius: 12px;
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
.card-details{
  width: 35px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
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
.notFilledBlue {
    color: #FFFFFF;
    background: #14127B;
    text-align: center;
}
</style>
