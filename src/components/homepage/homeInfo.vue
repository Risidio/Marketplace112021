<template>
    <section class="homeInfo">
                <div class="homeText">
            <h2 style="font: normal normal bold 17px/20px Montserrat;">{{content.needahand[0].needtitle[0].text}} </h2>
            <p style="font: normal normal 200 40px/49px Montserrat;"> {{content.needahand[0].needtitle2[0].text}} </p>
        </div>
   <div v-if="windowWidth < 840">
        <vueper-slides
              :infinite="false"
              fixed-height="true"
              :arrows="showArrow"
              class="no-shadow"
              :touchable="touchableSlide"
              :gap="2"
              :visible-slides="1"
              :bullets="bullets"
              :breakpoints="breakpoints"
              bullets-outside>
              <vueper-slide v-for="(slide) in slide"
              :key="slide.id">
              <template #content>
            <div v-if="profile.loggedIn">
            <div class="homeInfoContainer">
                <div>
                    <div>
                        <div v-if="slide.id==1"  class="textCon slide-con">
                            <img src='https://res.cloudinary.com/risidio/image/upload/v1637162044/RisidioMarketplace/002-distributed_ledger_b4tq2s.svg'/>
                            <h3 style="margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].sell[0].text}}  <br/><br/></h3>
                            <p class="homeInfoText">{{content.needahand[0].selltext[0].text}} </p><br/>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/my-account"> <span style="margin: auto"  class="notFilledButtonText">My NFTs</span> </router-link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div v-if="slide.id==2" class="textCon slide-con">
                        <img src='https://res.cloudinary.com/risidio/image/upload/v1637162045/RisidioMarketplace/009-coin_ojj2mp.svg'/>
                            <h3 style="margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].buy[0].text}}  <br/></h3>
                            <p class="homeInfoText">{{content.needahand[0].buytext[0].text}} </p>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/nft-marketplace"> <span style="margin: auto" class="notFilledButtonText">Gallery</span> </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="homeInfoContainer">
                <div>
                    <div>
                        <div v-if="slide.id==1"  class="textCon slide-con-not-logged" >
                            <!-- <h1 class="oneTwoThreeFour">3</h1> -->
                            <img src='https://res.cloudinary.com/risidio/image/upload/v1637162044/RisidioMarketplace/002-distributed_ledger_b4tq2s.svg'/>
                            <h3 style="margin-bottom: 20px; color: white; font-size: 14h3x; font-weight: 700;"> {{content.needahand[0].sell[0].text}}  <br/><br/></h3>
                            <p class="homeInfoText">{{content.needahand[0].selltext[0].text}} </p>
                        <!-- <button class='button notFilled'> My NFTs </button> -->
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div v-if="slide.id==2" class="textCon slide-con-not-logged">
                            <!-- <h1 class="oneTwoThreeFour">4</h1> -->
                        <img src='https://res.cloudinary.com/risidio/image/upload/v1637162045/RisidioMarketplace/009-coin_ojj2mp.svg'/>
                            <h3 style=" margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].buy[0].text}}  <br/><br/></h3>
                            <p class="homeInfoText">{{content.needahand[0].buytext[0].text}} </p>
                         <!-- <button  class='button notFilled'> Gallery </button> -->
                        </div>
                    </div>
                </div>
            </div>
                <button v-if="!profile.loggedIn" class='button notFilled' v-on:click="startLogin()"> Connect with Hiro Wallet </button>
        </div>
                  </template>
             </vueper-slide>
         </vueper-slides>
    </div>
         <div v-else>
            <div class="homeInfoContainer">
                <div>
                    <div>
                        <div class="textCon slide-con">
                            <img src='https://res.cloudinary.com/risidio/image/upload/v1637162044/RisidioMarketplace/002-distributed_ledger_b4tq2s.svg'/>
                            <h3 style="margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].sell[0].text}}  <br/><br/></h3>
                            <p class="homeInfoText">{{content.needahand[0].selltext[0].text}} </p><br/>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/my-account"> <span style="margin: auto"  class="notFilledButtonText">My NFTs</span> </router-link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div class="textCon slide-con">
                        <img src='https://res.cloudinary.com/risidio/image/upload/v1637162045/RisidioMarketplace/009-coin_ojj2mp.svg'/>
                            <h3 style="margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].buy[0].text}}  <br/></h3>
                            <p class="homeInfoText">{{content.needahand[0].buytext[0].text}} </p>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/nft-marketplace"> <span style="margin: auto" class="notFilledButtonText">Gallery</span> </router-link>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'HomeInfo',
  props: ['profile', 'content'],
  components: {
    VueperSlides,
    VueperSlide
    // HomeSearchBar
  },
  data: () => ({
    windowWidth: window.innerWidth,
    touchableSlide: false,
    showArrow: true,
    bullets: false,
    breakpoints: {
      840: {
        bullets: true
      }
    },
    slide: [
      {
        id: '1'

      },
      {
        id: '2'
      }
    ],
    return: {
      resultSet: [],
      loaded: false,
      rand: 1
      // touchableSlide: false
    }
  }),
  created () {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  methods: {
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
          window.open('https://www.hiro.so/wallet', '_blank')
        })
      }
    },
    startRegister () {
      window.open('https://www.hiro.so/wallet', '_blank')
    },
    checkScreen () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 840) {
        this.touchableSlide = true
        this.showArrow = false
      } else if (this.windowWidth > 840) {
        this.touchableSlide = true
        this.showArrow = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.oneTwoThreeFour {
  color: white;
  font-size: 5rem;
  font-weight: 200;
  margin-bottom: 5rem;
}
.homeInfo {
  min-height: 800px;
  background: transparent
    linear-gradient(180deg, rgba(54, 24, 165, 0.925) 0%, rgb(16, 29, 92) 100%)
    0% 0% no-repeat padding-box;
  padding: 10rem 1rem;
  color: white;
  text-align: center;
}
.homeText > * {
  color: white;
  max-width: 800px;
  margin: 10px auto;
}
.textCon {
  min-height: 30px;
  & button {
    margin: auto;
  }
  & a:hover {
    color: white;
  }
}
.button {
  margin: 50px auto;
}

.homeInfoContainer {
  max-width: 1135px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
}
.homeInfoContainer > * {
  flex-direction: row;
  flex: 1 1 400px;
  text-align: center;
  img {
    border-radius: 10px;
    display: block;
    margin: 20px auto;
    max-width: 100%;
    max-height: 300px;
  }
  p {
    font: normal normal 300 14px/18px Montserrat;
    display: block;
    margin: auto;
    color: white;
  }
}
.vueperslides--fixed-height {
  height: 450px;
}
.slide-con {
  margin-top: 70px;
}
.slide-con-not-logged {
  margin-top: 40px;
}
.vueperslide {
  background-color: transparent;
}

.homeInfoText {
  max-width: 275px;
  padding-bottom: 50px;
}
</style>
