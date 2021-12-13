<template>
<div v-if="asset">
  <div v-if="nextBid.amount >= 1" class="galleryItem onSale" >
    <b-card-text style="margin: 20px auto;" class="">
      <b-link class="  text-info" :to="nextUrl">
        <div @contextmenu="handler($event)" class="">
            <img
              ref="itemImage"
              class="itemImg"
              :src="image" @error="imageError()"/>
        </div>
            <div class="text-left">
              <div   class="text-small d-flex justify-content-between">
                <div  class="text-right"><span v-if="loopRun">{{loopRun.currentRun}}</span> {{editionMessage}}</div>
                <div  class="text-right">{{created()}}</div>
              <span style="float: right font-size: 10px; font-weight: bolder;"> On Sale</span>
              </div>
            </div>
      </b-link>

      <p class="nFTName" style="font-size: 20px">{{this.asset.name}}</p>
      <p class="nFTArtist"> By: <span>{{asset.artist}}</span></p>
    </b-card-text>
    <b-card-text>
      <!-- Enables connecting meta data to the actual punk crash -->
      <PunkConnect v-if="loopRun" :loopRun="loopRun" :asset="asset" @updateImage="updateImage"/> <!-- v-on="$listeners"/> -->
      <!-- <div class="  text-center mb-3">
        <span v-if="contractAsset">{{contractAsset.owner}}</span>
        <span v-else>'ownership in progress'</span>
      </div> -->
      <div class="mb-4 d-flex justify-content-center" v-if="marketplace || myNfts">
        <b-button :to="nextUrl" :variant="variant">{{sellingMessage}}</b-button>
      </div>
      <div class="d-flex justify-content-center" v-else-if="nftPage">
      </div>
      <div class="d-flex justify-content-between">
        <div v-if="itemPreview">
          <div><a v-b-tooltip.bottom title="Download NFT" class="text-info text-light ml-3" href="#" @click.prevent="download"><b-icon class="text-info arrow-repeat" font-scale="1" icon="arrow-down-circle"></b-icon></a></div>
        </div>
        <div v-else-if="myNfts">
          <b-link v-if="contractAsset" class="text-small text-warning" :to="'/nft-preview/' + asset.contractAsset.contractId + '/' + asset.contractAsset.nftIndex">manage</b-link>
          <b-link v-else class="text-small text-warning" :to="'/item-preview/' + asset.assetHash + '/1'">mint now</b-link>
        </div>
        <div v-if="iAmOwner">
        </div>
        <!-- <div class="text-info" v-if="!marketplace && !nftPage">
          <b-link v-if="contractAsset" class="text-small text-warning" :to="'/nfts/' + contractAsset.contractId + '/' + contractAsset.nftIndex">marketplace</b-link>
        </div> -->
      </div>
    </b-card-text>
  </div>
<div v-if="nextBid.amount == 0" class="galleryItem" >
    <b-card-text style="margin: 20px auto;" class="">
      <b-link class="  text-info" :to="nextUrl">
        <div @contextmenu="handler($event)" class="">
            <img
              ref="itemImage"
              class="itemImg"
              :src="image" @error="imageError()"/>
        </div>
            <div class="text-left">
              <div   class="text-small d-flex justify-content-between">
                <div  class="text-right"><span v-if="loopRun">{{loopRun.currentRun}}</span> {{editionMessage}}</div>
                <div  class="text-right">{{created()}}</div>
              </div>
            </div>
      </b-link>
      <p  class="nFTName" style="font-size: 20px;">{{this.asset.name}}</p>
      <p style="nFTArtist"> By: <span style="font-weight: 500">{{asset.artist}}</span></p>
    </b-card-text>
    <b-card-text>
      <!-- Enables connecting meta data to the actual punk crash -->
      <PunkConnect v-if="loopRun" :loopRun="loopRun" :asset="asset" @updateImage="updateImage"/> <!-- v-on="$listeners"/> -->
      <!-- <div class="  text-center mb-3">
        <span v-if="contractAsset">{{contractAsset.owner}}</span>
        <span v-else>'ownership in progress'</span>
      </div> -->
      <div class="mb-4 d-flex justify-content-center" v-if="marketplace || myNfts">
        <b-button :to="nextUrl" :variant="variant">{{sellingMessage}}</b-button>
      </div>
      <div class="d-flex justify-content-center" v-else-if="nftPage">
      </div>
      <div class="d-flex justify-content-between">
        <div v-if="itemPreview">
          <div><a v-b-tooltip.bottom title="Download NFT" class="text-info text-light ml-3" href="#" @click.prevent="download"><b-icon class="text-info arrow-repeat" font-scale="1" icon="arrow-down-circle"></b-icon></a></div>
        </div>
        <div v-else-if="myNfts">
          <b-link v-if="contractAsset" class="text-small text-warning" :to="'/nft-preview/' + asset.contractAsset.contractId + '/' + asset.contractAsset.nftIndex">manage</b-link>
          <b-link v-else class="text-small text-warning" :to="'/item-preview/' + asset.assetHash + '/1'">mint now</b-link>
        </div>
        <div v-if="iAmOwner">
        </div>
        <!-- <div class="text-info" v-if="!marketplace && !nftPage">
          <b-link v-if="contractAsset" class="text-small text-warning" :to="'/nfts/' + contractAsset.contractId + '/' + contractAsset.nftIndex">marketplace</b-link>
        </div> -->
      </div>
    </b-card-text>
  </div>
</div>
</template>

<script>
import { DateTime } from 'luxon'
import { APP_CONSTANTS } from '@/app-constants'
import PunkConnect from './PunkConnect'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MySingleItem',
  components: {
    PunkConnect
  },
  props: ['asset', 'loopRun', 'parent'],
  data () {
    return {
      image: null,
      newWidth: '100%',
      newHeight: null
    }
  },
  mounted () {
    this.image = this.$store.getters[APP_CONSTANTS.KEY_ASSET_IMAGE_URL](this.asset)
    const $self = this
    const $ele = this.$refs.itemImage
    if (this.isLoopbomb()) {
      this.newHeight = '100%'
    }
    this.$nextTick(() => {
      if (!$ele) {
        return
      }
      if ($self.isLoopbomb()) {
        $self.newHeight = $ele.clientWidth * 1 // 1024 / 716
        $self.newWidth = ($self.newHeight * 716) / 1024
        $ele.style.width = (Math.floor($self.newWidth)).toString() + 'px'
      } else {
        $self.newHeight = $ele.clientWidth * 1 // 1024 / 716
        $ele.style.height = (Math.floor($self.newHeight)).toString() + 'px'
      }
    })
  },
  methods: {
    isLoopbomb () {
      try {
        return ((this.contractAsset.tokenInfo.metaDataUrl.indexOf('loopbomb') > -1) || (this.loopRun && this.loopRun.currentRunKey.indexOf('loop') > -1))
      } catch (e) {
        return false
      }
    },
    updateImage (item) {
      this.asset.image = item.image
      this.image = item.image
    },
    handler: function (e) {
      e.preventDefault()
    },
    imageError () {
      this.image = this.asset.attributes.artworkFile.fileUrl
    },
    created () {
      if (this.asset && this.asset.mintInfo && this.asset.mintInfo.timestamp) {
        return DateTime.fromMillis(this.asset.mintInfo.timestamp).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      } else if (this.asset && this.asset.updated) {
        return DateTime.fromMillis(this.asset.updated).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
      }
      return ''
    }
    /**
    download () {
      const extUrl = this.asset.attributes.artworkFile.fileUrl
      imageDataURI.encodeFromURL(extUrl).then(dataUrl => {
        // RETURNS image data URI :: 'data:image/pngbase64,PNGDATAURI/'
        const image = dataUrl.replace('image/png', 'image/octet-stream')
        const link = document.createElement('a')
        link.download = this.asset.name + '.png'
        link.href = image
        link.click()
      }).catch(() => {
        imageDataURI.encodeFromURL(extUrl).then(dataUrl => {
          // RETURNS image data URI :: 'data:image/pngbase64,PNGDATAURI/'
          const image = dataUrl.replace('image/png', 'image/octet-stream')
          const link = document.createElement('a')
          link.download = this.asset.name + '.png'
          link.href = image
          link.click()
        })
      })
    }
    **/
  },
  computed: {
    contractAsset () {
      if (this.asset.contractAsset) return this.asset.contractAsset
      const data = { assetHash: this.asset.assetHash, edition: 1 }
      const gaiaAsset = this.$store.getters['rpayStacksContractStore/getAssetByHashAndEdition'](data)
      return (gaiaAsset) ? gaiaAsset.contractAsset : null
    },
    variant () {
      if (this.contractAsset) {
        if (this.contractAsset.saleData.saleType === 1) {
          return 'success'
        } else if (this.contractAsset.saleData.saleType === 2) {
          return 'success'
        }
      }
      return 'outline-light'
    },
    itemPreview () {
      return this.$route.name === 'item-preview'
    },
    marketplace () {
      return this.$route.name === 'nft-marketplace' || this.$route.name === 'nft-collection'
    },
    myNfts () {
      return this.$route.name === 'my-nfts'
    },
    nftPage () {
      return this.$route.name.startsWith('asset-by-')
    },
    nextUrl () {
      if (this.marketplace || this.nftPage) {
        if (this.contractAsset && this.contractAsset.tokenInfo) {
          return '/nfts/' + this.contractAsset.contractId + '/' + this.contractAsset.nftIndex
        } else {
          return '/nfts/' + this.asset.assetHash + '/0'
        }
      } else {
        if (this.contractAsset && this.contractAsset.tokenInfo) {
          return '/nft-preview/' + this.contractAsset.contractId + '/' + this.contractAsset.nftIndex
        } else {
          return '/item-preview/' + this.asset.assetHash + '/0'
        }
      }
    },
    mintedMessage () {
      if (this.contractAsset && this.loopRun && this.loopRun.type === 'punks') {
        return this.loopRun.currentRun + ' #' + this.contractAsset.nftIndex
      }
      if (this.contractAsset) {
        if (this.contractAsset.assetName === 'crashpunks') {
          return 'Crash Punks #' + this.contractAsset.nftIndex
        }
        return '#' + this.contractAsset.nftIndex + ' ' + this.asset.name
      }
      return this.asset.name
    },
    editionMessage () {
      if (this.contractAsset && this.contractAsset.tokenInfo.maxEditions > 1) {
        return '(' + this.contractAsset.tokenInfo.edition + ' of ' + this.contractAsset.tokenInfo.maxEditions + ')'
      }
      return null
    },
    nextBid () {
      const nextBid = this.$store.getters[APP_CONSTANTS.KEY_BIDDING_NEXT_BID](this.contractAsset)
      return nextBid
    },
    sellingMessage () {
      if (this.contractAsset) {
        if (this.contractAsset.saleData.saleType === 1) {
          return 'Buy Now: ' + this.contractAsset.saleData.buyNowOrStartingPrice + ' STX'
        } else if (this.contractAsset.saleData.saleType === 2) {
          return 'Next Bid: ' + this.nextBid + ' STX'
        }
      }
      return 'not on sale'
    },
    looperDimsWidth () {
      const dims = this.$store.getters['loopStore/getLooperDimsWidth']
      return dims + 'px'
    },
    looperDimsHeight () {
      const dims = this.$store.getters['loopStore/getLooperDimsHeight']
      return dims + 'px'
    },
    cardDimensions () {
      const width = this.$store.getters['loopStore/getMintedDimsWidth']
      return 'height: auto, width: ' + width + 'px;'
    },
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
    },
    iAmOwner () {
      return this.contractAsset && this.contractAsset.owner === this.profile.stxAddress
    }
  }
}
</script>
<style scoped>

.btn {
  width: inherit;
}
</style>
