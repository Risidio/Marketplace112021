<template>
  <section class="bannerContainer">
    <img class="banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg" alt="">
    <div v-if="profile.loggedIn" class="if">
        <div class="loggedBanner">
            <div class="vueSlideContainer galleryContainer">
              <vueper-slides
              :infinite="false"
              fixed-height="true"
              class="no-shadow"
              arrows-outside
              :touchable="false"
              :gap="3"
              >
                <template #arrow-left>
                  <img src="https://res.cloudinary.com/risidio/image/upload/v1637153014/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_zpgise.svg" alt="wallet" class="arrow"/>
                </template>
                <template #arrow-right>
                  <img src="https://res.cloudinary.com/risidio/image/upload/v1637152994/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_1_ex6tmv.svg" alt="wallet" class="arrow"/>
                </template>
                <vueper-slide
                v-for="(slide) in slide"
                :key="slide.id"
                >
                    <template #content>
                        <div v-if="slide.id==1" class = "slideContainer">
                            <div class="slideImage">
                              <img
                              src="https://res.cloudinary.com/risidio/image/upload/v1640003055/RisidioMarketplace/Tiger_BitStacks_By_Benny_d8rprd.png"
                              alt="Tiger-BitStacks-By-Benny"
                              class="collectionImage"/>
                            </div>
                            <div class="slideText">
                              <button @click="list" class="button filled" ><span style="color: white" v-if="mintButtonText">{{mintButtonText}}</span><span style="color: white" v-else>List Now</span></button>
                              <button @click="buy" class="button filled" ><span style="color: white" v-if="mintButtonText">{{mintButtonText}}</span><span style="color: white" v-else>Buy Now</span></button>
                              <button @click="mintToken" class="button filled" ><span style="color: white" v-if="mintButtonText">{{mintButtonText}}</span><span style="color: white" v-else>Mint Now</span></button>
                             </div>
                        </div>
                        <div v-if="slide.id==2" class = "slideContainer">
                            <div class="slideImage">

                            </div>
                            <div class="slideText">
                              <h2>{{content.heroarea[2].herotitle[0].text}}</h2>
                              <p> {{content.heroarea[2].herotext[0].text}}</p>
                              <button class="button filled"> Coming soon </button>
                            </div>
                        </div>
                        <!-- <div v-if="slide.id==3" class = "slideContainer">
                            <div class="slideImage">

                            </div>
                            <div class="slideText">
                              <h2>{{slide.text}}</h2>
                              <h2>{{content.heroarea[3].herotitle[0].text}}</h2>
                              <p> {{content.heroarea[3].herotext[0].text}}</p>
                              <button class="button filled"> See The Collection </button>
                            </div>
                        </div> -->
                    </template>
                </vueper-slide>
              </vueper-slides>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="slideContainerNotLogged" >
            <div class="notLoggedCont">
              <!-- <iframe
              style="border-radius: 10px;"
              width="529px"
              height="300px"
              frameborder="0"
              src="https://res.cloudinary.com/risidio/video/upload/v1639140586/RisidioMarketplace/Latest_Risidio_Video_by_Fizan_100721_5_r3o1or.mp4" type="video"/> -->
              <video style="width: 529px; height: 300px; border-radius: 25px; margin:auto"
              src="https://res.cloudinary.com/risidio/video/upload/v1639140586/RisidioMarketplace/Latest_Risidio_Video_by_Fizan_100721_5_r3o1or.mp4"
              controls
              ></video>

            </div>
            <div class="notLoggedCont">
              <h1> {{content.heroarea[0].herotitle[0].text}}</h1>
              <p>{{content.heroarea[0].herotext[0].text}}</p>
              <div class="bannerButtonContainer">
              <router-link to="/hiro-wallet" ><button class="button filled">Get Your Hiro Wallet To Start</button></router-link>
              <button v-on:click="startLogin()" class="secondaryBannerButton button"> <span style="margin: auto">Already Have One? Click here to Get Started</span>  </button>
              </div>
            </div>
        </div>
    </div>
    <div class="searchB">
    <HomeSearchBar/></div>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import HomeSearchBar from './homeSearchBar.vue'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'Homebanner',
  props: ['profile', 'content'],

  components: {
    VueperSlides,
    VueperSlide,
    HomeSearchBar
  },
  data: () => ({
    slide: [
      {
        id: '1',
        text: 'Collection'
      },
      {
        id: '2',
        text: 'Collection'
      }
      // {
      //   id: '3',
      //   text: 'Collection'
      // }
    ],
    return: {
      resultSet: [],
      loaded: false,
      rand: 1,
      loading: true,
      errorMessage: null,
      beneficiaries: null,
      eBen: null
    }
  }),
  methods: {
    startLogin () {
      // this.$emit('updateEventCode', { eventCode: 'connect-login' })
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (myProfile.loggedIn) {
        this.$emit('connect-login', myProfile)
      } else {
        this.$store.dispatch('rpayAuthStore/startLogin').then((profile) => {
          console.log(profile)
          location.reload()
        }).catch(() => {
          this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
        })
      }
    },
    startRegister () {
      window.open('https://www.hiro.so/wallet', '_blank')
    },
    mintToken: function () {
      console.log('message')
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
      const data = {
        mintPrice: 10,
        owner: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        assetHash: '0x0c5f53ee53ae12ee388abe2de9fa47513deddc70da960afac716db06c92701f0',
        metaDataUrl: 'https://google.co.in',
        beneficiaries: [],
        editions: 1,
        editionCost: 0,
        sendAsSky: true, // only applicable in local
        contractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        contractName: 'test_collections',
        functionName: 'mint-token',
        batchOption: 1
      }
      this.$store.dispatch('rpayPurchaseStore/cpsMintToken', data).then((result) => {
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
    list: function () {
      console.log('message')
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
      const data = {
        mintPrice: 100,
        owner: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        assetHash: '0x0c5f53ee53ae12ee388abe2de9fa47513deddc70da960afac716db06c92701f0',
        metaDataUrl: 'https://google.co.in',
        beneficiaries: [],
        nftIndex: 3,
        commissionContractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        commissionContractName: 'commission',
        price: 100000,
        commissionContract: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        editions: 1,
        editionCost: 10000,
        sendAsSky: true, // only applicable in local
        contractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        contractName: 'test_collections',
        functionName: 'list-in-ustx',
        batchOption: 1
      }
      this.$store.dispatch('rpayMarketStore/listInUstx', data).then((result) => {
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
    buy: function () {
      console.log('message')
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
      const data = {
        mintPrice: 10,
        owner: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        assetHash: '0x0c5f53ee53ae12ee388abe2de9fa47513deddc70da960afac716db06c92701f0',
        metaDataUrl: 'https://google.co.in',
        beneficiaries: [],
        nftIndex: 3,
        commissionContractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        commissionContractName: 'commission',
        price: 100,
        buyNowOrStartingPrice: 100,
        commissionContract: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        editions: 1,
        editionCost: 0,
        sendAsSky: true, // only applicable in local
        contractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        contractName: 'test_collections',
        functionName: 'buy-in-ustx',
        batchOption: 1
      }
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
    sendMintEvent: function () {
      this.$emit('mintToken')
    }
  }
}
</script>

<style lang="scss" scoped>
.bannerContainer{
  height: 50rem;
  margin-bottom: 5rem;
}
.slideText{
  h2{
    margin-bottom: 1rem;
    letter-spacing: 1px;
    font-size: 40px;
    font-weight: 400;
  }
  p{
    font-size: 1.4rem;
    max-width: 50rem;
  }
}
.searchB{
  display: relative;
  // bottom: 0;
}
.market_introduction_text{
  margin: auto;
  max-width: 1600px;
  text-align: center;
  color: white;
  margin: auto;
}
.bannerButtonContainer{
  display: flex;
  flex-direction: row;
  margin: auto;
}
.secondaryBannerButton {
  width:40rem;
  padding: 14.5px 5px;
  margin-bottom: 5px;
  font-size: 0.7em;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  background: lightgrey;
}
.secondaryBannerButton:hover{
    background: rgba(255, 255, 255, 0.767);
    color: lightseagreen;
}
.market_intro_h1{
  margin-bottom: 25px;
  color: white;
  font-weight: 200;
  font-size: clamp(2rem, 5rem, 7rem);
  word-wrap: break-word;
}
.market_intro{
  font-size: 0.7em;
  font-weight: 300;
  width: 100%;
  max-width: 500px;
  margin: auto;
  color: white;
}
.market_intro_Ex{
  font-size: 1.2em;
}
.banner{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 55rem;
  object-fit: cover;
  z-index: -10;
  transform: rotate(180deg);
  margin-bottom: 50px;
}
.slideContainerNotLogged{
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color:rgba(255, 255, 255, 0.637);
  border-radius: 30px;
  max-width: 1500px;
  margin: auto auto 25px auto;
  height: 400px;
  padding: 20px 50px;
  display: flex;
}
.slideContainerNotLogged :nth-child(1){
  justify-self: center;
  align-self: center;
  margin-right: 50px;
}
.slideContainerNotLogged :nth-child(2){
  margin-top: 25px;
  h1, p{
    padding-bottom: 20px;
  }
}

.vueperslide{
  background-color:rgba(255, 255, 255, 0.637);
  border-radius: 30px;
}

.vueperslides--fixed-height {
  height: 32rem;
  max-width: 85%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  backdrop-filter: blur(2rem);
}
.loggedBanner, .blurBackground{
  min-height: 40vh;
  position: relative;
  z-index: 2;
  max-width: 1500px;
  margin: 35px auto;
  border-radius: 30px;
}

.vueperslides__arrow .arrow{
  width: 35px;
  height: 35px;
}
.slideContainer{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height:100%;
  padding: 25px 40px;
  gap: 2rem;
}
.slideContainer > *:nth-child(1){
  flex: 1 1 40%;
  min-width: 400px;
}
.slideContainer > *:nth-child(2){
  flex: 1 1 55%;
  min-width: 400px;
}
.button{margin-top: 20px;}
.button:hover{
  background: rgba(95, 189, 193, 0.6);
}
.collectionImage{
  display: block;
  width: 25rem;
  height: 25rem;
  border-radius: 10px;
  margin: auto;
  box-shadow: 10px 10px 30px #0000002F;
}
@media only screen and (max-width: 1200px) {
  .slideContainerNotLogged{
    display: flex;
    flex-direction: column;
    height: 65vh;
  }
  .bannerContainer{
      height: 80vh;
  }
  .banner{
    height: 80vh;
  }
}
</style>
