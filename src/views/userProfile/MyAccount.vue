<template>
  <div class="viewContainer" v-if="loading === true">
    <div class="profileContainer">
      <div class="profile">
          <div class="profileItems">
            <img class="profileImg" src="https://res.cloudinary.com/risidio/image/upload/v1637580392/RisidioMarketplace/depositphotos_137014128-stock-illustration-user-profile-icon_splob8.jpg" alt="">
            <p title='edit your profile' style="width: 25px; -webkit-transform: scaleX(-1);transform: scaleX(-1);" class="pencil">&#9998;</p>
          </div>
          <div class="usernameContainer">
            <div class="usernameEdit" >
              <input type="text" placeholder="Username"><span style="width: 35px; -webkit-transform: scaleX(-1);transform: scaleX(-1);" title='edit your profile' class="">&#9998;</span>
            </div>
            <p class="profile-history" >View Transaction History</p>
          </div>
        </div>
        <div class="walletContainer">
          <button class="button filled infoButton hidden" id="infoButton" @click="viewInfo(1)"> View Info</button>
          <div id="walletDetails" class="walletDetails">
            <button class="notFilled" @click="viewInfo(0)">HIDE</button>
            <h1>Your Wallet Info:</h1>
            <h2>ID - {{username.substring(0, 30)}}...</h2>
            <!-- <h2>John Doe</h2> -->
            <br/>
            <div class="walletCurrency">
              <div>
                <p style="font: normal normal 300 12px/15px Montserrat;">Credit Remaining:</p>
                <pre id="stxInfo" style="font: normal normal 300 15px/19px Montserrat;"> <span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;" v-if="profile && profile.accountInfo">{{profile.accountInfo.balance || 5}}</span>  STX</pre>
              </div>
              <div>
                  <pre v-if="currencyPreference && currencyPreference.text" class="figure" style="font: normal normal 300 15px/19px Montserrat;"><span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;">{{yourSTX}}</span> {{currency ? currency : currencyPreference.text || null}}</pre>
                  <pre v-else class="figure" style="font: normal normal 300 15px/19px Montserrat;"><span style="color: rgba(81, 84, 161, 1); font: normal normal 600 12px/15px Montserrat;">{{yourSTX}}</span> {{currency || null}}</pre>
                  <select id="currency" name="currency" class="form-control"  @change="currencyChange($event.target.value)">
                    <option v-for="(rates, index) in rates" :key="index" :value="rates.text">{{rates.text}}</option>
                  </select>
              </div>
            </div>
            <div class="profileBtns">
              <!-- <router-link  to="/create"><button class="button">Mint an NFT</button></router-link > -->
              <router-link  to="/"><button class="button" @click="logout">Disconnect</button></router-link >
              <!-- <RatesListing :amount="profile.accountInfo.balance"/> -->
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
            <b-nav-item id="NFT" class="galleryNavItem active" @click="tabChange('NFT')">Your NFTs</b-nav-item>
            <b-nav-item id="Sale" class="galleryNavItem" @click="tabChange('Sale')">Your NFTs On Sale</b-nav-item>
            <b-nav-item id="Fav" class="galleryNavItem" @click="tabChange('Fav')">Your Favourites</b-nav-item>
          </div>
        </b-nav>
      </div>
      <div v-if="tab === 'NFT' && loopRun" class="">
        <div>
          <MyPageableItems :loopRun="loopRun" :resultSet="resultSet"/>
          <router-link to="/gallery" style="font: normal normal bold 11px/14px Montserrat; display: block; text-align: center; margin-top: 50px"><!--<span style="color: #5FBDC1; ">Want More ? See The Gallery</span>--></router-link>
        </div>
          <div class="pagination-container" v-if="tab === 'NFT'">
            <p v-if="numberOfItems > pageSize && page > 0 " v-on:click="previousPage()"> &lt; Previous </p>
            <div v-for="(item, index) in pages" :key="index"><span v-on:click="pageNumberChange(index)">{{item}}</span></div>
            <p v-if="numberOfItems > pageSize && numberOfItems !== pageSize * (page + 1)" v-on:click="nextPage()">Next ></p>
          </div>
      </div>
      <div v-else-if="saleItem.length > 0 && tab === 'Sale'" >
        <div>
          <MyPageableItems :loopRun="loopRun" :resultSet="saleItem"/>
          <router-link to="/gallery" style="font: normal normal bold 11px/14px Montserrat; display: block; text-align: center; margin-top: 50px"><!--<span style="color: #5FBDC1; ">Want More ? See The Gallery</span>--></router-link>
        </div>
      </div>
      <div v-else-if="saleItem.length === 0 && tab === 'Sale'">
        <div class="noNFT">
          <h3> You do not own any items on sale</h3>
          <div class="profileBtns">
            <router-link class="button filled" to="/">Explore Gallery</router-link>
            <!-- <router-link class="button notFilledBlue" to="/create">Mint Your Item</router-link> -->
          </div>
        </div>
      </div>
      <div v-else-if="tab === 'Fav' && favouriteNfts">
            <MyPageableItems :loopRun="loopRun" :resultSet="favouriteNfts"/>
        <div class="profileBtns">
          <router-link class="button filled" to="/">Explore Gallery</router-link>
          <!-- <router-link class="button notFilledBlue" to="/create">Mint Your Item</router-link> -->
        </div>
      </div>
      <div v-else-if="tab === 'Fav' && !favouriteNfts" class="noNFT">
        <h3> You do not have any favourite items</h3>
      </div>
      <div v-else>
        <div class="noNFT">
        <h3> You do not own any Items yet</h3>
          <div class="profileBtns">
            <router-link class="button filled" to="/">Explore Gallery</router-link>
            <!-- <router-link class="button notFilledBlue" to="/create">Mint Your Item</router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
// import MySingleItem from '../marketplace/components/gallery/MySingleItem.vue'

export default {
  name: 'MyAccount',
  components: {
    MyPageableItems
    // MySingleItem
  },
  data () {
    return {
      loading: true,
      myNfts: [],
      myMintingNfts: [],
      yourSTX: null,
      currency: '',
      profileInfo: {},
      tab: 'NFT',
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
      favouriteNfts: []
    }
  },
  mounted () {
    this.fetchFullRegistry()
    // this.fetchLoopRun()
    this.calcRates()
    const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
    this.defaultRate = tickerRates[0].currency
    this.loading = false
    this.setSTX()
    // this.yourSTX = this.profile.accountInfo.balance
    // let currentRunKey = 'indige5'
    this.loading = true
  },
  created () {
    // this.amount = this.profile.accountInfo.balance
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
  },
  watch: {
    '$route' () {
      this.loading = true
      // this.fetchLoopRun()
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
    },
    'tab' () {
      this.favouriteNfts = JSON.parse(localStorage.getItem('addNFTToFavourite'))
    }
  },
  methods: {
    fetchFullRegistry () {
      const $self = this
      this.$store.dispatch('rpayProjectStore/fetchProjectsByStatus', '').then((projects) => {
        $self.projects = utils.sortResults(projects)
        this.loopRun = projects.find((project) => project.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.indige-art')
        this.fetchAllocations()
        $self.projects.forEach((p) => {
          const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](p.contractId)
          p.application = application
        })
        $self.loaded = true
      })
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
        page: this.page,
        pageSize: this.pageSize
      }
      this.$store.dispatch('rpayStacksContractStore/fetchMyTokensCPSV2', data).then((result) => {
        this.resultSet = result.gaiaAssets.filter((res) => res.contractId !== null)
        this.numberOfItems = result.tokenCount
        this.loading = true
      }).catch((error) => {
        console.log(error.message)
      })
    },
    setSTX () {
      const getRate = this.rates.find((rate) => rate.text === this.currencyPreference.text)
      if (this.currencyPreference) this.yourSTX = getRate.value
      // if (this.currencyPreference) this.yourSTX = getRate.value
    },
    currencyChange (currency) {
      this.yourSTX = this.profile.accountInfo.balance || 55
      this.currency = currency
      const getRate = this.rates.find((rate) => rate.text === currency)
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
    tabChange (tab) {
      this.tab = tab
      document.getElementById('NFT').classList.remove('active')
      document.getElementById('Sale').classList.remove('active')
      document.getElementById('Fav').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    closeModal () {
      document.getElementById('linkModal').style.display = 'none'
    }
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
  // padding: 0 100px;
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

.wantMore {
  display: block;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
}
.profileItems {
  width: 15rem;
  height: 15rem;
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
.filesContainer {
  min-width: 100%;
  margin: 50px auto;
}
.viewContainer {
  margin: 100px auto;
  padding: 20px;
  max-width: 1135px;
  height: 100%;

  .galleryNav {
    margin: auto;
    margin-top: 50px;
    margin-bottom: 70px;
    width: 100%;
    justify-items: center;
    align-items: center;
    border-bottom: solid rgba(128, 128, 128, 0.112) 1px;
  }
  .galleryNavContainer {
    margin: auto;
    margin-bottom: -1px;
    // width: 50%;
    display: flex;
    flex-direction: row;
  }

  .galleryNavItem {
    text-align: center;
    width: fit-content;
    padding: 10px;
    margin: auto;
    border: solid rgba(255, 255, 255, 0) 2px;
    font-size: 12px;
    font-weight: 500;
    margin: 0 10px;
  }
  .galleryNavItem:focus {
    color: red;
  }

  .galleryNavItem:hover,
  .galleryNavItem.active {
    border-bottom: 2px solid #50b1b5;
  }
}
.yourItems {
  display: block;
  margin: 25px auto;
}

.profileContainer {
  display: flex;
  // justify-content: space-between;
  margin-top: 2rem;
  flex-wrap: wrap;
  max-width: 1380px;
  margin: auto;
  gap: 20px;
}
.profileContainer > * {
  flex: 1 1 500px;
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
  background: white;
  color: lightseagreen;
  position: relative;
  // width: 3rem;
  // height: 2rem;
  // padding: 1px;
  top: -140px;
  left: 110px;
  padding: 2px;
  border-radius: 50%;
  // text-align: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 1.5rem;
  cursor: pointer;
}
.form-control {
  max-width: 150px;
  margin: auto;
}
.usernameEdit {
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
.infoButton {
  position: absolute;
  z-index: 20;
  right: 150px;
  top: 100px;
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

  // .profileBtns >:nth-child(1){
  //   background:#50B1B5;
  //   color: white;
  // }
  // .profileBtns >:nth-child(2){
  //   background:#50b2b523;
  //   color: #50B1B5;
  // }
}
.profileBtns {
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 0 10px;
  }
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
.walletDetails {
  position: relative;
  max-width: 416px;
  min-height: 272px;
  text-align: center;
  padding: 20px;
  background: rgba(129, 129, 129, 0.06);
  // background: rgb(255,255,255);
  // background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 0%, rgb(245, 245, 245) 100%);
  border-radius: 14px;
  margin-left: auto;
  & > h1 {
    font: normal normal 600 15px/19px Montserrat;
    margin: 20px auto 0 auto;
  }
  & > h2 {
    margin: 8px auto 0 auto;
    font: normal normal 600 12px/15px Montserrat;
    color: #5154a1;
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
@media only screen and (max-width: 1050px) {
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
    margin: 20px auto 50px auto;
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
