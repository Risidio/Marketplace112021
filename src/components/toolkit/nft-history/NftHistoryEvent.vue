<template>
  <div class="history-event-container">
      <div class="history-sub-container">
        <p class="stx-address small">{{dayjs(item.timestamp).format('DD.MM.YYYY')}} &nbsp;</p>
        <p class="stx-address small" style="min-width: 50px;">&nbsp; {{dayjs(item.timestamp).format('hh:mm')}} &nbsp;</p>
        <p class="stx-address small" style="min-width: 150px;">&nbsp; <b>{{author}}</b></p>
        <p class="stx-address small" style="min-width: 150px;">&nbsp; {{item.functionName ? item.functionName : 'Setup'}}</p>
        <p v-if="item.amount" class="stx-address small" style="margin-left: auto;">STX: <span class="blue">{{item.amount}}</span> <span class="light">= {{changeCurrencyTag() || '£'}} {{changeCurrency(item.amount || 0)}}</span></p>
        <p v-else class="stx-address small" style="margin-left: auto;"> N/A </p>
        <p class="open-in-new-tab-icon"><img @click="openTransaction(item)" src="../../../assets/img/open-in-new-icon.svg" alt="Open In New Tab" /></p>
      </div>
      <hr style="min-width: 450px;"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'NFT History Event',
  props: ['item'],
  data () {
    return {
      dayjs: dayjs,
      author: 'Loading...',
      currencyPreference: null
    }
  },
  async mounted () {
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
    this.getAuthor(this.item)
  },
  methods: {
    getAuthor (item) {
      axios.get(`https://risidio-marketplace-database.herokuapp.com/user/${item.from}`)
        .then((res) => {
          console.log('Everything\'s Fine: ' + res.data[0].username)
          this.author = res.data[0].username
        }).catch(err => {
          console.log('Something Went Wrong')
          console.log('Error: ' + err)
          this.author = item.from.slice(0, 5) + '...' + item.from.slice(-4)
        })
    },
    changeCurrency (price) {
      if (!price) return 0
      if (this.currencyPreference) {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rates = tickerRates.find((rate) => rate.currency === this.currencyPreference.text)
        const nFTPrice = utils.toDecimals(rates.stxPrice * price)
        return nFTPrice
      } else {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rates = tickerRates.find((rate) => rate.currency === 'GBP')
        const nFTPrice = utils.toDecimals(rates.stxPrice * price)
        return nFTPrice
      }
    },
    changeCurrencyTag () {
      if (this.currencyPreference && this.currencyPreference.text === 'GBP') {
        return '£'
      } else if (this.currencyPreference && this.currencyPreference.text === 'USD') {
        return '$'
      } else if (this.currencyPreference && this.currencyPreference.text === 'CNY') {
        return '¥'
      } else if (this.currencyPreference && this.currencyPreference.text === 'JPY') {
        return '¥'
      } else if (this.currencyPreference && this.currencyPreference.text === 'EUR') {
        return '€'
      } else {
        return '£'
      }
    },
    openTransaction (item) {
      window.open(`https://explorer.stacks.co/txid/${item.txId}?chain=testnet`)
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container{
  background: rgba(129, 129, 129, 0.05);
  padding: 100px 15px;
  border-radius: 26px;
  margin: 5vw 10px;
  >*{
    max-width: 735px;
    margin: auto;
  }
}
.small{
  font-size: 12px;
}
.text-black{
  margin-bottom: 10px;
}
.history-sub-container {
  display: flex;
  p{
    margin: 0;
    padding: 0;
  }
  .blue{
    color: #5FBDC1;
    font-weight: bold;
  }
  .light{
    font-size: 10px;
    color: #777777;
  }
}
.scroll{
  // width: 700px;
  overflow-x: auto;
  white-space: nowrap;
}
.flasher {
  border-bottom: 2pt solid #FFCE00;
  padding: 0px;
}
.open-in-new-tab-icon img {
  cursor: pointer;
  max-width: 20px;
  margin-left: 20px;
}
</style>
