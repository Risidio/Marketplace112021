<template>
    <div class="launchS1">
            <img class="background" src="https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg" alt="">
            <div class="icons">
                <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640097848/RisidioMarketplace/facebook_ls2dko.svg"/>
                <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102430/RisidioMarketplace/twitter-black-shape-svgrepo-com_pfxicm.svg"/>
                <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102517/RisidioMarketplace/instagram-svgrepo-com_apkdhy.svg"/>
            </div>
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
    text-align: center;
    max-width: 600px;
    margin-top: 80px;
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
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 10px 10px 30px #0000002F;
}
.background{
  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: 41rem;
  object-fit: cover;
  z-index: -10;
  transform: rotate(180deg);
  margin-bottom: 50px;
  opacity: 10%;
}
.icons{
    position: absolute;
    margin-left: auto;
    right: 80px;
    top: 250px;
}
.icon{
    margin: 0 10px;
    width: 30px;
    height: 25px;
    cursor: pointer
}
.icon:hover{
    transform: scale(1.1)
}
</style>
