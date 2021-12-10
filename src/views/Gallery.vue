<template>
    <section class="mainGallery">
        <div class="mainGalleryContainer">
            <div class="mainGallerySidebar">
                <div class="galleryCollections">
                    <button class="collectionsButton" v-on:click="showCollections()">Collections <img class="arrow1" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                    <div class="collectionsMenu">
                        <div class="ml-5">
                          <CollectionSidebar :allowUploads="false" @update="update"/>
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
                        <input class="search" type="text" id="search" name="search" placeholder="Looking for anything in particular ?"><img class="view" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                </div>
                <hr/>
                    <div style="width: 100%" v-if="loaded && types=='all'">
                          <!-- <h1 class="text-black">NFT Gallery</h1> -->
                          <div style=" display: flex; width: 100%; margin:auto;" class="row mb-4">
                              <div class="text-black col-lg-3 col-md-4 col-sm-6 col-xs-12 mx-0 p-1" v-for="(item, index) in gaiaAssets" :key="index">
                                  <GalleryNft :item="item"/>
                              </div>
                          </div>
                      </div>
                        <div style="width: 100%" v-if="loaded && types !='all'">
                          <!-- <h1 class="text-black">NFT Gallery</h1> -->
                          <div style=" display: flex; width: 100%; margin:auto;" class="row mb-4">
                              <div class="text-black col-lg-3 col-md-4 col-sm-6 col-xs-12 mx-0 p-1" v-for="(item, index) in showAssets" :key="index">
                                  <GalleryNft :item="item"/>
                              </div>
                          </div>
                      <div class="container" style="min-height: 85vh;" v-if="loaded && types=='all' && gaiaAssets.length === 0">
                            <b-container class="text-black mt-5">
                                <h1>No Gallery NFTs</h1>
                                <p>Our Gallery is coming online soon - please come back soon...</p>
                            </b-container>
                        </div>
                      </div>
                      <div style="width: 100%" v-if="loaded && types !='all' && types=='img' && showAssets.length === 0">
                         <h2> We could not find any images</h2>
                      </div>
                      <div style="width: 100%" v-if="loaded && types !='all' && types=='aud' && showAssets.length === 0">
                         <h2> We could not find any audio files</h2>
                      </div>
                      <div style="width: 100%" v-if="loaded && types !='all' && types=='vid' && showAssets.length === 0">
                         <h2> We could not find any video files</h2>
                      </div>
                      <div style="width: 100%" v-if="loaded && types !='all' && types=='3d' && showAssets.length === 0">
                         <h2> We could not find any 3D asset files</h2>
                      </div>
                      <div style="width: 100%" v-if="loaded && types !='all' && types=='doc' && showAssets.length === 0">
                         <h2> We could not find any documents </h2>
                      </div>
                      <!-- <div class="container" style="min-height: 85vh;" v-else-if="">
                          <b-container class="text-black mt-5">
                              <h1>No Gallery NFTs</h1>
                              <p>Our Gallery is coming online soon - please come back soon...</p>
                          </b-container>
                      </div> -->
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
import GalleryNft from '@/views/marketplace/components/gallery/GalleryNft'
import CollectionSidebar from '@/views/marketplace/components/gallery/CollectionSidebar'
export default {
  name: 'Gallery',
  components: {
    GalleryNft,
    CollectionSidebar
  },
  data () {
    return {
      resultSet: [],
      loaded: true,
      currentRunKey: 'launch_collection_t1',
      types: 'all',
      showAssets: this.gaiaAssets
      // placeHolderItems: []
    }
  },
  mounted () {
    // this.generateData()
    this.fetchCollections()
    this.findAssets()
  },
  methods: {
    update (data) {
      if (data.opcode === 'show-uploads') {
        this.showUploads = true
      } else if (data.opcode === 'show-collection') {
        this.showUploads = false
        this.loopRun = data.loopRun
        if (this.$route.path !== '/nft-marketplace/' + data.loopRun.makerUrlKey + '/' + data.loopRun.currentRunKey) {
          this.$router.push('/nft-marketplace/' + data.loopRun.makerUrlKey + '/' + data.loopRun.currentRunKey)
        }
      }
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
    fetchCollections () {
      const data = {
        runKey: (this.currentRunKey === null) ? 'launch_collection_t1' : this.currentRunKey
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractIdAndRunKey', data).then((result) => {
        this.resultSet = result.gaiaAssets
      })
    },
    setCurrentRunKey (result) {
      this.currentRunKey = result
    },
    setCategories (type) {
      this.types = type
      if (type === 'img') {
        this.showAssets = this.gaiaImageAssets
      } else if (type === 'aud') {
        this.showAssets = this.gaiaAudioAssets
      } else if (type === 'vid') {
        this.showAssets = this.gaiaVideoAssets
      } else if (type === '3d') {
        this.showAssets = this.gaiaThreeDAssets
      } else if (type === 'doc') {
        this.showAssets = this.gaiaDocAssets
      } else {
        this.showAssets = this.gaiaAssets
      }
      console.log(this.types)
    }
  },
  computed: {
    gaiaAssets () {
      const assets = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSETS]
      return (assets) ? assets.reverse() : []
    },
    gaiaImageAssets () {
      const gaiaImageAssets = this.gaiaAssets.filter(assets => assets.attributes.artworkFile.type.includes('image'))
      return gaiaImageAssets
    },
    gaiaAudioAssets () {
      const gaiaAudioAssets = this.gaiaAssets.filter(assets => assets.attributes.artworkFile.type.includes('audio'))
      return gaiaAudioAssets
    },
    gaiaVideoAssets () {
      const gaiaVideoAssets = this.gaiaAssets.filter(assets => assets.attributes.artworkFile.type.includes('video'))
      return gaiaVideoAssets
    },
    gaiaThreeDAssets () {
      const gaiaThreeDAssets = this.gaiaAssets.filter(assets => assets.attributes.artworkFile.type.includes('threed'))
      return gaiaThreeDAssets
    },
    gaiaDocAssets () {
      const gaiaDocAssets = this.gaiaAssets.filter(assets => assets.attributes.artworkFile.type.includes('application'))
      return gaiaDocAssets
    },
    selectCollection () {
      const collections = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS]
      return collections
    }
  }
}
</script>

<style lang="scss" scoped>
.mainGalleryContainer{
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
}
.mainGalleryContainer .mainGallerySidebar{
    flex: 1 1 15%;
    min-width: 200px;
    max-width: 400px;
}
.mainGalleryContainer .mainGalleryBody{
    flex: 1 1 85%;
    padding: 10px 70px;
    max-width: 1800px;
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
  margin: 20px 0 0 10px;
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
