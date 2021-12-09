<template>
    <section class='seeAlso'>
        <h2> See Also</h2>
        <div class='seeAlsoContainer'>
        <vueper-slides
            class="no-shadow"
            :visible-slides="3.7"
            :gap="3"
            :slide-ratio="1 / 4"
            :dragging-distance="100"
            :breakpoints="breakpoints"
            fixed-height="true"
            autoplay>
            <template #arrow-left>
                <img src="https://res.cloudinary.com/risidio/image/upload/v1633609469/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle_v37pyt.svg" alt="wallet" class="arrow"/>
            </template>
            <template #arrow-right>
                <img src="https://res.cloudinary.com/risidio/image/upload/v1633609474/RisidioMarketplace/Icon_ionic-md-arrow-dropleft-circle-1_oclpff.svg" alt="wallet" class="arrow"/>
            </template>
            <vueper-slide v-for="(item, index) in gaiaAssets" :key="index" class="galleryItem" >
              <template #content>
                <div class="galleryContainer">
                  <img :src="item.image" class="itemImg"/>
                  <p style="font-size: 1em;margin: 5px 0 0 0;"> {{!item.name ? "NFT" : item.name }} <span style="float: right; font-size: 0.6em; margin-top: 10px;">$ {{item.contractAsset.saleData.buyNowOrStartingPrice * 1.9}}</span></p>
                  <p>By <span style="font-weight:600">{{!item.artist ? "Anonymous" : item.artist }}</span> <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span></p>
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
  name: 'homeSeeAlso',
  props: ['gaiaAssets'],
  components: {
    VueperSlides,
    VueperSlide
  },
  data () {
    return {
      placeHolderItems: [],
      breakpoints: {
        1600: {
          visibleSlides: 3,
          slideRatio: 1 / 2.5
        },
        1200: {
          visibleSlides: 2,
          slideRatio: 1 / 1.5
        },
        800: {
          visibleSlides: 1.1,
          slideRatio: 1,
          arrows: false
        }
      }
    }
  },
  mounted () {
    this.generateData()
    console.log(this.placeHolderItems)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.seeAlso{
    min-height: 60vh;
    margin: 0 7% 100px 7%;
    h2{
        font-size: 40px;
        margin: 100px 20px 50px 20px;
        text-align: center;
    }
}
.seeAlsoContainer{
  max-width: 1500px;
  margin: auto;
  height: 400px;
}
.vueperslides--fixed-height {
  height: 400px;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}
.vueperslide{
  background-color:rgba(226, 226, 226, 0.8);
  min-height: 385px;
  border-radius: 30px;
}
.vueperslides__arrow .arrow{
  width: 23px;
  height: 23px;
}
.galleryItem{
  display: block;
  padding: 25px;
  margin: 0 auto;
  border-radius: 25px;
  background: rgba(129, 129, 129, 0.12) 0% 0% no-repeat padding-box;
  margin-bottom: 40px;
  max-width: 320px;
}
.galleryContainer{
  margin: auto;
  width: 100%;
}
</style>
