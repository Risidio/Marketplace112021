<template>
    <div>
        <!-- <TestCollection1 :content="content"/> -->
        <!-- <TestCollection2
        :gaiaAssets="gaiaAssets"
        :filteredUnSoldLaunch="filteredUnSoldLaunch"
        :filteredLaunch="filteredLaunch"
        :content="content"/> -->
        <div v:bind="ipfsAssets"></div>
    </div>
</template>

<script >
import axios from 'axios'
import { APP_CONSTANTS } from '@/app-constants'
import TestCollection1 from '@/components/TestCollection/TestCollection1.vue'
import TestCollection2 from '@/components/TestCollection/TestCollection2.vue'
const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

export default {
  name: 'TestCollection',
  components: {
    // TestCollection1,
    // TestCollection2
  },
  data () {
    return {
    }
  },
  mounted () {
    this.ipfsAssets()
  },
  methods: {
    ipfsAssets () {
      const gateway = process.env.GATEWAY
      const hash = process.env.HASHFOLDER
      // axios.get(`${gateway}/ipfs/${hash}`).then((res) => console.log(res))
      // axios.get('https://risidio.mypinata.cloud/ipfs/QmXXDoy3M9TRdv2x5sQddhwvdbVJRbu8eHGiYBaxUQ9d3j', {}).then((res) => console.log(res))
      "ipfs://hash"
      axios.get('https://risidio.mypinata.cloud/ipfs/QmXXDoy3M9TRdv2x5sQddhwvdbVJRbu8eHGiYBaxUQ9d3j', {
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error.message)
      })
    }
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
