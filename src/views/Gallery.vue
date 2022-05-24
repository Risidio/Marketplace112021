<template>
    <section class="mainGallery">
    <div v-on:click="toggleFilter()" :class="isLayer ? 'overlay' : ''"></div>
        <div class="mainGalleryContainer">
            <div class="mainGallerySidebar">
                <div class="galleryCollections">
                  <h1 class="collectionsButton" v-on:click="showCollections()">Collections <img class="arrow1 active" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></h1>
                  <div class="collectionsMenu active" v-if="allLoopRuns">
                    <div class="collectionMenuContainer">
                      <h2 style="margin: 0;"><router-link :to="'/nft-marketplace/all/0'">All</router-link></h2>
                    </div>
                    <div v-for="(item, index) in allLoopRuns" :key="index" class="collectionMenuContainer">
                      <h2 style="margin: 0;"><router-link :to="'/nft-marketplace/' + item.contractId + '/0'">{{item.currentRun}}</router-link></h2>
                    </div>
                  </div>
                </div>
                <hr class="hr"/>
            </div>
            <div class="mainGalleryBody">
               <div class="filter">
                   <div class="top-elements">
                    <p class="viewcategory">View</p>
                      <div class="dropdown_option_container" ref="popularMenu"> <button class="collectionsButton" @click="popular = !popular, arrow2on = !arrow2on"> Popular <img :class="arrow2on ? 'arrow1 active' : 'arrow1'" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                        <div @click="popular = false" v-show="popular" class="dropdown_option_show" >
                          <p @click="filter()" class="dropdown_option" value="All">Most Popular<span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Least Popular<span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Recent <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Old <span class="blue"></span></p>
                        </div>
                      </div>
                      <div class="dropdown_option_container" ref="sortMenu"> <button class="collectionsButton" @click="sort = !sort, arrow3on = !arrow3on"> Sort by <img :class="arrow3on ? 'arrow1 active' : 'arrow1'" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                        <div @click="sort = false" v-show="sort" class="dropdown_option_show" >
                          <p @click="filter()" class="dropdown_option" value="All">Price: Low to High <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Price: High to Low <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Alphabetical: A-Z <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Alphabetical: Z-A <span class="blue"></span></p>
                        </div>
                      </div>
                    </div>
                    <div class="search-elements">
                        <input class="search" type="text" id="search" name="search" placeholder="Looking for anything in particular ?" :value="currentSearch"  @change="searching($event.target.value)">
                        <img class="view" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                      </div>
                    </div>
                <hr class="hr1"/>
                  <div v-if="resultSet && view == 'squared' && searched.length == 0 && !loading">
                    <p>{{error}}</p>
                    <SquareNFT :resultSet="resultSet"/>
                    <Pagination :pageSize="pageSize" :numberOfItems="numberOfItems"/>
                  </div>
                  <div v-if="resultSet && view == 'squared' && searched.length > 0 && !loading">
                    <SquareNFT :resultSet="searched"/>
                    <Pagination :pageSize="pageSize" :numberOfItems="numberOfItems"/>
                  </div>
                <div style="display: grid; place-items: center;" v-else-if="loading">
                  <img :src="loadingImage" alt="loading" />
                    <p> loading...</p>
                  </div>
                </div>
              </div>
            <div class="mobilemainGallery">
              <div class="mobiletop">
                <div class="search-container">
                  <input type="text" placeholder="Looking for anything in particular ?" name="search" :value="currentSearch" @change="searching($event.target.value)" class="mobilesearch">
                  <img class="mobileimage" src="https://res.cloudinary.com/risidio/image/upload/v1637238428/RisidioMarketplace/magnifying-search-lenses-tool_yaatpo.svg">
                </div>
                <div>
                 <div><h1 class="mobileview">View</h1></div>
                     <div class="dropdown_option_containerM" ref="allMenu"> <button class="collectionsButtonM" @click="all = !all, arrow4on = !arrow4on"> Popular <img :class="arrow4on ? 'arrow1 active' : 'arrow1'" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                        <div @click="all = false" v-show="all" class="dropdown_option_showM" >
                          <p @click="filter()" class="dropdown_option" value="All">Most Popular<span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Least Popular<span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Recent <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Old <span class="blue"></span></p>
                        </div>
                      </div>
                     <div class="dropdown_option_containerM" ref="sortMMenu"> <button class="collectionsButtonM" @click="sortM = !sortM, arrow5on = !arrow5on"> Sort by <img :class="arrow5on ? 'arrow1 active' : 'arrow1'" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></button>
                        <div @click="sortM = false" v-show="sortM" class="dropdown_option_showM" >
                          <p @click="filter()" class="dropdown_option" value="All">Price: Low to High <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Price: High to Low <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Alphabetical: A-Z <span class="blue"></span></p>
                          <p @click="filter()" class="dropdown_option" value="Category">Alphabetical: Z-A <span class="blue"></span></p>
                        </div>
                      </div>
                   </div>
                  <div class="filterResultsContainer">
                    <div v-if="grid" v-on:click="changeGrid()" class="gridDisplayOptions">
                      <img  src="../assets/img/gridDisplay.svg">
                      <img  src="../assets/img/normalDisplay.svg">
                    </div>
                    <div v-else v-on:click="changeGrid()" class="gridDisplayOptions">
                      <img src="https://res.cloudinary.com/risidio/image/upload/v1649167477/RisidioMarketplace/imagebar1_px1ppz.png">
                      <img src="https://res.cloudinary.com/risidio/image/upload/v1649167498/RisidioMarketplace/imagebar2_ohxsez.png">
                    </div>
                    <span class="mobilefilter"  v-on:click="toggleFilter()">Filter results</span>
                </div>
                 <div>
                  <div v-if="filterToggle" class="toggleFilterContainer">
                  <div class="crossIcon">
                    <b-icon v-on:click="toggleFilter()" icon="x" variant="primary"></b-icon>
                  </div>
                   <div class="collectionOption">
                    <h2 class="filterCollection" v-on:click="toggleCollections()">Collections <img :class="collectionToggle ? 'arrow1 active' : 'arrow1'" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></h2>
                    <div :class="collectionToggle ? 'collectionsMenuSide active' : 'collectionsMenuSide'">
                      <div class="collectionMenuContainer" v-on:click="toggleFilter()">
                        <h3 style="margin: 0;"><router-link :to="'/nft-marketplace/all/0'">All</router-link></h3>
                      </div>
                      <div v-for="(item, index) in allLoopRuns" :key="index" class="collectionMenuContainer" v-on:click="toggleFilter()">
                        <h3 style="margin: 0;"><router-link :to="'/nft-marketplace/' + item.contractId + '/0'">{{item.currentRun}}</router-link></h3>
                      </div>
                    </div>
                  </div>
                 </div>
                </div>
            </div>
               <div v-if="resultSet && view == 'squared' && searched.length == 0" class="mobilegallerySquare">
                  <div v-if="!grid">
                    <MobileNFT :resultSet="resultSet"/>
                  </div>
                  <div v-else  class="imageGrid">
                    <div v-for="(item, index) in resultSet" :key="index">
                      <div class="MobileNFTG">
                        <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
                        <img :src="item.image || errorImage" v-on:error="errorImage" alt="Risidio Gallery" class="mobile-square-display-img" loading="lazy">
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
import utils from '@/services/utils'
import MobileNFT from '../components/smallcomponents/MobileNFT.vue'
import SquareNFT from '@/components/smallcomponents/SquareNFT.vue'
import Pagination from '@/components/smallcomponents/Pagination.vue'
import loadingImage from '@/assets/img/loading-risid.gif'
import errorImage from '@/assets/img/sticksnstones_logo.png'

export default {
  name: 'Gallery',
  components: {
    MobileNFT,
    SquareNFT,
    Pagination
  },
  data () {
    return {
      errorImage: errorImage,
      resultSet: [],
      loadingImage: loadingImage,
      loaded: true,
      currentRunKey: 'numberone_roots',
      types: 'all',
      numberOfItems: null,
      projects: [],
      thisEvent: 'hi',
      view: 'squared',
      searched: [],
      popular: false,
      sort: false,
      sortM: false,
      all: false,
      grid: false,
      filterToggle: false,
      collectionToggle: false,
      fetched: null,
      defQuery: {
        query: null,
        allCollections: 'one',
        onSale: false,
        onAuction: false,
        editions: false,
        createdBefore: null,
        createdAfter: null,
        sortField: 'name',
        sortDir: 'sortDown'
      },
      currentSearch: null,
      pageSize: 50,
      loading: true,
      error: '',
      isLayer: false,
      arrow2on: false,
      arrow3on: false,
      arrow4on: false,
      arrow5on: false
    }
  },
  watch: {
    '$route' () {
      if (this.$route.params.title === 'all') {
        this.fetchAll()
      } else {
        this.fetchFullRegistry()
      }
    },
    'fetched' () {
      if (this.currentSearch) this.searching(this.currentSearch)
    },
    'thisEvent' () {
      this.close(this.thisEvent)
    }
  },
  async mounted () {
    const $self = this
    window.addEventListener('click', function (e) {
      $self.close(e)
    })
    await this.fetchFullRegistry()
    if (JSON.parse(localStorage.getItem('gridPrefrence')) === true) {
      this.grid = true
    } else {
      this.grid = false
    }
    this.currentSearch = this.$store.getters['contentStore/getSearch']
    if (this.$route.params.title === 'all') {
      this.fetchAll()
    } else {
      this.fetchFullRegistry()
    }
    // const content = this.$store.getters['contentStore/getSearch']
    // if (content) this.searching(content)
  },
  methods: {
    close (e) {
      if (this.$refs) {
        if (!this.$refs?.popularMenu?.contains(e.target)) this.popular = false
        if (!this.$refs?.sortMenu?.contains(e.target)) this.sort = false
        if (!this.$refs?.allMenu?.contains(e.target)) this.all = false
        if (!this.$refs?.sortMMenu?.contains(e.target)) this.sortM = false
      }
    },
    searching (query) {
      this.$store.state.contentStore.content.searchWord = query
      this.loading = true
      this.$router.push('/nft-marketplace/' + 'all' + '/0')
      this.error = ''
      this.currentSearch = query
      this.defQuery.query = query
      let queryStr = '?'
      if (this.defQuery.query) queryStr += 'sortDir=' + this.defQuery.sortDir + '&'
      if (this.defQuery.query) queryStr += 'query=' + this.defQuery.query + '&'
      if (this.defQuery.edition) queryStr += 'edition=' + this.defQuery.edition + '&'
      if (this.defQuery.onSale) queryStr += 'onSale=true&'
      if (this.defQuery.claims) queryStr += 'claims=' + this.defQuery.claims + '&'
      if (this.defQuery.editions) queryStr += 'editions=true&'
      if (this.defQuery.sortField) queryStr += 'sortField=' + this.defQuery.sortField + '&'
      const data = {
        // runKey: (this.loopRun) ? this.loopRun.currentRunKey : null,
        query: queryStr,
        page: 0,
        pageSize: this.pageSize
      }
      this.resultSet = []
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByFilters', data).then((result) => {
        this.resultSet = result.gaiaAssets
        this.tokenCount = result.tokenCount
        this.numberOfItems = result.tokenCount
        this.loading = false
      }).catch((error) => {
        const data = {
          // runKey: (this.loopRun) ? this.loopRun.currentRunKey : null,
          // query: queryStr,
          page: this.$route.params.page,
          pageSize: this.pageSize
        }
        this.$store.dispatch('rpayStacksContractStore/fetchTokensByFilters', data).then((result) => {
          this.resultSet = result.gaiaAssets
          this.tokenCount = result.tokenCount
          this.numberOfItems = result.tokenCount
          this.loading = false
        })
        console.log(error)
        this.error = 'Could not find anything matching your search word ' + query
      })
    },
    filter () {
      this.popular = false
      this.sort = false
      this.all = false
      this.sortM = false
    },
    fetchAll () {
      const data = {
        page: this.$route.params.page,
        pageSize: this.pageSize
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByFilters', data).then((result) => {
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.loading = false
        console.log(this.resultSet)
      })
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
    sortCollection () {
      this.loading = true
      const data = {
        contractId: this.$route.params.title,
        asc: true,
        runKey: null,
        page: this.$route.params.page,
        pageSize: this.pageSize
      }
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.loading = false
        this.fetched = 1
      })
    },
    fetchFullRegistry () {
      const $self = this
      this.sortCollection()
      $self.projects.forEach((p) => {
        const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
        p.application = application
      })
      $self.loaded = true
      // this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', 'active').then((projects) => {
      //   $self.projects = utils.sortResults(projects)
    },
    setCurrentRunKey (result) {
      this.currentRunKey = result
    },
    changeGrid () {
      this.grid = !this.grid
      localStorage.setItem('gridPrefrence', JSON.stringify(this.grid))
    },
    toggleFilter () {
      console.log('toggled')
      const body = document.getElementsByTagName('body')[0]
      body.classList.toggle('stop-scrolling')
      this.filterToggle = !this.filterToggle
      this.isLayer = !this.isLayer
    }
  },
  computed: {
    allLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS].filter((loopRun) => loopRun.status === 'active')
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
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(3, 3, 3, 0.56);
  z-index: 19;
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
.MobileNFTG {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
  bottom: 0;
  z-index: 19;
  background: #f5f5f5;
  height: 100vh;
  width: 245px;
  height: 121;
  padding: 20px;
}
.filterResultsContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
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
  a {
    color: black;
    padding: 12px 0px;
    text-decoration: none;
    display: block;
    background: transparent;
    font-size: 11px;
  }
  a:hover,
  a:active,
  a:focus,
  .router-link-active {
    font-weight: 500;
    color: #5fbdc1;
    text-decoration: underline;
  }
}
.crossIcon {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  cursor: pointer;
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
  padding-top: 10px;
}
.search-container {
  display: grid;
  place-items: center;
  padding: 10px 10px;
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
  cursor: pointer;
}
.blue {
  color: #5fbdc1;
  font-weight: bolder;
}
.gridDisplayOptions {
  display: flex;
  justify-content: space-between;
  width: 40px;
  cursor: pointer;
}
.router-link-exact-active {
  text-decoration: underline;
  color: #50b1b5;
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
.dropdown_option_containerM {
  position: relative;
  display: inline-block;
  top: -25px;
  left: 25px;
}
.dropdown_option_container {
  position: relative;
  display: inline-block;
}
.dropdown_option_show {
  position: absolute;
  z-index: 10;
  top: 60px;
  left: 30px;
  width: 100%;
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  text-align: left;
  p {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #5fbdc1;
    }
  }
}
.dropdown_option_showM {
  position: absolute;
  z-index: 10;
  top: 30px;
  left: 30px;
  width: 100%;
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  text-align: left;
  p {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
      color: #5fbdc1;
    }
  }
}
.dropdown_option {
  padding: 5px;
  background: #ffffff;
  margin: 1px;
  z-index: 10;
  font-size: 1.2rem;
}
.dropdown_option1 {
  padding: 5px;
  background: #ffffff;
  margin: 1px;
  transition: 0.3s;
  z-index: 10;
  font-size: 1.2rem;
  text-align: center;
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
@media only screen and (max-width: 450px) {
  .artwork {
    font-size: 12px;
  }
  .mobilenFTArtist {
    font-size: 12px;
  }
  .mobilenFTArtist span {
    font-size: 12px;
  }
  .price p {
    font-size: 12px;
  }
}
@media only screen and (max-width: 365px) {
  .mobileimage {
    margin-left: 200px;
    //margin-right: 20px;
  }
  .mobilearrow1 {
    margin-left: 120px;
  }
  .mobilearrow2 {
    margin-left: 275px;
  }
}
@media only screen and (max-width: 320px) {
  .mobilenFTArtist span {
    font-size: 10px;
  }
  .sort-by {
    margin-left: 150px;
  }
  .mobilearrow2 {
    margin-left: 215px;
  }
}
:root {
  --height: 0;
  grid-template-columns: repeat(auto-fit, 255px);
  -ms-grid-columns: repeat(auto-fit, 255px);
  // justify-content: space-between;
}
.mainGalleryContainer {
  display: flex;
  min-height: 500px;
}
@media only screen and (max-width: 600px) {
  .mainGalleryContainer {
    display: none;
    min-height: 500px;
  }
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
.search-elements {
  margin-top: -40px;
}
.top-elements {
  position: relative;
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
  padding-right: 5px;
  padding-bottom: 5px;
  border: 0px;
  font-size: 12px;
  font-weight: 450;
  text-align: left;
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
  min-height: 100vh;
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
.collectionsButtonM {
  margin: 0px 0 0 45px;
  background-color: transparent;
  color: rgb(49, 49, 49);
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
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
  border-bottom: 1px lightgray solid;
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
    color: black;
    padding: 12px 0px;
    text-decoration: none;
    display: block;
    background: transparent;
    font-size: 11px;
  }
  a:hover,
  a:active,
  a:focus,
  .router-link-active {
    font-weight: 500;
    color: #5fbdc1;
    text-decoration: underline;
  }
}
.galleryCollections .collectionsMenu.active,
.galleryCategory .galleryCategories.active {
  display: block;
}
.arrow1 {
  margin-left: 15px;
  width: 12px;
  height: 12px;
  transform: rotate(180deg);
}
.arrow1.active {
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
  border-bottom: 3px solid transparent;
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
.collectionItems::first-letter {
  text-transform: capitalize;
}
.galleryCollections label {
  margin-left: 32px;
}
.collectionMenuContainer .collectionItems,
.collectionItems {
  margin-top: 5px;
  font-size: 11px;
  border-bottom: 3px solid transparent;
}
.galleryCollections label:hover {
  text-decoration: underline;
  font-weight: 500;
  color: #5fbdc1;
  cursor: pointer;
  //border-bottom: 3px solid white;
}
.collectionMenuContainer label:focus {
  // border-bottom: 2px solid #50b1b5;
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
