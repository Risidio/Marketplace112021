<template>
<div >
<div class="navbar_container">
   <img class="nav_banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609222/RisidioMarketplace/gradienta-m_-1_v4hs5p.svg" alt="">
</div>
  <div class = "mainNavbar">
        <router-link class="risidioLogo" to="/"><img width="150px;" :src="logo" alt="risidio-logo" style="margin-left: -10px"/></router-link>
        <a href= "#" class = "toggle-button" v-on:click="mobileNavebar()">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </a>
        <div v-if="profile.loggedIn" class="navbar_links" style="margin-left: 19px">
            <router-link class="nav-items" to="/nft-marketplace/risidio/launch_collection_t1" >Gallery</router-link>
            <b-dropdown id="dropdown-1" text="Featured Collections" class=" " variant="transparent" toggle-class="text-white" size="lg" style="padding:0px; height:55%; margin: auto 10px;">
              <b-dropdown-item v-for="(loopRun, index) in allLoopRuns" :key="index" ><span style="margin-top: -1rem" v-if="loopRun.status !== 'disabled'" class="pointer" @click="showCollection(loopRun)"><span @click="linkTo(loopRun)">{{loopRun.currentRun}}</span></span></b-dropdown-item>
            </b-dropdown>
            <router-link class="nav-items text-black" to="/how-it-works" style="margin-left: auto;">How It Works</router-link>
            <router-link class="nav-items text-black" to="/about">About Risidio </router-link>
            <router-link class="nav-items navBtn" to="/my-account"> My NFT's </router-link>
        </div>
         <div v-else class="navbar_links_not_logged">
            <router-link class="nav-items text-black" to="/how-it-works" style="margin-left: auto;" id="howItWorks">How It Works</router-link>
            <router-link class="nav-items text-black" to="/about">About Risidio </router-link>
            <!-- <div @click.prevent="startLogin(); events();" id="login" class =" nav-items text-black">Login</div> -->
            <!-- <div @mouseover="isHidden = !isHidden" @blur="isHidden = !isHidden" class=" nav-items navBtn text-black" id="register" v-on:click="startRegister()"> Connect with Hiro Wallet <div v-show="isHidden" class="registerTooltip"> Click Register to download the Hiro Wallet extension and get started!</div></div> -->
            <div @mouseover="isHidden = !isHidden" @blur="isHidden = !isHidden" class=" nav-items navBtn text-black" id="register" v-on:click="startRegister()"> Connect with Hiro Wallet </div>
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
      logo: 'https://res.cloudinary.com/risidio/image/upload/v1636649879/RisidioMarketplace/Groupe_15980_s92src.svg',
      isHidden: false,
      loopRuns: [],
      showColls: false
    }
  },
  mounted () {
    this.makerUrlKey = this.$route.params.makerß
    this.currentRunKey = this.$route.params.collection
  },
  methods: {
    linkTo (data) {
      this.$router.push('/nft-marketplace/' + data.makerUrlKey + '/' + data.currentRunKey)
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
          console.log(profile)
          location.reload()
        }).catch(() => {
          this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
          window.open('https://www.hiro.so/wallet', '_blank')
        })
      }
    },
    mobileNavebar () {
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (myProfile.loggedIn) {
        const navLogged = document.getElementsByClassName('navbar_links')[0]
        const mainNavbar = document.getElementsByClassName('mainNavbar')[0]
        mainNavbar.classList.toggle('active')
        navLogged.classList.toggle('active')
        console.log('active profile')
      } else {
        const mainNavbar = document.getElementsByClassName('mainNavbar')[0]
        const notLogged = document.getElementsByClassName('navbar_links_not_logged')
        mainNavbar.classList.toggle('active')
        notLogged.classList.toggle('active')
        console.log('active not profile')
      }
    },
    startRegister () {
      this.startLogin()
    },
    aboutRisidio () {
      window.open('https://www.Risidio.com', '_blank')
    }
  },
  computed: {
    allLoopRuns () {
      const loopRuns = this.$store.getters[APP_CONSTANTS.GET_LOOP_RUNS]
      return loopRuns
    },
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
    }
  }
}
</script>

<style lang="scss">
.mainNavbar{
  display: flex;
  width: 90vw;
  margin: 20px auto 13px auto;
}
/* NAVBAR PADDING AND WIDTH */
.nav_banner{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100px;
  object-fit: cover;
  z-index: -11;
}
.nav-start:hover{
  color: white;
}
.navbar_links_not_logged, .navbar_links{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.toggle-button{
  position:absolute;
  top: 3.7rem;
  right: 3.5rem;
  display:none;
  flex-direction:column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
}
.toggle-button .bar{
  height: 2px;
  width:90%;
  background-color: #fff;
  border-radius:10px;
}
.nav-items{
  margin: auto 0;
  padding: 20px;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
}
.nav-items:hover{
  color: white;
}

.navBtn{
  background: rgba(255, 255, 255, 0.247);
  padding: 15px 40px;
  border-radius: 50px;
  margin: auto 0 auto 40px;
  max-height: 50px;
  text-align: center;
  justify-items: center;
  align-items: center;
  color: #5FBDC1;
  cursor: pointer;
  outline: none;
}
.navBtn:hover{
  color: white;
}

.registerTooltip{
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
@media only screen and (max-width: 1000px){
  .toggle-button{
    display:flex;
  }
  .mainNavbar{
    flex-direction:column;
    z-index: 1000;
  }
  .navbar_links_not_logged, .navbar_links{
    display: none;
  }
  .login{
    min-width: 200px;
    margin-left:auto;
    margin-right:auto;
    margin-top: 20px;
  }
  .nav-items{
    margin-left: auto;
    margin-right: auto;

  }
  .navbar_links.active, .navbar_links_not_logged.active{
    display:flex;
    padding: 15px;
    width:100%;
    flex-direction: column;

  }
  .mainNavbar.active{
    position:absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    z-index: 20;
    transition:all ease-in .1s;
    padding-top: 50px;
    background: linear-gradient(#261399,#13086c);
    align-items: center;
    padding-bottom: 100px;
    margin-top: -20px;
    .toggle-button{
      top: 6rem;
    }
    .toggle-button .bar{
      display: none;
    }
    .toggle-button .bar:first-child{
      display:flex;
      transform: rotate(45deg);
      margin-top: 10px;
    }
    .toggle-button .bar:last-child{
      display:flex;
      transform: rotate(-45deg);
      margin-bottom: 10px;
    }
    .navbar_links_not_logged{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .registerTooltip{
      margin-top: 25px;
      align-self: center;
    }
  }
}
</style>
