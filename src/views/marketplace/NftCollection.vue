<template>
  <div class="gallery">
    <div class="galleyContainer">
      <div class="gallerySidebar"></div>
      <div class="galleryMain"></div>
    </div>
  </div>
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
    // PageableGallery,
    // SearchBar,
    // CollectionSidebar
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
.galleryContainer{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 5%;
  height: 800px;
}
.gallerySidebar{
  flex: 1 1 20%;
  max-width: 300px;
  min-width: 300px;
  background: black;
}
.galleryMain{
  flex: 1 1 75%;
  max-width: 1000px;
  min-width: 400px;
}
</style>
