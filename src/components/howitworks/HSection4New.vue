<template>
  <div id="frame">
    <div class = "hS4_container">
      <vueper-slides fixed-height="true" :infinite="false" class="no-shadow">
        <template #arrow-left>
          <img src="https://res.cloudinary.com/risidio/image/upload/v1633609469/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_v37pyt.svg" alt="wallet" class="arrow"/>
        </template>
        <template #arrow-right>
          <img src="https://res.cloudinary.com/risidio/image/upload/v1633609474/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle-1_oclpff.svg" alt="wallet" class="arrow"/>
        </template>
        <vueper-slide
          v-for="(slide) in slide"
          :key="slide.id"
          :title="slide.title">
          <template #content>
            <div v-if="slide.id==1" class = "container">
              <h1>{{content.howsectionslide1[0].howslidetitle[0].text}}</h1>
            <img src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg" alt="wallet" class="wallet">
              <!-- <h2> Step <br><span>0{{slide.id}} </span> </h2> -->
              <div class = "textContainer">
                    <p style="max-width: 500px; margin: auto;">{{content.howsectionslide1[0].howslidetext[0].text}}</p><br/>
                    <ol>
                        <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[1].text}}</p></li><br/>
                        <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[2].text}}</p></li><br/>
                        <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[3].text}}</p></li><br/>
                        <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[4].text}}</p></li><br/>
                        <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[5].text}}</p></li><br/>
                        <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[6].text}}</p></li>
                    </ol>
                    <button class="button"> Get Your Stacks/Hiro Wallet </button>
              </div>
            </div>
            <div v-if="slide.id==2" class = "container">
              <h1>{{content.howsectionslide2[0].howslidetitle[0].text}}</h1>
              <img src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg" alt="wallet" class="wallet">
              <!-- <h2> Step <br><span>0{{slide.id}} </span> </h2> -->
              <div class = "textContainer">
                <ol>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[1].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[2].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[3].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[4].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[5].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[6].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[7].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[8].text}}</p></li>
                </ol>
                <button class="button"> Upload Your Items </button>
              </div>
            </div>
            <div v-if="slide.id==3" class = "container">
              <h1>{{content.howsectionslide3[0].howslidetitle[0].text}}</h1>
              <img src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg" alt="wallet" class="wallet">
              <!-- <h2> Step <br><span>0{{slide.id}} </span> </h2> -->
              <div class = "textContainer">
                <ol>
                    <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[1].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[2].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[3].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[4].text}}</p></li><br/>
                    <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[5].text}}</p></li>
                </ol>
                <button class="button"> Mint Your NFTs </button>
              </div>
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
  name: 'Group4',
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
      },
      {
        id: '3',
        text: 'Set Your Royalties'
      }
    ]
  }),
  computed: {
  }
}
</script>

<style scoped>
#frame{
  margin: 50px auto;
}
.hS4_container{
  justify-content: center;
}
.vueperslide {
  background-color:#ffffff;
}
.vueperslides--fixed-height {
  height: 1100px;
  min-width: 500px;
  max-width: 1100px;
  margin: 150px auto;
  padding: 0 50px;
}
h1{
  font: normal normal 300 37px/30px Montserrat;
  text-align: center;
  margin-bottom: 50px;
}
h2{
  padding-top: 30px;
  text-align: center;
  font-weight: 400;
}
span{
  font-weight: 600;
  font-size: 1.2em;
}
img{
  height: 250px;
  width: 250px;
  margin-left: 125px;
}
p{
  font: normal normal normal 16px/24px Montserrat;
  max-width: 1000px;
  margin: 0 auto;
}
ol{
    margin: 30px;
    max-width: 550px;
    margin: auto;
}
.container{
  margin: 50px auto;
}
.textContainer{
  margin-top: 50px;
}
.arrow{
  width: 30px;
  height: 30px;
  margin: auto;
}
.button{
  margin: 50px auto 0 auto;
  color: white;
  background-color: rgb(0, 177, 201);
}
.wallet{
  margin: 0 auto 25px auto;
  display: block;
  width: 250px;
  height: 250px;
}
 @media only screen and (max-width: 770px)  {
  .vueperslides--fixed-height {height: 80vh;}
}

@media only screen and (max-width: 500px)  {
  .vueperslides--fixed-height {height: 80vh;}
}
</style>
