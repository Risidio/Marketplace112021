<template>
    <div>
        <table class="transaction-table">
        <tr><th>Date</th><th>Method</th><th>Sold By</th><th>Fees</th><th>Status</th></tr>
        <tr class="transaction-data" v-for="(item, index) in StxTransaction2" :key="index" @click="openTransaction(item)">
            <th>{{dayjs(item.burn_block_time_iso).format('DD/MM/YYYY')}}</th>
            <th v-if="item.contract_call && item.contract_call.function_name"> {{item.contract_call.function_name}}</th> <th v-else> Setup</th>
            <th class="stx-address">{{item.sender_address.slice(0, 5) + "..." + item.sender_address.slice(-4)}}</th>
            <th>{{item.fee_rate ? `STX: ${(item.fee_rate/1000000).toFixed(2)} ` : 'N/A'}}</th>
            <!-- <th>{{item.fee_rate ? `STX: ${item.fee_rate} ` : 'N/A'}}</th> -->
            <th class="stx-address">{{item.tx_status}}</th>
        </tr>
        </table>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'StxTransaction2',
  props: {
    StxTransaction2: Array
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
