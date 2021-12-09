<template>
    <section class="homepage">
      <HomeBanner v-bind:profile='profile' :content="content"/>
      <HomeMarket v-bind:profile='profile' :gaiaAssets="gaiaAssets"/>
      <HomeInfo v-bind:profile='profile'/>
      <HomeSeeAlso v-bind:profile='profile' :gaiaAssets="filterMarketAssets"/>
      <HomeBottomBanner/>
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
    }
  },
  mounted () {
    this.findAssets()
  },
  methods: {
    findAssets () {
      this.$store.dispatch('rpaySearchStore/findByProjectId', STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME).then((results) => {
        this.resultSet = results.filter(result => result.attributes.artworkFile.fileUrl !== null)
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
