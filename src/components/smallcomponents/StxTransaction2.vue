<template>
    <div>
        <table class="transaction-table">
        <tr><th>Date</th><th>Method</th><th>Sold By</th><th>Fees</th><th>Status</th></tr>
        <StxSingleTransaction class="transaction-data" v-for="(item, index) in StxTransaction2" :key="index" :item="item" :index="index"  />
        </table>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import StxSingleTransaction from './StxSingleTransaction.vue'

export default {
  name: 'StxTransaction2',
  components: {
    StxSingleTransaction
  },
  props: {
    StxTransaction2: Array
  },
  data () {
    return {
      dayjs: dayjs,
      authors: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
