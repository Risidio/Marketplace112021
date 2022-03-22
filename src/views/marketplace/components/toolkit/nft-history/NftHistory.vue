<template>
<div v-if="events">
  <h6 class="text-black">NFT History</h6>
    <table class="transaction-table">
      <tr><th>Date</th><th>Event</th><th>From</th><th>Amount</th></tr>
      <tr class="transaction-data" v-for="(item, index) in events" :key="index">
          <th>{{dayjs(item.timestamp).format('DD/MM/YYYY')}}</th>
          <th> {{item.functionName ? item.functionName : 'Setup'}}</th>
          <th>{{item.from.slice(0, 30)}}...</th>
          <th>{{item.amount ? `STX: ${item.amount} ` : 'N/A'}}</th>
      </tr>
    </table>
</div>
</template>

<script>
import { DateTime } from 'luxon'
import SockJS from 'sockjs-client'
import dayjs from 'dayjs'
import Stomp from '@stomp/stompjs'

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
  name: 'NFTHistroy',
  components: {
  },
  props: ['nftIndex', 'assetHash', 'loopRun'],
  data: function () {
    return {
      events: null,
      timer: null,
      dayjs: dayjs,
      previouslyPending: false

    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    unsubscribeApiNews()
  },
  mounted () {
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
    }
  },
  computed: {
  }
}
</script>

<style>
.flasher {
  border-bottom: 2pt solid #FFCE00;
  padding: 0px;
}
</style>
