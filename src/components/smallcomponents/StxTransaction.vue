<template>
    <div>
        <h3 style="font-size: 13px; font-weight: 700;"> Transactions</h3>
        <div class="table-container">
          <table class="transaction-table">
          <tr><th>Date</th><th>Method Type</th><th>By</th><th>Fees</th></tr>
          <StxSingleTransaction class="transaction-data" v-for="(item, index) in stxTransaction" :key="index" :item="item" :index="index"  />
          </table>
        </div>
    </div>
</template>

<script>
import StxSingleTransaction from './StxSingleTransaction.vue'

export default {
  name: 'StxTransaction',
  components: {
    StxSingleTransaction
  },
  props: {
    stxTransaction: Array
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  overflow-x: auto;
}
</style>
