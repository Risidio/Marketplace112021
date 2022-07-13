<template>
<div>
<div class="saleModal" v-if="!loading">
  <div style="display: block; max-width: 210px; margin: auto;">
    <img style="margin: 0;" class="nftGeneralView" :src="item.image" alt="NFTimage"/>
    <p class="nFTName">{{item.name}}</p>
    <p class="nFTArtist">By <span>{{item.properties.collection}}</span></p>
  </div>
  <div style="background: transparent">
    <div class="" :key="componentKey">
      <div bg-variant="white" style="min-height: 250px" footer-tag="footer" v-if="minted">
        <!-- <SellingHeader :allowEdit="true"/> -->
            <div class="col-12 mb-5">
              <div v-if="item.contractAsset.listingInUstx && (item.contractAsset.listingInUstx.price === 0 || item.contractAsset.listingInUstx.price === null)">
                <p style="font-size: 12px; margin-top: 20px;"> Price</p>
                <div class="buyNowInput">
                  <label class="buyNowInputLabel" >
                    {{tokenSymbol}} <img ref="buyNowInput" @click="show = !show" class="token-arrow" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg">
                    </label>
                    <div v-show="show" class="token-dropdownMenu-container">
                      <div v-for="(token, index) in sipTenTokens" :key="index">
                        <p class="token-symbol" @click="selectedToken(token)">{{token.symbol}}</p>
                      </div>
                    </div>
                    <input  class="buyInput" min="0" type="number" v-model="buyNowOrStartingPrice" :placeholder="tokenSymbol"/>
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
<b-button v-if="item.contractAsset.listingInUstx && (item.contractAsset.listingInUstx.price === 0 || item.contractAsset.listingInUstx.price === null)" @click="listItem()" class="mintButton filled" style="position: absolute; margin: 5px 0px 0px 800px;">Submit</b-button>
<b-button v-else-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price > 0" @click="delistItem()" class="mintButton filled" style="position: absolute; margin: 5px 0px 0px 800px;">Delist</b-button>
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
      loading: true,
      sipTenTokens: null,
      sipTenToken: null,
      tokenContractId: null,
      show: false,
      tokenSymbol: null,
      buyNowOrStartingPrice: null
    }
  },
  mounted () {
    const $self = this
    window.addEventListener('click', function (e) {
      $self.close(e)
    })
    if (this.loopRun.marketplaceVersion > 2) {
      this.$store.dispatch('rpayMarketGenFungStore/sipTenTokenFindBy').then((sipTenTokens) => {
        if (sipTenTokens) {
          console.log(sipTenTokens)
          this.sipTenTokens = sipTenTokens
          this.sipTenToken = sipTenTokens[0]
          this.tokenSymbol = sipTenTokens[0].symbol
          this.tokenContractId = this.sipTenToken.contractId
          this.$notify({ type: 'success', title: 'Available Tokens', text: 'List NFT for x tokens' })
        }
        this.loading = false
      })
    } else {
      this.loading = false
    }
  },
  methods: {
    close (e) {
      const arrow = document.getElementsByClassName('token-arrow')[0]
      if (!this.$refs?.buyNowInput?.contains(e.target)) {
        arrow.classList.remove('active')
        this.show = false
      } else {
        arrow.classList.toggle('active')
      }
    },
    minted () {
      return this.contractAsset
    },
    selectedToken (token) {
      this.sipTenToken = token
      this.tokenContractId = token.contractId
      this.tokenSymbol = token.symbol
    },
    updateAmount (amount) {
      this.contractAsset.listingInUstx.price = Number(amount)
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
        tokenContractAddress: this.tokenContractId.split('.')[0],
        tokenContractName: this.tokenContractId.split('.')[1],
        decimals: this.sipTenToken.decimals,
        nftIndex: this.contractAsset.nftIndex,
        price: Number(this.buyNowOrStartingPrice)
      }
      this.$store.dispatch('rpayMarketGenFungStore/listInToken', data).then((result) => {
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
  position: relative;
  input{
    border-bottom-right-radius: 22px;
    border-top-right-radius: 22px;
    border: 1px solid #ccc;
    border-left: 0;
    padding: 8px 10px 8px 20px;
    font-size: 11px;
    font-weight: 300;
    margin-left: auto;
    text-align: right;
    width: 50%;
  }
  input:focus{
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    // -webkit-appearance: none;
    -webkit-margin-start: 10px;
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
.token-dropdownMenu-container{
  position: absolute;
  // display: none;
  background: #fff;
  padding: 10px 23px;;
  border: 1px solid #ccc;
  left: 10px;
  top: 35px;
  z-index: 10;
}
// .token-dropdownMenu-container .active{
//   display: flex;
// }
.token{
  max-width: 200px;
}
.token-symbol{
  color: #9c9c9c;
  font-size: 11px;
  cursor: pointer;
  &:hover{
    text-decoration: underline;
    color: black;
  }
}
.token-arrow{
  margin-left: 10px;
  margin-bottom: 2px;
  transform: rotate(90deg);
  cursor: pointer;
}
.token-arrow.active{
  transform: rotate(180deg);
}
</style>
