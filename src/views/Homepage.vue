<template>
    <section class="homepage">
      <HomeBanner v-bind:profile='profile' :content="content"/>
      <HomeMarket v-bind:profile='profile' :gaiaAssets="resultSet"/>
      <HomeInfo v-bind:profile='profile' :content="content"/>
      <HomeSeeAlso v-bind:profile='profile' :gaiaAssets="resultSet"/>
      <HomeBottomBanner v-bind:profile='profile' :content="content"/>
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
      resultSet: [],
      loading: true,
      numberOfItems: null
    }
  },
  mounted () {
    this.findAssets()
    this.fetchFullRegistry()
  },
  methods: {
    findAssets () {
      this.$store.dispatch('rpaySearchStore/findByProjectId', STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME).then((results) => {
        this.resultSet = results.filter(result => result.attributes.artworkFile.fileUrl !== null)
      })
    },
    sortCollection (loopRun) {
      console.log(loopRun)
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: 0,
        pageSize: 30
      }
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        console.log(result)
        this.resultSet = result.gaiaAssets.slice(0, 8)
        this.numberOfItems = result.tokenCount
        this.loading = false
      })
    },
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        console.log(projects)
        this.sortCollection(projects.find((project) => project.contractId === 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.indigenew100'))
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
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
      return content
    },
    profile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    },
    gaiaAssets () {
      const assets = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSETS]
      return (assets) ? assets.reverse() : []
    },
    filterMarketAssets () {
      const filterMarketAssets = this.gaiaAssets.slice(8, 18)
      return (filterMarketAssets)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
