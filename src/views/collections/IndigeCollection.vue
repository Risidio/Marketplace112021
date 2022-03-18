<template>
    <div>
        <IndigeCollection1 :content="content" :numberOfItems="numberOfItems"/>
        <IndigeCollection2
        :resultSet="resultSet"
        :content="content"
        :loopRun="loopRun"/>
    </div>
</template>

<script >
import { APP_CONSTANTS } from '@/app-constants'
import IndigeCollection1 from '@/components/indigeCollection/IndigeCollection1.vue'
import IndigeCollection2 from '@/components/indigeCollection/IndigeCollection2.vue'
import utils from '@/services/utils'

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
      pageSize: 8,
      page: 0
    }
  },
  mounted () {
    this.fetchFullRegistry()
  },
  methods: {
    sortCollection (loopRun) {
      this.loopRun = loopRun
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: this.page,
        pageSize: this.pageSize
      }
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.loading = false
      })
    },
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        this.sortCollection(projects.find((project) => project.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.indige-mint'))
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
      console.log('registry')
    }
  },
  computed: {
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_INDIGE_COLLECTION]
      return content
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
