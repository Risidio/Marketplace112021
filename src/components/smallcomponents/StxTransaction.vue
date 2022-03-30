<template>
    <div>
        <h3 style="font-size: 13px; font-weight: 700;"> Transactions</h3>
        <table class="transaction-table">
        <tr><th>Date</th><th>Method Type</th><th>By</th><th>Fees</th></tr>
        <tr class="transaction-data" v-for="(item, index) in stxTransaction" :key="index" @click="openTransaction(item)">
            <th>{{dayjs(item.burn_block_time_iso).format('DD/MM/YYYY')}}</th>
            <th v-if="item.contract_call && item.contract_call.function_name"> {{item.contract_call.function_name}}</th> <th v-else> Setup</th>
            <th class="stx-address">{{item.sender_address}}</th>
            <th>{{item.fee_rate ? `STX: ${item.fee_rate/1000000} ` : 'N/A'}}</th>
            <th class="stx-address">{{item.tx_status}}</th>
        </tr>
        </table>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'StxTransaction',
  props: {
    stxTransaction: Array
  },
  data () {
    return {
      dayjs: dayjs
    }
  },
  methods: {
    openTransaction (item) {
      window.open(`https://explorer.stacks.co/txid/${item.tx_id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
