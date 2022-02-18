<template>
    <div>
        <IndigeCollection1 :content="content"/>
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
    }
  },
  methods: {
  },
  computed: {
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_LAUNCH_COLLECTION]
      return content
    },
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
