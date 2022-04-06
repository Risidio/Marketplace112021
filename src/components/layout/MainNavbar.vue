<template>
<div >
<!-- The Modal -->
<div v-on:click="mobileNavebar()" :class="isLayer ? 'whiteBackground' : ''"></div>
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="hiro-modal-content">
    <span class="close" @click="closeModal()">&times;</span>
    <h3 class="modalH3">No Hiro Wallet Found</h3>
    <p class="modalP"> No Hiro Wallet is found!</p>
    <p class="modalP2"> No Hiro Wallet Is found! You need to connect a Hiro Wallet to the site to get started in order to browse, buy, sell and trade NFTs. Please visit 'what's a wallet?' for more information.</p>
    <button class="button notFilledBlue" @click="downloadWallet()"> Download For "Browser"</button>
    <p class="modalP3" @click="closeModal()"> <router-link to="/hiro-wallet">What's A Wallet ? </router-link></p>
  </div>

</div>

<div class="navbar_container">
   <img class="nav_banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609222/RisidioMarketplace/gradienta-m_-1_v4hs5p.svg" alt="">
</div>
<div class="nav-container">
    <div class = "mainNavbar">
        <router-link class="risidioLogo" to="/"><img  width="150px;" :src="logo" alt="risidio-logo"/></router-link>
        <div class="toggle-button" v-on:click="mobileNavebar()">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <div v-if="profile.loggedIn" class="navbar_links">
          <div class="nav-items">
            <router-link class="nav-items bold" to="/nft-marketplace">Explore</router-link>
          </div>
            <div style="position: relative; margin-top: 2px;" @click="openMenu()" id="dropDown" class="dropDown">
              <p id="dropDown-1" class="nav-items bold" > Featured Collections <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></p>
              <p id="dropDown-2" class="featured" > Featured Collections <img style="margin-left: 8px;" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></p>
              <div id="dropDown-3" class="dropdownMenu">
                <div id="dropDown-4" v-for="(item, index) in allLoopRuns" :key="index" class="dropdownMenu-container">
                  <p @click="linkTo(item)" >{{item.currentRun}}</p>
                </div>
              </div>
            </div>
            <hr class="mobile-hr"/>
            <div class="nav-items" id="howItWorks">
              <router-link class="nav-items thin right" to="/how-it-works" >How It Works</router-link>
            </div>
            <div  class="nav-items">
              <router-link class="nav-items text-black thin" to="/about">About Risidio </router-link>
            </div>
            <div  class="nav-items">
              <router-link class="navBtn thin" to="/my-account"> My NFT's </router-link>
            </div>
        </div>
         <div v-else class="navbar_links_not_logged">
            <router-link class="nav-items bold" to="/nft-marketplace" >Explore</router-link>
            <div style="position: relative; margin-top: 2px;" @click="openMenu()" id="dropDown">
              <p class="nav-items bold" > Featured Collections <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></p>
              <p class="featured" > Featured Collections <img style="margin-left: 8px;" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"></p>
              <div class="dropdownMenu">
                <div v-for="(item, index) in allLoopRuns" :key="index" class="dropdownMenu-container">
                  <p @click="linkTo(item)">{{item.currentRun}}</p>
                </div>
              </div>
            </div>
            <hr class="mobile-hr"/>
            <router-link class="nav-items text-black thin" to="/how-it-works" id="howItWorks">How It Works</router-link>
            <router-link class="nav-items text-black thin" to="/about">About Risidio </router-link>
            <div @mouseover="isHidden = !isHidden" @blur="isHidden = !isHidden" class=" nav-items navBtn text-black" id="register" v-on:click="startRegister()"> CONNECT WITH HIRO WALLET </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
export default {
  name: 'MainNavbar',
  components: {
  },
  watch: {
    '$route' () {
      this.makerUrlKey = this.$route.params.maker
      this.currentRunKey = this.$route.params.collection
    }
  },
  data () {
    return {
      query: null,
      banner: 'https://images.prismic.io/digirad/6e5bb3a5-21b7-4bcb-b5a7-85128b6e6e8a_Rumba_bg_small.png?auto=compress,format',
      logo: 'https://res.cloudinary.com/risidio/image/upload/v1633609248/RisidioMarketplace/Group_-1_fgpanq.svg',
      isHidden: false,
      loopRuns: [],
      showColls: false,
      isLayer: false
    }
  },
  created () {
    window.addEventListener('click', function (e) {
      const x = document.getElementById('dropDown')
      const one = document.getElementById('dropDown-1')
      const two = document.getElementById('dropDown-2')
      const three = document.getElementById('dropDown-3')
      const four = document.getElementById('dropDown-4')
      const featured = document.getElementsByClassName('featured')[0]
      const dropDownMenu = document.getElementsByClassName('dropdownMenu')[0]
      if (e.target === x || e.target === one || e.target === two || e.target === three || e.target === four) {
      } else {
        featured.classList.remove('show')
        dropDownMenu.classList.remove('show')
      }
    })
  },
  mounted () {
    this.makerUrlKey = this.$route.params.makerß
    this.currentRunKey = this.$route.params.collection
  },
  methods: {
    linkTo (data) {
      this.$router.replace(data.currentRunKey)
    },
    showCollection (loopRun) {
      this.$emit('update', { opcode: 'show-collection', loopRun: loopRun })
    },
    isSelected (runKey) {
      return (this.$route.path.indexOf('/' + runKey) > -1) ? 'text-warning' : ''
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
    startLogin () {
      // this.$emit('updateEventCode', { eventCode: 'connect-login' })
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (myProfile.loggedIn) {
        this.$emit('connect-login', myProfile)
      } else {
        this.$store.dispatch('rpayAuthStore/startLogin').then((profile) => {
          location.reload()
        }).catch(() => {
          this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
          // window.open('https://www.hiro.so/wallet', '_blank')
          const modal = document.getElementById('myModal')
          modal.style.display = 'block'
        })
      }
    },
    openMenu () {
      const dropdownShow = document.getElementsByClassName('dropdownMenu')[0]
      const featured = document.getElementsByClassName('featured')[0]
      dropdownShow.classList.toggle('show')
      featured.classList.toggle('show')
    },
    mobileNavebar () {
      this.isLayer = !this.isLayer
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      const body = document.getElementsByTagName('body')[0]
      if (myProfile.loggedIn) {
        const navLogged = document.getElementsByClassName('navbar_links')[0]
        const mainNavbar = document.getElementsByClassName('mainNavbar')[0]
        const featured = document.getElementsByClassName('dropDown')[0]
        const hr = document.getElementsByClassName('mobile-hr')[0]
        hr.classList.toggle('active')
        featured.classList.toggle('active')
        mainNavbar.classList.toggle('active')
        navLogged.classList.toggle('active')
        body.classList.toggle('stop-scrolling')
      } else {
        const mainNavbar = document.getElementsByClassName('mainNavbar')[0]
        const notLogged = document.getElementsByClassName('navbar_links_not_logged')[0]
        const featured = document.getElementsByClassName('featured')[0]
        const hr = document.getElementsByClassName('mobile-hr')[0]
        hr.classList.toggle('active')
        featured.classList.toggle('active')
        mainNavbar.classList.toggle('active')
        notLogged.classList.toggle('active')
        body.classList.toggle('stop-scrolling')
      }
    },
    startRegister () {
      this.startLogin()
    },
    aboutRisidio () {
      window.open('https://www.Risidio.com', '_blank')
    },
    closeModal () {
      const modal = document.getElementById('myModal')
      modal.style.display = 'none'
    },
    downloadWallet () {
      window.open('https://www.hiro.so/wallet', '_blank')
    }
  },
  computed: {
    allLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS].filter((loopRun) => loopRun.status === 'active')
      return loopRuns
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
    }
  }
}
</script>

<style lang="scss">
.nav-container {
  height: 100px;
}
.whiteBackground {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(3, 3, 3, 0.56);
  z-index: 19;
}
.mainNavbar {
  display: flex;
  margin: 0 auto;
  max-width: 1600px;
  padding: 20px 20px;
  position: relative;
}
/* NAVBAR PADDING AND WIDTH */
.nav_banner {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100px;
  object-fit: cover;
  z-index: -11;
}
.nav-start:hover {
  color: white;
}
.risidioLogo {
  margin-right: 20px;
}
.navbar_links_not_logged,
.navbar_links {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  &.right {
    margin-left: auto;
    background: black;
  }
}
.toggle-button {
  position: absolute;
  top: 3.7rem;
  right: 3.5rem;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}
.toggle-button .bar {
  height: 2px;
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
}
.mobile-hr {
  display: none;
}
.arrow2 {
  margin-left: 8px;
  transform: rotate(180deg);
}
.nav-items {
  margin: auto 0;
  padding: 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}
.thin {
  font: normal normal 300 12px/15px Montserrat;
}
.bold {
  font: normal normal 600 12px/15px Montserrat;
}
.nav-items:hover {
  color: white;
}

.navBtn {
  background: rgba(255, 255, 255, 0.247);
  padding: 15px 40px;
  border-radius: 50px;
  margin: auto 0 auto 40px;
  max-height: 50px;
  text-align: center;
  justify-items: center;
  align-items: center;
  color: #5fbdc1;
  cursor: pointer;
  outline: none;
  font-weight: bold;
}
.navBtn:hover {
  color: white;
}
.navBtn:focus {
  color: rgb(0, 255, 85);
}
.navBtn:hover {
  background: rgba(227, 238, 238, 0.6);
}
.registerTooltip {
  margin-top: 25px;
  margin-left: -10.2rem;
  width: 20rem;
  padding: 10px;
  background: rgb(234, 247, 255);
  color: black;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: default;
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding: 100px 10px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  overflow-y: hidden;
}
.dropdownMenu {
  position: absolute;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: none;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  top: 0;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  p {
    font-size: 11px;
    padding: 5px 20px;
    cursor: pointer;
  }
  p:hover {
    text-decoration: underline;
    color: #5fbdc1;
  }
  // width: 100px;
  // height: 100px;
}
.dropdownMenu-container {
  &:nth-child(1) {
    margin-top: 50px;
  }
}
.dropdownMenu.show {
  display: flex;
}
.featured {
  position: absolute;
  background: white;
  padding: 18px 10px 10px 10px;
  display: none;
  top: 0;
  left: 9px;
  font-size: 1.2rem;
  font-weight: bolder;
  z-index: 11;
  cursor: pointer;
}
.featured.show {
  display: block;
}
/* Modal Content */
.hiro-modal-content {
  display: grid;
  place-items: center;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 34px;
  border: none;
  max-width: 651px;
  height: 379px;
  text-align: center;

  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 30px;
    font-weight: bold;
    text-align: right;
    max-width: 30px;
    margin-left: auto;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  .button {
    margin: 50px auto 0 auto;
  }
  .modalH3 {
    font: normal normal 300 30px/55px Montserrat;
  }
  .modalP,
  .modalP2 {
    font: normal normal normal 14px/18px Montserrat;
    max-width: 460px;
    margin: 5px auto;
  }
  .modalP3 {
    font: normal normal bold 11px/14px Montserrat;
    padding: 5px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
#howItWorks {
  margin-left: auto;
}
@media only screen and (max-width: 1100px) {
  .risidioLogo {
    margin-right: 0;
  }
  .toggle-button {
    display: flex;
  }
  .thin {
    margin-top: 5px;
  }
  .dropdownMenu,
  .featured {
    top: 20px;
    max-width: 400px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .bold {
    margin-top: 10px;
  }
  .text-black1 {
    margin-top: -12px;
  }
  #howItWorks {
    margin-left: 0;
    right: 0;
  }
  .text-black {
    margin-top: -12px;
  }
  .navBtn {
    margin-top: 14px;
    margin: 14px 0;
  }
  .mobile-hr.active {
    display: block;
    width: 100%;
    color: grey;
    background: rgba(255, 255, 255, 0.288);
    height: 1px;
  }
  .mainNavbar {
    flex-direction: column;
    z-index: 1000;
  }
  .navbar_links_not_logged,
  .navbar_links {
    display: none;
  }
  .login {
    min-width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
  // .nav-items{
  //   margin-left: auto;
  //   margin-right: auto;
  // }
  .navbar_links.active,
  .navbar_links_not_logged.active {
    overflow: hidden;
    display: flex;
    padding: 15px;
    width: 100%;
    flex-direction: column;
    margin: 0 auto;
  }
  .mainNavbar.active {
    position: absolute;
    left: 0;
    right: 0;
    // margin: 0 20px;
    max-width: 100%;
    z-index: 20;
    transition: all ease-in 0.1s;
    padding-top: 50px;
    background: linear-gradient(#261399, #13086c);
    align-items: center;
    text-align: center;
    padding-bottom: 100px;
    .toggle-button {
      top: 6rem;
    }
    .toggle-button .bar {
      display: none;
    }
    .toggle-button .bar:first-child {
      display: flex;
      transform: rotate(45deg);
      margin-top: 10px;
    }
    .toggle-button .bar:last-child {
      display: flex;
      transform: rotate(-45deg);
      margin-bottom: 10px;
    }
    .navbar_links_not_logged {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .registerTooltip {
      // margin-top: 25px;
      align-self: center;
    }
  }
}
</style>
