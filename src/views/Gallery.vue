<template>
    <section class="mainGallery">
        <div class="mainGalleryContainer">
            <div class="mainGallerySidebar">
                <div class="galleryCollections">
                  <button class="collectionsButton" v-on:click="showCollections()">Collections <img class="arrow1" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                  <div class="collectionsMenu" v-if="projects">
                    <div v-for="(item, index) in projects" :key="index" class="collectionMenuContainer">
                      <input class="collectionItemRadio" type="radio" :id="item.title" name="radio" :value="index" @click="sortCollection(item)">
                      <label class="collectionItems">{{item.title}}</label>
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
                <div v-if="resultSet">
                  <div v-for="(item, index) in resultSet" :key="index" style="display: flex; " >
                    <div v-if="item.image" :src="item.image"><img :src="item.image" style="max-width: 500px;"/></div>
                  </div>
                </div>
              </div>
        </div>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import GalleryNft from '@/views/marketplace/components/gallery/GalleryNft'
import CollectionSidebar from '@/views/marketplace/components/gallery/CollectionSidebar'
import utils from '@/services/utils'

export default {
  name: 'Gallery',
  components: {
    // GalleryNft,
    // CollectionSidebar
  },
  data () {
    return {
      resultSet: [],
      loaded: true,
      currentRunKey: 'launch_collection_t1',
      types: 'all',
      numberOfItems: null,
      projects: []
      // placeHolderItems: []
    }
  },
  mounted () {
    // this.generateData()
    this.fetchFullRegistry()
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
      console.log('click')
    },
    findAssets () {
      this.$store.dispatch('rpayStacksContractStore/fetchContractDataFirstEditions').then(() => {
        this.loaded = true
      })
    },
    sortCollection (loopRun) {
      console.log(loopRun)
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: 0,
        pageSize: 20
      }
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        console.log(result)
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.loading = false
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
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        console.log(projects)
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
    },
    setCurrentRunKey (result) {
      this.currentRunKey = result
    }
  },
  computed: {
    allLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS]
      return loopRuns
    },
    application () {
      const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID]('ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.test_collections9')
      return application
    }
  }
}
</script>

<style lang="scss" scoped>
.mainGalleryContainer{
    display: flex;
    flex-wrap: wrap;
    min-height: 500px;
}
.mainGalleryContainer .mainGallerySidebar{
    flex: 1 1 15%;
    min-width: 150px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.mainGalleryContainer .mainGalleryBody{
    flex: 1 1 85%;
    padding: 10px 70px;
    max-width: 1400px;
    // margin: auto;
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
  padding: 5px 10px 5px 50px;
  border: 0;
  border-left: solid 0.5px rgb(196, 196, 196);
  border-radius: 0;
  font: normal normal 300 13px/16px Montserrat;
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
  font: normal normal 600 14px/18px Montserrat;
  border: none;
  cursor: pointer;
}

.view{
  font: normal normal 300 13px/16px Montserrat;
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
.collectionMenuContainer{
  display: flex;
  align-items: center;
}
.collectionItemRadio{
  width: 20px;
  height: 20px;
  border: none;
  margin-left: 30px;
  margin-right: 10px;
  border-radius: 50%;
  // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.collectionMenuContainer .collectionItems{
  margin-top: 5px;
  font-size: 11px;
}
</style>
