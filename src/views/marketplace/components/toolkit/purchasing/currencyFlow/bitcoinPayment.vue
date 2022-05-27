<template>
  <div class="bitcoin">
    <button class="btn notFilledBlue">One Click Payment With Xxx</button>
  </div>
</template>

<script>
export default {
  name: 'BitcoinPayment',
  props: ['currpage'],
  data () {
    return {
      currPage: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.bitcoin{
  height: 350px;
}
.btn{
  position: relative;
  top: 130px;
  width: 120px;
  display: grid;
  place-items: center;
  width: 300px;
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
