<template>
    <div>
        <LaunchCollection1 :content="content" :numberOfItems="numberOfItems"/>
        <LaunchCollection2
        :resultSet="resultSet"
        :filteredUnSoldLaunch="filteredUnSoldLaunch"
        :filteredLaunch="filteredLaunch"
        :content="content"/>
    </div>
</template>

<script >
import { APP_CONSTANTS } from '@/app-constants'
import LaunchCollection1 from '@/components/launchCollection/LaunchCollection1.vue'
import LaunchCollection2 from '@/components/launchCollection/LaunchCollection2.vue'
const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

export default {
  name: 'Launch-Collection',
  components: {
    LaunchCollection1,
    LaunchCollection2
  },
  data () {
    return {
      currentRunAssets: [],
      loopRun: [],
      resultSet: [],
      numberOfItems: 0,
      loading: true,
      pageSize: 20
    }
  },
  mounted () {
    this.getAssets()
  },
  methods: {
    getAssets () {
      this.$store.dispatch('rpayCategoryStore/fetchLoopRun', 'numberone_roots').then((loopRun) => {
        this.loopRun = loopRun
        const data = {
          contractId: loopRun.contractId,
          asc: true,
          runKey: loopRun.currentRunKey,
          page: 0,
          pageSize: this.pageSize
        }
        this.resultSet = null
        this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
          this.resultSet = result.gaiaAssets
          this.numberOfItems = result.tokenCount
          this.loading = false
        })
      })
    }
  },
  computed: {
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_LAUNCH_COLLECTION]
      return content
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
