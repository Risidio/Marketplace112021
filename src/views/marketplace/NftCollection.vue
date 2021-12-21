<template>
    <section class="mainGallery">
        <div class="mainGalleryContainer">
          <div class="mainGallerySidebar">
                <div class="galleryCollections">
                  <button class="collectionsButton" v-on:click="showCollections()">Collections <img class="arrow1" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                  <div class="collectionsMenu">
                    <div class="ml-5">
                      <CollectionSidebar @updateResults="updateResults" :allowUploads="false" @update="update"/>
                    </div>
                  </div>
                </div>
                <hr class="hr"/>
                <div class="galleryCategory">
                  <button class="collectionsButton" v-on:click="showCategories()"> Categories <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                  <div class="galleryCategories">
                    <a href="#" v-on:click="setCategories('all')">All</a>
                    <a href="#" v-on:click="setCategories('img')">Images</a>
                    <a href="#" v-on:click="setCategories('aud')">Audio</a>
                    <a href="#" v-on:click="setCategories('vid')">Video</a>
                    <a href="#" v-on:click="setCategories('3d')">3D assets</a>
                    <a href="#" v-on:click="setCategories('doc')">Documents</a>
                  </div>
                </div>
                <hr class="hr"/>
            </div>

            <div class="mainGalleryBody">
                <div class="filter">
                    <div>
                        <p class="view">View</p>
                        <button class="collectionsButton"> Popular <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                        <div class="galleryCategories">
                            <a href="#">Category 1</a>
                            <a href="#">Category 2</a>
                            <a href="#">Category 3</a>
                            <a href="#">Category 4</a>
                            <a href="#">Category 5</a>
                        </div>
                        <button class="collectionsButton"> Sort by <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                        <div class="galleryCategories">
                            <a href="#">Category 1</a>
                            <a href="#">Category 2</a>
                            <a href="#">Category 3</a>
                            <a href="#">Category 4</a>
                            <a href="#">Category 5</a>
                        </div>
                    </div>
                        <input class="search" type="text" id="search" name="search" placeholder="Looking for anything in particular ?" :value="search"><img class="view" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                </div>
                <hr/>
                    <div style="width: 100%" v-if="!showSearch">
                                <!-- <h1 class="text-black">NFT Gallery</h1> -->
                    <div :key="searchKey" class="mb-4" v-if="loopRun && (loopRun.status === 'unrevealed' || loopRun.status === 'active' || loopRun.status === 'inactive')">
                                <PageableGallery @tokenCount="tokenCount" :defQuery="defQuery" :loopRun="loopRun"/>
                              </div>
                              <div class="mb-4" v-else-if="loopRun && loopRun.status === 'unrevealed'">
                                <p v-if="loopRun.type === 'punks'"><b-link :to="'/punk-minter/' + loopRun.makerUrlKey + '/' + loopRun.currentRunKey">{{loopRun.currentRun}} artwork available - mint here!</b-link></p>
                              </div>
                        </div>
                      <div class="container" style="min-height: 85vh;" v-else>
                            <b-container class="text-black mt-5">
                                <h1>No Gallery NFTs</h1>
                                <p>Our Gallery is coming online soon - please come back soon...</p>
                            </b-container>
                        </div>
                <!-- <div class="galleryContainer" v-if="placeHolderItems && placeHolderItems.length > 0">
                    <div v-for="(item, index) in placeHolderItems" :key="index" class="galleryItem" >
                        <div>
                            <img :src="item.coverImage" style="display: block; width: 100%; height:250px;margin:auto; border-radius:25px;box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.18); border-radius: 5px;"/>
                            <div class="itemHover">
                                <p style="font-size: 1.5em;"> {{item.name}} <span style="float: right; font-size: 0.6em; margin-top: 10px;">$ {{item.price * 1.9}}</span></p>
                                <p>By <span style="font-weight:600">{{item.nFTArtist}}</span> <span style="float: right;">{{item.price}} STX</span></p>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import PageableGallery from '@/views/marketplace/components/gallery/PageableGallery'
// import SearchBar from '@/views/marketplace/components/gallery/SearchBar'
import CollectionSidebar from '@/views/marketplace/components/gallery/CollectionSidebar'
import Vue from 'vue'

export default {
  name: 'NftCollection',
  components: {
    PageableGallery,
    // SearchBar,
    CollectionSidebar
  },
  watch: {
    '$route' () {
      this.makerUrlKey = this.$route.params.maker
      this.currentRunKey = this.$route.params.collection
      this.componentKey++
    }
  },
  data () {
    return {
      showMinted: true,
      showCollectionData: true,
      showSearch: false,
      defQuery: {
        query: null,
        allCollections: 'one',
        onSale: false,
        onAuction: false,
        editions: false,
        createdBefore: null,
        createdAfter: null,
        sortField: 'nftIndex',
        sortDir: 'sortDown'
      },
      videoHeight: 0,
      componentKey: 0,
      searchKey: 0,
      minted: false,
      makerUrlKey: null,
      numbTokens: 0,
      currentRunKey: null
    }
  },
  mounted () {
    this.makerUrlKey = this.$route.params.makerß
    this.currentRunKey = this.$route.params.collection
    Vue.nextTick(function () {
      const vid = document.getElementById('video-column')
      if (vid) this.videoHeight = vid.clientHeight
    }, this)
  },
  methods: {
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
      console.log('click')
    },
    tokenCount (data) {
      this.numbTokens = data.numbTokens
    },
    updateResults (data) {
      this.defQuery = data.query
      this.searchKey++
    },
    refresh (data) {
      if (data.opcode === 'show-collection') {
        if (this.$route.path !== '/nft-marketplace/' + data.loopRun.makerUrlKey + '/' + data.loopRun.currentRunKey) this.$router.push('/nft-marketplace/' + data.loopRun.makerUrlKey + '/' + data.loopRun.currentRunKey)
      }
    },
    resetFilters () {
      this.defQuery.allCollections = 'one'
      this.defQuery.query = null
      this.defQuery.onAuction = false
      this.defQuery.onSale = false
      this.defQuery.allEditions = false
      this.defQuery.sortField = 'nftIndex'
      this.defQuery.sortDir = 'sortDown'
    },
    update (data) {
      if (data.opcode === 'show-collection') {
        this.showSearch = false
        this.resetFilters()
        if (this.$route.path !== '/nft-marketplace/' + data.loopRun.makerUrlKey + '/' + data.loopRun.currentRunKey) this.$router.push('/nft-marketplace/' + data.loopRun.makerUrlKey + '/' + data.loopRun.currentRunKey)
      } else if (data.opcode === 'show-search') {
        this.showSearch = !this.showSearch
        if (this.showSearch) {
          this.defQuery.allCollections = 'all'
        } else {
          this.defQuery.allCollections = 'one'
        }
      }
      this.searchKey++
    },
    getCollectionImageUrl (item) {
      return this.$store.getters[APP_CONSTANTS.KEY_ASSET_IMAGE_URL](item)
    }
  },
  computed: {
    loopRun () {
      const loopRun = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUN_BY_KEY](this.currentRunKey)
      return loopRun
    },
    search () {
      const content = this.$store.state.contentStore.content.searchWord
      return content
    }
  }
}
</script>

<style lang="scss" scoped>
  *{color: black}
  .mainGalleryContainer{
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
}
.mainGalleryContainer .mainGallerySidebar{
    flex: 1 1 15%;
    min-width: 200px;
}
.mainGalleryContainer .mainGalleryBody{
    flex: 1 1 85%;
    padding: 1% 5%;
}
.filter{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    width: 100%;
}
.filter >*:nth-child(1){
    flex: 1 1 500px;
    display: flex;
}
.filter >*:nth-child(2){
    flex: 1 1 500px;
}
.search{
    margin: 20px 0 0 30px;
    padding: 10px 10px 10px 50px;
    border: 0;
    border-left: solid 0.5px rgb(196, 196, 196);
    border-radius: 0;
    font-size: 14px;
    font-weight: 300;
}
.mainGallerySidebar{
    background: #F5F5F5;
}
.galleryCollections, .galleryCategory{
  position: relative;
  display: inline-block;
  min-height: 50px;
}
.collectionsButton{
  margin: 20px 0 0 20px;
  background-color: transparent;
  color: rgb(49, 49, 49);
  padding: 16px;
  font-size: 16px;
  font-weight: bolder;
  border: none;
  cursor: pointer;
}

.view{
    margin: 20px 0 0 0;
    padding: 16px 0;
}
.collectionsMenu, .galleryCategories{
  display: none;
  background: transparent;
  min-width: 160px;
  z-index: 1;
    a {
    margin-left: 35px;
    font-size: 15px;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    background: transparent
    }
    a:hover{
        font-weight: 500;
        color: #5FBDC1;
    }
}
.galleryCollections .collectionsMenu.active, .galleryCategory .galleryCategories.active{
    display: block;
}
.arrow1, .arrow2{
    margin-left: 80px;
    width: 12px;
    height: 12px;
    transform: rotate(90deg)
}
.arrow1.active, .arrow2.active{
    transform: rotate(180deg)
}
.galleryContainer{
    display: flex;
    flex-wrap: wrap;
}
.galleryItem{
    flex: 1 1 250px;
    margin: 50px auto 0 auto;
    max-width: 250px;
}
.galleryItem:hover{
    .itemHover{
        display:block;
    }
}
.itemHover{
    position: absolute;
    width: 250px;
    margin-top: -100px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.25);
    display: none;
    padding: 5px;
}
</style>
