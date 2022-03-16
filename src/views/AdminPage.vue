<template>
    <div>
        <AdminCollection v-bind:allLoopRuns="allLoopRuns" :projects="projects"/>
    </div>
</template>

<script>
import AdminCollection from '@/components/admin/AdminCollection'
import utils from '@/services/utils'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'AdminPage',
  components: {
    AdminCollection
  },
  data () {
    return {
      showWalletNfts: false,
      loaded: false,
      showColls: true,
      projects: [],
      contractId: null,
      makerUrlKey: null
    }
  },
  mounted () {
    this.fetchFullRegistry()
  },
  methods: {
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        console.log(projects)
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
    }
  },
  computed: {
    allLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS]
      return loopRuns
    },
    application () {
      const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID]('ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.test_collections9')
      return application
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
