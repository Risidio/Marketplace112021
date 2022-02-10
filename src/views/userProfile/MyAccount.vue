<template>
  <div class="viewContainer">
    <div class="profileContainer">
      <div class="profile">
          <div class="profileItems">
          <img class="profileImg" src="https://res.cloudinary.com/risidio/image/upload/v1637580392/RisidioMarketplace/depositphotos_137014128-stock-illustration-user-profile-icon_splob8.jpg" alt="">
          <p title='edit your profile' style="width: 45px; -webkit-transform: scaleX(-1);transform: scaleX(-1);" class="pencil">&#9998;</p>
        </div>
          <div class="usernameEdit" ><input type="text" placeholder="Username"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);" title='edit your profile' class="">&#9998;</span>
        </div>
          <p class="profile-history" >View Transaction History</p>
        </div>
        <div class="walletContainer">
          <button class="button filled infoButton hidden" id="infoButton" @click="viewInfo(1)"> View Info</button>
          <div id="walletDetails" class="walletDetails">
            <button class="notFilled" @click="viewInfo(0)">HIDE</button>
            <h1>Your Wallet Information:</h1>
            <h2>{{username}}</h2>
            <!-- <h2>John Doe</h2> -->
            <br/>
            <div class="walletCurrency">
              <div>
                <p style="font: normal normal 300 12px/15px Montserrat;">Credit Remaining:</p>
                <pre id="stxInfo" style="font: normal normal 300 15px/19px Montserrat;"> <span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;">{{yourSTX}}</span>  STX</pre>
              </div>
              <div>
                  <pre style="font: normal normal 300 15px/19px Montserrat;"><span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;">{{yourSTX}}</span>   {{currency}}</pre>
                  <select id="currency" name="currency" class="form-control"  @change="currencyChange($event.target.value)">
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="EUR">EUR</option>
                    <option value="NOK">NOK</option>
                  </select>
              </div>
            </div>
            <div class="profileBtns">
              <!-- <router-link  to="/create"><button class="button">Mint an NFT</button></router-link > -->
              <router-link  to="/"><button class="button" @click="logout">Logout</button></router-link >
              <!-- <router-link class="profileBtn mintBtn" to="/create">Mint an NFT</router-link>
              <router-link  class="profileBtn logoutBtn" to="/">Disconnect</router-link > -->
            </div>
          </div>
        </div>
    </div>
    <div class="galleryContainerLimited">
      <div>
        <b-nav class="galleryNav" >
          <div class="galleryNavContainer" >
            <b-nav-item id="NFT" class="galleryNavItem" @click="tabChange('NFT')">Your NFTs</b-nav-item>
            <b-nav-item id="Item" class="galleryNavItem active" @click="tabChange('Item')">Your Items (Not Minted) </b-nav-item>
            <b-nav-item id="Sale" class="galleryNavItem" @click="tabChange('Sale')">Your NFTS on sale</b-nav-item>
            <!-- <b-nav-item id="Fav" class="galleryNavItem" @click="tabChange('Fav')">Favourite NFTs</b-nav-item> -->
          </div>
        </b-nav>
      </div>
      <div v-if="tab === 'NFT' && loopRun" class="">
        <div>
          <MyPageableItems :loopRun="loopRun"/>
          <router-link to="/gallery" style="font-size: 0.8em; font-weight: 700; display: block; text-align: center; margin-top: 50px"><span style="color: #5FBDC1; ">Want More ? See The Gallery</span></router-link>
        </div>

      </div>
      <div v-else-if="gaiaAssets.length > 0 && tab === 'Item'" class="galleryinfoContainer">
        <div class="addNewContainer">
          <router-link to="/create">
            <p style="font-size: 150px; margin-top: 20px;font-weight: 300; color: grey;">&plus;</p>
            <p style="font-weight: 500; margin-top: 30px;"> Add new NFT</p>
            <p style="font-weight: 300;"> Do you have your own item and would like to add it to the marketplace? Mint it now!</p>
          </router-link>
          <div>
            <p style="font-weight: 500;">Create a collection</p>
            <p style="font-weight: 300;">create your own collection of artworks </p>
          </div>
        </div>
        <div v-for="(item, index) in gaiaAssetNotMinted" :key="index"  >
          <div v-if="!item.mintInfo" class="NFTbackgroundColour">
            <div class="galleryNFTContainer">
              <router-link v-bind:to="'/item-preview/' + item.assetHash + '/' + 0" ><img :src="item.image" class="nftGeneralView" style=""/></router-link>
              <p style="font-size: 10px; padding: 0; margin: 0; float: right"> Not Minted </p>
              <p class="nFTName"> {{item.name || 'Not named'}} </p>
              <p class="nFTArtist">By <span style="font-weight:600">{{item.artist || 'Not named'}}</span></p>
            </div>
          </div>
          <div v-else class="NFTbackgroundColour isNFT">
            <div class="galleryNFTContainer">
              <router-link v-bind:to="'/item-preview/' + item.assetHash + '/' + 0" ><img :src="item.image" class="nftGeneralView" style=""/></router-link>
              <p style="font-size: 10px; padding: 0; margin: 0; float: right"> Minting In Progress </p>
              <p class="nFTName"> {{item.name || 'Not named'}}</p>
              <p class="nFTArtist">By <span style="font-weight:600">{{item.artist || 'Not named'}}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="resultSet.length > 0 && tab === 'Sale'" class="galleryinfoContainer">
        <div v-for="(item, index) in gaiaNFTSaleItem" :key="index" class="NFTbackgroundColour onSale">
            <div class="galleryNFTContainer">
              <router-link v-bind:to="'/nfts/' + item.contractId + '/' + item.contractAsset.nftIndex" ><img :src="item.image" class="nftGeneralView" style=""/></router-link>
              <p class="nFTName"> {{item.name || 'Not named'}} <span style="float: right; font-size: 0.6em; margin-top: 10px;">$ 0</span></p>
              <p class="nFTArtist">By <span style="font-weight:600">{{item.artist || 'Not named'}}</span> <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice || '0'}} STX</span></p>
            </div>
        </div>
      </div>
      <!-- <div v-else-if="tab === 'Fav'">
      </div> -->
      <div v-else>
        <div class="noNFT">
        <h3> You do not own any Items yet</h3>
          <div class="profileBtns">
            <router-link class="button filled" to="/">Gallery</router-link>
            <router-link class="button notFilledBlue" to="/create">Mint Your Item</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import GalleryNft from '@/components/marketplace/GalleryNft'
import MyWalletNfts from '@/views/marketplace/components/gallery/MyWalletNfts'
import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import { APP_CONSTANTS } from '@/app-constants'
import MySingleItem from '@/views/marketplace/components/gallery/MySingleItem'
const STX_CONTRACT_ADDRESS = process.env.VUE_APP_STACKS_CONTRACT_ADDRESS
const STX_CONTRACT_NAME = process.env.VUE_APP_STACKS_CONTRACT_NAME
const LOOP_RUN_DEF = process.env.VUE_APP_DEFAULT_LOOP_RUN

export default {
  name: 'MyAccount',
  components: {
    // MyWalletNfts
    // MySingleItem
    MyPageableItems
  },
  data () {
    return {
      loaded: false,
      myNfts: [],
      myMintingNfts: [],
      yourSTX: null,
      currency: '',
      profileInfo: {},
      tab: 'Item',
      pageSize: 20,
      loopRun: null,
      filteredAssets: [],
      numberOfItems: null,
      tokenCount: null,
      resultSet: []
    }
  },
  mounted () {
    this.findAssets()
    this.findAssets1()
    this.setSTX()
    let currentRunKey = this.$route.params.collection
    if (!currentRunKey) {
      this.showWalletNfts = true
      this.loading = false
      currentRunKey = process.env.VUE_APP_DEFAULT_LOOP_RUN
      this.fetchLoopRun()
      // if (this.$route.path !== '/my-nfts/' + currentRunKey) this.$router.push('/my-nfts/' + currentRunKey)
    } else {
      this.fetchLoopRun()
    }
    this.data = { stxAddress: this.profile.stxAddress, mine: true }
    const myContractAssets = this.$store.getters[APP_CONSTANTS.KEY_MY_CONTRACT_ASSETS]
    for (let i = 0; i < myContractAssets.length; i++) {
      const ga = this.$store.getters[APP_CONSTANTS.KEY_GAIA_ASSET_BY_HASH](myContractAssets[i].tokenInfo.assetHash)
      ga.contractAsset = Object.assign({}, myContractAssets[i])
      this.myNfts.push(ga)
    }
    this.loaded = true
  },
  watch: {
    '$route' () {
      this.loading = true
      this.fetchLoopRun()
    }
  },
  methods: {
    viewInfo (pressed) {
      if (pressed === 1) {
        document.getElementById('walletDetails').classList.remove('hide')
        document.getElementById('infoButton').classList.add('hidden')
        this.yourSTX = this.profile.accountInfo.balance
      } else {
        document.getElementById('walletDetails').classList.add('hide')
        document.getElementById('infoButton').classList.remove('hidden')
      }
    },
    logout () {
      // this.$emit('updateEventCode', { eventCode: 'connect-logout' })
      this.$store.dispatch('rpayAuthStore/startLogout').then(() => {
        if (this.$route.name !== 'home') {
          this.$router.push('/')
        }
        // sessionStorage.clear()
      }).catch((err) => {
        console.log(err)
        this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
      })
    },
    fetchLoopRun () {
      const data = {
        // contractId: (this.loopRun) ? this.loopRun.contractId : STX_CONTRACT_ADDRESS + '.' + STX_CONTRACT_NAME,
        runKey: (this.loopRun) ? this.loopRun.currentRunKey : LOOP_RUN_DEF,
        stxAddress: this.profile.stxAddress,
        asc: true,
        page: 0,
        pageSize: this.pageSize
      }
      let currentRunKey = this.$route.params.collection
      if (!currentRunKey) {
        currentRunKey = process.env.VUE_APP_DEFAULT_LOOP_RUN
      }
      this.$store.dispatch('rpayCategoryStore/fetchLoopRun', currentRunKey).then((loopRun) => {
        this.loopRun = loopRun
        this.fetchAllocations()
        this.loading = false
      })
      this.resultSet = null
      this.$store.dispatch('rpayStacksContractStore/fetchMyTokens', data).then((result) => {
        this.resultSet = result.gaiaAssets // this.resultSet.concat(results)
        this.tokenCount = result.tokenCount
        this.numberOfItems = result.gaiaAssets.length
        this.loading = false
      })
    },
    fetchAllocations () {
      if (!this.loopRun) return
      const params = { stxAddress: this.profile.stxAddress, contractId: this.loopRun.contractId }
      this.$store.dispatch('rpayTransactionStore/fetchByContractIdAndFrom', params).then((results) => {
        this.allocations = results || []
      })
    },
    canUpload () {
      const hasUploadPriv = this.$store.getters[APP_CONSTANTS.KEY_HAS_PRIVILEGE]('can-upload')
      return hasUploadPriv
    },
    findAssets () {
      const data = {
        // stxAddress: (NETWORK === 'local') ? 'STFJEDEQB1Y1CQ7F04CS62DCS5MXZVSNXXN413ZG' : this.profile.stxAddress
        stxAddress: this.profile.stxAddress,
        page: 0,
        pageSize: 100,
        query: '?' + this.defQuery
      }
      this.$store.dispatch('rpayStacksContractStore/fetchWalletNftsByFilters', data).then((results) => {
        console.log(results)
      }).catch((error) => {
        console.log('error ' + error)
      })
    },
    setSTX () {
      this.yourSTX = this.profile.accountInfo.balance
    },
    findAssets1 () {
      const data = {
        contractId: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2.test_collections9',
        nftIndex: 2,
        page: 0,
        pageSize: 10,
        stxAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        mine: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2'
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((data) => {
        console.log('Normal')
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    currencyChange (currency) {
      this.yourSTX = this.profile.accountInfo.balance
      this.currency = currency
      if (this.currency === 'EUR') {
        this.yourSTX = this.yourSTX * 2.5
      }
      console.log(this.currency)
      console.log(this.yourSTX)
      // e.current.value
    },
    tabChange (tab) {
      this.tab = tab
      document.getElementById('NFT').classList.remove('active')
      document.getElementById('Item').classList.remove('active')
      document.getElementById('Sale').classList.remove('active')
      // document.getElementById('Fav').classList.remove('active')
      document.getElementById(tab).classList.add('active')
      console.log(this.tab)
    },
    closeModal () {
      document.getElementById('linkModal').style.display = 'none'
    }
  },
  computed: {
    projects () {
      const appmap = this.$store.getters[APP_CONSTANTS.KEY_REGISTRY]
      if (appmap) return appmap.apps
      return []
    },
    content () {
      const content = this.$store.getters['contentStore/getHomepage']
      return content
    },
    showAdmin () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.superAdmin || location.origin.indexOf('local') > -1
    },
    stxAddress () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (profile.wallet && profile.wallet.keyInfo.address) {
        return profile.wallet.keyInfo.address.substring(0, 5) + '...' + profile.wallet.keyInfo.address.substring(profile.wallet.keyInfo.address.length - 5)
      }
      return 'n/a'
    },
    username () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (!profile) {
        return 'unknown'
      } else if (profile.name && profile.name.length > 0) {
        return profile.name
      } else if (profile.username && profile.username.length > 0) {
        return profile.username
      } else {
        return profile.identityAddress
      }
    },
    avatar () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      if (profile.loggedIn) {
        if (profile.avatarUrl) {
          return (
            '<img style="width: 30px; height: 30px; border-radius: 20px;" src="' +
            profile.avatarUrl +
            '"/>'
          )
        }
      }
      return null
    },
    profile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    },
    webWalletNeeded () {
      const webWalletNeeded = this.$store.getters[APP_CONSTANTS.KEY_WEB_WALLET_NEEDED]
      return webWalletNeeded
    },
    gaiaAssets () {
      const gaiaAssets = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEMS]
      return gaiaAssets
    },
    gaiaAssetNotMinted () {
      const gaiaAsset = this.$store.getters[APP_CONSTANTS.KEY_MY_UNMINTED_ITEMS]
      return gaiaAsset
    },
    gaiaNFTSaleItem () {
      const saleItem = this.resultSet.filter(assets => assets.contractAsset.saleData.buyNowOrStartingPrice !== 0)
      return saleItem
    },
    hasNfts () {
      const myContractAssets = this.$store.getters[APP_CONSTANTS.KEY_MY_CONTRACT_ASSETS]
      return myContractAssets && myContractAssets.length
    },
    hasProfile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    },
    myTokens () {
      const myContractAssets = this.$store.getters[APP_CONSTANTS.KEY_MY_CONTRACT_ASSETS]
      return myContractAssets
    }
  }
}
</script>

<style lang="scss" scoped>
.galleryContainerLimited{
  max-width: 1500px;
  margin: auto;
}
.profile{
  max-width: 900px;
  // padding: 0 100px;
  margin: 0 auto;
}

.wantMore{
  display: block;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
}
.profileItems{
  width: 20rem;
  height: 20rem;
}
.walletCurrency{
  display: flex;
  flex-wrap: wrap;
  & > div:nth-child(1){
    border-right: solid rgb(209, 209, 209) 2px;
  }
}
.walletCurrency >*{
  flex: 1 1 120px;
}
.filesContainer{
  min-width: 100%;
  margin: 50px auto;
}
.viewContainer{
  margin: 100px auto;
  padding: 20px;
  max-width: 1600px;
  height: 100%;

  .galleryNav{
  margin: auto;
  margin-top: 50px;
  margin-bottom: 70px;
  width: 100%;
  justify-items: center;
  align-items: center;
  border-bottom: solid rgba(128, 128, 128, 0.112) 1px;
}
.galleryNavContainer{
  margin: auto;
  margin-bottom: -1px;
  // width: 50%;
  display: flex;
  flex-direction: row;
}

.galleryNavItem{
  width: fit-content;
  padding: 10px;
  margin: auto;
  border: solid rgba(255, 255, 255, 0)  2px;
  font-size: 14px;
  font-weight: 500;
  margin: 0 10px;
}

.galleryNavItem:hover, .galleryNavItem.active{
    border-bottom: 2px solid #50B1B5;
}
}
.yourItems{
  display: block;
  margin: 25px auto;
}

.profileContainer{
  display: flex;
  // justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  max-width: 1380px;
  margin: auto;
  gap: 20px;
}
.profileContainer > *{
  flex: 1  1 500px;
}
.profileImg{
  width: 20rem;
  height: 20rem;
  display: block;
  margin-right: auto;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.pencil{
  background: white;
  color: lightseagreen;
  position: relative;
  width: 5rem;
  height: 5rem;
  top: -185px;
  left: 150px;
  padding: 10px;
  border-radius: 50%;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 2rem;
  cursor: pointer;
}
.form-control{
  max-width: 150px;
  margin: auto;
}
.usernameEdit{
  max-width: 500px;
  display: flex;
  flex-direction: row;
  background: rgb(243, 243, 243);
  border-radius: 20px;
  margin: 30px 0;
  }
  .usernameEdit > input {
    background: rgb(243, 243, 243);
    border-radius: 20px;
    border: solid 1px rgb(235, 235, 235);
    width: 90%;
    padding: 5px;
    padding-left: 15px;
    outline: none;
    font-weight: 200;
    font-size: 1.2rem;
  }
.usernameEdit > span {
  width: 10%;
  padding: 5px;
  color: lightseagreen;
}
.infoButton{
  position: absolute;
  z-index: 20;
  right: 150px;
  top: 100px;
}
.infoButton.hidden{
  display: none;
}
.noNFT{
  display: block;
  margin: auto;
  max-width: 100%;
  text-align: center;
  &>:nth-child(1){
    margin: 50px 0;
    font-size: 40px;
    font-weight: 300;
  }

// .profileBtns >:nth-child(1){
//   background:#50B1B5;
//   color: white;
// }
// .profileBtns >:nth-child(2){
//   background:#50b2b523;
//   color: #50B1B5;
// }
}
.profileBtns{
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 0 10px;
  }
  & > *:hover{
    color: white;
  }
}
.hide {
  filter: blur(1rem);
}
.walletContainer{
  position: relative;
}
.walletDetails{
  position: relative;
  max-width: 416px;
  min-height: 272px;
  text-align: center;
  padding: 20px;
  background: rgba(129, 129, 129, 0.06);
  // background: rgb(255,255,255);
  // background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgb(245, 245, 245) 100%);
  border-radius: 20px;
  margin-left: auto;
  & > h1 {
    font: normal normal 600 15px/19px Montserrat;
    margin: 20px auto 0 auto;
  }
  & > h2 {
    margin: 0 auto 0 auto;
    font: normal normal 600 12px/15px Montserrat;
    color: #5154A1;
  }
  .profileBtns{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: auto;
    margin: 20px auto auto auto;
  }
  .button{
  padding: 15px 50px;
  border-radius: 100px;
  border: none;
  background-color: rgb(235,231,232);
  font-size: 14px;
  font-weight:700;
  color: rgb(222,146,123);
}
.notFilled{
  display: block;
  background-color: rgba(255, 255, 255, 0);
  font-size: 14px;
  margin: 0 0 0 auto;
  border: none;
  padding: 10px auto;
  font-weight:700;
  color: black;
  margin-left: auto;
}
.notFilled:hover{
  background-color: rgba(255, 255, 255, 0);
  color: black;
}
.button:hover{
  color: rgb(235,231,232);
  background-color: rgb(222,146,123);
}
}
.profile-history{
  margin: -20px 0; padding: 0 10px;
  font: normal normal bold 12px/15px Montserrat;
  text-decoration: underline;
  color: #50B1B5;
  cursor: pointer
}
@media only screen and (max-width: 1100px){
  .usernameEdit{
    margin: 30px auto;
  }
  .profile-history{
    text-align: center;
    margin-bottom: 10px;
  }
  .walletDetails{
    margin: auto;
  }
  .profileItems, .profileImg{
    margin: auto;
  }
}
@media only screen and (max-width: 1250px){
  .profileItems, .profileImg{
    margin: auto;
  }
}
</style>
