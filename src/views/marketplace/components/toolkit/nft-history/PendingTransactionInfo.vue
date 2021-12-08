<template>
<div v-if="pending">
  <!-- <b-alert class="text-small text-black" style="" show>
  </b-alert> -->
  <div style="font-size: 1.5rem;" variant="light" show>
   {{txMessage()}}
    <h6 class="mt-3 mb-3">This NFT is being updated live on Blockchain - <a :href="transactionUrl(pending.txId)" target="_blank"><span style="text-transform: capitalise;" class="cyanText"> Click here to view it's Progress</span></a></h6>
    <div class="w-100"><span @click="checkTx(pending.txId)" class="ml-3 w-100"><img class="w-100" :src="mintme"/></span></div>
    <div class="d-flex justify-content-between">
      <br/>
      <div>
      </div>
    </div>
    <div v-if="!pending">Status: {{pending.txStatus}}</div>
  </div>
  <div style="color: #529e72;">
    Be patient, depending on blockchain traffic this could take a while. Leave this page open to check progress. When the transaction’s confirmed NFT will update in your library.
(It’s advisable to increase your transaction fees to speed the process.)
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'PendingTransactionInfo',
  components: {
  },
  props: ['pending'],
  data () {
    return {
      // mintme: require('@/assets/img/marketplace/minting-animation.gif')
      mintme: require('@/assets/img/loading2.gif')
    }
  },
  methods: {
    txMessage: function () {
      if (!this.pending || this.pending.functionName === 'mint-token') {
        return 'Minting in Progress'
      } else if (this.pending.functionName === 'buy-now') {
        return 'Buy Now in Progress'
      } else if (this.pending.functionName === 'place-bid' || this.pending.functionName === 'opening-bid') {
        return 'Buy Now in Progress'
      } else if (this.pending.functionName === 'set-sale-data') {
        return 'Setting Sale Data in Progress'
      } else {
        return 'Transaction in Progress'
      }
    },
    checkTx: function (txId) {
      this.$store.dispatch('rpayTransactionStore/fetchTransactionFromChainByTxId', txId).then((result) => {
        this.$notify({ type: 'warning', title: 'Check Status', text: 'Transaction status is ' + result.txStatus })
      })
    },
    getFunctionName: function (functionName) {
      return functionName.replaceAll('-', ' ')
    },
    transactionUrl: function (txId) {
      if (!txId.startsWith('0x')) txId = '0x' + txId
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      return stacksApiUrl + '/txid/' + txId + '?chain=' + process.env.VUE_APP_NETWORK
    }
  },
  computed: {
    profile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
