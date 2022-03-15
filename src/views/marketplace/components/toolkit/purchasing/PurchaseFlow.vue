<template>
<div v-if="!loading">
  <div v-if="flowType === 1">
  </div>
  <div v-else>
    <div >
      <div v-if="contractAsset && contractAsset.listingInUstx" class="modall">
        <PurchaseBuyNow :gaiaAsset="gaiaAsset" :contractAsset="contractAsset" :listingInUstx="contractAsset.listingInUstx" @buyNow="buyNow" :listing="listing"/>
        <div class="text-danger" v-html="errorMessage"></div>
      </div>
      <div v-else>
        Asset not on sale.
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import PurchaseBuyNow from './PurchaseBuyNow'

const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME

export default {
  name: 'PurchaseFlow',
  components: {
    PurchaseBuyNow
  },
  props: ['gaiaAsset', 'forceOfferFlow', 'loopRun', 'listing'],
  data () {
    return {
      errorMessage: null,
      loading: true,
      offerStage: 0,
      offerData: {},
      biddingData: {},
      biddingEndTime: null,
      flowType: 0,
      webWalletNeeded: false
    }
  },
  mounted () {
    this.errorMessage = null
    this.$store.dispatch('rpayStacksStore/fetchMacSkyWalletInfo').then(() => {
      this.$store.commit('rpayStore/setDisplayCard', 100)
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  },
  methods: {
    buyNow: function () {
      const contractAsset = this.gaiaAsset.contractAsset
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!this.loopRun.commissionContractId) {
        this.$notify({ type: 'warning', title: 'Unable to Process', text: 'The commission contract is missing - goto to the collection settings and add the contractId of your commission contract.' })
        return
      }
      if (!profile.loggedIn) {
        this.$store.dispatch('rpayAuthStore/startLogin').then(() => {
          this.$store.dispatch('rpayCategoryStore/fetchLatestLoopRunForStxAddress', { currentRunKey: process.env.VUE_APP_DEFAULT_LOOP_RUN, stxAddress: profile.stxAddress }, { root: true })
        }).catch((err) => {
          console.log(err)
          // https://www.hiro.so/wallet/install-web
          this.webWalletNeeded = true
        })
      } else {
        const buyNowData = {
          // contractAddress: currentRun.contractId.split('.')[0],
          // contractName: currentRun.contractId.split('.')[1],
          // commissionContractAddress: commission.split('.')[0],
          // commissionContractName: commission.split('.')[1],
          tokenContractAddress: (contractAsset.listingInUstx.token) ? contractAsset.listingInUstx.token.split('.')[0] : null,
          tokenContractName: (contractAsset.listingInUstx.token) ? contractAsset.listingInUstx.token.split('.')[1] : null,
          owner: contractAsset.owner,
          nftIndex: contractAsset.nftIndex,
          price: contractAsset.listingInUstx.price,
          sendAsSky: true, // only applicable in local
          // assetName: currentRun.assetName,
          decimals: contractAsset.listingInUstx.decimals,
          tokenAssetName: contractAsset.listingInUstx.name
        }
        this.$store.dispatch('rpayMarketGenFungStore/buyInToken', buyNowData).then((result) => {
          this.result = result
          this.flowType = 2
        }).catch((err) => {
          console.log(err)
          this.errorMessage = err
          this.flowType = 3
        })
      }
    },
    minted () {
      const contractAsset = this.gaiaAsset.contractAsset
      if (!contractAsset) return
      return contractAsset.nftIndex > -1
    }
  },
  computed: {
    contractAsset () {
      return this.gaiaAsset.contractAsset
    }
  }
}
</script>
<style lang="scss" scoped>
.modall{
  max-width: 500px;
  margin: auto;
}
</style>
