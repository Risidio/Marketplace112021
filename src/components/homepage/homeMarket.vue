<template>
    <section class="homeMarket">
    <div>
      <b-nav class="galleryNav" >
        <div class="galleryNavContainer" >
          <b-nav-item class="galleryNavItem" @click="tabChange('Discover')">Discover</b-nav-item>
          <b-nav-item class="galleryNavItem" @click="tabChange('Collections')">Collections</b-nav-item>
          <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item>
        </div>
      </b-nav>
    </div>
    <div class="homeMarketItems">

        <div class="galleryContainer" v-if="gaiaAssets.length > 0 && tab === 'Discover'">
            <div v-for="(item, index) in filterMarketAssets" :key="index" class="homeNFTView" >
                <div class="NFTbackgroundColour">
                    <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset && item.attributes">
                  <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/>
                  <p style="font-size: 1em; text-overflow: clip; width:250px"> {{!item.name ? "NFT" : item.name }} <span style="float: right; font-size: 0.6em; margin-top: 10px;">$ {{item.price * 1.9}}</span></p>
                  <p>By <span style="font-weight:600">{{!item.artist ? "Anonymous" : item.artist }}</span> <span style="float: right;">{{item.price}} STX</span></p>
                </b-link>
                </div>
            </div>
        </div>

        <div class="galleryContainer" v-if="tab === 'Collections'">
          <b-col style="margin: auto" md="9" sm="12">
            <h1 style="margin: auto; text-align: center;">Coming soon!</h1>
            <b-row class="h-auto">
              <b-col class="mt-5 w-100"  v-for="(loopRun, index) in loopRuns" :key="index" >
                <div>
                  <b-link :to="collectionUrl(loopRun)">
                    <img style="width: 100%; height: 100%;" :src="getImageUrl(loopRun)"  v-b-tooltip.hover="{ variant: 'light' }" :title="'Collection\n' + loopRun.currentRun"/>
                      <div class=""><b-link :to="collectionUrl(loopRun)">{{loopRun.currentRun}}</b-link></div>
                  </b-link>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </div>

          <div class=""  v-if="tab === 'Your NFT'">
              <MyPageableItems  style="justify-content: space-evenly"  :loopRun="loopRun"/>
              <div v-if="gaiaAssets.length > 0 && tab === 'Item'" class="galleryinfoContainer">
                <div v-for="(item, index) in gaiaAssets" :key="index" class="galleryItem" >
                  <div class="yourItems">
                    <router-link v-bind:to="'/edit-item/' + item.assetHash" ><img :src="item.image" class="itemImg" style=""/></router-link>
                    <p style="font-size: 1.5em;"> {{item.name}} <span style="float: right; font-size: 0.6em; margin-top: 10px;">$ {{item.price * 1.9}}</span></p>
                    <p>By <span style="font-weight:600">{{item.artist}}</span> <span style="float: right;">{{item.price}} STX</span></p>
                  </div>
                </div>
              </div>
          </div>
            <button class="button"><router-link style="color:white" to="/nft-marketplace">See More Collectables</router-link></button>
    </div>
  </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import utils from '@/services/utils'
export default {
  name: 'HomeMarket',
  props: ['gaiaAssets'],
  components: {
    MediaItemGeneral,
    MyPageableItems
  },
  data () {
    return {
      resultSet: [],
      loaded: false,
      placeHolderItems: [],
      tab: 'Discover',
      loopRuns: []
    }
  },
  mounted () {
    this.generateData()
    this.findAssets()
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
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
    generateData () {
      const array = {
        name: 'item1',
        coverImage: 'https://res.cloudinary.com/risidio/image/upload/v1634828295/RisidioMarketplace/Screenshot_2021-10-21_at_15.57.57_q7chjf.png',
        nFTArtist: 'unknown',
        price: 13,
        type: 'image'
      }
      for (let i = 0; i < 20; ++i) {
        this.placeHolderItems.push(array)
      }
    },
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', 'active').then((projects) => {
        $self.projects = utils.sortResults(projects)
        $self.loopRuns = this.allLoopRuns
        $self.loaded = true
      })
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
    filterMarketAssets () {
      const filterMarketAssets = this.gaiaAssets.slice(0, 8)
      return (filterMarketAssets)
    }
  }
}

</script>

<style lang="scss" scoped>
p{padding:0; margin:0;}
.homeMarket{
  width: 90%;
  min-height: 80vh;
  margin: auto;
  margin-bottom: 10vh;
}
.galleryNav{
  margin: auto;
  margin-bottom: 70px;
  width: 100%;
  justify-items: center;
  align-items: center;
  border-bottom: solid rgba(128, 128, 128, 0.112) 1px;
}
.galleryNavContainer{
  margin: auto;
  margin-bottom: -1px;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
}
.galleryNavItem{
  font-size: 18px;
  max-width: 500px;
  padding: 5px;
  margin: auto;
  border: solid rgba(255, 255, 255, 0)  2px;
}
.galleryNavItem:hover{
  border-bottom: 2px solid #50B1B5;
}
.galleryContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
}
.homeNFTView{
  display: flex;
  // margin: 4rem;
  border-radius: 25px;
  // padding: 4rem;
  margin: auto;
}
.homeNFTView > *{
  flex: 1 1 300px;
  padding: 30px;
  min-width: 300px;
  max-height: 400px;
}
.button{
  display:block;
  margin: 30px auto;
  padding: 15px 30px;
  border-radius: 100px;
  border: none;
  font-size: 14px;
  font-weight:500;
  background:#50B1B5;
  color: white;
}
</style>
