<template>
  <section class="bannerContainer">
    <img class="banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg" alt="banner-image">
    <div v-if="profile.loggedIn" class="if">
        <div class="loggedBanner">
            <div class="vueSlideContainer galleryContainer">
              <div
              class="no-shadow home-banner-swiper swiper"
              ref="swiper"
              >
              <template>
              </template>
                <div class="swiper-wrapper">
                  <div
                class="swiper-slide home-banner-swiper-slide"
                v-for="(slide) in slide"
                :key="slide.id">
                    <template>
                        <!-- <div v-if="slide.id==1" class = "slideContainer">
                            <div class="slideImage">
                              <h2 class="mobileHeader">{{content.heroarea[1].herotitle[0].text}}</h2>
                              <div class="collectionImageBack">
                                <img
                                src="https://res.cloudinary.com/risidio/image/upload/v1634828295/RisidioMarketplace/Screenshot_2021-10-21_at_15.57.57_q7chjf.png"
                                alt="Tiger-BitStacks-By-Benny"
                                class="collectionImage"/>
                                <img
                                src="https://res.cloudinary.com/risidio/image/upload/v1634828295/RisidioMarketplace/Screenshot_2021-10-21_at_15.57.57_q7chjf.png"
                                alt="Tiger-BitStacks-By-Benny"
                                class="collectionImage"/>
                                <img
                                src="https://res.cloudinary.com/risidio/image/upload/v1646910262/RisidioMarketplace/genesis-1_gxeluk.jpg"
                                alt="Tiger-BitStacks-By-Benny"
                                class="collectionImage collectionImageFront"/>
                              </div>
                            </div>
                            <div class="slideText">
                              <h2 class="notMobileHeader">{{content.heroarea[1].herotitle[0].text}}</h2>
                              <p class="slide-text-p"> {{content.heroarea[1].herotext[0].text}}</p>
                              <router-link to="/numberone_roots"><button class="button filled"> See The Collection </button></router-link>
                            </div>
                        </div> -->
                          <div v-if="slide.id == 1" class = "slideContainer">
                            <div class="slideImage">
                            <h1 class="mobileHeader"> The Indige Collection</h1>
                              <div class="collectionImageBack">
                                <img
                                src="@/assets/img/indigeImages/indige-40.jpg"
                                alt="Image-from-Indige"
                                class="collectionImage"/>
                                <img
                                src="@/assets/img/indigeImages/indige-60.jpg"
                                alt="Image-from-Indige"
                                class="collectionImage collectionImageFront"/>
                                <img
                                src="@/assets/img/indigeImages/indige.jpg"
                                alt="Image-from-Indige"
                                class="collectionImage"/>
                              </div>
                            </div>
                            <div class="slideText">
                              <h1 class="notMobileHeader">The Indige Collection</h1>
                              <p class="slide-text-p"> {{content.heroarea[3].herotext[0].text}}</p>
                              <router-link to="/indige_mirror/0"><button class="button filled"> See The Collection </button></router-link>
                            </div>
                        </div>
                        <div v-if="slide.id == 2" class = "slideContainer">
                            <div class="slideImage">
                            <h1 class="mobileHeader">{{content.heroarea[2].herotitle[0].text}}</h1>
                              <div class="collectionImageBack">
                                <img
                                src="https://res.cloudinary.com/risidio/image/upload/f_auto/RisidioMarketplace/Screenshot_2022-02-07_110034_vy0tyl.png"
                                alt="Image-from-Eggschain"
                                class="collectionImage"/>
                                <img
                                src="https://res.cloudinary.com/risidio/image/upload/v1644231731/RisidioMarketplace/Screenshot_2022-02-07_105958_upudjc.png"
                                alt="Image-from-Eggschain"
                                class="collectionImage"/>
                                <img
                                src="https://res.cloudinary.com/risidio/image/upload/v1644231731/RisidioMarketplace/Screenshot_2022-02-07_110021_hkdboj.png"
                                alt="Image-from-Eggschain"
                                class="collectionImage collectionImageFront"/>
                              </div>
                            </div>
                            <div class="slideText">
                              <h1 class="notMobileHeader">{{content.heroarea[2].herotitle[0].text}}</h1>
                              <p class="slide-text-p"> {{content.heroarea[2].herotext[0].text}}</p>
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
                </div>
                </div>
                <div class="swiper-button-prev swiper-arrow">
          <img src="https://res.cloudinary.com/risidio/image/upload/v1637153014/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_zpgise.svg" alt="arrow-icon" class="arrow"/>
        </div>
        <div class="swiper-button-next swiper-arrow">
          <img src="https://res.cloudinary.com/risidio/image/upload/v1637152994/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_1_ex6tmv.svg" alt="arrow-icon" class="arrow"/>
        </div>
        <div class="swiper-pagination swiper-pagination-home-banner">
          <span class="swiper-pagination-bullet swiper-pagination-clickable"></span>
          <span class="swiper-pagination-bullet swiper-pagination-clickable"></span>
        </div>
              </div>
            </div>
            <div class="searchContainer-1">
              <HomeSearchBar/>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="slideContainerNotLogged" >
            <div class="notLoggedCont">
              <h1 class="mobileHeader"> {{content.heroarea[0].herotitle[0].text}}</h1>
              <video class="home-video"
              src="https://res.cloudinary.com/risidio/video/upload/v1639140586/RisidioMarketplace/Latest_Risidio_Video_by_Fizan_100721_5_r3o1or.mp4"
              controls
              ></video>
            </div>
            <div class="slideText slideText-notLogged">
              <h1 class="notMobileHeader" style="margin-top: 50px;"> {{content.heroarea[0].herotitle[0].text}}</h1>
              <p class="slide-text-p">{{content.heroarea[0].herotext[0].text}}</p><br/>
              <div class="bannerButtonContainer">
                <router-link to="/hiro-wallet" ><button class="button filled">Get Your Hiro Wallet To Start</button></router-link><br/>
                <p class="bannerButtonText" v-on:click="startLogin()">Already Have One? Get Started</p>
              </div>
            </div>
        </div>
        <div class="searchContainer-2">
          <HomeSearchBar/>
        </div>
    </div>
  </section>
</template>

<script>
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper'
import '@/assets/scss/swiper-bundle.css'
import HomeSearchBar from './homeSearchBar.vue'
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'Homebanner',
  props: ['profile', 'content'],
  components: {
    HomeSearchBar
  },
  data: () => ({
    touchableSlide: false,
    showArrow: true,
    bullets: false,
    breakpoints: {
      700: {
        bullets: true
      }
    },
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
      rand: 1
      // touchableSlide: false
    }
  }),
  created () {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  mounted () {
    const swiper = new Swiper(this.$refs.swiper, {
      // configure Swiper to use modules
      modules: [Navigation, Pagination, Thumbs],
      // Optional parameters
      loop: true,
      speed: 400,
      slidesPerView: 1,
      spaceBetween: 300,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        bulletClass: 'swiper-pagination-bullet',
        bulletElement: 'span',
        clickableClass: 'swiper-pagination-clickable'
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      }
    })
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
        })
      }
    },
    startRegister () {
      window.open('https://www.hiro.so/wallet', '_blank')
    },
    checkScreen () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 720) {
        this.touchableSlide = true
        this.showArrow = false
      } else if (this.windowWidth > 720) {
        this.touchableSlide = false
        this.showArrow = true
      }
    }
  }

}
</script>

<style lang="scss">
.bannerContainer {
  height: 50rem;
  align-items: center;
  padding: 20px;
}
.swiper-wrapper {
  cursor: pointer;
}
.swiper-pagination-home-banner {
  display: none;
}
.swiper-arrow {
  opacity: 0.7;
  height: 25px;
  width: 25px;
  transition: 0.5s ease-in-out;
}
.swiper-arrow:hover {
  opacity: 1;
}
.home-banner-swiper-slide {
  padding: 0 50px;
}
.swiper-button-next:after {
  content: none;
}
.swiper-button-prev:after {
  content: none;
}
.if {
  max-width: 1300px;
  margin: auto;
}
.searchContainer-1 {
  margin-top: 85px;
}
.searchContainer-2 {
  margin-top: 62px;
}
.slideText {
  position: relative;
  margin-top: -30px;
  h2 {
    margin-bottom: 1rem;
    letter-spacing: 1px;
    font: normal normal 300 30px/55px Montserrat;
  }
  .slide-text-p {
    font: normal normal 300 14px/18px Montserrat;
    max-width: 450px;
  }
}

.bannerButtonContainer {
  position: relative;
  margin: -30px auto 0;
}
.bannerButtonText {
  font: normal normal bold 11px/14px Montserrat;
  position: absolute;
  top: 50px;
  left: 20px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.secondaryBannerButton {
  width: 40rem;
  padding: 14.5px 5px;
  margin-bottom: 5px;
  font-size: 0.7em;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  background: lightgrey;
}
.secondaryBannerButton:hover {
  background: rgba(255, 255, 255, 0.767);
  color: lightseagreen;
}
.market_intro_h1 {
  margin-bottom: 25px;
  color: white;
  font-weight: 200;
  font-size: clamp(2rem, 5rem, 7rem);
  word-wrap: break-word;
}
.market_intro {
  font-size: 0.7em;
  font-weight: 300;
  width: 100%;
  max-width: 500px;
  margin: auto;
  color: white;
}
.home-video {
  width: 381px;
  height: 234px;
  border-radius: 15px;
  margin: auto;
  object-fit: cover;
}
.market_intro_Ex {
  font-size: 1.2em;
}
.banner {
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
.slideContainerNotLogged {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 auto 0 auto;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.637);
  border-radius: 30px;
  gap: 100px;
  max-width: 1135px;
  min-height: 287px;
  padding: 20px;
}

.slideContainerNotLogged :nth-child(1) {
  justify-self: center;
  align-self: center;
}
.slideContainerNotLogged :nth-child(2) {
  h1,
  p {
    padding-bottom: 20px;
  }
}
.slideContainer {
  background-color: rgba(255, 255, 255, 0.637);
  border-radius: 30px;
}
.home-banner-swiper {
  height: 287px;
  max-width: 1135px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
  padding-bottom: 30px;
}
.loggedBanner,
.blurBackground {
  min-height: 400px;
  position: relative;
  z-index: 2;
  max-width: 1135px;
  margin: 35px auto;
  border-radius: 30px;
}
.home-banner-swiper .arrow {
  width: 25px;
  height: 25px;
  color: rgb(255, 255, 255);
  position: relative;
}
.slideContainer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  padding: 25px 20px;
}
.slideContainer > *:nth-child(1) {
  margin: auto;
}
.slideContainer > *:nth-child(2) {
  margin: auto;
}
.button {
  margin-top: 20px;
}
.button:hover {
  background: rgba(95, 189, 193, 0.6);
}
.collectionImage {
  display: block;
  width: 211px;
  height: 189px;
  border-radius: 10px;
  margin: auto;
  box-shadow: 10px 10px 30px #0000002f;
  object-fit: cover;
}
.slideImage {
  position: relative;
}
.collectionImageBack {
  position: relative;
  display: flex;
}
.collectionImageFront {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  transform: scale(1.15);
}

@media only screen and (max-width: 1290px) {
  .home-banner-swiper {
    max-width: 85%;
  }
  .swiper-pagination-home-banner {
    display: block;
  }
  .home-banner-swiper-slide {
    padding-bottom: 35px;
  }
}
@media only screen and (max-width: 1120px) {
  .home-banner-swiper {
    height: 54rem;
    // max-width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
  .slideContainerNotLogged {
    flex-direction: column;
  }
  .searchContainer-1 {
    margin-top: 80px;
  }
  .searchContainer-2 {
    margin-top: 25px;
  }
  .slideContainerNotLogged,
  .slideContainer {
    text-align: center;
    gap: 50px;
  }
  .button {
    margin: auto;
  }
  .bannerButtonContainer {
    max-width: 300px;
    display: grid;
    place-items: center;
    align-items: center;
    padding-bottom: 20px;
  }
  .bannerButtonText {
    left: 60px;
    bottom: -30px;
  }
  .bannerContainer {
    min-height: 75rem;
  }
}
.notMobileHeader,
.mobileHeader {
  margin-bottom: 1rem;
  letter-spacing: 1px;
  font: normal normal 300 30px/55px Montserrat;
}
.bullets--bullet {
  color: red;
}
.mobileHeader {
  display: none;
}
.notMobileHeader {
  display: block;
}
@media only screen and (max-width: 800px) {
  .home-banner-swiper-slide {
  padding: 0 50px;
  padding-bottom: 35px;
  }
}
@media only screen and (max-width: 720px) {
  .home-banner-swiper {
    max-width: 1135px;
  }
}
@media only screen and (max-width: 620px) {
  .home-banner-swiper {
    max-width: 1135px;
  }
  .collectionImage {
    width: 150px;
    height: 150px;
  }
}
@media only screen and (max-width: 550px) {
  .slideContainerNotLogged {
    flex-direction: column;
    .mobileHeader {
      margin-bottom: 0;
    }
  }
  .searchContainer-1 {
    margin-top: 80px;
  }
  .searchContainer-2 {
    margin-top: 32px;
  }
  .bannerButtonText {
    top: 100px;
  }
  .slide-text-p {
    margin-top: -35px;
  }
  .button {
    margin-top: 30px;
  }
  .mobileHeader {
    display: block;
    margin-bottom: 35px;
  }
  .notMobileHeader {
    display: none;
  }
  .slideText-notLogged {
    margin-top: 50px;
  }
  .home-banner-swiper {
    height: 60rem;
    // max-width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
  }
  .collectionImage {
    width: 150px;
    height: 150px;
  }
  .slideContainerNotLogged {
    gap: 40px;
  }
  .home-video {
    width: 300px;
  }
  .bannerContainer {
    height: 72rem;
  }
  .banner {
    height: 86rem;
  }
}
@media only screen and (max-width: 510px) {
  .collectionImage {
    width: 110px;
    height: 110px;
    margin-right: auto;
  }
}
@media only screen and (max-width: 500px) {
  .swiper-button-next {
    display: none;
  }
  .swiper-button-prev {
    display: none;
  }
  .swiper-slide {
    padding: 0;
    padding-bottom: 50px;
  }
}
@media only screen and (max-width: 420px) {
    .collectionImage {
      width: 80px;
      height: 80px;
    }
}
@media only screen and (max-width: 370px)
  {
   .home-banner-swiper {
    height: 60rem;
    // max-width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
  }
  }
  @media only screen and (max-width: 330px) {
    .swiper-slide {
      padding-bottom: 35px;
    }
    .mobileHeader {
      margin-bottom: 15px;
    }
  }
  @media only screen and (max-width: 285px)
  {
   .home-banner-swiper {
    height: 60rem;
    // max-width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
  }
  }
  @media only screen and (max-width: 1120px){
    .banner{
      height: 80rem;
    }
  }
   @media only screen and (max-width: 550px){
    .banner{
      height: 86rem;
    }
    .searchContainer-2{
      margin-top: 120px;
    }
    .bannerButtonText{
      margin-top: -20px;
    }
  }
  @media only screen and (max-width: 480px){
   .searchContainer-2{
      margin-top: 110px;
    }
  }
  @media only screen and (max-width: 410px){
   .searchContainer-2{
      margin-top: 90px;
    }
  }
  @media only screen and (max-width: 360px){
   .searchContainer-2{
      margin-top: 70px;
    }
  }
  @media only screen and (max-width: 350px){
   .searchContainer-2{
      margin-top: 60px;
    }
  }
   @media only screen and (max-width: 310px){
   .searchContainer-2{
      margin-top: 30px;
    }
  }
  @media only screen and (max-width: 375px){
   .bannerButtonText{
      margin-right: 60px;
    }
  }
</style>
