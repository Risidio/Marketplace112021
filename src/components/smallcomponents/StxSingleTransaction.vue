<template>
    <tr class="transaction-data" >
        <th>{{dayjs(item.burn_block_time_iso).format('DD/MM/YYYY')}}</th>
        <th v-if="item.contract_call && item.contract_call.function_name"> {{item.contract_call.function_name}}</th> <th v-else> Setup</th>
        <th class="stx-address">{{ author }}</th>
        <th>{{item.fee_rate ? `STX: ${(item.fee_rate/1000000).toFixed(2)} ` : 'N/A'}}</th>
        <th class="stx-address">{{item.tx_status}}</th>
        <th class="open-in-new-tab-icon"><img @click="openTransaction(item)" src="@/assets/img/open-in-new-icon.svg" alt="Open In New Tab"></th>
    </tr>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'

export default {
  name: 'StxSingleTransaction',
  props: {
    item: Object,
    index: Number
  },
  data () {
    return {
      dayjs: dayjs,
      author: 'Loading...',
      isLoading: true
    }
  },
  mounted () {
    this.getAuthor(this.item)
  },
  methods: {
    getAuthor (item) {
      axios.get(`https://risidio-marketplace-database.herokuapp.com/user/${item.sender_address}`)
        .then((res) => {
          console.log('Everything\'s Fine: ' + res.data[0].username)
          this.author = res.data[0].username
        }).catch(err => {
          console.log('Something Went Wrong')
          console.log('Error: ' + err)
          this.author = item.sender_address.slice(0, 5) + '...' + item.sender_address.slice(-4)
        })
    },
    openTransaction (item) {
      window.open(`https://explorer.stacks.co/txid/${item.tx_id}?chain=testnet`)
    }
  }
}
</script>

<style scoped>
    .open-in-new-tab-icon img {
        cursor: pointer;
        max-width: 20px;
    }
</style>
