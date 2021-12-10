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

                            </div>
                            <div class="slideText">
                              <h2>{{content.heroarea[1].herotitle[0].text}}</h2>
                              <p> {{content.heroarea[1].herotext[0].text}}</p>
                              <button class="button filled"> See The Collection </button>
                            </div>
                        </div>
                        <div v-if="slide.id==2" class = "slideContainer">
                            <div class="slideImage">

                            </div>
                            <div class="slideText">
                              <h2>{{content.heroarea[2].herotitle[0].text}}</h2>
                              <p> {{content.heroarea[2].herotext[0].text}}</p>
                              <button class="button filled"> See The Collection </button>
                            </div>
                        </div>
                        <div v-if="slide.id==3" class = "slideContainer">
                            <div class="slideImage">

                            </div>
                            <div class="slideText">
                              <h2>{{slide.text}}</h2>
                              <h2>{{content.heroarea[3].herotitle[0].text}}</h2>
                              <p> {{content.heroarea[3].herotext[0].text}}</p>
                              <button class="button filled"> See The Collection </button>
                            </div>
                        </div>
                    </template>
                </vueper-slide>
              </vueper-slides>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="slideContainerNotLogged" >
            <div class="notLoggedCont">
              <iframe
              style="border-radius: 10px;"
              width="529px"
              height="300px"
              frameborder="0"
              src="https://res.cloudinary.com/risidio/video/upload/v1639140586/RisidioMarketplace/Latest_Risidio_Video_by_Fizan_100721_5_r3o1or.mp4" type="video"/>
            </div>
            <div class="notLoggedCont">
              <h1> {{content.heroarea[0].herotitle[0].text}}</h1>
              <p>{{content.heroarea[0].herotext[0].text}}</p>
              <button v-on:click="startRegister()" class="button filled" >Get Your Hiro Wallet To Start</button>
              <small v-on:click="startLogin()" style="padding-left: 40px; font-size: 0.7em; font-weight: 600; cursor: pointer"> Already Have One? Get Started </small>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'Homebanner',
  props: ['profile', 'content'],

  components: {
    VueperSlides,
    VueperSlide
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
      },
      {
        id: '3',
        text: 'Collection'
      }
    ],
    return: {
      resultSet: [],
      loaded: false
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
    }
  }

}
</script>

<style lang="scss" scoped>
.bannerContainer{
  min-height: 50vh;
}
h2{
  margin-bottom: 30px;
  letter-spacing: 1px;
  font-size: 40px;
  font-weight: 400;
}
.market_introduction_text{
  margin: auto;
  max-width: 1600px;
  text-align: center;
  color: white;
  margin: auto;
}
.button{
  margin: 0;
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
  height: 60vh;
  object-fit: cover;
  z-index: -10;
  transform: rotate(180deg);
}
.slideContainerNotLogged{
  background-color:rgba(255, 255, 255, 0.637);
  border-radius: 30px;
  max-width: 1500px;
  margin: auto;
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
  height: 400px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
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
  height:100%;
  padding: 40px;
  gap: 5%;
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
</style>
