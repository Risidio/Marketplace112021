<template>
    <div>
        <IndigeCollection1 :content="content" :numberOfItems="numberOfItems"/>
        <IndigeCollection2
        :gaiaAssets="gaiaAssets"
        :filteredUnSoldLaunch="filteredUnSoldLaunch"
        :filteredLaunch="filteredLaunch"
        :content="content"
        :projects="projects"/>
    </div>
</template>

<script >
import { APP_CONSTANTS } from '@/app-constants'
import IndigeCollection1 from '@/components/indigeCollection/IndigeCollection1.vue'
import IndigeCollection2 from '@/components/indigeCollection/IndigeCollection2.vue'
const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

export default {
  name: 'Indige-Collection',
  components: {
    IndigeCollection1,
    IndigeCollection2
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
      this.$store.dispatch('rpayCategoryStore/fetchLoopRun', 'indigenew100').then((loopRun) => {
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
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_INDIGE_COLLECTION]
      return content
    },
    // content1 () {
    //   const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_INDIGE_COLLECTION]
    //   return content
    // },
    projects () {
      const appmap = this.$store.getters[APP_CONSTANTS.KEY_REGISTRY]
      if (appmap) return appmap.apps
      return []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
