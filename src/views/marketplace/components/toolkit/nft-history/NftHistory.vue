<template>
<div class="history-container scroll" v-if="events">
  <h6 class="text-black"> <b>NFT History</b></h6>
  <hr class="text-black"/>
  <div class="scroll">
    <div  v-for="(item, index) in events" :key="index">
      <div class="history-sub-container">
        <p class="stx-address small">{{dayjs(item.timestamp).format('DD.MM.YYYY')}} &nbsp;</p>
        <p class="stx-address small" style="min-width: 50px;">&nbsp; {{dayjs(item.timestamp).format('hh:mm')}} &nbsp;</p>
        <p class="stx-address small" style="min-width: 150px;">&nbsp; <b>{{item.from.slice(0, 5) + "..." + item.from.slice(-3)}}</b></p>
        <p class="stx-address small" style="min-width: 150px;">&nbsp; {{item.functionName ? item.functionName : 'Setup'}}</p>
        <p v-if="item.amount" class="stx-address small" style="margin-left: auto;">STX: <span class="blue">{{item.amount}}</span> <span class="light">= {{changeCurrencyTag() || '£'}} {{changeCurrency(item.amount || 0)}}</span></p>
        <p v-else class="stx-address small" style="margin-left: auto;"> N/A </p>
      </div>
      <hr style="min-width: 450px;"/>
    </div>
  </div>
    <!-- <table class="transaction-table ">
      <tr><th>NFT History</th></tr>
      <tr class="history-sub-container" v-for="(item, index) in events" :key="index">
          <th >{{dayjs(item.timestamp).format('DD.MM.YYYY')}} {{dayjs(item.timestamp).format('hh:mm')}} &nbsp;</th>
          <th> {{item.functionName ? item.functionName : 'Setup'}}</th>
          <th class="stx-address"><b>{{item.from.slice(0, 5) + "..." + item.from.slice(-3)}}</b></th>
          <th v-if="item.amount" class="stx-address small" style="margin-left: auto;">STX: <span class="blue">{{item.amount}}</span> <span class="light">= £ 50</span></th>
          <th class="stx-address">{{item.txStatus}}</th>
      </tr>
    </table>
      <hr style="width: 100%;"/> -->
</div>
</template>

<script>
import { DateTime } from 'luxon'
import SockJS from 'sockjs-client'
import dayjs from 'dayjs'
import Stomp from '@stomp/stompjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
dayjs.extend(LocalizedFormat)

let socket = null
let stompClient = null

const RISIDIO_API_PATH = process.env.VUE_APP_RISIDIO_API

const unsubscribeApiNews = function () {
  if (socket && stompClient) {
    stompClient.disconnect()
  }
}

const subscribeApiNews = function (that) {
  const connectUrl = RISIDIO_API_PATH + '/mesh/api-news'
  if (!socket) socket = new SockJS(connectUrl)
  if (!stompClient) stompClient = Stomp.over(socket)
  stompClient.debug = () => { console.log('debug off') }
  socket.onclose = function () {
    stompClient.disconnect()
  }
  stompClient.connect({}, function () {
    stompClient.subscribe('/queue/transaction-news-' + that.nftIndex + '-' + that.loopRun.contractId, function (response) {
      const pending = JSON.parse(response.body)
      that.$emit('setPending', pending)
      // that.checkForPendingTransactions('fetchNFTEvents', that.nftIndex)
    })
  },
  function (error) {
    console.log(error)
  })
}

export default {
  name: 'NFTHistory',
  components: {
  },
  props: ['nftIndex', 'assetHash', 'loopRun'],
  data: function () {
    return {
      events: null,
      timer: null,
      dayjs: dayjs,
      previouslyPending: false,
      currencyPreference: null
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    unsubscribeApiNews()
  },
  async mounted () {
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
    let methos = 'fetchNFTEvents'
    let arg0 = this.nftIndex
    if (this.nftIndex < 0) {
      methos = 'fetchNFTEventsByHash'
      arg0 = this.assetHash
    }
    // check
    this.checkForPendingTransactions(methos, arg0)
    this.startPolling(methos, arg0)
    if (typeof this.nftIndex !== 'undefined' && this.nftIndex > -1) {
      // poll for pending transactions for the history list but
      // use a websocket connection to be informed straight away
      // about nft status changes.
      // this allows the client app to limit the number of pointless transactions
      // being sent to the blockchain.
      subscribeApiNews(this)
    }
  },
  methods: {
    startPolling: function (methos, arg0) {
      const $self = this
      this.timer = setInterval(function () {
        $self.checkForPendingTransactions(methos, arg0)
      }, 30000)
    },
    /**
     * Fetch all the events on this NFT and check for any pending..
     * if found inform the parent (/item-preview or /nft/:index)
     */
    checkForPendingTransactions (methos, arg0) {
      const data = {
        contractId: this.loopRun.contractId,
        nftIndex: arg0,
        assetHash: arg0
      }
      this.$store.dispatch('rpayTransactionStore/' + methos, data).then((events) => {
        if (events && events.length > 0) {
          this.events = events.reverse()
          console.log(this.events)
          this.$emit('setPending', events[0])
          if (events[0].txStatus && events[0].txStatus === 'pending') {
            this.previouslyPending = true
          } else {
            clearInterval(this.timer)
          }
          if (this.previouslyPending && events[0].txStatus && events[0].txStatus !== 'pending') {
            this.update()
          }
          this.events.forEach((event) => {
            if (!event.txStatus || event.txStatus === 'pending') {
              this.$store.dispatch('rpayTransactionStore/fetchTransactionFromChainByTxId', event.txId).then((result) => {
                // failed to find the txId via Hiro API - need to check the
                // timestamp on this and tx and set it to  special status
                // to get it out of the pending list.
                const nowMinusSixHours = new Date().getTime() - 360000
                if (!result && (event.timestamp < nowMinusSixHours)) {
                  event.txStatus = 'expired'
                  this.$store.dispatch('rpayTransactionStore/updateTransaction', event)
                }
              })
            }
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    updateCacheByHash () {
      const data = { contractId: this.loopRun.contractId, assetHash: this.assetHash }
      this.$store.dispatch('rpayStacksContractStore/updateCacheByHash', data).then(() => {
        this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndAssetHash', data).then((item) => {
          this.$emit('update', item)
        })
      })
    },
    updateCacheByNftIndex () {
      const data = { contractId: this.loopRun.contractId, nftIndex: this.nftIndex }
      this.$store.dispatch('rpayStacksContractStore/updateCacheByNftIndex', data).then(() => {
        this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndNftIndex', data).then((item) => {
          this.$emit('update', item)
        })
      })
    },
    update () {
      if (typeof this.nftIndex !== 'undefined' && this.nftIndex > -1) {
        this.updateCacheByNftIndex()
      } else {
        this.updateCacheByHash()
      }
    },
    getAnimation: function (data) {
      const txStatus = this.events[data.index].txStatus
      if (!txStatus || txStatus === 'pending') {
        return 'throb'
      } else {
        return 'none'
      }
    },
    getClass: function (data) {
      const txStatus = this.events[data.index].txStatus
      if (!txStatus || txStatus === 'pending') {
        return 'text-warning'
      } else if (txStatus === 'success') {
        return 'text-success'
      } else {
        return ' '
      }
    },
    copy (type, data) {
      const copyText = document.getElementById('copy-address')
      const value = this.events[data.index][type]
      copyText.value = value
      copyText.select()
      document.execCommand('copy')
      this.doFlash(type, data.index)
      this.$notify({ type: 'info', title: 'Copied to Clipboard', text: 'Copied address to clipboard: ' + copyText.value })
    },
    doFlash (type, index) {
      const flasher = this.$refs[type + '_' + index]
      flasher.classList.add('flasher')
      setTimeout(function () {
        flasher.classList.remove('flasher')
      }, 1000)
    },
    checkTx: function (data) {
      const txId = this.events[data.index].txId
      this.$store.dispatch('rpayTransactionStore/fetchTransactionFromChainByTxId', txId).then((result) => {
        this.$notify({ type: 'warning', title: 'Check Status', text: 'Transaction status is ' + result.txStatus })
      })
    },
    showThrobber: function (data) {
      if (!data.value || data.value === 'pending') return true
      return false
    },
    transactionUrl: function (data) {
      if (this.events[data.index].txStatus === 'expired') {
        return ''
      }
      let txId = this.events[data.index].txId
      if (!txId.startsWith('0x')) txId = '0x' + txId
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      return stacksApiUrl + '/txid/' + txId + '?chain=' + process.env.VUE_APP_NETWORK
    },
    getTitle: function (data) {
      if (this.events[data.index].txStatus === 'expired') return 'Transaction expired or orphaned in mempool - not available on Blockchain'
      return 'View on the blockchain - some transactions take a little while to show up.'
    },
    getIcon: function (data) {
      if (this.events[data.index].txStatus === 'expired') return 'x-circle'
      return 'arrow-up-right-circle'
    },
    getFunctionName: function (functionName) {
      if (functionName === 'buy-now') {
        return 'Sale'
      } else if (functionName === 'mint-token') {
        return 'Minted'
      } else if (functionName === 'set-sale-data') {
        return 'Sale Data'
      } else if (functionName === 'opening-bid') {
        return 'Opening Bid'
      } else if (functionName === 'place-bid') {
        return 'Bid Placed'
      } else if (functionName === 'set-approved') {
        return 'Approvals'
      }
      return functionName.replaceAll('-', ' ')
    },
    truncAddress (address) {
      return '..' + address.substring(address.length - 6)
    },
    fields () {
      return ['timestamp', 'event', 'from', 'to', 'amount', 'status']
    },
    values () {
      let mapped = []
      const $self = this
      mapped = this.events.map(function (transaction) {
        return {
          timestamp: DateTime.fromMillis(transaction.timestamp).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          event: $self.getFunctionName(transaction.functionName),
          from: (transaction.from) ? $self.truncAddress(transaction.from) : '',
          to: (transaction.to) ? $self.truncAddress(transaction.to) : '',
          amount: transaction.amount,
          status: transaction.txStatus
        }
      })
      return mapped
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
    }
  },
  computed: {
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

</style>
