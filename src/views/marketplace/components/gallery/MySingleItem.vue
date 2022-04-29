<template>
<div v-if="asset && asset.contractAsset && asset.contractAsset.listingInUstx && asset.contractAsset.listingInUstx.price > 0">
<div class="NFTbackgroundColour NFTbackgroundColour-buy" >
  <div class="">
      <b-link class="galleryNFTContainer" :to="nextUrl">
        <img class="nftGeneralView" :src="asset.image || errorImg"/>
        <p style="margin-top: 0;" class="nFTName">{{this.asset.name || 'Unknown'}} <span>On Sale</span></p>
        <p class="nFTArtist"> By: <span>{{asset.properties ? asset.properties.collection : 'Unknown'}}</span></p>
    </b-link>
    </div>
  </div>
</div>
<div v-else>
  <div class="NFTbackgroundColour" >
  <div class="">
      <b-link class="galleryNFTContainer" :to="nextUrl">
        <img class="nftGeneralView" :src="asset.image || errorImg"/>
        <p style="margin-top: 0;" class="nFTName">{{this.asset.name || 'Unknown'}}</p>
        <p class="nFTArtist"> By: <span>{{asset.properties ? asset.properties.collection : 'Unknown'}}</span></p>
    </b-link>
    </div>
  </div>
</div>
</template>

<script>
import { DateTime } from 'luxon'
import { APP_CONSTANTS } from '@/app-constants'
import LOGO from '@/assets/img/sticksnstones_logo.png'

// noinspection JSUnusedGlobalSymbols
export default {
  name: 'MySingleItem',
  components: {
    // PunkConnect
  },
  props: ['asset', 'loopRun', 'parent'],
  data () {
    return {
      image: null,
      newWidth: '100%',
      newHeight: null,
      errorImg: LOGO
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
    handler: function (e) {
      e.preventDefault()
    },
    imageError () {
      this.image = this.errorImg
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
    // itemPreview () {
    //   return this.$route.name === 'item-preview'
    // },
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
        if (this.contractAsset && this.contractAsset.tokenInfo && this.contractAsset.owner === this.profile.stxAddress) {
          return '/nft-preview/' + this.contractAsset.contractId + '/' + this.contractAsset.nftIndex
        } else {
          return '/nfts/' + this.contractAsset.contractId + '/' + this.contractAsset.nftIndex
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
