<template>
  <div>
    <div class="background"/>
    <div class="launchS1">
            <div class="artistContainer">
                <h1 class="collectionName"> This is Number One Collection</h1>
                <img @click="showArtistInfo()" alt="Collection Image"
                src="https://res.cloudinary.com/risidio/image/upload/f_auto/RisidioMarketplace/genesis-1_gxeluk.jpg"  class="circleImage"/>
                <p class="collectionArtist show" id="artistName"> Chemical X </p>
                <div class="artistInfo" id="artistInfo">
                    <p @click="showArtistInfo()" class="close-btn" >x</p>
                    <img alt="Collection Image" src="https://res.cloudinary.com/risidio/image/upload/f_auto/RisidioMarketplace/genesis-1_gxeluk.jpg" class="circleImageInfo"/>
                    <div>
                        <p class="collectionInfo1"> Chemical X </p>
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
            <!-- <p class="collectionInfo">Catch news about the Indige Collection</p> -->
            <div class="whiteContainer">
                <!-- <p class="contentTitle" >{{content.intro[0].contenttitle[0].text}}</p> -->
                <p class="collectionInfo2">{{content.intro[0].beforereadmore[0].text}} </p>
                <div class="extraContent" id="hiddenContent"> <p class="collectionInfo2">{{content.intro[0].afterreadmore[0].text}}</p>
                <!-- <video class="indige-video"
                src="https://res.cloudinary.com/risidio/video/upload/v1645180952/du_30.0/q_70:qmax_20/RisidioMarketplace/Video_JSG_Large_Mural_qajyum.mp4"
                controls
                ></video> -->
                </div>
                <p @click="showContent(1)" class="readMore show" id="readMore"> Read More </p>
                <p @click="showContent(2)" class="readMore" id="hide"> Hide </p>
            </div>
        </div>
        <div class="numbers">
            <div class="floorPrice">
                <p> Floor Price</p>
                <p> <span>0 STX</span></p>
            </div>
            <div class="owners">
                <p> Owners </p>
                <p> <span>1</span> </p>
            </div>
            <div class="items">
                <p> Items</p>
                <p> <span>{{numberOfItems}}</span> </p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'Launch-Collection-S1',
  props: ['content', 'numberOfItems'],
  data () {
    return {
      background: 'https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg',
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
//   margin-bottom: 50px;
//   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),
//   url("https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg");
//   background-repeat: no-repeat;
//   object-fit: cover;
  padding: 20px;
}
.background{
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),
    url("https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 132px;
    object-fit: cover;
}
.container{
    padding-top: 50px;
    text-align: center;
    max-width: 700px;
    min-height: 100px;
}
.indige-video{
  width: 430px;
  height: 200px;
  border-radius: 21px;
  margin:auto;
  object-fit: cover;
}
.whiteContainer{
//   background-color:rgba(255, 255, 255, 0.637);
//   backdrop-filter: blur(2rem);
  border-radius: 30px;
  margin: 30px auto 25px auto;
  padding: 20px 50px;
}
.collectionName{
    text-align: center;
    font: normal normal 300 40px/55px Montserrat;
    padding: 10px;
    color: White;
}
.collectionArtist{
    display: none;
    font: normal normal medium 17px/20px Montserrat;
    padding: 10px;
    // color: white;
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
    // font: normal normal normal 14px/20px Montserrat;
    font-size: 14px;
    max-width: 575px;
    margin: auto;
    margin-bottom: 20px;
    padding: 5px;
}
.collectionInfo1{
    font: normal normal medium 17px/20px Montserrat;
    max-width: 450px;
    padding: 0 5px;
}
.readMore{
    font: normal normal 700 14px/20px Montserrat;
    cursor: pointer;
    display: none;
    color: #50B1B5;
}
.readMore.show{
    display: block;
}
.close-btn{
    position: absolute;
    right: 30px;
    top: 10px;
    color: #707070;
    cursor: pointer;
    &:hover{
        transform: scale(1.1)
    }
}
.extraContent{
    display: none;
}
.extraContent.show{
    display: block;
}
.artistContainer{
    position: absolute;
    top: 130px;
    left:0;
    right:0;
    margin-left: auto;
    margin-right: auto;
    transition: all smooth 2s ease-in-out;
}
.circleImage{
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    // box-shadow: 10px 10px 30px #0000002F;
    border: 2px solid white;
    margin: auto;
    object-fit: cover;
    cursor: pointer;
}
.circleImageInfo{
    width: 120px;
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
    left: 0;
    right: 0;
    margin: auto;
    max-width: 655px;
    top: 70px;
    background: white;
    border-radius: 20px;
    padding: 20px 30px;
    box-shadow: 0px 3px 15px #00000029;
}
.artistInfo.show{
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.icons{
    position: absolute;
    bottom: 25px;
    right: 0;
    left: 0;
    margin: auto;
    max-width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
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
.numbers{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 611px;
    background:#F9F9F9;
    border-radius: 25px;
    margin: auto;
    padding: 15px 20px;
    font: normal normal 300 16px/19px Montserrat;
    &>*{
        flex: 1 1 50px;
        text-align: center;
    }
    span{
        font-weight: 600;
    }
}
.floorPrice, .owners{
    border-right: solid 2px rgb(221, 221, 221);
}
</style>
