<template>
<section style="margin: auto; margin-top: 10rem; max-width: 1135px; padding: 0 20px;" id="asset-details-section" v-if="gaiaAsset && gaiaAsset.contractAsset" class="text-black">
  <div class="backBtn"><router-link class="backBtn" :to="'/' + 'indige5'"><b-icon icon="chevron-left" shift-h="-3"></b-icon> Back </router-link></div>
    <b-row style="display: flex; margin: auto" :style="'min-height: ' + videoHeight + 'px'">
      <b-col lg="6" sm="10" class="mb-5">
        <div id="video-column" :style="dimensions">
          <MediaItemGeneral :classes="'hash1-image'" v-on="$listeners" :options="videoOptions" :mediaItem="gaiaAsset"/>
          <div class="editions"> <h2>EDITION <span>{{gaiaAsset.contractAsset.tokenInfo.edition}}</span> / {{gaiaAsset.contractAsset.tokenInfo.maxEditions}}</h2></div>
        </div>
      </b-col>
      <b-col lg="6" sm="10">
        <b-row align-v="stretch" :style="'height: ' + videoHeight - 100 + 'px'">
          <b-col md="12" align-self="end" :key="componentKey">
            <div class="w-100">
              <div class="flex"><h1 class="text-black">{{gaiaAsset.name}}</h1>
              <div style="margin-left: auto;" class="d-flex">
                <div v-b-hover="handleHover" @click="addToFav()" >
                  <b-icon v-if="isHovered || isLiked" icon="heart-fill"  style="color: red; cursor: pointer;"/>
                  <b-icon v-else icon="heart" />
                </div>
                <b-link router-tag="span" v-b-tooltip.hover="{ variant: 'light' }" :title='salesBadgeLabel' class="text-black" variant="outline-success">
                  <b-icon class="ml-2" icon="question-circle"/>
                </b-link>
                <div style="font-weight: 600; font-size: 1.2rem" class="text-center on-auction-text ml-3 py-3 px-4 bg-secondary text-white">
                  <div style="color: white;">{{salesBadgeLabel}}</div>
                  <!-- <div v-if="showEndTime()">{{biddingEndTime()}}</div> -->
                </div>
              </div>
              </div>
              <div>
                <div class="d-flex justify-content-between">
                  <div><p style="font: normal normal 300 12px/15px Montserrat;">By <span style="font: normal normal bold 12px/15px Montserrat;" class="cyanText">{{loopRun.makerName}}</span> <br/></p>
                    <div class="mt-2 mb-5" style="font-size: 1.2rem">
                      <span v-if="loopRun.type !== 'punks'">from collection <span class="cyanText">{{loopRun.currentRun}}</span> Minted at {{created()}}</span>{{editionMessage}}
                    </div>
                  </div>
                </div>
              </div>
              <PendingTransactionInfo v-if="pending && pending.txStatus === 'pending'" :pending="pending"/>
              <div style="margin-top: 50px" v-else>
                <b-row v-if="getSaleType() === 0">
                </b-row>
                <b-row v-else>
                  <b-col v-if="webWalletNeeded" md="6" sm="12" class="mb-3">
                    <b-button v-b-tooltip.hover="{ variant: 'light' }" :title="ttWalletHelp" class="w-100" style="height: 61px;" variant="outline-light"><a :href="webWalletLink" class="text-white" target="_blank">Get Stacks Web Wallet <b-icon class="ml-3" icon="arrow-up-right-square-fill"/></a></b-button>
                  </b-col>
                  <b-col class="priceSection" v-if="getSaleType() > 0">
                    <p class="basePrice"> Price <span> STX  <span> {{(gaiaAsset.contractAsset.listingInUstx.price / 1.10).toFixed(0)}}</span></span></p>
                    <p class="feePrice"> Fees <span>STX {{gaiaAsset.contractAsset.listingInUstx.price - (gaiaAsset.contractAsset.listingInUstx.price / 1.10).toFixed(0)}}</span></p>
                    <hr/>
                    <p class="fullPrice"><span> STX <span>{{gaiaAsset.contractAsset.listingInUstx.price}}</span></span></p>
                  </b-col>
                  <b-col md="6" sm="6" class="mb-3 text-center" v-if="getSaleType() > 0">
                    <button class="button filled" :title="ttBiddingHelp" @click="openPurchaseDialog()" >{{salesButtonLabel}}</button>
                  </b-col>
                </b-row>
                <h3 class="mt-5" >NFT Description:</h3>
               <div v-if="gaiaAsset.description" class="mt-2 w-100 text-black" v-html="preserveWhiteSpace(gaiaAsset.description)">
              </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  <b-modal id="asset-offer-modal" class="modal text-left">
    <PurchaseFlow v-if="showRpay === 1" :gaiaAsset="gaiaAsset" :loopRun="loopRun" :forceOfferFlow="forceOfferFlow"/>
    <AssetUpdatesModal v-if="showRpay === 2" @registerForUpdates="registerForUpdates"/>
    <template #modal-header="{ close }">
      <div class=" text-warning w-100 d-flex justify-content-end">
        <b-button size="sm" variant="white" @click="close()"  class="m-0 p-1 text-dark" style="max-width: 30px !important; max-height: 30px !important;">
          <!-- <img :src="cross" class="filter-black" alt="close" style="max-width: 20px !important; max-height: 20px !important;"/> -->
          X
        </b-button>
      </div>
    </template>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-between">
      </div>
    </template>
  </b-modal>
  <b-modal id="result-modal" class="" v-if="confirmOfferDialog">
    <b-row>
      <b-col cols="12" class="w-50">
        <h1>{{confirmOfferDialog[0].text}}</h1>
        <h4 class="text-center mb-5">{{confirmOfferDialog[1].text}}</h4>
        <h4 class="text-center mb-5"><a :href="transactionUrl" target="_blank">Transaction sent to Stacks Blockchain</a></h4>
        <p class="text-center mx-md-5 px-md-5 mb-5">{{confirmOfferDialog[2].text}}</p>
        <div class="mt-5"><a href="#" @click.prevent="back()"><b-icon icon="chevron-left"/> {{confirmOfferDialog[3].text}}</a></div>
      </b-col>
    </b-row>
    <div></div>
    <template #modal-footer class="text-center">
      <div class="w-100">
      </div>
    </template>
  </b-modal>
</section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import { DateTime } from 'luxon'
import Vue from 'vue'
import utils from '@/services/utils'
import AssetUpdatesModal from '@/views/marketplace/components/toolkit/purchasing/AssetUpdatesModal'
import PurchaseFlow from '@/views/marketplace/components/toolkit/purchasing/PurchaseFlow'
import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
import PendingTransactionInfo from '@/views/marketplace/components/toolkit/nft-history/PendingTransactionInfo'

export default {
  name: 'AssetDetailsSectionV1',
  components: {
    PendingTransactionInfo,
    AssetUpdatesModal,
    PurchaseFlow,
    MediaItemGeneral
  },
  props: ['gaiaAsset', 'loopRun'],
  data: function () {
    return {
      showDownload: false,
      forceOfferFlow: false,
      hiddenCPS: true,
      showRpay: 0,
      nftIndex: -1,
      pending: null,
      videoHeight: 0,
      componentKey: 0,
      showHash: false,
      assetHash: null,
      txData: null,
      socialmessage: 'This is number one, an art engine and decentralised marketplace',
      isHovered: false,
      isLiked: false
    }
  },
  watch: {
    '$route' () {
      this.assetHash = this.$route.params.assetHash
      this.componentKey++
    }
  },
  mounted () {
    this.assetHash = this.$route.params.assetHash
    this.nftIndex = Number(this.$route.params.nftIndex)
    const $self = this
    this.$store.commit(APP_CONSTANTS.SET_RPAY_FLOW, { flow: 'purchase-flow', asset: this.gaiaAsset })
    this.resizeContainers()
    if (window.eventBus && window.eventBus.$on) {
      window.eventBus.$on('rpayEvent', function (data) {
        if ($self.$route.name.indexOf('asset-by-') === -1) return
        $self.componentKey++
        $self.$bvModal.hide('asset-offer-modal')
        $self.$bvModal.hide('result-modal')
        $self.txData = data
        if (data.opcode.indexOf('stx-transaction-sent') > -1) {
          if (data.txStatus === 'pending') {
            // $self.$bvModal.show('result-modal')
          }
          $self.update()
        }
      })
    }
    Vue.nextTick(function () {
      const vid = document.getElementById('video-column')
      if (vid) this.videoHeight = vid.clientHeight
    }, this)
    if (localStorage.getItem('addNFTToFavourite')) {
      const likedArray = JSON.parse(localStorage.getItem('addNFTToFavourite'))
      likedArray.map(item => {
        if (item.nftIndex === this.gaiaAsset.nftIndex) {
          this.isLiked = true
        } else {
          this.isLiked = false
        }
      })
    }
  },
  methods: {
    addToFav () {
      let favorite = []
      if (localStorage.getItem('addNFTToFavourite')) {
        const favArray = JSON.parse(localStorage.getItem('addNFTToFavourite'))
        if (this.isLiked) {
          this.isLiked = false
          favorite = favArray.filter(item => item.nftIndex !== this.gaiaAsset.nftIndex)
        } else {
          this.isLiked = true
          favorite = [...favArray, this.gaiaAsset]
        }
      } else {
        this.isLiked = true
        favorite = [this.gaiaAsset]
      }
      localStorage.setItem('addNFTToFavourite', JSON.stringify(favorite))
    },
    created () {
      if (this.gaiaAsset && this.gaiaAsset.mintInfo && this.gaiaAsset.mintInfo.timestamp) {
        return DateTime.fromMillis(this.gaiaAsset.mintInfo.timestamp).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      } else if (this.gaiaAsset && this.gaiaAsset.updated) {
        return DateTime.fromMillis(this.gaiaAsset.updated).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      }
      return ''
    },
    mintedEvent (data) {
      this.$bvModal.hide('edition-modal')
      this.$emit('mintedEvent', data)
    },
    setPending (result) {
      if (this.pending) {
        if (!result || !result.txStatus || result.txStatus === 'pending') {
          this.pending = result
        } else if (this.pending.txStatus === 'pending' && result.txStatus === 'success') {
          if (result.functionName.indexOf('mint-token') > -1) {
            if (result.functionName.indexOf('-twenty') > -1) {
              result.assetHash = result.assetHashes[0]
              this.updateCacheByHash(result)
            } else {
              this.updateCacheByHash(result)
            }
          } else if (result.txStatus === 'success' && result.functionName.indexOf('mint-token') === -1) {
            const data = { contractId: this.loopRun.contractId, nftIndex: result.nftIndex }
            this.updateCacheByNftIndex(data)
          }
        } else if (result.txStatus.startsWith('abort')) {
        }
      }
      this.pending = result
    },
    updateCacheByHash (data) {
      this.$store.dispatch('rpayStacksContractStore/updateCacheByHash', data).then(() => {
        this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndAssetHash', data)
      })
    },
    updateCacheByNftIndex (data) {
      this.$store.dispatch('rpayStacksContractStore/updateCacheByNftIndex', data).then(() => {
        this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndNftIndex', data)
      })
    },
    update () {
      this.componentKey++
    },
    resizeContainers () {
      let resizeTimer
      const $self = this
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          const vid = document.getElementById('video-column')
          if (vid) $self.videoHeight = vid.clientHeight
        }, 400)
      })
    },
    formatNumber: function (number) {
      return utils.formatNumber(number)
    },
    preserveWhiteSpace: function (content) {
      return '<span class="text-description" style="white-space: break-spaces;">' + content + '</span>'
    },
    back: function () {
      this.$bvModal.hide('result-modal')
    },
    // offerSent: function () {
    // },
    targetItem: function () {
      return this.$store.getters[APP_CONSTANTS.KEY_TARGET_FILE_FOR_DISPLAY](this.gaiaAsset)
    },
    dimensions () {
      const dims = { width: '100%', height: '100%' }
      return 'max-width: ' + dims.height + '; max-height: ' + dims.height + ';'
    },
    poster: function () {
      return this.$store.getters[APP_CONSTANTS.KEY_ASSET_IMAGE_URL](this.gaiaAsset)
    },
    getArtist: function () {
      if (this.gaiaAsset.artist) {
        return this.gaiaAsset.artist
      } else if (this.gaiaAsset.owner) {
        return this.gaiaAsset.owner.substring(0, this.gaiaAsset.owner.indexOf('.'))
      } else {
        return 'Unknown Artist'
      }
    },
    openUpdates: function () {
      this.showRpay = 2
      this.$bvModal.show('asset-offer-modal', { assetHash: this.assetHash })
    },
    getSaleType: function () {
      if (this.gaiaAsset.contractAsset.listingInUstx) {
        return this.gaiaAsset.contractAsset.listingInUstx.price
      }
      return 0
    },
    openPurchaseDialog: function () {
      this.forceOfferFlow = false
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!profile.loggedIn) {
        this.$store.dispatch('rpayAuthStore/startLogin').then(() => {
          this.$store.dispatch('rpayCategoryStore/fetchLatestLoopRunForStxAddress', { currentRunKey: process.env.VUE_APP_DEFAULT_LOOP_RUN, stxAddress: profile.stxAddress }, { root: true })
        }).catch((err) => {
          console.log(err)
          this.webWalletNeeded = true
        })
      } else {
        this.showRpay = 1
        this.$bvModal.show('asset-offer-modal')
      }
    },
    openOfferPurchaceDialog: function () {
      this.forceOfferFlow = true
      this.showRpay = 1
      this.$bvModal.show('asset-offer-modal')
    },
    emailText () {
      const emailText = this.$store.getters[APP_CONSTANTS.KEY_EMAIL_TEXT]('registeremail')
      const answer = (emailText) ? emailText[0].text : 'Interest Registered'
      return answer
    },
    registerForUpdates: function (email) {
      const data = {
        emailContent: this.emailText(),
        status: 1,
        domain: location.host,
        assetHash: this.assetHash,
        email: email
      }
      this.$store.dispatch('rpayPurchaseStore/registerForUpdates', data).then((result) => {
        this.$store.commit('setModalMessage', 'Thanks for registering an interest - we will keep you updated.')
        this.showRpay = 0
        this.$bvModal.hide('asset-offer-modal')
        this.$root.$emit('bv::show::modal', 'success-modal')
        this.message = result
      }).catch(() => {
        this.$store.commit('setModalMessage', 'Thanks for re-registering an interest - we will keep you updated.')
        this.showRpay = 0
        this.$bvModal.hide('asset-offer-modal')
        this.$root.$emit('bv::show::modal', 'success-modal')
      })
    },
    handleHover (hovered) {
      this.isHovered = hovered
    }
  },
  computed: {
    mintedMessage () {
      if (this.gaiaAsset.contractAsset && this.loopRun && this.loopRun.type === 'punks') {
        return this.loopRun.currentRun + ' #' + this.gaiaAsset.contractAsset.nftIndex
      }
      if (this.gaiaAsset.contractAsset) {
        return '#' + this.gaiaAsset.contractAsset.nftIndex + ' ' + this.gaiaAsset.name
      }
      return this.gaiaAsset.name
    },
    editionMessage () {
      if (this.gaiaAsset.contractAsset && this.gaiaAsset.contractAsset.tokenInfo.maxEditions > 1) {
        return '(' + this.gaiaAsset.contractAsset.tokenInfo.edition + ' of ' + this.gaiaAsset.contractAsset.tokenInfo.maxEditions + ')'
      }
      return null
    },
    transactionUrl: function () {
      if (!this.gaiaAsset.mintInfo || !this.gaiaAsset.mintInfo.txId) return '#'
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      return stacksApiUrl + '/txid/' + this.gaiaAsset.mintInfo.txId + '?chain=' + process.env.VUE_APP_NETWORK
    },
    txPending () {
      let transactions = []
      if (this.gaiaAsset.contractAsset) {
        transactions = this.$store.getters[APP_CONSTANTS.KEY_TX_PENDING_BY_TX_ID](this.gaiaAsset.contractAsset.nftIndex)
      } else {
        transactions = this.$store.getters[APP_CONSTANTS.KEY_TX_PENDING_BY_ASSET_HASH](this.gaiaAsset.assetHash)
      }
      return transactions
    },
    editionsAvailable: function () {
      return this.gaiaAsset.contractAsset.tokenInfo.edition === 1 && this.gaiaAsset.contractAsset.tokenInfo.maxEditions > 1 && this.gaiaAsset.contractAsset.editionCounter < this.gaiaAsset.contractAsset.tokenInfo.maxEditions
    },
    webWalletLink () {
      if (this.$browserDetect.isFirefox) {
        return this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_LINK_FIREFOX]
      }
      return this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_LINK_CHROME]
    },
    usdAmount () {
      try {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rate = tickerRates.find((o) => o.currency === 'USD')
        const offer = this.$store.getters[APP_CONSTANTS.KEY_HIGHEST_OFFER_ON_ASSET](this.gaiaAsset.contractAsset.tokenInfo.assetHash)
        const currentOffer = (offer && offer.amount) ? offer.amount : 0
        const minimumOffer = Math.max(currentOffer, (this.gaiaAsset.contractAsset.saleData.reservePrice))
        const amountUsd = Number(utils.toDecimals(rate.stxPrice * minimumOffer)).toLocaleString()
        return 'Current highest offer: ' + amountUsd + ' USD'
      } catch (e) {
        return null
      }
    },
    currentCost: function () {
      return this.gaiaAsset.contractAsset.tokenInfo.editionCost
    },
    salesButtonLabel () {
      if (this.webWalletNeeded) return 'GET STACKS WALLET'
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!profile.loggedIn) return 'LOGIN TO BUY'
      // const label = this.$store.getters[APP_CONSTANTS.KEY_SALES_BUTTON_LABEL](this.gaiaAsset.contractAsset.saleData.saleType)
      if (this.gaiaAsset.contractAsset.listingInUstx && this.gaiaAsset.contractAsset.listingInUstx.price > 0) {
        const fprice = this.gaiaAsset.contractAsset.listingInUstx.price + ' STX'
        return 'Buy: ' + fprice
      }
      return 'NOT SELLING'
    },
    salesBadgeLabel () {
      if (this.gaiaAsset.contractAsset) {
        if (this.gaiaAsset.contractAsset.listingInUstx && this.gaiaAsset.contractAsset.listingInUstx.price > 0) {
          return 'on sale'
        }
      }
      return 'not on sale'
    },
    confirmOfferDialog () {
      const dialog = this.$store.getters[APP_CONSTANTS.KEY_DIALOG_CONTENT]('confirm-offer')
      return dialog
    },
    ttWalletHelp () {
      const tooltip = this.$store.getters[APP_CONSTANTS.KEY_TOOL_TIP]('tt-wallet-help')
      return (tooltip) ? tooltip[0].text : ''
    },
    ttBiddingHelp () {
      const tooltip = this.$store.getters[APP_CONSTANTS.KEY_TOOL_TIP]('tt-bidding-help')
      return (tooltip) ? tooltip[0].text : ''
    },
    ttOfferingHelp () {
      const tooltip = this.$store.getters[APP_CONSTANTS.KEY_TOOL_TIP]('tt-offering-help')
      return (tooltip) ? tooltip[0].text : ''
    },
    configuration () {
      const configuration = this.$store.getters[APP_CONSTANTS.KEY_RPAY_CONFIGURATION]
      return configuration
    },
    videoOptions () {
      const videoOptions = {
        emitOnHover: true,
        playOnHover: false,
        bigPlayer: true,
        assetHash: this.assetHash,
        autoplay: false,
        muted: false,
        controls: true,
        showMeta: false,
        dimensions: 'max-width: 100%; max-height: auto;',
        aspectRatio: '1:1',
        poster: this.gaiaAsset.image,
        sources: [
          { src: (this.gaiaAsset.properties) ? this.gaiaAsset.properties.animation_url : null }
        ],
        fluid: false
      }
      return videoOptions
    },
    isOwner: function () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!this.gaiaAsset.contractAsset || !profile || !profile.loggedIn) return false
      return profile.stxAddress === this.gaiaAsset.contractAsset.owner
    },
    owner () {
      return this.gaiaAsset.contractAsset.owner
    },
    webWalletNeeded () {
      const webWalletNeeded = this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_NEEDED]
      return webWalletNeeded
    }
  }
}
</script>

<style lang="scss" scoped>
#threeCanvas {
  display: block;
}
.priceSection {
  .basePrice,
  .feePrice {
    font: normal normal 300 12px/18px Montserrat;
    span {
      float: right;
      margin-left: auto;
      span {
        margin-left: 4px;
        color: #5154a1;
        font: normal normal bold 16px/19px Montserrat;
      }
    }
  }
}
.fullPrice {
  font: normal normal 300 20px/29px Montserrat;
  float: right;
  span {
    font: normal normal 300 20px/29px Montserrat;
    span {
      font: normal normal bold 24px/29px Montserrat;
      color: #5154a1;
    }
  }
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.close {
  margin: auto;
  font-size: 30px;
}
/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 63%;
}

.more-link {
  border: 1pt solid #fff;
  padding: 3px 10px;
  text-align: center;
  font-size: 1.2rem;
}
.on-auction-text {
  text-transform: capitalize;
  font-weight: 700;
  font-size: 1.5rem;
}
#asset-offer-modal .modal-content {
  text-align: left !important;
}
.backBtn {
  color: #170a6d;
  font: normal normal bold 11px/14px Montserrat;
  margin-bottom: 30px;
}
.button {
  width: 120px;
  padding: 0;
  display: grid;
  place-items: center;
  width: 251px;
  height: 43px;
  margin-top: 55px;
}
.editions {
  background-color: #170a6d;
  padding: 5px;
  align-items: center;
  display: grid;
  place-items: center;
}
.editions h2 {
  place-items: center;
  color: white;
  font-weight: 200;
  margin: 0;
}
.editions h2 span {
  font-weight: 500;
}
</style>
