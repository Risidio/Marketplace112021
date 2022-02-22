<template>
<div class="row">
  <div class="col-12 mb-5">
    <div>
      <p style="font-size: 12px;"> Price</p>
      <div class="buyNowInput">
        <label class="buyNowInputLabel">STX</label>
          <input min="0" type="number" v-model="buyNowOrStartingPrice" placeholder="STX"/>
      </div>
      <!-- </b-input-group> -->
    </div>
  </div>
  <div><p class=" " v-html="errorMessage"></p></div>
</div>
</template>

<script>
import utils from '@/services/utils'

export default {
  name: 'SellBuyNow',
  components: {
  },
  props: ['contractAsset'],
  watch: {
    'buyNowOrStartingPrice' () {
      this.$emit('updateAmount', this.buyNowOrStartingPrice)
    }
  },
  data () {
    return {
      buyNowOrStartingPrice: 0,
      errorMessage: null
    }
  },
  mounted () {
    this.buyNowOrStartingPrice = this.contractAsset.saleData.buyNowOrStartingPrice
    this.contractAsset.saleData.reservePrice = 0
    this.contractAsset.saleData.incrementPrice = 0
    this.contractAsset.saleData.saleType = 1
  },
  methods: {
    toDecimals: function () {
      this.buyNowOrStartingPrice = utils.toDecimals(this.buyNowOrStartingPrice)
    },
    updateBuyNowOrStartingPrice: function () {
      // this.contractAsset.saleData.buyNowOrStartingPrice = parseInt(this.buyNowOrStartingPrice)
    }
  },
  computed: {
  }
}
</script>
<style lang="scss" scoped>
.buyNowInput{
  input{
    border-bottom-right-radius: 22px;
    border-top-right-radius: 22px;
    border: 1px solid #ccc;
    border-left: 0;
    padding: 8px 5px 8px 20px;
    font-size: 11px;
    font-weight: 300;
    margin-left: auto;
    text-align: right;
    width: 50%;
  }
}
.buyNowInputLabel{
  border: 1px solid #ccc;
  border-bottom-left-radius: 22px;
  border-top-left-radius: 22px;
  font-size: 11px;
  padding: 8px 20px;
  background: #FFF;
  color: #9c9c9c;
}
</style>
