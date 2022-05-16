<template>
    <section v-if="!loading" class="homepage">
      <HomeBanner v-bind:profile='profile' :content="content"/>
      <HomeMarket v-bind:profile='profile' :gaiaAssets="resultSet"/>
      <HomeInfo v-bind:profile='profile' :content="content"/>
      <HomeSeeAlso v-bind:profile='profile' :gaiaAssets="resultSet"/>
      <HomeBottomBanner v-bind:profile='profile' :content="content"/>
    </section>
    <section v-else style="display: grid; place-items: center;">
      <div >
        <img src="@/assets/img/loading-risid.gif" alt="loading">
        <p style="text-align: center;"> loading... </p>
      </div>
    </section>
</template>

<script>
import HomeBanner from '@/components/homepage/homebanner'
import HomeMarket from '@/components/homepage/homeMarket'
import HomeInfo from '@/components/homepage/homeInfo'
import HomeSeeAlso from '@/components/homepage/homeSeeAlso'
import HomeBottomBanner from '@/components/homepage/homeBottomBanner'
import utils from '@/services/utils'
import { APP_CONSTANTS } from '@/app-constants'
const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

export default {
  name: 'Homepage',
  components: {
    HomeBanner,
    HomeMarket,
    HomeInfo,
    HomeSeeAlso,
    HomeBottomBanner
  },
  data () {
    return {
      resultSet: null,
      loading: true
    }
  },
  watch: {
  },
  mounted () {
    if (this.$store.getters['contentStore/getDataResults']) this.resultSet = this.$store.getters['contentStore/getDataResults'].gaiaAssets
    if (!this.resultSet) this.fetchFullRegistry()
    else this.loading = false
  },
  methods: {
    sortCollection (loopRun) {
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: 0,
        pageSize: 30
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        this.resultSet = result.gaiaAssets
        if (result) this.$store.commit('contentStore/addDataResults', result)
      })
      this.loading = false
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
        $self.loaded = true
      })
    }
  },
  computed: {
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
      return content
    },
    profile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
