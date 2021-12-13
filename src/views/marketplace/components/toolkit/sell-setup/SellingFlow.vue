<template>
<div>
<div class="saleModal" style="background: transparent"  v-if="!loading">
  <div style="margin: 20px 0 0 0;">
    <img style="margin: 0;" class="itemImg" :src="attributes.coverImage.fileUrl"/>
    <p class="nFTName">{{item.name}}</p>
    <p class="nFTArtist">By <span>{{item.artist}}</span></p>
  </div>
  <div style="background: white">
    <div class="" :key="componentKey">
      <div bg-variant="white" style="min-height: 350px" footer-tag="footer" v-if="minted">
        <!-- <SellingHeader :allowEdit="true"/> -->
        <SellingOptions :contractAsset="contractAsset" v-if="displayCard === 100" @updateAmount="updateAmount"/>
          <div class="d-flex justify-content-between">
            <!-- <b-button @click="$emit('cancel')" class="w-50 mr-1" variant="light">Cancel</b-button> -->
            <!-- <b-button @click="setTradeInfo()" class="w-50 ml-1" variant="outline-warning">Save</b-button> -->
          </div>
      </div>
      <b-card header-tag="header" footer-tag="footer" class="rpay-card" v-else>
        <div class="mt-5 mx-5 text-center">
          <div class=" ">Please mint this item before setting up sale information</div>
        </div>
        <template v-slot:footer>
          <div class="footer-container">
            <div>
              <div class="d-flex justify-content-end">
                <b-button class="round-btn mx-1" variant="warning" @click.prevent="back()">Back</b-button>
              </div>
            </div>
          </div>
        </template>
      </b-card>
    </div>
  </div>
  <div>
  </div>
</div>
<div v-else>
  Waiting for asset.
</div>
<b-button @click="setTradeInfo()" class="mintButton" style="position: absolute; margin: 0px 0px 0px 950px;">Save</b-button>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import SellingOptions from './selling-screens/SellingOptions'

export default {
  name: 'SellingFlow',
  components: {
    SellingOptions
  },
  props: ['contractAsset', 'attributes', 'item'],
  data () {
    return {
      componentKey: 0,
      errorMessage: null,
      sellingMessage: null,
      loading: true
    }
  },
  mounted () {
    this.$store.dispatch('rpayStacksStore/fetchMacSkyWalletInfo').then(() => {
      this.$store.commit('rpayStore/setDisplayCard', 100)
      this.loading = false
    }).catch(() => {
      this.loading = false
      this.setPage()
    })
  },
  methods: {
    minted () {
      return this.contractAsset
    },
    updateAmount (amount) {
      this.contractAsset.saleData.buyNowOrStartingPrice = Number(amount)
    },
    setTradeInfo () {
      this.errorMessage = null
      if (!this.isValid()) return
      const data = {
        sendAsSky: true,
        contractAddress: this.contractAsset.contractId.split('.')[0],
        contractName: this.contractAsset.contractId.split('.')[1],
        owner: this.contractAsset.owner,
        assetHash: this.contractAsset.tokenInfo.assetHash,
        nftIndex: this.contractAsset.nftIndex,
        saleData: this.contractAsset.saleData
      }
      this.$store.dispatch('rpayPurchaseStore/setTradeInfo', data).then((result) => {
        this.result = result
      }).catch((error) => {
        console.log(error)
        this.sellingMessage = null
      })
    },
    isValid: function () {
      this.errorMessage = null
      const saleData = this.contractAsset.saleData
      if (saleData.saleType < 0 || saleData.saleType > 3) {
        this.$notify({ type: 'error', title: 'Sell Error', text: 'Sale type outside of allowed range' })
        return false
      }
      if (saleData.saleType === 2) {
        if (!saleData.biddingEndTime) {
          this.$notify({ type: 'error', title: 'Sell Error', text: 'Please select end time for for bidding' })
          return false
        }
        if (!saleData.incrementPrice || saleData.incrementPrice < 0) {
          this.$notify({ type: 'error', title: 'Sell Error', text: 'Please enter the increment for bidding' })
          return false
        }
        if (!saleData.buyNowOrStartingPrice || saleData.buyNowOrStartingPrice < 0) {
          this.$notify({ type: 'error', title: 'Sell Error', text: 'Please enter the buy now / starting price for bidding' })
          return false
        }
        if (!saleData.reservePrice || saleData.reservePrice < 0) {
          this.$notify({ type: 'error', title: 'Sell Error', text: 'Please enter the reserve.' })
          return false
        }
      } else if (saleData.saleType === 1) {
        if (!saleData.buyNowOrStartingPrice || saleData.buyNowOrStartingPrice < 0) {
          this.$notify({ type: 'error', title: 'Sell Error', text: 'Please enter the buy now / starting price for bidding.' })
          return false
        }
      }
      return true
    },
    setPage () {
      this.loading = false
      const displayCard = this.$store.getters[APP_CONSTANTS.KEY_DISPLAY_CARD]
      if (!displayCard) {
        this.$store.commit('rpayStore/setDisplayCard', 100)
      }
    }
  },
  computed: {
    displayCard () {
      const displayCard = this.$store.getters[APP_CONSTANTS.KEY_DISPLAY_CARD]
      return displayCard
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
