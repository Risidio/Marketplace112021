<template>
    <section class="homeMarket">
    <div>
      <b-nav class="galleryNav" >
        <div class="galleryNavContainer" >
          <b-nav-item class="galleryNavItem active" id="discover" @click="tabChange('discover')">Discover</b-nav-item>
          <b-nav-item class="galleryNavItem" id="collections" @click="tabChange('collections')">Collections</b-nav-item>
          <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
        </div>
      </b-nav>
    </div>
    <div class="homeMarketItems">

      <div class="galleryContainer" v-if="testData.length > 0 && tab === 'discover'">
        <div v-for="(item, index) in testData" :key="index" class="homeNFTView" >
          <div class="NFTbackgroundColour">
            <img class="nftGeneralView" :src="'https://' + gateWay + item.image" alt="nft-cover"/>
            <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.nftIndex}} NDX</span></p>
            <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
            <button class="button filled" @click="buy(item)"> buy</button>
          </div>
        </div>
      </div>
        <!-- <div class="galleryContainer" v-if="gaiaAssets.length > 0 && tab === 'discover'">
            <div v-for="(item, index) in filterMarketAssets" :key="index" class="homeNFTView" >
                <div class="NFTbackgroundColour">
                    <b-link class="galleryNFTContainer" :to="assetUrl(item)" v-if="item && item.contractAsset && item.attributes">
                  <MediaItemGeneral :classes="'nftGeneralView'" v-on="$listeners" :mediaItem="item.attributes"/>
                  <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
                  <span>$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p>
                  <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
                </b-link>
                </div>
            </div>
        </div> -->

        <div class="galleryContainer" v-if="tab === 'collections'">
          <b-col style="margin: auto" md="9" sm="12">
            <h1 style="margin: auto; text-align: center;">Coming soon!</h1>
            <b-row class="h-auto">
              <b-col class="mt-5 w-100"  v-for="(loopRun, index) in loopRuns" :key="index" >
                <div>
                  <b-link :to="collectionUrl(loopRun)">
                    <img style="width: 100%; height: 100%;" :src="getImageUrl(loopRun)"  v-b-tooltip.hover="{ variant: 'light' }" :title="'Collection\n' + loopRun.currentRun"/>
                      <div class=""><b-link :to="collectionUrl(loopRun)">{{loopRun.currentRun}}</b-link></div>
                  </b-link>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </div>

          <!-- <div class=""  v-if="tab === 'Your NFT'">
              <MyPageableItems  style="justify-content: space-evenly"  :loopRun="loopRun"/>
              <div v-if="gaiaAssets.length > 0 && tab === 'Item'" class="galleryinfoContainer">
                <div v-for="(item, index) in gaiaAssets" :key="index" class="galleryItem" >
                  <div class="yourItems">
                    <router-link v-bind:to="'/edit-item/' + item.assetHash" ><img :src="item.image" class="itemImg" style=""/></router-link>
                    <p class="nFTName"> {{item.name}} <span >$ {{item.price * 1.9}}</span></p>
                    <p class="nFTArtist">By <span >{{item.artist}}</span> <span style="float: right;">{{item.price}} STX</span></p>
                  </div>
                </div>
              </div>
          </div> -->
            <button class="button filled"><router-link style="color:white" to="/nft-marketplace/risidio/launch_collection_t1">See More Collectables</router-link></button>
    </div>
  </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import MediaItemGeneral from '@/views/marketplace/components/media/MediaItemGeneral'
// import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import utils from '@/services/utils'
const PINATA_GATEWAY = process.env.VUE_APP_PINATA_GATEWAY

export default {
  name: 'HomeMarket',
  props: ['gaiaAssets'],
  components: {
    // MediaItemGeneral
    // MyPageableItems
  },
  data () {
    return {
      resultSet: [],
      loaded: false,
      placeHolderItems: [],
      tab: 'discover',
      loopRuns: [],
      thisData: []
    }
  },
  mounted () {
    this.findAssets()
    this.fetchCollections()
  },
  methods: {
    tabChange (tab) {
      this.tab = tab
      document.getElementById('discover').classList.remove('active')
      document.getElementById('collections').classList.remove('active')
      document.getElementById(tab).classList.add('active')
      console.log(this.tab)
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
      const data = {
        contractId: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.test_collections7',
        nftIndex: 2,
        page: 0,
        pageSize: 10,
        stxAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        mine: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2'
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
      this.$store.dispatch('rpayStacksContractStore/fetchContractDataFirstEditions').then(() => {
        this.loaded = true
      })
      this.$store.dispatch('rpayStacksContractStore/fetchMetaDataUrl', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
      this.$store.dispatch('rpayStacksContractStore/fetchWalletCount', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
      this.$store.dispatch('rpayStacksContractStore/fetchMyTokensCPSV2', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
      this.$store.dispatch('rpayStacksContractStore/fetchAssetsByOwner', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
      this.$store.dispatch('rpayStacksContractStore/fetchAssetNames', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
      this.$store.dispatch('rpaySearchStore/findAssets', data).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    fetchCollections () {
      const data = {
        contractId: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.test_collections7',
        runKey: 'test_collections7',
        page: 1,
        pageSize: 10,
        asc: true
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractIdAndRunKey', data).then((result) => {
        this.resultSet = result.gaiaAssets
        console.log(result)
      })
    },
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', 'active').then((projects) => {
        $self.projects = utils.sortResults(projects)
        $self.loopRuns = this.allLoopRuns
        $self.loaded = true
      })
    },
    buy: function (item) {
      console.log('message')
      console.log(item)
      // this.errorMessage = 'Minting non fungible token - takes a minute or so..'
      // the post condition applies to the address the funds are going to not from!!!
      // when minting the funds go to the contract admin.
      // const contractAsset = this.$store.getters[APP_CONSTANTS.KEY_ASSET_FROM_CONTRACT_BY_HASH](this.items[0].assetHash)
      // if (contractAsset) {
      //   return
      // }

      // const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      // const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](this.loopRun.contractId)
      // let mintPrice = application.tokenContract.mintPrice
      // const defaultMintPrice = Number(process.env.VUE_APP_DEFAULT_MINT_PRICE)
      // mintPrice = Math.max(application.tokenContract.mintPrice, defaultMintPrice)
      // if (!this.items[0].attributes.buyNowPrice) this.items[0].attributes.buyNowPrice = 0
      const data = item
      data.mintPrice = 10
      data.beneficiaries = []
      data.price = 100
      data.buyNowOrStartingPrice = 100
      data.editions = 1
      data.price = 1
      data.editionCost = 1
      data.sendAsSky = true
      data.functionName = 'buy-in-ustx'
      data.batchOption = 1
      data.metaDataUrl = 'https://google.co.in'
      console.log(data)
      // mintPrice: 10,
      // owner: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
      // assetHash: '0x0c5f53ee53ae12ee388abe2de9fa47513deddc70da960afac716db06c92701f0',
      // metaDataUrl: 'https://google.co.in',
      // beneficiaries: [],
      // nftIndex: 4,
      // commissionContractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
      // commissionContractName: 'commission',
      // price: 10,
      // buyNowOrStartingPrice: 10,
      // commissionContract: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
      // editions: 1,
      // editionCost: 0,
      // sendAsSky: true, // only applicable in local
      // contractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
      // contractName: 'test_collections',
      // functionName: 'buy-in-ustx',
      // batchOption: 1
      // }
      this.$store.dispatch('rpayMarketStore/buyInUstx', data).then((result) => {
        const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](result.assetHash)
        if (result.txId) {
          item.mintInfo = {
            txId: result.txId,
            txStatus: result.txStatus,
            timestamp: result.timestamp
          }
          this.$store.dispatch('rpayMyItemStore/quickSaveItem', item).then((item) => {
            this.$emit('update', item)
          })
        }
      }).catch((err) => {
        this.errorMessage = 'Minting error: ' + err
      })
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    }
  },
  computed: {
    testData () {
      const nftArray = []
      for (let x = 0; x < 5; ++x) {
        const nft = {
          id: 1,
          nftIndex: x,
          owner: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
          assetHash: '0x0c5f53ee53ae12ee388abe2de9fa47513deddc70da960afac716db06c92701f0',
          version: 1,
          name: 'nft' + x,
          assetName: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
          description: 'this is nft number: ' + x,
          commissionContractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
          commissionContractName: 'commission',
          price: 100,
          commissionContract: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
          contractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
          contractName: 'test_collections7',
          image: '/ipfs/QmaCA2KUUKpbjYcC6NuTNqgnx4RYP1DPx7fWUEz1TSUsVB/' + x + '.png',
          artist: 'Generic Artist',
          attributes: null,
          properties: {
            collection: 'test_collections7',
            collectionId: 'risidio/test_collections7',
            totalSupply: 200,
            externalUrl: 'ipfs://QmaCA2KUUKpbjYcC6NuTNqgnx4RYP1DPx7fWUEz1TSUsVB/' + x + '.png',
            animationUrl: null
          },
          localization: {
            uri: null,
            locales: ['en'],
            default: 'en'
          }
        }
        nftArray.push(nft)
      }
      return (nftArray)
    },
    filterMarketAssets () {
      const filterMarketAssets = this.gaiaAssets.slice(0, 8)
      return (filterMarketAssets)
    },
    gateWay () {
      const gateway = PINATA_GATEWAY
      return gateway
    },
    allLoopRuns () {
      const loopRunsActive = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS_BY_STATUS]('active')
      const loopRunsInactive = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS_BY_STATUS]('inactive')
      const loopRunsMinting = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS_BY_STATUS]('unrevealed')
      return loopRunsActive.concat(loopRunsInactive.concat(loopRunsMinting))
    },
    application () {
      const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID]('ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.test_collections7')
      return application
    }
  }
}

</script>

<style lang="scss" scoped>
p{padding:0; margin:0;}
.homeMarket{
  width: 90%;
  min-height: 80rem;
  margin: auto;
  margin: 5rem auto;
}
.galleryContainer{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, max-content));
  max-width: 1480px;
  justify-content: center;
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
  margin: 20px auto 0 auto;
}
#discover {
  margin-right: 20px;
}
</style>
