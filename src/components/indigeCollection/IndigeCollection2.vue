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
            <div class="galleryContainer" v-if="resultSet && resultSet.length > 0 && tab === 'all'">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                      <b-link class="galleryNFTContainer" :to="assetUrl(item)">
                        <!-- <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/> -->
                      <img alt="Collection Image" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]" class="nftGeneralView-limited"/>
                      <p class="nFTName"> {{!item.name ? "NFT " + index : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price}} STX</span></p>
                      <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                      <p class="nFTArtist">By <span>{{!item.artist ? "Indige" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <div class="galleryContainer" v-if="resultSet && resultSet.length > 0 && tab === 'unsold' && mintPasses === 0">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                      <b-link class="galleryNFTContainer" :to="assetUrl(item)">
                      <!-- <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/> -->
                    <img alt="Collection Image" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]" class="nftGeneralView"/>
                    <p class="nFTName"> {{!item.name ? "NFT " + index : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price}} STX</span></p>
                    <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                    <p class="nFTArtist">By <span>{{!item.artist ? "Indige" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <div class="galleryContainer" v-else-if="resultSet && resultSet.length > 0 && tab === 'unsold' && mintPasses > 0">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                      <b-link class="galleryNFTContainer" :to="assetUrl(item)">
                      <!-- <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/> -->
                    <img alt="Collection Image" :src="'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/' + item.image.split('/')[5]" class="nftGeneralView"/>
                    <p class="nFTName"> {{!item.name ? "NFT " + index : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price}} STX</span></p>
                    <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                    <p class="nFTArtist">By <span>{{!item.artist ? "Indige" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <!-- <router-link to="/nft-marketplace/risidio/launch_collection_t1"><button class="button notFilledBlue"> See More </button></router-link> -->
            <button class="button notFilledBlue" @click="setPageSize()"> See More </button>
            <p v-if="mintPassLoad">
              loading your mintpass
            </p>
        </div>
    </div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
// import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
export default {
  name: 'Indige-Collection-S2',
  props: ['content', 'loopRun', 'resultSet'],
  components: {
    // MediaItemGeneral
  },
  data () {
    return {
      tab: 'unsold',
      currentRunAssets: [],
      numberOfItems: 0,
      loading: true,
      pageSize: 20,
      mintPasses: null,
      mintPassMessage: '',
      mintPassLoad: true
    }
  },
  mounted () {
    this.fetchMintPass()
  },
  watch: {
    'profile' () {
      this.fetchMintPass()
    }
  },
  methods: {
    fetchMintPass () {
      console.log('mintpass')
      const data = {
        stxAddress: this.profile.stxAddress,
        contractAddress: this.loopRun.contractId.split('.')[0],
        contractName: this.loopRun.contractId.split('.')[1],
        currentRunKey: this.loopRun ? this.loopRun.currentRunKey : null
      }
      console.log(data)
      this.$store.dispatch('rpayMarketStore/lookupMintPassBalance', data).then((result) => {
        if (result && result.result.value > 0) {
          this.mintPasses = Number(result.result.value)
          this.mintPassMessage = 'Mint Pass Found'
        } else {
          this.mintPassMessage = 'Mint Pass Not Found'
        }
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
      this.mintPassLoad = false
    },
    tabChange (tab) {
      this.tab = tab
      document.getElementById('unsold').classList.remove('active')
      document.getElementById('all').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    setPageSize () {
      this.pageSize += 10
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    }
  },
  computed: {
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
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
