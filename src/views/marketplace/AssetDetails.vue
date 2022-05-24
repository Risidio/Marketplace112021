<template>
<div id="asset-details">
  <div v-if="!loading && gaiaAsset && loopRun">
    <AssetDetailsSectionV1 :gaiaAsset="gaiaAsset" :loopRun="loopRun"/>
  </div>
</div>
</template>

<script>
import AssetDetailsSectionV1 from '@/views/marketplace/components/gallery/AssetDetailsSectionV1'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'AssetDetails',
  components: {
    AssetDetailsSectionV1
  },
  data: function () {
    return {
      nftIndex: null,
      assetHash: null,
      loading: true,
      gaiaAsset: null,
      loopRun: null,
      contractId: null
    }
  },
  watch: {
    'loopRuns' () {
      // this.loading = true
      this.loopRun = this.loopRuns.filter((loopRun) => loopRun.contractId === this.gaiaAsset.contractId)[0]
    }
  },
  mounted () {
    this.contractId = this.$route.params.contractId
    this.nftIndex = Number(this.$route.params.nftIndex)
    if (this.$route.name === 'asset-by-index') {
      this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndNftIndex', { contractId: this.contractId, nftIndex: this.nftIndex }).then((gaiaAsset) => {
        this.$store.dispatch('rpayCategoryStore/fetchLoopRun', this.parseRunKey(gaiaAsset)).then((loopRun) => {
          this.gaiaAsset = gaiaAsset
          this.loopRun = loopRun
          this.$store.dispatch('rpayManageCacheStore/cacheUpdate', { contractId: this.contractId, nftIndex: this.nftIndex })
          this.loading = false
        })
      })
    } else {
      this.assetHash = this.$route.params.assetHash
      this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndAssetHash', { contractId: this.contractId, assetHash: this.assetHash }).then((gaiaAsset) => {
        this.gaiaAsset = gaiaAsset
        this.$store.dispatch('rpayManageCacheStore/cacheUpdate', { contractId: this.contractId, assetHash: this.assetHash })
        this.loading = false
      })
    }
  },
  methods: {
    parseRunKey (gaiaAsset) {
      const loopRuns = this.loopRuns.filter((loopRun) => loopRun.contractId === gaiaAsset.contractId)
      const runKey = loopRuns[0]?.currentRunKey
      console.log(loopRuns)
      return runKey
    },
    getArtistPrismicId () {
      const artistId = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_ARTIST_ID](this.gaiaAsset.artist)
      return artistId
    }
  },
  computed: {
    gaiaAsset1 () {
      if (this.nftIndex || this.nftIndex === 0) {
        return this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_NFT_INDEX](this.nftIndex)
      } else {
        return this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSET_BY_HASH](this.assetHash)
      }
    },
    loopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS]
      return loopRuns
    }
  }
}
</script>

<style scoped>
*{ color: black}
#asset-details{
  min-height: 100px;
}
.container{
  margin-top: 50px;
  max-width: 1100px;
  margin-bottom: 50px;
  /* padding: 20px; */
}
</style>
