<template>
  <section class ="our_values">
    <div class="swiper about-section-wrapper" ref="swiper">
      <div class="swiper-wrapper">
          <div
          class="swiper-slide"
          v-for="(slide) in slide"
          :key="slide.id"
          :title="slide.title">
          <template>
            <div v-if="slide.id==1" class = "container">
              <div class = "textContainer">
                <h2 style="font: normal normal 300 37px/30px Montserrat; color: white; margin-bottom: 50px;">{{content.aboutsection2[0].abouttitle[0].text}}</h2>
                <p style="color: white; font: normal normal normal 14px/20px Montserrat; max-width: 600px">{{content.aboutsection2[0].abouttext[0].text}}<br><br>
                  {{content.aboutsection2[0].abouttext1[0].text}}</p>
                <div class="m-5 d-flex justify-content-center">
                  <a title="read more about us" target="_blank" href="https://risidio.com/aboutus"><button class="button filled">Read More</button></a>
                </div>
              </div>
            </div>
            <div v-if="slide.id==2" class = "container">
              <div class = "textContainer">
                <h2 style="font: normal normal 300 37px/30px Montserrat; color: white; margin-bottom: 50px;">{{content.aboutsection2[1].abouttitle[0].text}}</h2>
                <p style="color: white; font: normal normal normal 14px/20px Montserrat; max-width: 600px">{{content.aboutsection2[1].abouttext[0].text}}<br><br></p>
                <div class="m-5 d-flex justify-content-center">
                  <a title="read more about us" target="_blank" href="https://risidio.com/aboutus"><button class="button filled">Read More</button></a>
                </div>
              </div>
            </div>
          </template>
        </div>
        </div>
        <div class="swiper-button-prev">
          <img src="https://res.cloudinary.com/risidio/image/upload/v1637153014/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_zpgise.svg" alt="arrow-icon" class="arrow"/>
        </div>
        <div class="swiper-button-next">
          <img src="https://res.cloudinary.com/risidio/image/upload/v1637152994/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_1_ex6tmv.svg" alt="arrow-icon" class="arrow"/>
        </div>
        <div class="swiper-pagination">
          <span class="swiper-pagination-bullet swiper-pagination-clickable"></span>
          <span class="swiper-pagination-bullet swiper-pagination-clickable"></span>
        </div>
      </div>
  </section>
</template>

<script>
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper'
import '@/assets/scss/swiper-bundle.css'

export default {
  name: 'AboutSection2',
  props: ['content'],
  data: () => ({
    windowWidth: window.innerWidth,
    touchableSlide: true,
    showArrow: true,
    bullets: false,
    breakpoints: {
      1272: {
        touchableSlide: true,
        bullets: true
      }
    },
    slide: [
      {
        id: '1',
        text: 'Upload Your Item'
      },
      {
        id: '2',
        text: 'Mint the Bitcoin'
      }
    ],
    return: {
      response: null
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
      spaceBetween: 150,

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
    checkScreen () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 1272) {
        this.touchableSlide = true
        this.showArrow = false
      } else if (this.windowWidth > 1272) {
        this.touchableSlide = false
        this.showArrow = true
      }
    }
  }
}

</script>

<style lang="scss" scoped>
/* General style */
.about-section-wrapper {
  min-height: 410px;
  max-width: 1000px;
}
.swiper-wrapper {
  cursor: pointer;
}
.our_values{
  background-color: rgb(11, 11, 116);
  min-height: 490px;
  text-align: center;
  justify-content: center;
  color:white;
}
.textContainer{
  margin-top: 100px;
}
.swiper-button-next:after {
  content: none;
}
.swiper-button-prev:after {
  content: none;
}
.swiper-button-prev {
  left: 3.5rem;
}
.swiper-button-next {
  right: 3.5rem;
}
.swiper-pagination-bullet-active {
  background-color: #5ebcc0;
}
.arrow {
  opacity: 0.7;
  height: 25px;
  width: 25px;
  transition: 0.5s ease-in-out;
}
.swiper-slide {
  cursor: grab;
}
.arrow:hover {
  opacity: 1;
}
.swiper-pagination-bullet {
  padding: 6px;
}
.values_container{
  margin: auto;
  // max-width: 600px;

}
.button{
  display: inline-block;
  margin-top: -10px;
}
@media only screen and (max-width: 550px){
  .button {
}
}
h1{
  padding-bottom: 25px;
  text-align: center;
}
p{
  padding: 0 10px;
  max-width: 600px;
  margin: 0 auto;
}
@media only screen and (max-width: 700px) {
  .swiper-button-prev {
    display: none;
  }
  .swiper-button-next {
    display: none;
  }
  .about-section-wrapper {
    min-height: 430px;
  }
}
@media only screen and (max-width: 450px) {
  .about-section-wrapper {
    min-height: 450px;
  }
}
@media only screen and (max-width: 370px) {
  .our_values {
    min-height: 550px;
  }
  .about-section-wrapper {
    min-height: 490px;
  }
}
@media only screen and (max-width: 310px) {
  .our_values {
    min-height: 570px;
  }
  .about-section-wrapper {
    min-height: 510px;
  }
}
@media only screen and (max-width: 280px) {
  .our_values {
    min-height: 600px;
  }
  .about-section-wrapper {
    min-height: 540px;
  }
}
@media only screen and (max-width: 250px) {
  .our_values {
    min-height: 630px;
  }
  .about-section-wrapper {
    min-height: 570px;
  }
}
@media only screen and (max-width: 230px) {
  .our_values {
    min-height: 660px;
  }
  .about-section-wrapper {
    min-height: 600px;
  }
}
</style>
