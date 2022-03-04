<template>
    <section class="mainGallery">
        <div class="mainGalleryContainer">
            <div class="mainGallerySidebar">
                <div class="galleryCollections">
                  <button class="collectionsButton" v-on:click="showCollections()">Collections <img class="arrow1 active" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                  <div class="collectionsMenu active" v-if="projects">
                    <div v-for="(item, index) in projects" :key="index" class="collectionMenuContainer">
                      <input class="collectionItemRadio" type="radio" :id="item.title" name="radio" :value="index" @click="sortCollection(item)">
                      <label class="collectionItems">{{item.title}}</label>
                    </div>
                  </div>
                </div>
                <hr class="hr"/>
                <!-- <div class="galleryCategory">
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
                <hr class="hr"/> -->
            </div>
            <div class="mainGalleryBody">
                <div class="filter">
                    <div>
                        <p class="view" @click="changeView()">View</p>
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
                        <div>
                          <!-- <button @click="showSquare"> display</button> -->
                        </div>
                    </div>
                        <input class="search" type="text" id="search" name="search" placeholder="Looking for anything in particular ?"><img class="view" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                </div>
                <hr/>
                <div v-if="resultSet && view !== 'squared'" class="galleryGrid">
                  <div v-for="(item, index) in resultSet" :key="index" :id="index">
                    <div v-if="item.image" class="gallery-display" >
                      <img :id="'image' + index" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]"
                       alt="Risidio Gallery" class="gallery-display-img">
                    </div>
                  </div>
                </div>
                <div v-if="resultSet && view == 'squared'" class="gallerySquare">
                  <div v-for="(item, index) in resultSet" :key="index">
                    <div v-if="item.image" class="square-display" >
                      <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
                      <img :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]"
                       alt="Risidio Gallery" class="square-display-img">
                      <div class="rel">
                        <div class="galleryHover">
                          <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                              <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                          <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                        </div>
                      </div>
                      </b-link>
                    </div>
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
      projects: [],
      view: 'squared'
      // placeHolderItems: []
    }
  },
  mounted () {
    // this.generateData()
    this.fetchFullRegistry()
    if (this.projects) {
      this.getImageDimensions()
    }
  },
  updated () {
    if (this.projects) {
      this.getImageDimensions()
    }
    const img = document.getElementById('1')
    const imgWidth = img.clientWidth
    console.log(imgWidth)
  },
  // created () {
  //   if (this.resultset) this.placeImage()
  // },
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
    changeView () {
      if (this.view === 'squared') {
        this.view = 'not-squared'
      } else {
        this.view = 'squared'
      }
    },
    getImageDimensions () {
      for (let i = 0; i < this.projects.length; ++i) {
        const container = document.getElementById(i)
        const imageId = document.getElementById('image' + i)
        const imgWidth = imageId.clientWidth
        const imgHeight = imageId.clientHeight
        console.log(imgWidth)
        console.log('height')
        console.log(imgHeight)
        const dimensions = imgWidth / imgHeight
        let y = 0
        for (let x = 1; x < imgHeight / 10; ++x) {
          y += 10
          if (imgHeight >= y && imgHeight < y + 10) {
            container.classList.add('grid-height-' + x)
          }
          // console.log(y)
        }
        if (dimensions >= 2.8) {
          container.classList.add('grid-length-2')
          console.log(container.classList[0].split('-')[2])
          const currentClass = container.classList[0]
          container.classList.remove(currentClass)
          container.classList.add('grid-height-' + (parseInt(container.classList[0].split('-')[2]) + 7))
          console.log(container.classList)
        } else {
          container.classList.add('grid-length-1')
        }
        // if (imgHeight >= 60 && imgHeight < 90) container.classList.add('grid-height-2')
        // else if (imgHeight >= 90 && imgHeight < 120) container.classList.add('grid-height-3')
        // else if (imgHeight >= 120 && imgHeight < 150) container.classList.add('grid-height-4')
        // else if (imgHeight >= 150 && imgHeight < 180) container.classList.add('grid-height-5')
        // else if (imgHeight >= 180 && imgHeight < 210) container.classList.add('grid-height-6')
        // if (imgWidth > 211) container.classList.add('grid-length-2')
        console.log(container.classList)
      }
    },
    placeImage () {
      console.log('adjustImag')
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
    sortCollection (loopRun) {
      console.log(loopRun)
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: 0,
        pageSize: 28
      }
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        console.log(result)
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.loading = false
      })
    },
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        console.log(projects)
        this.sortCollection(projects[16])
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
      console.log('registry')
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
:root{

  --height: 0;
}
.mainGalleryContainer{
    display: flex;
    flex-wrap: wrap;
    min-height: 500px;
}
.mainGalleryContainer .mainGallerySidebar{
    flex: 1 1 15%;
    min-width: 150px;
    max-width: 250px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.mainGalleryContainer .mainGalleryBody{
    flex: 1 1 85%;
    padding: 10px 50px;
    max-width: 1600px;
    // margin: auto;
}
.gallerySquare{
  position: relative;
display: grid;
display: -ms-grid;
grid-template-columns: repeat(auto-fit, 255px);
-ms-grid-columns: repeat(auto-fit, 255px);
// justify-content: space-between;
justify-content: space-evenly;
row-gap: 40px;
transition: all smooth 2s ease-in-out;
}
.rel{
  position: relative;

}
.galleryHover{
  display: none;
  position: absolute;
  bottom: 0;
  background: #ffffff28 0% 0% no-repeat padding-box;
  box-shadow: 10px 10px 30px #0000002F;
  border-radius: 5px;
  opacity: 1;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 4px 16px;
  .nFTName, .nFTArtist{
    width: 180px;
  }
  .nFTName{font-size: 20px; margin-top: 10px ;span{font-size: 13px;}}
  .nFTArtist{font-size: 13px;}
}

.square-display:hover{
  .galleryHover{
    display: block;
  }
}
.square-display-img{
  width: 211px;
  height: 189px;
  // background-size: cover;
  object-fit: cover;
  // object-fit: scale-down;
  box-shadow: 10px 10px 30px #0000002F;
  border-radius: 5px;
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
  cursor: pointer;
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
.galleryGrid{
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fit, minmax(211px, 1fr));
  grid-auto-rows: 10px;
  align-items: start;
  // justify-items: start;
  // grid-auto-flow: dense;
  // gap: 10px;
}
.galleryGrid >*{
  // border: 1px solid red;
  // margin: 0;
  // padding: 0;
}
.gallery-display{
  overflow: hidden;
  object-fit: contain;
  // padding: 5px;
}
.gallery-display-img{
  padding: 5px;
  display: block;
  width: 100%;
  margin: auto;
}
.grid-length-2{
  grid-column-end: span 2;
}
// .grid-length-3{
//   grid-column-end: span 3;
// }
// .grid-length-4{
//   grid-column-end: span 4;
// }
.grid-height-2{
  grid-row-end: span 3;
}.grid-height-3{
  grid-row-end: span 4;
}.grid-height-4{
  grid-row-end: span 5;
}.grid-height-5{
  grid-row-end: span 6;
}.grid-height-6{
  grid-row-end: span 7;
}.grid-height-7{
  grid-row-end: span 8;
}.grid-height-8{
  grid-row-end: span 9;
}.grid-height-9{
  grid-row-end: span 10;
}.grid-height-10{
  grid-row-end: span 11;
}.grid-height-11{
  grid-row-end: span 12;
}.grid-height-12{
  grid-row-end: span 13;
}.grid-height-13{
  grid-row-end: span 14;
}.grid-height-14{
  grid-row-end: span 15;
}.grid-height-15{
  grid-row-end: span 16;
}.grid-height-16{
  grid-row-end: span 17;
}.grid-height-17{
  grid-row-end: span 18;
}.grid-height-18{
  grid-row-end: span 19;
}.grid-height-19{
  grid-row-end: span 20;
}.grid-height-20{
  grid-row-end: span 21;
}.grid-height-21{
  grid-row-end: span 22;
}.grid-height-22{
  grid-row-end: span 23;
}.grid-height-23{
  grid-row-end: span 24;
}.grid-height-24{
  grid-row-end: span 25;
}.grid-height-25{
  grid-row-end: span 26;
}.grid-height-26{
  grid-row-end: span 27;
}.grid-height-27{
  grid-row-end: span 28;
}.grid-height-28{
  grid-row-end: span 29;
}.grid-height-29{
  grid-row-end: span 30;
}.grid-height-30{
  grid-row-end: span 31;
}.grid-height-31{
  grid-row-end: span 32;
}.grid-height-32{
  grid-row-end: span 33;
}.grid-height-33{
  grid-row-end: span 34;
}.grid-height-34{
  grid-row-end: span 35;
}.grid-height-35{
  grid-row-end: span 36;
}.grid-height-36{
  grid-row-end: span 37;
}.grid-height-37{
  grid-row-end: span 38;
}.grid-height-38{
  grid-row-end: span 39;
}.grid-height-39{
  grid-row-end: span 40;
}.grid-height-40{
  grid-row-end: span 41;
}.grid-height-41{
  grid-row-end: span 42;
}.grid-height-42{
  grid-row-end: span 43;
}.grid-height-43{
  grid-row-end: span 44;
}.grid-height-44{
  grid-row-end: span 45;
}.grid-height-45{
  grid-row-end: span 46;
}.grid-height-46{
  grid-row-end: span 47;
}.grid-height-47{
  grid-row-end: span 48;
}.grid-height-48{
  grid-row-end: span 49;
}.grid-height-49{
  grid-row-end: span 50;
}.grid-height-50{
  grid-row-end: span 51;
}.grid-height-51{
  grid-row-end: span 52;
}.grid-height-52{
  grid-row-end: span 53;
}.grid-height-53{
  grid-row-end: span 54;
}.grid-height-54{
  grid-row-end: span 55;
}
</style>
