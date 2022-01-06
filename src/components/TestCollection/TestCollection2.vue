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
            <div class="galleryContainer" v-if="filteredLaunch.length > 0 && tab === 'all'">
                <div v-for="(item, index) in filteredLaunch" :key="index" class="homeNFTView" >
                    <div class="NFTbackgroundColour">
                        <b-link class="galleryNFTContainer" v-if="item && item.contractAsset && item.attributes">
                            <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/>
                    <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                    <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                    <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <div class="galleryContainer" v-if="filteredUnSoldLaunch.length > 0 && tab === 'unsold'">
                <div v-for="(item, index) in filteredUnSoldLaunch" :key="index" class="homeNFTView" >
                    <div class="NFTbackgroundColour">
                        <b-link class="galleryNFTContainer" v-if="item && item.contractAsset && item.attributes">
                            <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/>
                    <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                    <!-- <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p> -->
                    <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                    </b-link>
                    </div>
                </div>
            </div>
            <router-link to="/nft-marketplace/risidio/launch_collection_t1"><button class="button notFilledBlue"> See More </button></router-link>
        </div>
    </div>
</template>

<script>
import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
export default {
  name: 'TestCollection2',
  props: ['content', 'gaiaAssets', 'filteredUnSoldLaunch', 'filteredLaunch'],
  components: {
    MediaItemGeneral
  },
  data () {
    return {
      tab: 'unsold'
    }
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
      document.getElementById('unsold').classList.remove('active')
      document.getElementById('all').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS1{
    min-height: 50vh;
    display: grid;
    place-items: center;
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
.homeMarket{
  width: 90%;
  min-height: 80rem;
  margin: auto;
  margin: 5rem auto;
}
.galleryContainer{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
}
.homeMarketItems{
  max-width: 1800px;
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
  margin: 100px auto 100px auto;
}
#unsold {
  margin-right: 20px;
}

</style>
