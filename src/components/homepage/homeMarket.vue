<template>
    <section class="homeMarket">
      <b-nav class="galleryNav" >
        <div class="galleryNavContainer" >
          <b-nav-item class="galleryNavItem active" id="discover" @click="tabChange('discover')">Discover</b-nav-item>
          <b-nav-item class="galleryNavItem" id="collections" @click="tabChange('collections')">Collections</b-nav-item>
          <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
        </div>
      </b-nav>
    <div class="homeMarketItems">

        <div class="galleryContainer" v-if="gaiaAssets.length > 0 && tab === 'discover' && shownAssets.length == 0">
            <div v-for="(item, index) in gaiaAssets" :key="index" class="NFTbackgroundColour" >
                <div class="">
                    <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset">
                  <img class="nftGeneralView-limited" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]"/>
                  <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                  <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                  <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                </b-link>
                </div>
            </div>
        </div>
        <div class="galleryContainer" v-else-if="gaiaAssets.length > 0 && tab === 'discover' && shownAssets.length > 0">
          <div v-for="(item, index) in shownAssets" :key="index" class="NFTbackgroundColour">
            <div class="">
                    <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset && item.attributes">
                  <img class="nftGeneralView" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]"/>
                  <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                  <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                  <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                </b-link>
              </div>
          </div>
        </div>
        <div class="galleryContainer1" v-if="tab === 'collections'">
          <div class="comingSoon">

            <h1 style="margin: auto; text-align: center;">Coming soon!</h1>
          </div>
          <!-- <b-col style="margin: auto" md="9" sm="12">
            <div class="h-auto">
              <b-col class="mt-5 w-100"  v-for="(loopRun, index) in loopRuns" :key="index" >
                <div>
                  <div :to="collectionUrl(loopRun)">
                    <img style="width: 100%; height: 100%;" :src="getImageUrl(loopRun)"  v-b-tooltip.hover="{ variant: 'light' }" :title="'Collection\n' + loopRun.currentRun"/>
                      <div class=""><b-link :to="collectionUrl(loopRun)">{{loopRun.currentRun}}</b-link></div>
                  </div>
                </div>
              </b-col>
            </div>
          </b-col> -->
        </div>

          <!-- <div class=""  v-if="tab === 'Your NFT'">
              <MyPageableItems  style="justify-content: space-evenly"  :loopRun="loopRun"/>
              <div v-if="gaiaAssets.length > 0 && tab === 'Item'" class="galleryinfoContainer">
                <div v-for="(item, index) in gaiaAssets" :key="index" class="galleryItem" >
                  <div class="yourItems">
                    <router-link v-bind:to="'/edit-item/' + item.assetHash" ><img :src="item.image" class="itemImg" style=""/></router-link>
                    <p class="nFTName"> {{item.name}} <span >$ {{item.price * 1.9}}</span></p>
                    <p class="nFTArtist">By <span >{{item.artist}}</span> <span style="float: right;">{{item.price}} STX</span></p>
                  </div>
                </div>
              </div>
          </div> -->
          <router-link style="color:white" class="routerL" to="/nft-marketplace"> <button class="button filled">See More Collectables</button></router-link>
    </div>
  </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
// import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import utils from '@/services/utils'
export default {
  name: 'HomeMarket',
  props: ['gaiaAssets'],
  components: {
    // MediaItemGeneral
    // MyPageableItems
  },
  data () {
    return {
      resultSet: [],
      loaded: false,
      placeHolderItems: [],
      shownAssets: [],
      tab: 'discover',
      loopRuns: [],
      mobileAssets: []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.checkScreen)
    this.findAssets()
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    // this.checkScreen()
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
      document.getElementById('discover').classList.remove('active')
      document.getElementById('collections').classList.remove('active')
      document.getElementById(tab).classList.add('active')
      console.log(this.tab)
    },
    showCollections () {
      const collection = document.getElementsByClassName('collectionsMenu')[0]
      const arrow = document.getElementsByClassName('arrow1')[0]
      collection.classList.toggle('active')
      arrow.classList.toggle('active')
    },
    showCategories () {
      const categories = document.getElementsByClassName('galleryCategories')[0]
      const arrow = document.getElementsByClassName('arrow2')[0]
      categories.classList.toggle('active')
      arrow.classList.toggle('active')
    },
    findAssets () {
      this.$store.dispatch('rpayStacksContractStore/fetchContractDataFirstEditions').then(() => {
        this.loaded = true
      })
    },
    checkScreen () {
      this.shownAssets = this.mobileAssets
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 600) {
        this.shownAssets = this.mobileAssets
      } else if (this.windowWidth > 600) {
        this.shownAssets = []
      }
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    }
  },
  computed: {
    // gaiaAssets () {
    //   const assets = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSETS]
    //   return (assets) ? assets.reverse() : []
    // },
    // filterMarketAssets () {
    //   const filterMarketAssets = this.gaiaAssets.slice(0, 8)
    //   return (filterMarketAssets)
    // },
    // mobileAssets () {
    //   const mobileAssets = this.gaiaAssets.slice(0, 2)
    //   return (mobileAssets)
    // }
  }
}

</script>

<style lang="scss" scoped>
p{padding:0; margin:0;}
.homeMarket{
  width: 90%;
  min-height: 80rem;
  margin: 10px auto 70px auto;
}
.galleryContainer{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, max-content));
  gap: 20px;
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
.homeMarketItems{
  max-width: 1800px;
  margin: auto;
}
.comingSoon{
  display: grid;
  place-items: center;
  max-width: 400px;
  margin: auto;
}
.button{
  margin: 50px auto;
  font: normal normal bold 11px/14px Montserrat;
}
#discover {
  margin-right: 50px;
}
</style>
