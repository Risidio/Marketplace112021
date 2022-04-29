<template>
  <section class ="our_values" >
    <div class ="values_container">
      <vueper-slides fixed-height="true" :infinite="false" class="no-shadow" :touchable="false">
        <template #arrow-left>
          <img src="https://res.cloudinary.com/risidio/image/upload/v1637153014/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_zpgise.svg" alt="wallet" class="arrow"/>
        </template>
        <template #arrow-right>
          <img src="https://res.cloudinary.com/risidio/image/upload/v1637152994/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_1_ex6tmv.svg" alt="wallet" class="arrow"/>
        </template>
        <vueper-slide
          v-for="(slide) in slide"
          :key="slide.id"
          :title="slide.title">
          <template #content>
            <div v-if="slide.id==1" class = "container">
              <div class = "textContainer">
                <h1 style="font: normal normal 300 37px/30px Montserrat; color: white; margin-bottom: 50px;">{{content.aboutsection2[0].abouttitle[0].text}}</h1>
                <p style="color: white; font: normal normal normal 14px/20px Montserrat; max-width: 600px">{{content.aboutsection2[0].abouttext[0].text}}<br><br>
                  {{content.aboutsection2[0].abouttext1[0].text}}</p>
                <div class="m-5 d-flex justify-content-center">
                  <a title="read more about us" target="_blank" href="https://risidio.com/aboutus"><button class="button filled">Read More</button></a>
                </div>
              </div>
            </div>
            <div v-if="slide.id==2" class = "container">
              <div class = "textContainer">
                <h1 style="font: normal normal 300 37px/30px Montserrat; color: white; margin-bottom: 50px;">{{content.aboutsection2[1].abouttitle[0].text}}</h1>
                <p style="color: white; font: normal normal normal 14px/20px Montserrat; max-width: 600px">{{content.aboutsection2[1].abouttext[0].text}}<br><br></p>
                <div class="m-5 d-flex justify-content-center">
                  <a title="read more about us" target="_blank" href="https://risidio.com/aboutus"><button class="button filled">Read More</button></a>
                </div>
              </div>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
      </div>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'AboutSection2',
  components: {
    VueperSlides,
    VueperSlide
  },
  props: ['content'],
  data: () => ({
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
  })
}

</script>

<style lang="scss" scoped>
/* General style */
.our_values{
  background-color: rgb(11, 11, 116);
  min-height: 400px;
  text-align: center;
  justify-content: center;
  color:white;
}
.textContainer{
  margin-top: 100px;
}
.values_container{
  margin: auto;
  // max-width: 600px;

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
.vueperslide {
  background-color:rgb(11, 11, 116);
}
.vueperslides--fixed-height {
  // min-width: 500px;
  max-width: 1000px;
  height: 500px;
  margin: auto;
  // padding: 0 50px;
  // padding: 100px 15px;
}
</style>
