<template>
    <div class="launchS2">
        <div>
            <b-nav class="galleryNav" >
                <div class="galleryNavContainer" >
                <b-nav-item class="galleryNavItem active" id="unsold" @click="tabChange('unsold')">Unsold</b-nav-item>
                <b-nav-item class="galleryNavItem" id="all" @click="tabChange('all')">All</b-nav-item>
                <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
                </div>
            </b-nav>
        </div>
        <div class="homeMarketItems">
            <div class="galleryContainer" v-if="resultSet.length > 0 && tab === 'all'">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                      <b-link class="galleryNFTContainer" :to="assetUrl(item)">
                        <!-- <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/> -->
                        <img alt="Collection Image" :src="item.image" class="nftGeneralView"/>
                      <p class="nFTName"> {{!item.name ? "NFT " + index : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price}} STX</span></p>
                      <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                      <p class="nFTArtist">By <span>{{!item.artist ? "Indige" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <div class="galleryContainer" v-if="resultSet.length > 0 && tab === 'unsold'">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                      <b-link class="galleryNFTContainer" :to="assetUrl(item)">
                      <!-- <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/> -->
                      <img alt="Collection Image" :src="item.image" class="nftGeneralView"/>
                    <p class="nFTName"> {{!item.name ? "NFT " + index : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price}} STX</span></p>
                    <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                    <p class="nFTArtist">By <span>{{!item.artist ? "Indige" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <router-link to="/nft-marketplace/risidio/launch_collection_t1"><button class="button notFilledBlue"> See More </button></router-link>
        </div>
    </div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import axios from 'axios'
// import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
export default {
  name: 'Indige-Collection-S2',
  props: ['content', 'projects'],
  components: {
    // MediaItemGeneral
  },
  data () {
    return {
      tab: 'unsold',
      currentRunAssets: [],
      loopRun: [],
      resultSet: [],
      numberOfItems: 0,
      loading: true
    }
  },
  mounted () {
    this.getAssets()
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
      document.getElementById('unsold').classList.remove('active')
      document.getElementById('all').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    getAssets () {
      this.$store.dispatch('rpayCategoryStore/fetchLoopRun', 'indige5').then((loopRun) => {
        this.loopRun = loopRun
        const data = {
          contractId: loopRun.contractId,
          asc: true,
          runKey: loopRun.currentRunKey,
          page: 0,
          pageSize: 5
        }
        this.resultSet = null
        this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
          this.resultSet = result.gaiaAssets
          this.numberOfItems = result.tokenCount
          this.loading = false
        })
      })
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    }
  },
  computed: {
    application () {
      const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID]('ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.launch_collections_artw')
      return application
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS2{
    min-height: 50rem;
  padding: 20px;
}
.container{
    text-align: center;
    max-width: 800px;
    h1{
        font: normal normal 300 40px/55px Montserrat;
        padding: 10px;
    }
    :nth-child(2){
        font: normal normal bolder 17px/20px Montserrat;
        padding: 10px;
    }
    :nth-child(3){
        font: normal normal normal 14px/20px Montserrat;
        padding: 10px;
    }
}
p{padding:0; margin:0;}

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
// .homeNFTView{
//   display: flex;
//   flex-wrap: wrap;
//   // margin: 4rem;
//   border-radius: 25px;
//   // padding: 4rem;
//   margin: auto;
// }
// .homeNFTView > *{
//   flex: 1 1 300px;
//   padding: 30px;
//   min-width: 300px;
//   max-height: 400px;
// }
.button{
  margin: 50px auto 50px auto;
}
#unsold {
  margin-right: 20px;
}

</style>
