<template>
    <div class="launchS1">
            <div class="background" alt=""/>
            <div class="artistContainer">
                <img @click="showArtistInfo()" alt="Collection Image" src="https://res.cloudinary.com/risidio/image/upload/q_auto:eco/f_auto/RisidioMarketplace/JOHN_PAINTINGS_01_bma7pe.jpg" class="circleImage"/>
                <p class="collectionArtist show" id="artistName"> Indige </p>
                <div class="artistInfo" id="artistInfo">
                    <img alt="Collection Image" src="https://res.cloudinary.com/risidio/image/upload/q_auto:eco/f_auto/RisidioMarketplace/JOHN_PAINTINGS_01_bma7pe.jpg" class="circleImageInfo"/>
                    <div>
                    <p class="collectionInfo1"> Indige </p>
                    <p class="collectionInfo2"> {{content.artistinfo[0].artistdescription[0].text}}</p>
                    </div>
                    <div class="icons">
                        <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640097848/RisidioMarketplace/facebook_ls2dko.svg"/>
                        <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102430/RisidioMarketplace/twitter-black-shape-svgrepo-com_pfxicm.svg"/>
                        <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102517/RisidioMarketplace/instagram-svgrepo-com_apkdhy.svg"/>
                    </div>
                </div>
            </div>
        <div class = "container">
            <h1 class="collectionName">The Indige Collection </h1>
            <p class="collectionInfo">Catch news about the Indige Collection</p>
            <div class="whiteContainer">
                <p class="contentTitle" >{{content.intro[0].contenttitle[0].text}}</p>
                <p class="collectionInfo2">{{content.intro[0].beforereadmore[0].text}} </p>
                <div class="extraContent collectionInfo2" id="hiddenContent"> <p>{{content.intro[0].afterreadmore[0].text}}</p>
                <video class="indige-video"
                src="https://res.cloudinary.com/risidio/video/upload/v1645180952/du_30.0/q_70:qmax_20/RisidioMarketplace/Video_JSG_Large_Mural_qajyum.mp4"
                controls
                ></video>
                </div>
                <p @click="showContent(1)" class="readMore show" id="readMore"> Read More </p>
                <p @click="showContent(2)" class="readMore" id="hide"> Hide </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Indige-Collection-S1',
  props: ['content'],
  data () {
    return {
      background: 'https://res.cloudinary.com/risidio/image/upload/v1645092568/RisidioMarketplace/INDIGEWHALE_2_baclhi.jpg',
      showArtist: false
    }
  },
  methods: {
    showContent (show) {
      if (show === 1) {
        document.getElementById('hiddenContent').classList.add('show')
        document.getElementById('readMore').classList.remove('show')
        document.getElementById('hide').classList.add('show')
      } else {
        document.getElementById('hiddenContent').classList.remove('show')
        document.getElementById('hide').classList.remove('show')
        document.getElementById('readMore').classList.add('show')
      }
    },
    showArtistInfo () {
      this.show = !this.show
      if (this.show === true) {
        document.getElementById('artistInfo').classList.add('show')
        document.getElementById('artistName').classList.remove('show')
      } else if (this.show === false) {
        document.getElementById('artistInfo').classList.remove('show')
        document.getElementById('artistName').classList.add('show')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS1{
  width: 100%;
  min-height: 45rem;
  z-index: -10;
  margin-bottom: 50px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),
  url("https://res.cloudinary.com/risidio/image/upload/v1645092568/RisidioMarketplace/INDIGEWHALE_2_baclhi.jpg");
//   background-repeat: no-repeat;
    background-position: center;
  padding: 20px;
}
// .background{
//   left: 0;
//   top: 100px;
//   width: 100%;
//   height: 45rem;
//   z-index: -10;
//   margin-bottom: 50px;
//   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),
//   url("https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg");
//   background-repeat: no-repeat;
//   background-position-y: 0  ;
//   background-position-x: center;
//   object-fit: cover;
// }
.container{
    padding-top: 50px;
    text-align: center;
    max-width: 700px;
    min-height: 100px;
}
.indige-video{
  width: 381px;
  height: 234px;
  border-radius: 5px;
  margin:auto;
  object-fit: center;
}
.whiteContainer{
  background-color:rgba(255, 255, 255, 0.637);
  border-radius: 30px;
  margin: 50px auto 25px auto;
  padding: 20px 50px;
  backdrop-filter: blur(2rem);
}
.collectionName{
    font: normal normal 300 40px/55px Montserrat;
    padding: 10px;
    color: White;
}
.collectionArtist{
    display: none;
    font: normal normal medium 17px/20px Montserrat;
    padding: 10px;
    color: white;
    text-align: center;
}
.collectionArtist.show{
    display: block;
}
.contentTitle{
    font: normal normal normal 20px/24px Helvetica Neue;
}
.collectionInfo{
    font: normal normal medium 17px/20px Montserrat;
    color: white;
}
.collectionInfo2{
    font: normal normal normal 14px/20px Montserrat;
    max-width: 450px;
    margin: auto;
    padding: 5px;
}
.collectionInfo1{
    font: normal normal medium 17px/20px Montserrat;
    max-width: 450px;
    padding: 5px;
}
.readMore{
    font: normal normal 700 14px/20px Montserrat;
    cursor: pointer;
    display: none;
}
.readMore.show{
    display: block;
}
.extraContent{
    display: none;
}
.extraContent.show{
    display: block;
}
.artistContainer{
    position: absolute;
    margin-left: auto;
    right: 80px;
    top: 130px;
}
.circleImage{
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 10px 10px 30px #0000002F;
    border: 2px solid white;
    margin: auto;
    object-fit: cover;
}
.circleImageInfo{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}
.circleImage:hover{
    transform: scale(1.1);
}
.artistInfo{
    display: none;
    position: absolute;
    z-index: 20;
    right: 0;
    min-width: 500px;
    top: 110px;
    background: white;
    border-radius: 20px;
    padding: 20px 30px;
}
.artistInfo.show{
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.icons{
    position: absolute;
    right: 10px;
    top: 10px;
//     margin-left: auto;
//     right: 46%;
//     top: 520px;
// }
}
.icon{
    margin: 0 10px;
    width: 20px;
    height: 18px;
    cursor: pointer
}
.icon:hover{
    transform: scale(1.1)
}
</style>
