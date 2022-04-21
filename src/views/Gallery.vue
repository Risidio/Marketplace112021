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
            </div>
            <div class="mainGalleryBody">
               <div class="filter">
                   <div class="top-elements">
                        <p class="viewcategory" @click="changeView()">View</p>
                       <div> <button class="collectionsButton"> Popular <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button></div>
                        <div class="vl"></div>
                       <div> <button class="collectionsButton"> Sort by <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button></div>
                        <div class="vl"></div>
                        <div>
                          <!-- <button @click="showSquare"> display</button> -->
                       </div>
                    </div>
                    <div class="search-elements">
                        <input class="search" type="text" id="search" name="search" placeholder="Looking for anything in particular ?" @change="searching($event.target.value)">
                        <img class="view" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                      </div>
                    </div>
                <hr class="hr1"/>
                <div v-if="resultSet && view == 'squared' && searched.length == 0" class="gallerySquare">
                  <div v-for="(item, index) in resultSet" :key="index">
                    <div v-if="item.image" class="square-display" >
                      <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
                      <img :src="item.image"
                       alt="Risidio Gallery" class="square-display-img">
                      <div class="rel">
                        <div class="galleryHover">
                          <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                          <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                        </div>
                      </div>
                      </b-link>
                    </div>
                  </div>
                </div>
                <div v-if="resultSet && view == 'squared' && searched.length > 0" class="gallerySquare">
                  <div v-for="(item, index) in searched" :key="index">
                    <div v-if="item.image" class="square-display" >
                      <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
                      <img :src="item.image"
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
            <div class="mobilemainGallery">
              <div class="mobiletop">
                <div>
                  <p class="showFilter" v-on:click="toggleFilter()">Show Filter</p>
                </div>
                <div>
                  <div v-if="filterToggle" class="toggleFilterContainer">
                  <div class="crossIcon">
                    <b-icon v-on:click="toggleFilter()" icon="x" variant="primary"></b-icon>
                  </div>
                   <div class="collectionOption">
                    <button class="filterCollection" v-on:click="toggleCollections()">Collections <img :class="collectionToggle ? 'arrow1 active' : 'arrow1'" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                    <div :class="collectionToggle ? 'collectionsMenuSide active' : 'collectionsMenuSide'">
                      <div v-for="(item, index) in projects" :key="index" class="collectionMenuContainer">
                        <input class="collectionItemRadio" type="radio" :id="item.title" name="radio" :value="index" @click="sortCollection(item)">
                        <label class="collectionItems">{{item.title}}</label>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
                <div class="search-container">
                      <input type="text" placeholder="Looking for anything in particular ?" name="search" @change="searching($event.target.value)" class="mobilesearch">
                      <img class="mobileimage" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                </div>
                <div class="sorting">
                 <div><h1 class="mobileview">View</h1></div>
                  <div>
                    <h2 class="all">All</h2>
                    <img class="mobilearrow1" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg">
                  </div>
                  <div>
                    <h2 class="sort-by">Sort by</h2>
                    <img class="mobilearrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg">
                  </div>
                  <p class="mobilefilter">Filter results</p>
                  <div>
                    <div v-if="grid" v-on:click="changeGrid()" class="gridDisplayOptions">
                      <img  src="../assets/img/gridDisplay.svg">
                      <img  src="../assets/img/normalDisplay.svg">
                    </div>
                    <div v-else v-on:click="changeGrid()" class="gridDisplayOptions">
                      <img src="https://res.cloudinary.com/risidio/image/upload/v1649167477/RisidioMarketplace/imagebar1_px1ppz.png">
                      <img src="https://res.cloudinary.com/risidio/image/upload/v1649167498/RisidioMarketplace/imagebar2_ohxsez.png">
                    </div>
                  </div>
                </div>
              </div>
                <div v-if="resultSet && view == 'squared' && searched.length == 0" class="mobilegallerySquare">
                  <div v-if="!grid">
                    <div v-for="(item, index) in resultSet" :key="index">
                      <div v-if="item.image" class="mobile-square-display" >
                        <b-link class="mobilegalleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
                        <div>
                          <img :src="item.image"
                            alt="Risidio Gallery" class="mobile-square-display-img">
                        </div>
                          <h2 class="artwork">{{!item.name ? "NFT" : item.name }}</h2>
                          <p class="mobilenFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                          <div class="price">
                          <p >{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</p>
                          </div>
                        </b-link>
                      </div>
                    </div>
                  </div>
                  <div v-else  class="imageGrid">
                    <div v-for="(item, index) in resultSet" :key="index">
                      <div>
                        <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
                        <img :src="item.image" alt="Risidio Gallery" class="mobile-square-display-img">
                        </b-link>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'

export default {
  name: 'Gallery',
  components: {
  },
  data () {
    return {
      resultSet: [],
      loaded: true,
      currentRunKey: 'numberone_roots',
      types: 'all',
      numberOfItems: null,
      projects: [],
      view: 'squared',
      searched: [],
      grid: false,
      filterToggle: true,
      collectionToggle: false
    }
  },
  mounted () {
    this.fetchFullRegistry()
    if (JSON.parse(localStorage.getItem('gridPrefrence')) === true) {
      this.grid = true
    } else {
      this.grid = false
    }
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
    searching (input) {
      const result = this.resultSet.filter((searchItem) => searchItem.name.includes(input))
      this.searched = result
    },
    showCollections () {
      const collection = document.getElementsByClassName('collectionsMenu')[0]
      const arrow = document.getElementsByClassName('arrow1')[0]
      collection.classList.toggle('active')
      arrow.classList.toggle('active')
    },
    toggleCollections () {
      this.collectionToggle = !this.collectionToggle
    },
    showCategories () {
      const categories = document.getElementsByClassName('galleryCategories')[0]
      const arrow = document.getElementsByClassName('arrow2')[0]
      categories.classList.toggle('active')
      arrow.classList.toggle('active')
    },
    sortCollection (loopRun) {
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: 0,
        pageSize: 28
      }
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.loading = false
      })
      this.filterToggle = !this.filterToggle
    },
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        this.sortCollection(projects.find((project) => project.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.loopbomb-stx-t1'))
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
    },
    setCurrentRunKey (result) {
      this.currentRunKey = result
    },
    changeGrid () {
      this.grid = !this.grid
      localStorage.setItem('gridPrefrence', JSON.stringify(this.grid))
    },
    toggleFilter () {
      this.filterToggle = !this.filterToggle
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
.vl {
  border-left: 1.5px solid rgb(203, 204, 203);
  height: 30px;
  margin-top: 30px;
  margin-left: 12px;
}
.mobilemainGallery {
  width: 100%;
  max-width: 800px;
  padding: 0 10px;
}
.mobile-square-display {
  min-width: 222px;
  height: 156px;
  background-color: #e4e4e4;
  justify-content: space-evenly;
  margin-top: 40px;
  z-index: -10;
  border-radius: 10px;
  // margin-left: 25px;
}
.mobilegallerySquare {
  max-width: 800px;
  justify-content: space-evenly;
  row-gap: 40px;
}
.mobile-square-display-img {
  width: 193px;
  height: 179px;
  z-index: 10;
  margin-top: -10px;
  border-radius: 8%;
  object-fit: cover;
}
.imageGrid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 35px;
  gap: 15px;
  img {
    width: 100px;
    height: 100px;
    &:hover {
      transition: 0.5s ease-in-out;
      transform: scale(1.1);
    }
  }
}
.toggleFilterContainer {
  position: absolute;
  top: 100px;
  left: 0px;
  z-index: 19;
  background: #f5f5f5;
  width: 245px;
  height: 801px;
  padding: 20px;
}
.collectionsMenuSide {
  display: none;
}
.collectionsMenuSide.active {
  display: block;
  div {
    font-weight: 400;
    padding: 3px 0px 0px 10px;
    font-size: 12px;
  }
}
.crossIcon {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  cursor: pointer;
}
.artwork {
  margin-left: 220px;
  font-size: 20px;
  margin-top: -130px;
}
.mobilenFTArtist {
  margin-left: 220px;
  margin-top: -10px;
}
.mobilesearch {
  width: 100%;
  // margin: 20px auto 0 auto;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 25px;
  border: 2px solid #f5f2f2;
  font-size: 12px;
  font-weight: 450;
}
.mobileimage {
  z-index: 10;
  margin-left: 305px;
  margin-top: -45px;
}
.mobiletop {
  margin-top: 10px;
}
.search-container {
  display: grid;
  place-items: center;
  margin: 10px 10px;
}
.sorting {
  margin-top: -20px;
}
.sort-by {
  margin-top: -60px;
  margin-left: 210px;
  font-size: 13px;
  font-weight: 700;
}
.mobileview {
  font-size: 13px;
  margin-top: 30px;
  margin-left: 20px;
}
.all {
  font-size: 13px;
  margin-top: -15px;
  margin-left: 80px;
  font-weight: 700;
}
.mobilearrow1 {
  margin-left: 150px;
  margin-top: -75px;
  transform: rotate(180deg);
}
.mobilearrow2 {
  margin-left: 310px;
  margin-top: -75px;
  transform: rotate(180deg);
}
.mobilefilter {
  font-size: 13px;
  font-weight: 800;
  color: #5fbdc1;
  margin-top: -20px;
  text-align: right;
}
.showFilter {
  font-size: 13px;
  font-weight: 800;
  color: #5fbdc1;
  cursor: pointer;
}
.gridDisplayOptions {
  display: flex;
  justify-content: space-between;
  width: 40px;
  cursor: pointer;
}
.mobilenFTArtist span {
  font-size: 14px;
  font-weight: 600;
  margin-top: -10px;
}
.price p {
  margin-left: 220px;
  font-size: 14px;
}
@media only screen and (min-width: 595px) {
  .mobilemainGallery {
    display: none;
  }
}
@media only screen and (max-width: 595px) {
  .mainGalleryBody {
    display: none;
  }
  .mainGallerySidebar {
    display: none;
  }
  .mainGalleryContainer {
    display: none;
  }
}
@media only screen and (max-width: 795px) {
  .vl {
    display: none;
  }
  .view {
    margin-left: 0px;
  }
  .top-elements {
    max-width: 100px;
  }
  .arrow2 {
    margin-left: -80px;
  }
  .mainGallery {
    margin-bottom: 100px;
  }
}
@media only screen and (max-width: 1000px) {
  .search {
    max-width: 420px;
  }
}
@media only screen and (max-width: 793px) {
  .search {
    max-width: 320px;
  }
}
@media only screen and (max-width: 695px) {
  .search {
    max-width: 220px;
  }
}
@media only screen and (max-width: 450px){
  .artwork{
    font-size: 12px;
  }
  .mobilenFTArtist{
    font-size: 12px;
  }
  .mobilenFTArtist span{
    font-size: 12px;
  }
  .price p{
    font-size: 12px;
  }
}
@media only screen and (max-width: 365px){
  .mobileimage{
    margin-left: 200px;
    //margin-right: 20px;
  }
  .mobilearrow1{
   margin-left: 120px;
  }
  .mobilearrow2{
  margin-left: 275px;
  }
}
@media only screen and (max-width: 320px){
 .mobilenFTArtist span{
    font-size: 10px;
  }
  .sort-by{
    margin-left: 150px;
  }
  .mobilearrow2{
  margin-left: 215px;
  }
}
:root {
  --height: 0;
}
.mainGalleryContainer {
  display: flex;
  flex-wrap: wrap;
  min-height: 500px;
}
.mainGalleryContainer .mainGallerySidebar {
  flex: 1 1 15%;
  min-width: 200px;
  max-width: 250px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.mainGalleryContainer .mainGalleryBody {
  flex: 1 1 65%;
  padding: 10px 50px;
  max-width: 1600px;
  // margin: auto;
}
.gallerySquare {
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
.rel {
  position: relative;
}
.galleryHover {
  display: none;
  position: absolute;
  bottom: 0;
  background: #ffffff28 0% 0% no-repeat padding-box;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
  opacity: 1;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 4px 16px;
  .nFTName,
  .nFTArtist {
    width: 180px;
  }
  .nFTName {
    font-size: 20px;
    margin-top: 10px;
    span {
      font-size: 13px;
    }
  }
  .nFTArtist {
    font-size: 13px;
  }
}

.square-display:hover {
  .galleryHover {
    display: block;
  }
}
.square-display-img {
  width: 211px;
  height: 189px;
  // background-size: cover;
  object-fit: cover;
  // object-fit: scale-down;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
}
.search-elements {
  margin-top: -40px;
}
.top-elements {
  max-width: 440px;
  display: flex;
}
.search-elements {
  min-width: 200px;
  display: flex;
  place-items: center;
  margin: 10px 10px;
}
.search {
  min-width: 220px;
  width: 600px;
  height: 50px;
  margin-top: 10px;
  margin-left: 10px;
  //padding-left: 50px;
  //margin-right: 70px;
  //padding-left: 100px;
  padding-right: 5px;
  //padding-top: 10px;
  padding-bottom: 5px;
  border: 0px;
  //border-radius: 25px;
  //border:2px solid #f5f2f2;
  font-size: 12px;
  font-weight: 450;
  text-align: left;
  //z-index: 10;
}
.view {
  margin-left: 20px;
  margin-top: 10px;
}
.search:active,
.search:focus {
  outline: none;
}
.mainGallerySidebar {
  background: #f5f5f5;
}
.galleryCollections,
.galleryCategory {
  position: relative;
  display: inline-block;
  min-height: 50px;
}
.collectionsButton {
  margin: 20px 0 0 15px;
  background-color: transparent;
  color: rgb(49, 49, 49);
  padding: 16px;
  font: normal normal 600 14px/18px Montserrat;
  border: none;
  cursor: pointer;
}
.filterCollection {
  background-color: transparent;
  color: rgb(49, 49, 49);
  font: normal normal 600 14px/18px Montserrat;
  border: none;
  cursor: pointer;
}
.collectionOption {
  border-top: 1px lightgray solid;
}
.filter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.viewcategory {
  margin-top: 32px;
  margin-left: 28px;
}
.collectionsMenu,
.galleryCategories {
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
    background: transparent;
  }
  a:hover {
    font-weight: 500;
    color: #5fbdc1;
  }
}
.galleryCollections .collectionsMenu.active,
.galleryCategory .galleryCategories.active {
  display: block;
}
.arrow1,
.arrow2 {
  margin-left: 50px;
  width: 12px;
  height: 12px;
  transform: rotate(180deg);
}
.arrow1.active,
.arrow2.active {
  transform: rotate(360deg);
}
.galleryContainer {
  display: flex;
  flex-wrap: wrap;
}

.itemHover {
  position: absolute;
  width: 250px;
  margin-top: -100px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.25);
  display: none;
  padding: 5px;
}
.collectionMenuContainer {
  display: flex;
  align-items: center;
}
.collectionItemRadio {
  width: 20px;
  height: 20px;
  border: none;
  margin-left: 30px;
  margin-right: 10px;
  border-radius: 50%;
  // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.collectionMenuContainer .collectionItems {
  margin-top: 5px;
  font-size: 11px;
}
.galleryGrid {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fit, minmax(211px, 1fr));
  grid-auto-rows: 10px;
  align-items: start;
}
.gallery-display {
  overflow: hidden;
  object-fit: contain;
}
.gallery-display-img {
  padding: 5px;
  display: block;
  width: 100%;
  margin: auto;
}
</style>
