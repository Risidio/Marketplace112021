<template>
<section style="height: 20%" class="itemPreviewSection" id="section-minting">
  <div class="nFTInfo">
    <p class="lastUpdate">Last Update</p>
    <p class="spanDate">{{moment(1)}}</p>
     <p class="spanDate1">{{moment(2)}}</p>
      <p class="spanDate">{{moment(3)}}</p>
  </div>
  <div v-if="windowWidth > 1020">
  <b-container class="my-5 pt-5" v-if="!item || !loopRun">
    <h1>{{message}}</h1>
  </b-container>
  <div class="itemPreviewBody" v-else>
      <div class="backBtn"><router-link class="backBtn" to="/my-account"><b-icon icon="chevron-left" shift-h="-3"></b-icon> Back </router-link></div>
    <div :key="componentKey" class="itemPreviewContainer" >
      <div class = "itemPreviewSubContainer">
        <div class="NFTbackgroundColour">
          <img :src="item.image" class="nftGeneralView" :options="options"/>
          <h2 style="margin-top: 0;" class="nFTName" v-if="item.name" >{{item.name}}</h2>
          <p style="margin: 0; justify-self: flex-start; align-self: start;" class="nFTArtist" v-if="item.properties.collection">By: <span>{{item.properties.collection}}</span></p>
        </div>
        <div v-if="!item.contractAsset">
          <button class="button filled" @click="startMinting()">Mint<span v-if="loopRun && loopRun.batchSize > 1"> Next {{loopRun.batchSize}}</span></button>
        </div>
        <div v-else-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price > 0">
        <b-link  :to="assetUrl(item)"><b-button class="button notFilledBlue">View On Market</b-button></b-link>
         <button class="cancel-button" @click="delistItem()">Delist item</button>
        </div>
        <div v-else>
         <b-button style="display: grid; place-items: center; padding: 15px 80px;" class="button filled" @click="openSaleDataDialog()">Sell</b-button>
        </div>
        <!-- <div class="text-left text-small mt-3">
          <b-link :to="'/my-nfts/' + loopRun.currentRunKey"><b-icon icon="chevron-left"/> Back</b-link>
        </div> -->
      </div>
      <div class="itemPreviewContainerDetails">
        <div>
          <div class="mb-2 d-flex justify-content-between">
            <h2 class="font: normal normal normal 38px/41px Montserrat;">{{mintedMessage}}</h2>
            <!-- <ItemActionMenu :item="item" :loopRun="loopRun"/> -->
          </div>
        </div>
        <p v-if="item.description" class="pt-4 text-small" v-html="preserveWhiteSpace(item.description)"></p>
        <!-- <MintInfo :item="item" :loopRun="loopRun"/> -->

        <PendingTransactionInfo class="mt-5" v-if="pending && pending.txStatus === 'pending'" :pending="pending"/>
        <div style="display: none">
          <MintingTools class="w-100" :items="[item]" :loopRun="loopRun" @update="update" :mediaItem="getMediaItem()"/>
        </div>
        <b-nav class="galleryNav" >
          <div class="galleryNavContainer" >
            <b-nav-item id="Info" class="galleryNavItem active" @click="tabChange('Info')">Info</b-nav-item>
            <b-nav-item id="History" class="galleryNavItem" @click="tabChange('History')">History</b-nav-item>
          </div>
        </b-nav>
        <div v-if="tab === 'History'">
          <NftHistory class="mt-5" @update="update" @setPending="setPending" :loopRun="loopRun" :nftIndex="(item.contractAsset) ? item.contractAsset.nftIndex : -1" :assetHash="item.assetHash"/>
        </div>
        <div v-if="tab === 'Info'">
          <p style="font: normal normal normal 14px/18px Montserrat;">Description of the NFT / collectable - Examples such the content of NFTs, specific themes of the collection, quotations by the creator, the meaning behind the creation of this piece etc.</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div v-else>
  <b-container class="my-5 pt-5" v-if="!item || !loopRun">
    <h1>{{message}}</h1>
  </b-container>
  <div class="itemPreviewBody" v-else>
      <div class="backBtn"><router-link class="backBtn" to="/my-account"><b-icon icon="chevron-left" shift-h="-3"></b-icon> Back </router-link></div>
    <div :key="componentKey" class="itemPreviewContainer" >
      <div class = "itemPreviewSubContainerM">
            <div class="mb-2 justify-content-between" style="text-align: center; margin-top: 130px;">
            <h2 class="font: normal normal normal 38px/41px Montserrat;">{{mintedMessage}}</h2>
          </div>
        <div class="NFTbackgroundColour">
          <img :src="item.image" class="nftGeneralView" :options="options" alt="NFTimages">
          <h2 style="margin-top: 0;" class="nFTName" v-if="item.name" >{{item.name}}</h2>
          <p style="margin: 0; justify-self: flex-start; align-self: start;" class="nFTArtist" v-if="item.properties.collection">By: <span>{{item.properties.collection}}</span></p>
        </div>
        <div v-if="!item.contractAsset">
          <button class="button filled" @click="startMinting()">Mint<span v-if="loopRun && loopRun.batchSize > 1"> Next {{loopRun.batchSize}}</span></button>
        </div>
        <div v-else-if="item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price > 0">
        <b-link  :to="assetUrl(item)"><b-button class="button notFilledBlue">View On Market</b-button></b-link>
         <button class="cancel-button" @click="delistItem()">Delist item</button>
        </div>
        <div v-else>
         <b-button style="display: grid; place-items: center; padding: 15px 80px;" class="button filled" @click="openSaleDataDialog()">Sell</b-button>
        </div>
        <!-- <div class="text-left text-small mt-3">
          <b-link :to="'/my-nfts/' + loopRun.currentRunKey"><b-icon icon="chevron-left"/> Back</b-link>
        </div> -->
      </div>
      <div class="itemPreviewContainerDetails">
        <p v-if="item.description" class="pt-4 text-small" v-html="preserveWhiteSpace(item.description)"></p>
        <!-- <MintInfo :item="item" :loopRun="loopRun"/> -->

        <PendingTransactionInfo class="mt-5" v-if="pending && pending.txStatus === 'pending'" :pending="pending"/>
        <div style="display: none">
          <MintingTools class="w-100" :items="[item]" :loopRun="loopRun" @update="update" :mediaItem="getMediaItem()"/>
        </div>
      </div>
      <NftHistory @update="update" @setPending="setPending" :loopRun="loopRun" :nftIndex="(item.contractAsset) ? item.contractAsset.nftIndex : -1" :assetHash="item.assetHash"/>
    </div>
  </div>
</div>
</section>
</template>
<script>
import { APP_CONSTANTS } from '@/app-constants'
// import ItemActionMenu from '@/views/marketplace/components/update/ItemActionMenu'
import PendingTransactionInfo from '@/components/toolkit/nft-history/PendingTransactionInfo'
import NftHistory from '@/components/toolkit/nft-history/NftHistory'
// import MintInfo from '@/views/marketplace/components/toolkit/mint-setup/MintInfo'
import MintingTools from '@/components/toolkit/MintingTools'
import moment from 'moment'

export default {
  name: 'ItemPreview',
  components: {
    NftHistory,
    MintingTools,
    PendingTransactionInfo
    // ItemActionMenu
  },
  data: function () {
    return {
      windowWidth: window.innerWidth,
      showHash: false,
      contractId: null,
      componentKey: 0,
      nftIndex: null,
      notCount: 0,
      assetHash: null,
      pending: null,
      item: null,
      message: 'No item available...',
      contractNameNext: process.env.VUE_APP_STACKS_CONTRACT_NAME_NEXT,
      showRpay: false,
      tab: 'Info'
    }
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  mounted () {
    this.loading = false
    this.contractId = this.$route.params.contractId
    this.state = this.$route.query.state
    this.fetchItem()
    if (window.eventBus && window.eventBus.$on) {
      const $self = this
      window.eventBus.$on('rpayEvent', function (data) {
        if ($self.$route.name !== 'item-preview' && $self.$route.name !== 'nft-preview') return
        if (data.opcode === 'stx-transaction-sent') {
          $self.componentKey++
          // save transaction but not on gaia asset
          if (data.txId && data.functionName === 'mint-token' && data.txStatus === 'success') {
            const item = $self.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](data.assetHash)
            item.mintInfo = {
              txId: data.txId,
              txStatus: data.txStatus
            }
            $self.$store.dispatch('rpayMyItemStore/quickSaveItem', item).then(() => {
              $self.setPending(data)
            })
          }
          $self.setPending(data)
        }
      })
    }
  },
  methods: {
    moment: function (val) {
      const month = moment(this.item?.updated).format('MMMM')
      const day = moment(this.item?.updated).format('Do')
      const year = moment(this.item?.updated).format('YYYY')
      if (val === 1) {
        return (month)
      } else if (val === 2) {
        return (day)
      } else if (val === 3) {
        return (year)
      } else {
        return (null)
      }
    },
    checkScreen () {
      this.windowWidth = window.innerWidth
    },
    dimensions: function () {
      if (this.dims) {
        // return 'width: ' + this.dims.width + 'px; height: ' + this.dims.height + 'px;'
        return 'width: 100%; max-height: 600px; min-height: 350px;'
      }
      return 'width: 100%; height: auto'
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    },
    delistItem () {
      const data = {
        sendAsSky: true,
        contractAddress: this.item.contractAsset.contractId.split('.')[0],
        contractName: this.item.contractAsset.contractId.split('.')[1],
        nftIndex: this.item.contractAsset.nftIndex
      }
      this.$store.dispatch('rpayMarketGenFungStore/unlistInToken', data).then((result) => {
        this.result = result
      }).catch((error) => {
        console.log(error)
        this.sellingMessage = null
      })
    },
    startMinting: function () {
      this.$store.commit(APP_CONSTANTS.SET_RPAY_FLOW, { flow: 'minting-flow' })
      this.$store.commit('rpayStore/setDisplayCard', 100)
      this.$bvModal.show('minting-modal')
    },
    openSaleDataDialog: function () {
      this.$store.commit(APP_CONSTANTS.SET_RPAY_FLOW, { flow: 'selling-flow' })
      this.showRpay = true
      this.$bvModal.show('selling-modal')
    },
    tabChange (tab) {
      this.tab = tab
      document.getElementById('Info').classList.remove('active')
      document.getElementById('History').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    fetchItem () {
      if (this.$route.name === 'nft-preview') {
        const data = { contractId: this.contractId, nftIndex: Number(this.$route.params.nftIndex) }
        this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndNftIndex', data).then((item) => {
          this.item = item
        })
      } else {
        this.assetHash = this.$route.params.assetHash
        this.edition = Number(this.$route.params.edition)
        this.$store.dispatch('rpayMyItemStore/findItemByAssetHash', this.assetHash).then((item) => {
          this.item = item
          const data = {
            asc: true,
            page: 0,
            pageSize: 100,
            stxAddress: (process.env.VUE_APP_NETWORK !== 'local') ? this.profile.stxAddress : 'STFJEDEQB1Y1CQ7F04CS62DCS5MXZVSNXXN413ZG'
          }
          this.$store.dispatch('rpayStacksContractStore/fetchMyTokens', data).then((results) => {
            if (results && results.tokenCount > 0) {
              const item = results.gaiaAssets.find((o) => o.assetHash === this.assetHash)
              if (item) this.item = item
            }
          })
        })
      }
    },
    setPending (result) {
      if (this.pending) {
        const data = {
          contractId: this.loopRun.contractId
        }
        if (!result || !result.txStatus || result.txStatus === 'pending') {
          this.pending = result
        } else if (result.txStatus === 'success' && result.functionName === 'mint-token') {
          data.assetHash = result.assetHash
          this.updateCacheByHash(data)
        } else if (result.txStatus === 'success' && result.functionName !== 'mint-token') {
          data.nftIndex = result.nftIndex
          this.updateCacheByNftIndex(data)
        } else {
          if (this.notCount === 0) this.$notify({ type: 'danger', title: 'Transaction Info', text: 'Transaction failed - check blockchain for cause.' })
          this.notCount++
        }
      }
      this.pending = result
    },
    updateCacheByHash (data) {
      this.$store.dispatch('rpayStacksContractStore/updateCacheByHash', data).then((result) => {
        if (result && typeof result.nftIndex !== 'undefined') {
          this.nftIndex = result.nftIndex
          data.nftIndex = result.nftIndex
          this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndNftIndex', data).then(() => {
            if (this.nftIndex && this.$route.name !== 'nft-preview') this.$router.push('/nft-preview/' + this.loopRun.contractId + '/' + result.nftIndex)
            else this.fetchItem()
          })
        } else {
          this.fetchItem()
        }
      })
    },
    updateCacheByNftIndex (data) {
      this.$store.dispatch('rpayStacksContractStore/updateCacheByNftIndex', data).then(() => {
        this.$store.dispatch('rpayStacksContractStore/fetchTokenByContractIdAndNftIndex', data).then(() => {
          this.fetchItem()
        })
      })
    },
    update () {
      this.fetchItem()
    },
    getMediaItem () {
      const attributes = this.$store.getters[APP_CONSTANTS.KEY_MEDIA_ATTRIBUTES](this.item)
      return attributes
    },
    deleteMediaItem: function (mediaId) {
      this.$store.dispatch('rpayMyItemStore/deleteMediaItem', { item: this.item, id: mediaId }).then(() => {
        this.$emit('delete-cover')
      })
    },
    preserveWhiteSpace: function (content) {
      return '<span class="text-description" style="white-space: break-spaces;">' + content + '</span>'
    },
    targetItem: function () {
      return this.$store.getters[APP_CONSTANTS.KEY_TARGET_FILE_FOR_DISPLAY](this.item)
    }
  },
  computed: {
    mintedMessage () {
      if (this.item.contractAsset && this.loopRun && this.loopRun.type === 'punks') {
        return this.loopRun.currentRun + ' #' + this.item.contractAsset.nftIndex
      }
      if (this.item.contractAsset) {
        // return '#' + this.item.contractAsset.nftIndex + ' ' + this.item.name
        return this.item.name
      }
      return this.item.name
    },
    loopRun () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS]
      if (!loopRuns || !this.contractId) {
        return this.$store.getters[APP_CONSTANTS.GET_LOOP_RUN_BY_KEY](this.runKey)
      }
      return loopRuns.find((o) => o.contractId === this.contractId && o.currentRunKey.indexOf(this.runKey > -1))
    },
    runKey () {
      const defaultLoopRun = process.env.VUE_APP_DEFAULT_LOOP_RUN
      let runKey = (this.item && this.item.properties.collection) ? this.item.properties.collection : defaultLoopRun
      if (runKey.indexOf('/') > -1) {
        runKey = runKey.split('/')[0]
      }
      return runKey
    },
    transactionUrl: function () {
      if (!this.item.mintInfo || !this.item.mintInfo.txId) return '#'
      const stacksApiUrl = process.env.VUE_APP_STACKS_EXPLORER
      let txId = this.item.mintInfo.txId
      if (!txId.startsWith('0x')) txId = '0x' + txId
      return stacksApiUrl + '/txid/' + txId + '?chain=' + process.env.VUE_APP_NETWORK
    },
    txPending () {
      let transactions = []
      if (this.item.contractAsset) {
        transactions = this.$store.getters[APP_CONSTANTS.KEY_TX_PENDING_BY_TX_ID](this.item.contractAsset.nftIndex)
      } else {
        transactions = this.$store.getters[APP_CONSTANTS.KEY_TX_PENDING_BY_ASSET_HASH](this.item.assetHash)
      }
      return transactions
    },
    options () {
      const videoOptions = {
        emitOnHover: true,
        playOnHover: false,
        bigPlayer: true,
        assetHash: this.assetHash,
        autoplay: false,
        muted: false,
        controls: true,
        showMeta: false,
        // poster: (this.item.attributes.coverImage) ? this.item.attributes.coverImage.fileUrl : null,
        // sources: [
        //   { src: this.item.attributes.artworkFile.fileUrl, type: this.item.attributes.artworkFile.type }
        // ],
        fluid: true
      }
      return videoOptions
    },
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
    },
    iAmOwner () {
      if (process.env.VUE_APP_NETWORK === 'local') {
        return this.item.contractAsset && (this.item.contractAsset.owner === 'STFJEDEQB1Y1CQ7F04CS62DCS5MXZVSNXXN413ZG' || this.item.contractAsset.owner === this.profile.stxAddress)
      }
      return this.item.contractAsset && this.item.contractAsset.owner === this.profile.stxAddress
    },
    minted () {
      return this.item.contractAsset
    }
  }
}
</script>

<style lang="scss" scoped>
#minting-modal .modal-content {
  border: none !important;
  background-color: transparent !important;
}
// .button{
//   margin-top: 20px;
// }
.itemPreviewSection{
  max-width: 1135px;
  display: block;
  margin: auto;
  padding: 3%;
  background-color: white;
  height: 70vh;
}
.galleryNavItem:hover, .galleryNavItem.active{
  border-bottom: 2px solid #50B1B5;
}
.galleryNavMItem:hover, .galleryNavMItem.active{
  border-bottom: 2px solid #50B1B5;
}
.nFTInfo{
  position: absolute;
  background-color: #5154A1;
  color: white;
  padding: 10px 0 10px 30px;
  width: 130px; height: 82px;
  right: 0;
  top: 130px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  .lastUpdate{
    color: white !important;
    font: normal normal bold 10px/13px Montserrat;
    padding: 0;
    margin: 0;
  }
  .spanDate{
    color: white !important;
    font: normal normal normal 10px/14px Montserrat;
    padding: 0;
    margin: 3px 0;
  }
  .spanDate1{
    color: white !important;
    font: normal normal normal 21px/11px Montserrat;
    padding: 0;
    margin: 0;
  }
}
.button{
  margin: 20px auto 0 auto;
}
@media only screen and (max-width: 1020px) {
  .nFTInfo{
    margin-top: 50px;
    top: 245px;
    width: 120px; height: 82px;

  }
  .itemPreviewContainer >*:nth-child(2){
  flex: 1 1 600px;
 }
.NFTbackgroundColour{
  margin: auto;
  margin-top: 50px;
  }
.button{
  margin-top:85px;
  }
  .history-container{

  }

}
.NFTbackgroundColour{
  margin: auto;
}

.itemPreviewSubContainer{
  max-width: 500px;
}
.itemPreviewSubContainerM{
  max-width: 500px;
  max-height:610px;
  background:#E4E4E4;
  border-radius: 20px;
}
.backBtn{
  color: #170A6D;
  font: normal normal bold 11px/14px Montserrat;
  margin-bottom: 30px;
}
.itemPreviewBody{
  margin-top: 100px;
}
.itemPreviewContainer{
  display: flex;
  flex-wrap: wrap;
  column-gap: 100px;
}
.itemPreviewContainer >*:nth-child(2){
  flex: 1 1 600px;
}
.itemPreviewContainer >*:nth-child(1){
  margin: 0 auto;
  flex: 1 1 200px;
}
.itemPreviewContainerDetails{
  max-width: 900px;
  margin-top:50px;
}
</style>
