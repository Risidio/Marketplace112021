<template>
    <div class="launchS1">
            <!-- <img alt="background" src="https://res.cloudinary.com/risidio/image/upload/v1640097201/RisidioMarketplace/pexels-photo-1183992_hbs27i.jpg"/> -->
            <img class="background" src="https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg" alt="">
        <div class = "container">
            <img alt="Collection Image" src="https://res.cloudinary.com/risidio/image/upload/v1640003055/RisidioMarketplace/Tiger_BitStacks_By_Benny_d8rprd.png" class="circleImage"/>
            <h1 class="collectionName">{{content.intro[0].title[0].text}}</h1>
            <p class="collectionArtist"> {{content.intro[0].artist[0].text}}</p>
            <p class="collectionInfo">{{content.intro[0].text1[0].text}}</p>
            <p class="collectionInfo2">{{content.intro[0].text2[0].text}} </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Launch-Collection-S1',
  props: ['content']
}
</script>

<style lang="scss" scoped>
.launchS1{
    min-height: 500px;
    display: grid;
    place-items: center;
    margin-bottom: 50px;
}
.container{
    margin-top: 50px;
    text-align: center;
    max-width: 600px;
}
.collectionName{
    font: normal normal 300 40px/55px Montserrat;
    padding: 10px;
}
.collectionArtist{
    font: normal normal 300 24px/30px Montserrat;
    padding: 10px;
}
.collectionInfo{
    font: normal normal bolder 17px/20px Montserrat;
    padding: 5px;
}
.collectionInfo2{
    font: normal normal normal 14px/20px Montserrat;
    padding: 5px;
}
.circleImage{
    width: 250px;
    height: 250px;
    border-radius: 50%;
    box-shadow: 10px 10px 30px #0000002F;
}
.background{
  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: 40rem;
  object-fit: cover;
  z-index: -10;
  transform: rotate(180deg);
  margin-bottom: 50px;
  opacity: 10%;
}
</style>
