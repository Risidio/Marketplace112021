<template>
    <div>
        <IndigeCollection1 :content="content" :project="project"/>
        <IndigeCollection2
        :pageSize="pageSize"
        :resultSet="resultSet"
        :numberOfItems="numberOfItems"
        :content="content"
        :loopRun="allLoopRuns[0]"/>
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
      project: null
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
        page: this.$route.params.page,
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
        this.sortCollection(projects.find((project) => project.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.risidio-indige'))
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        this.project = projects.find((project) => project.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.risidio-indige')
        $self.loaded = true
      })
    },
    pageNumberChange (item) {
      this.page = item
    }
  },
  watch: {
    '$route' () {
      this.fetchFullRegistry()
    }
  },
  computed: {
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_INDIGE_COLLECTION]
      return content
    },
    allLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS].filter((loopRun) => loopRun.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.risidio-indige')
      return loopRuns
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
