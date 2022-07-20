<template>
    <section class="homeInfo">
                <div class="homeText">
            <h2 ref="homeTextHeading" style="font: normal bold 17px/20px Montserrat;">{{content.needahand[0].needtitle[0].text}} </h2>
            <p ref="homeTextParagraph" style="font: normal 200 40px/49px Montserrat;"> {{content.needahand[0].needtitle2[0].text}} </p>
        </div>
   <div v-if="windowWidth < 840">
      <homeInfoSwiperSlider ref="homeInfoSwiperSlider" :content="content" :profile="profile" />
    </div>
         <div v-else>
            <div class="homeInfoContainer">
                <div>
                    <div>
                        <div ref="textCon1" class="textCon slide-con">
                            <img ref="slideConImage1" src='https://res.cloudinary.com/risidio/image/upload/v1637162044/RisidioMarketplace/002-distributed_ledger_b4tq2s.svg' alt="icon">
                            <h3 ref="slideConHeading1" style="margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].sell[0].text}}  <br/><br/></h3>
                            <p ref="homeInfoText1" class="homeInfoText">{{content.needahand[0].selltext[0].text}} </p><br/>
                            <router-link ref="routerLink1" style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/my-account"> <span style="margin: auto" ref="notFilledButtonText1"  class="notFilledButtonText">My NFTs</span> </router-link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div ref="textCon2" class="textCon slide-con">
                            <img ref="slideConImage2" src='https://res.cloudinary.com/risidio/image/upload/v1637162045/RisidioMarketplace/009-coin_ojj2mp.svg' alt="icon">
                            <h3 ref="slideConHeading2" style="margin-bottom: 20px; color: white; font-size: 14px; font-weight: 700;"> {{content.needahand[0].buy[0].text}}  <br/></h3>
                            <p ref="homeInfoText2" class="homeInfoText">{{content.needahand[0].buytext[0].text}} </p>
                            <router-link ref="routerLink2" style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/nft-marketplace"> <span style="margin: auto" ref="notFilledButtonText2" class="notFilledButtonText">Gallery</span> </router-link>
                        </div>
                    </div>
                </div>
            </div>
         </div>
         <!-- Method Testing Buttons -->
         <button @click="startLogin" class="test-start-login-method">Start Login</button>
         <button @click="startRegister" class="test-start-register-method">Start Register</button>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import homeInfoSwiperSlider from './homeInfoSwiperSlider.vue'
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper'
import '@/assets/scss/swiper-bundle.css'
export default {
  name: 'HomeInfo',
  components: {
    homeInfoSwiperSlider
  },
  props: ['profile', 'content'],
  data () {
    return {
      windowWidth: window.innerWidth,
      resultSet: [],
      loaded: false,
      rand: 1
      // touchableSlide: false
    }
  },
  methods: {
    startLogin () {
      // this.$emit('updateEventCode', { eventCode: 'connect-login' })
      // const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (this.profile.loggedIn) {
        this.$emit('Logged-In', this.profile)
      } else {
        // this.$store.dispatch('rpayAuthStore/startLogin').then((profile) => {
        //   location.reload()
        // }).catch(() => {
        //   this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
        //   window.open('https://www.hiro.so/wallet', '_blank')
        // })
        this.$emit('Not-Logged-In', this.profile)
      }
    },
    startRegister () {
      this.$emit('Start-Register', 'Start Register')
      window.open('https://www.hiro.so/wallet', '_blank')
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
    font: normal 300 14px/18px Montserrat;
    display: block;
    margin: auto;
    color: white;
  }
}
.slide-con {
  margin-top: 70px;
}
.slide-con-not-logged {
  margin-top: 40px;
}
.homeInfoText {
  max-width: 275px;
  padding-bottom: 50px;
}
</style>
