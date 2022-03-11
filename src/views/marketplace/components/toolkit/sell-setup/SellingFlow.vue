<template>
<div>
<div class="saleModal" v-if="!loading">
  <div style="display: block; max-width: 210px; margin: auto;">
    <img style="margin: 0;" class="nftGeneralView" :src="item.image"/>
    <p class="nFTName">{{item.name}}</p>
    <p class="nFTArtist">By <span>{{item.properties.collection}}</span></p>
  </div>
  <div style="background: transparent">
    <div class="" :key="componentKey">
      <div bg-variant="white" style="min-height: 250px" footer-tag="footer" v-if="minted">
        <!-- <SellingHeader :allowEdit="true"/> -->
            <div class="col-12 mb-5">
              <div v-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price === 0">
                <p style="font-size: 12px; margin-top: 20px;"> Price</p>
                <div class="buyNowInput">
                  <label class="buyNowInputLabel">STX</label>
                    <input min="0" type="number" v-model="buyNowOrStartingPrice" placeholder="STX"/>
                </div>
                <!-- </b-input-group> -->
              </div>
              <div v-else-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price !== 0">
                <p> This Item is already listed. Would you like to delist?</p>
              </div>

            </div>
            <div><p class=" " v-html="errorMessage"></p></div>
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
</div>
<div v-else>
  Waiting for asset.
</div>
<b-button v-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price === 0" @click="listItem()" class="mintButton filled" style="position: absolute; margin: 5px 0px 0px 800px;">Submit</b-button>
<b-button v-else-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price !== 0" @click="delistItem()" class="mintButton filled" style="position: absolute; margin: 5px 0px 0px 800px;">Delist</b-button>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'SellingFlow',
  components: {
  },
  props: ['contractAsset', 'attributes', 'item', 'loopRun'],
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
    listItem () {
      this.errorMessage = null
      if (!this.isValid()) return
      const data = {
        sendAsSky: true,
        contractAddress: this.contractAsset.contractId.split('.')[0],
        contractName: this.contractAsset.contractId.split('.')[1],
        commissionContractAddress: this.loopRun.commissionContractId.split('.')[0],
        commissionContractName: this.loopRun.commissionContractId.split('.')[1],
        nftIndex: this.contractAsset.nftIndex,
        price: Number(this.buyNowOrStartingPrice)
      }
      this.$store.dispatch('rpayMarketStore/listInUstx', data).then((result) => {
        this.result = result
      }).catch((error) => {
        console.log(error)
        this.sellingMessage = null
      })
    },
    delistItem () {
      const data = {
        sendAsSky: true,
        contractAddress: this.contractAsset.contractId.split('.')[0],
        contractName: this.contractAsset.contractId.split('.')[1],
        nftIndex: this.contractAsset.nftIndex
      }
      this.$store.dispatch('rpayMarketStore/unlistInUstx', data).then((result) => {
        this.result = result
      }).catch((error) => {
        console.log(error)
        this.sellingMessage = null
      })
    },
    isValid: function () {
      this.errorMessage = null
      if (this.buyNowOrStartingPrice === 0) {
        this.$notify({ type: 'error', title: 'Listing Error', text: 'Please set the price' })
        return false
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
.buyNowInput{
  input{
    border-bottom-right-radius: 22px;
    border-top-right-radius: 22px;
    border: 1px solid #ccc;
    border-left: 0;
    padding: 8px 5px 8px 20px;
    font-size: 11px;
    font-weight: 300;
    margin-left: auto;
    text-align: right;
    width: 50%;
  }
}
.buyNowInputLabel{
  border: 1px solid #ccc;
  border-bottom-left-radius: 22px;
  border-top-left-radius: 22px;
  font-size: 11px;
  padding: 8px 20px;
  background: #FFF;
  color: #9c9c9c;
}
</style>
