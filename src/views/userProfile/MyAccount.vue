<template>
  <div class="viewContainer" v-if="loading === true">
    <div class="btn-div" v-if="transaction">
      <router-link class="backBtn" :to="'/my-account/nft'"><b-icon class="icon-button" icon="chevron-left" shift-h="-3"></b-icon> Back</router-link>
    </div>
    <div class="profileContainer">
      <div class="profile">
          <div class="profileItems">
            <img v-if="previewImage" class="profileImg" :src="previewImage" alt="profile-image">
            <img v-else class="profileImg" src="https://res.cloudinary.com/risidio/image/upload/v1637580392/RisidioMarketplace/depositphotos_137014128-stock-illustration-user-profile-icon_splob8.jpg" alt="profile-image">
            <label style="width: 25px; -webkit-transform: scaleX(-1);transform: scaleX(-1);" class="pencil">
             <input @change="uploadImage($event)" type="file" id="image-input" accept="image/jpeg, image/png, image/jpg" class="uploadImage">
             &#9998;
            </label>
          </div>
          <div v-if="userExists && !editingUsername" class="usernameEdit">
            <p class="username">User Name: <span>{{userExists}}</span></p>
            <span @click="uploadUserName('editing')" title='edit your profile' class="">&#9998;</span>
          </div>
          <div v-else-if="editingUsername || !userExists" class="usernameEdit" >
            <p class="plus" @click="editingUsername = false"> &#60; </p>
            <input type="text" placeholder="Username" @input="setUserName($event.target.value)"/>
            <span @click="uploadUserName('upload')" title='edit your profile' class="">&#x0002B;</span>
            <p v-if="regError" style="color:red;font-size: 10px;padding: 20px;">Your Username must have at least 3 characters,
              no more than 16. Must contain a capital letter and cannot contain special characters or spaces</p>
          </div>
          <div class="usernameContainer">
            <p v-if="!transaction" class="profile-history" @click="viewTransaction()"> View Transaction History </p>
            <p v-else-if="transaction" :to="'/my-account/nft'" @click="viewNFTS()" class="profile-history"> View NFTs </p>
          </div>
          <div class="mobileInfoContainer">
            <div v-if="userExists && !editingUsername" class="mobileUsernameEdit">
              <p class="username">User Name: <span>{{userExists}}</span></p>
              <span @click="uploadUserName('editing')" title='edit your profile' class="">&#9998;</span>
            </div>
            <div v-else-if="editingUsername || !userExists" class="mobileUsernameEdit" >
              <p class="plus" @click="editingUsername = false"> &#60; </p>
              <input type="text" placeholder="Username" @input="setUserName($event.target.value)"/>
              <span @click="uploadUserName('upload')" title='edit your profile' class="">&#x0002B;</span>
              <p v-if="regError" style="color:red;font-size: 10px;padding: 20px;">Your Username must have at least 3 characters,
                no more than 16. Must contain a capital letter and cannot contain special characters or spaces</p>
            </div>
            <div class="mobileUsernameContainer">
              <p v-if="!transaction" class="profile-history" @click="viewTransaction()"> View Transaction History </p>
              <p v-else-if="transaction" :to="'/my-account/nft'" @click="viewNFTS()" class="profile-history"> View NFTs </p>
            </div>
          </div>
        </div>
        <div class="walletContainer">
          <button class="button filled infoButton hidden" id="infoButton" @click="viewInfo(1)"> View Info </button>
          <div id="walletDetails" class="walletDetails">
            <button class="notFilled" @click="viewInfo(0)"> HIDE </button>
            <h1> Your Wallet Info: </h1>
            <p> ID - {{username.substring(0, 30)}}... </p>
            <!-- <h2>John Doe</h2> -->
            <br/>
            <div class="walletCurrency">
              <div>
                <p style="font: normal normal 300 12px/15px Montserrat;"> Credit Remaining: </p>
                <pre id="stxInfo" style="font: normal normal 300 15px/19px Montserrat;"> <span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;" v-if="profile && profile.accountInfo">{{profile.accountInfo.balance || 5}}</span>  STX</pre>
              </div>
              <div>
                  <pre v-if="currencyPreference && currencyPreference.text" class="figure" style="font: normal normal 300 15px/19px Montserrat;"><span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;">{{yourSTX}}</span> {{currency ? currency : currencyPreference.text || null}}</pre>
                  <pre v-else class="figure" style="font: normal normal 300 15px/19px Montserrat;"><span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;">{{yourSTX}}</span> {{currency || null}}</pre>
                  <select id="currency" name="currency" class="form-control"  @change="currencyChange($event.target.value)">
                    <option v-if="currencyPreference" :value="currencyPreference.text">{{currencyPreference.text}}</option>
                    <option v-for="(rates, index) in rates" :key="index" :value="rates.text">
                      {{rates.text}}
                    </option>
                  </select>
              </div>
            </div>
            <div class="profileBtns">
              <button class="button" @click="logout">Disconnect</button>
            </div>
          </div>
        </div>
    </div>
  <div v-if="windowWidth > 549">
    <div v-if="!transaction" class="galleryContainerLimited">
      <div>
        <div class="galleryNav" >
          <div class="galleryNavContainer" >
            <h2><router-link class="galleryNavItem" :to="'/my-account/nft'">Your NFTs</router-link></h2>
            <h2><router-link class="galleryNavItem" :to="'/my-account/sale'">Your NFTs On Sale</router-link></h2>
            <h2><router-link class="galleryNavItem" :to="'/my-account/fav'">Your Favourites</router-link></h2>
          </div>
        </div>
      </div>
      <div v-if="tab === 'nft' && loopRun" class="">
        <div>
          <MyPageableItems :loopRun="loopRun" :resultSet="resultSet"/>
          <router-link to='/nft-marketplace/' style="font: normal normal bold 11px/14px Montserrat; display: block; text-align: center; margin-top: 50px"><!--<span style="color: #5FBDC1; ">Want More ? See The Gallery</span>--></router-link>
        </div>
          <MarketplacePagination :pageSize="pageSize" :numberOfItems="numberOfItems"/>
      </div>
      <div v-else-if="tab === 'sale'" >
        <div>
          <MyPageableItems :loopRun="loopRun" :resultSet="saleItem"/>
          <router-link to='/nft-marketplace/' style="font: normal normal bold 11px/14px Montserrat; display: block; text-align: center; margin-top: 50px"><!--<span style="color: #5FBDC1; ">Want More ? See The Gallery</span>--></router-link>
        </div>
      </div>
      <div v-else-if="tab === 'fav' && favouriteNfts">
          <MyPageableItems :loopRun="loopRun" :resultSet="favouriteNfts"/>
        <div class="profileBtns">
        </div>
      </div>
    </div>
    <div v-else>
      <UserTransaction :loopRun="loopRun" :profile="profile"/>
    </div>
  </div>
  <div class="MobileV" v-else>
    <MyAccountSwiperSlider />
  </div>
</div>
</template>
<script>
import MyPageableItems from '@/components/gallery/MyPageableItems'
import MarketplacePagination from '@/components/smallcomponents/MarketplacePagination.vue'
import UserTransaction from './UserTransaction.vue'
import MyAccountSwiperSlider from './MyAccountSwiperSlider.vue'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
import axios from 'axios'
// import MySingleItem from '../marketplace/components/gallery/MySingleItem.vue'
export default {
  name: 'MyAccount',
  components: {
    MyPageableItems,
    UserTransaction,
    MarketplacePagination,
    MyAccountSwiperSlider
    // MySingleItem
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      loading: true,
      myNfts: [],
      myMintingNfts: [],
      yourSTX: null,
      currency: '',
      profileInfo: {},
      tab: this.$route.params.nftSection,
      pageSize: 8,
      page: 0,
      loopRun: null,
      numberOfItems: null,
      tokenCount: null,
      resultSet: [],
      allocations: [],
      saleItem: [],
      defaultRate: null,
      currencyPreference: null,
      favouriteNfts: JSON.parse(localStorage.getItem('addNFTToFavourite')),
      transaction: false,
      touchableSlide: false,
      showArrow: true,
      bullets: false,
      userName: '',
      regError: false,
      userExists: '',
      editingUsername: false,
      previewImage: null,
      slide: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        }
      ]
    }
  },
  mounted () {
    this.fetchFullRegistry()
    const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
    this.defaultRate = tickerRates[0].currency
    this.loading = false
    this.setSTX()
    this.getUser()
    this.loading = true
  },
  created () {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
  },
  watch: {
    '$route' () {
      const accountParams = this.$route.params.nftSection
      this.loading = true
      if (accountParams === 'nft') {
        this.transaction = false
      }
      this.tab = accountParams
      this.page = this.$route.params.page
    },
    'profile' () {
      this.calRates()
    },
    'numberOfItems' () {
      this.getPageNumbers()
      this.getSaleData()
    },
    'page' () {
      this.fetchAllocations()
    }
  },
  methods: {
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        this.loopRun = projects.find((project) => project.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.risidio-indige')
        this.fetchAllocations()
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
    },
    checkScreen () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 540) {
        this.touchableSlide = true
        this.showArrow = false
      } else if (this.windowWidth > 840) {
        this.touchableSlide = true
        this.showArrow = true
      }
    },
    viewTransaction () {
      this.transaction = true
      this.$router.push('/my-account/transaction')
    },
    viewNFTS () {
      this.transaction = false
      this.$router.push('/my-account/nft')
    },
    viewInfo (pressed) {
      if (pressed === 1) {
        document.getElementById('walletDetails').classList.remove('hide')
        document.getElementById('infoButton').classList.add('hidden')
        if (this.currencyPreference) this.yourSTX = this.profile.accountInfo.balance || 55
      } else {
        document.getElementById('walletDetails').classList.add('hide')
        document.getElementById('infoButton').classList.remove('hidden')
      }
    },
    logout () {
      this.$store.dispatch('rpayAuthStore/startLogout').then(() => {
        if (this.$route.name !== 'home') {
          this.$router.push('/')
        }
      }).catch((err) => {
        console.log(err)
        this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
      })
    },
    getPageNumbers () {
      const pageNumbers = this.numberOfItems / this.pageSize
      const page = []
      for (let i = 1; i <= pageNumbers; i++) {
        page.push(i)
      }
      console.log('pages', page)
      this.pages = page
    },
    pageNumberChange (item) {
      this.page = item
    },
    nextPage () {
      this.page += 1
    },
    previousPage () {
      this.page -= 1
    },
    fetchAllocations () {
      if (!this.loopRun) return
      const data = {
        stxAddress: this.profile.stxAddress,
        asc: true,
        page: this.$route.params.page,
        pageSize: this.pageSize
      }
      this.$store.dispatch('rpayStacksContractStore/fetchMyTokensCPSV2', data).then((result) => {
        console.log(result)
        this.resultSet = result.gaiaAssets
        console.log(result)
        this.numberOfItems = result.tokenCount
        this.loading = true
      }).catch((error) => {
        console.log(error.message)
      })
    },
    setSTX () {
      let getRate = null
      if (this.currencyPreference) getRate = this.rates.find((rate) => rate.text === this.currencyPreference.text)
      if (this.currencyPreference) this.yourSTX = getRate.value
    },
    currencyChange (currency) {
      this.yourSTX = this.profile.accountInfo.balance || 55
      this.currency = currency
      const getRate = this.rates.find((rate) => rate?.text === currency)
      this.yourSTX = getRate.value
      const object = JSON.stringify(getRate)
      localStorage.setItem('currencyPreferences', object)
    },
    getSaleData () {
      const data = {
        stxAddress: this.profile.stxAddress,
        asc: true,
        page: 0,
        pageSize: this.numberOfItems
      }
      this.$store.dispatch('rpayStacksContractStore/fetchMyTokensCPSV2', data).then((result) => {
        this.saleItem = result.gaiaAssets.filter((nft) => nft.contractAsset && nft.contractAsset.listingInUstx && nft.contractAsset.listingInUstx.price > 0)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    closeModal () {
      document.getElementById('linkModal').style.display = 'none'
    },
    logEvents (params) {
      const index = params.currentSlide.index
      if (index === 0) {
        this.$router.push('/my-account/nft#pagination')
      } else if (index === 1) {
        this.$router.push('/my-account/sale#pagination')
      } else if (index === 2) {
        this.$router.push('/my-account/fav#pagination')
      }
    },
    setUserName (e) {
      this.userName = e
      this.regError = false
    },
    getUser () {
      axios.get(`https://risidio-marketplace-database.herokuapp.com/user/${this.profile.stxAddress}`)
        .then((res) => {
          this.userExists = res.data[0].username
          this.previewImage = res.data[0].profileImage
        })
    },
    uploadUserName (string) {
      const pattern = /^[a-zA-Z0-9]{3,16}$/
      const result = pattern.test(this.userName)
      if (string === 'editing') {
        this.editingUsername = true
        return
      }
      if (string === 'upload' && result) {
        this.editingUsername = false
      }
      if (result) {
        axios.post('https://risidio-marketplace-database.herokuapp.com/user', {
          username: this.userName,
          stxAddress: this.profile.stxAddress
        })
        this.userExists = this.userName
      } else {
        this.regError = true
      }
    },
    uploadImage (e) {
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(image)
      if (e.target.files[0].size > 1248576) {
        alert('File is too big!')
        return
      };
      reader.onload = e => {
        axios.put('https://risidio-marketplace-database.herokuapp.com/user/', {
          image: e.target.result,
          stxAddress: this.profile.stxAddress
        }).then((res) => {
          this.previewImage = res.data.profileImage
        }).catch((err) => {
          console.log('error', err.message)
        })
      }
    }
    // setSliderHeight () {
    //   let height = 320
    //   height = (((this.resultSet.length + 1) * 320) + 40 * this.resultSet.length)
    //   this.sliderHeight = height + 'px'
    // }
  },
  computed: {
    application () {
      const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID]('ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.indige-art')
      return application
    },
    showAdmin () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile.superAdmin || location.origin.indexOf('local') > -1
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
    myTokens () {
      const myContractAssets = this.$store.getters[APP_CONSTANTS.KEY_MY_CONTRACT_ASSETS]
      return myContractAssets
    },
    rateOptions () {
      const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
      const options = []
      tickerRates.forEach((rate) => {
        options.push({
          text: rate.currency,
          value: rate.currency
        })
      })
      return options
    },
    rates () {
      const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      const options = []
      const stxToBtc = tickerRates[0].stxPrice / tickerRates[0].last
      tickerRates.forEach((rate) => {
        options.push({
          text: rate.currency,
          value: utils.toDecimals(rate.stxPrice * profile?.accountInfo?.balance)
        })
      })
      return options
    }
  }
}
</script>
<style lang="scss" scoped>
.galleryContainerLimited {
  max-width: 1135px;
  margin: auto;
}
.profile {
  max-width: 900px;
  margin: 0 auto;
}
.pagination-container {
  padding: 50px;
  max-width: 300px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  p {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  span {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
.favContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.galleryNavContainer {
  width: 710px;
  justify-content: space-between;
  margin-bottom: -12px;
}
.wantMore {
  display: block;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
}
.profileItems {
  width: 15rem;
  display: flex;
  position: relative;
}
.walletCurrency {
  display: flex;
  flex-wrap: wrap;
  & > div:nth-child(1) {
    border-right: solid rgb(209, 209, 209) 2px;
  }
}
.walletCurrency > * {
  flex: 1 1 120px;
}
.MobileV {
  margin-top: 20px;
  padding-top: 20px;
  background-color: #efefef;
  border-radius: 14px;
}
.backBtn {
  display: flex;
  color: #170a6d;
  font: normal normal bold 11px/14px Montserrat;
  cursor: pointer;
  position: absolute;
  top: -20px;
}
.filesContainer {
  min-width: 100%;
  margin: 50px auto;
}
.viewContainer {
  margin: 100px auto;
  padding: 20px;
  max-width: 1135px;
  height: 100%;
  position: relative;
}
.yourItems {
  display: block;
  margin: 25px auto;
}
.profileContainer {
  display: flex;
  margin-top: 2rem;
  flex-wrap: wrap;
  max-width: 1380px;
  margin: auto;
  gap: 20px;
}
.galleryNavItemM {
  position: relative;
  font-size: 12px;
  font-weight: 500;
  max-width: 500px;
  padding: 5px;
  max-width: 150px;
  margin: 0 auto;
  border: solid rgba(255, 255, 255, 0) 2px;
  border-bottom: 2px solid #50b1b5;
}
.profileContainer > * {
  flex: 1 1 500px;
}
input[type="file"] {
  display: none;
}
.plus{
  color: #50b1b5;
  font-weight: 700;
  font-size: 12px;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  cursor: pointer;
}
.profileImg {
  width: 149px;
  height: 149px;
  display: block;
  margin: auto;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.pencil {
  position: absolute;
  background: white;
  color: lightseagreen;
  text-align: center;
  padding: 5px;
  right: 10px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 1.5rem;
  cursor: pointer;
}
.form-control {
  max-width: 150px;
  margin: auto;
}
.NFTbackgroundColour {
  background: rgba(129, 129, 129, 0.12);
  display: grid;
  display: -ms-grid;
  place-items: center;
  border-radius: 26px;
  width: 255px;
  height: 320px;
  padding: 20px;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.username {
  font: normal normal 600 12px/15px Montserrat;
  color: black;
  height: 100%;
  margin-top: 12px;
  span {
    color: #5154a1;
  }
}
.usernameEdit {
  max-width: 500px;
  background: rgb(243, 243, 243);
  border-radius: 20px;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 20px;
}
.usernameEdit > input {
  background: rgb(243, 243, 243);
  border-radius: 20px;
  border: solid 1px rgb(235, 235, 235);
  width: 80%;
  padding: 5px;
  padding-left: 15px;
  outline: none;
  font-weight: 200;
  font-size: 1.2rem;
}
.usernameEdit > span {
  -webkit-transform: scaleX(-1);transform: scaleX(-1);
  cursor: pointer;
  width: 10%;
  padding: 5px;
  color: lightseagreen;
}
.infoButton {
  position: absolute;
  z-index: 20;
  right: 150px;
  top: 100px;
}
.mobileInfoContainer {
  display: none;
}
.mobileUsernameEdit {
  display: none;
}
@media only screen and (max-width: 475px) {
  .infoButton {
    position: absolute;
    z-index: 20;
    right: 115px;
    top: 100px;
  }
}
.infoButton.hidden {
  display: none;
}
.noNFT {
  display: block;
  margin: auto;
  max-width: 100%;
  text-align: center;
  & > :nth-child(1) {
    margin: 50px 0;
    font-size: 40px;
    font-weight: 300;
  }
}
.profileBtns {
  display: flex;
  justify-content: center;
  align-items: center;
  & > *:hover {
    color: white;
  }
}
.hide {
  filter: blur(1rem);
}
.walletContainer {
  position: relative;
}
.mobileInfoContainer {
  max-width: 416px;
}
.walletDetails {
  position: relative;
  max-width: 416px;
  min-height: 272px;
  text-align: center;
  padding: 20px;
  background: rgba(129, 129, 129, 0.06);
  border-radius: 14px;
  margin-left: auto;
  & > h1 {
    font: normal normal 600 15px/19px Montserrat;
    margin: 20px auto 0 auto;
  }
  & > p {
    margin: 8px auto 0 auto;
    font: normal normal 600 12px/15px Montserrat;
    color: #5154a1;
    word-break: break-all;
  }
  .profileBtns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: auto;
    margin: 20px auto auto auto;
  }
  .button {
    padding: 15px 50px;
    border-radius: 100px;
    border: none;
    background-color: rgb(235, 231, 232);
    font-size: 11px;
    font-weight: 700;
    color: rgb(222, 146, 123);
  }
  .notFilled {
    display: block;
    background-color: rgba(255, 255, 255, 0);
    font-size: 14px;
    margin: 0 0 0 auto;
    border: none;
    padding: 10px auto;
    font-weight: 700;
    color: black;
    margin-left: auto;
  }
  .notFilled:hover {
    background-color: rgba(255, 255, 255, 0);
    color: black;
  }
  .button:hover {
    color: rgb(235, 231, 232);
    background-color: rgb(222, 146, 123);
  }
}
.profile-history {
  margin: -20px 0;
  padding: 0 10px;
  font: normal normal bold 12px/15px Montserrat;
  text-decoration: underline;
  color: #50b1b5;
  cursor: pointer;
}
.profile-historyM {
  margin: 20px 0;
  padding: 0 10px;
  font: normal normal bold 12px/15px Montserrat;
  text-decoration: underline;
  color: #50b1b5;
  cursor: pointer;
  text-align: center;
  margin-bottom: 10px;
}
.router-link-active {
  border-bottom: 2px solid #50b1b5;
}
@media only screen and (max-width: 1069px) {
  .mobileUsernameEdit {
    display: flex;
    background: none;
    width: 100%;
    margin: auto;
    justify-content: space-between;
    flex-wrap: wrap;
    input {
      background: rgb(243, 243, 243);
      border-radius: 20px;
      border: solid 1px rgb(235, 235, 235);
      width: 80%;
      padding: 5px;
      padding-left: 15px;
      outline: none;
      font-weight: 200;
      font-size: 1.2rem;
      border: none;
      background: none;
    }
  }
  .mobileUsernameContainer {
    margin: auto;
    margin-top: 40px;
    width: 100%;
  }
  .mobileInfoContainer {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background: rgba(129, 129, 129, 0.06);
    max-width: 416px;
    margin: auto;
    padding: 10px 20px;
    margin-top: 30px;
    border-radius: 14px;
  }
  .mobileUsernameEdit > span {
  -webkit-transform: scaleX(-1);transform: scaleX(-1);
  cursor: pointer;
  width: 10%;
  padding: 5px;
  color: lightseagreen;
  }
  .usernameContainer {
    display: none;
  }
  .walletCurrency {
    flex-wrap: nowrap;
    flex-direction: column;
    max-width: 150px;
    margin: auto;
    & > div:nth-child(1) {
      border-right: none;
      border-bottom: solid rgb(209, 209, 209) 2px;
    }
    & > div:nth-child(2) {
      margin-top: 10px;
    }
    height: 100px;
  }
  .usernameContainer {
    max-width: 400px;
    margin: 40px auto 20px auto;
    border-radius: 14px;
    background-color: #efefef;
    padding: 10px 50px;
  }
  .usernameEdit {
    background: none;
    max-width: 300px;
    margin: auto;
    display: none;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    input {
      border: none;
      background: none;
    }
  }
  .profile-history {
    text-align: center;
    margin-bottom: 10px;
  }
  .walletDetails {
    background: #efefef;
    .button {
      margin-top: 20px;
    }
  }
  .walletDetails {
    margin: auto;
  }
  .profileItems,
  .profileImg {
    margin: auto;
  }
}
@media only screen and (max-width: 1250px) {
  .profileItems,
  .profileImg {
    margin: auto;
  }
}
</style>
