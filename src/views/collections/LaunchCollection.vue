<template>
    <div>
        <LaunchCollection1 :content="content" :gaiaAssets="gaiaAssets"/>
        <LaunchCollection2
        :gaiaAssets="gaiaAssets"
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
    }
  },
  methods: {
  },
  computed: {
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_LAUNCH_COLLECTION]
      return content
    },
    gaiaAssets () {
      const assets = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSETS].filter((assets) => assets.attributes.collection === 'launch_collection_t1/risidio')
      return (assets) ? assets.reverse() : []
    },
    filteredLaunch () {
      const filteredAssets = this.gaiaAssets.slice(0, 12)
      return filteredAssets
    },
    filteredUnSoldLaunch () {
      const unsoldLaunch = this.gaiaAssets.filter((assets) => assets.attributes.buyNowPrice > 0).slice(0, 12)
      return unsoldLaunch
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
