<template>
  <div>
    <div class="background"/>
    <div class="launchS1">
        <div class="absolute-contain">
            <div class="artistContainer">
                <h1 class="collectionName"> This is Number One Collection</h1>
                <img @click="showArtistInfo()" alt="Collection Image"
                src="https://res.cloudinary.com/risidio/image/upload/f_auto/RisidioMarketplace/genesis-1_gxeluk.jpg"  class="circleImage"/>
                <p class="collectionArtistshow" id="artistName"> Chemical X </p>
                <div class="artistInfo" id="artistInfo">
                    <p @click="showArtistInfo()" class="close-btn" >x</p>
                    <div>
                        <p class="collectionInfo1"> Chemical X </p>
                        <p class="collectionInfoDetail"> {{content.artistinfo[0].artistdescription[0].text}}</p>
                    </div>
                    <div class="icons">
                        <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640097848/RisidioMarketplace/facebook_ls2dko.svg" alt="facebook-logo">
                        <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102430/RisidioMarketplace/twitter-black-shape-svgrepo-com_pfxicm.svg" alt="twitter-logo">
                        <img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102517/RisidioMarketplace/instagram-svgrepo-com_apkdhy.svg" alt="instagram-logo">
                    </div>
                </div>
            </div>
        </div>
        <div class = "container">
            <div class="whiteContainer">
                <p class="collectionInfo2">{{content.intro[0].beforereadmore[0].text}} </p>
                <div class="extraContent" id="hiddenContent"> <p class="collectionInfo2">{{content.intro[0].afterreadmore[0].text}}</p>
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
  min-height: 10rem;
  z-index: -10;
  padding: 20px;
}
.absolute-contain{
    position: relative;
    max-width: 1500px;
    margin: auto;
}
.background{
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),
    url("https://res.cloudinary.com/risidio/image/upload/v1640097610/RisidioMarketplace/pexels-photo-1183992_myd1vf.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 165px;
    position: relative;
    object-fit: cover;
}
.container{
    padding-top: -2px;
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
  margin: -35px auto 10px auto;
  padding: 20px 20px;
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
.collectionArtistshow{
    display: inline-block;
    position: absolute;
    top:190px;
    left:165px;
    margin-bottom: 10px;
    margin-top:20px ;
}

.contentTitle{
    font: normal normal normal 20px/24px Helvetica Neue;
}
.collectionInfo{
    font: normal normal medium 17px/20px Montserrat;
    color: white;
}
.collectionInfoDetail{
    font-size: 14px;
    max-width: 575px;
    margin: auto;
    margin-top: 0px;
    padding: 5px;
    margin-bottom: 30px;
    font: normal normal medium 17px/20px Montserrat;
}
.collectionInfo2{
    // font: normal normal normal 14px/20px Montserrat;
    font-size: 14px;
    max-width: 575px;
    margin: auto;
    margin-top: 20px;
    padding: 5px;
    margin-bottom: 30px;
}
.collectionInfo1{
    font: normal normal medium 17px/20px Montserrat;
    max-width: 450px;
    padding: 0 5px;
    text-align: center;
}
.readMore{
    font: normal normal 700 14px/20px Montserrat;
    cursor: pointer;
    display: none;
    color: #50B1B5;
}
// @media(max-width: 611px){
//     .readMore{
//     padding-bottom: 200px;
//     }
// }
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
    top: -150px;
    left:0;
    right:0;
    transition: all smooth 2s ease-in-out;
}
.circleImage{
    display: inline-block;
    top:100px;
    left: 160px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
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
    left: 20px;
    margin: auto;
    z-index: 20;
    max-width: 370px;
    top: 70px;
    background: white;
    border-radius: 20px;
    padding: 20px 30px;
    box-shadow: 0px 3px 15px #00000029;
}
.artistInfo.show{
    display: flex;
    // left: -1100px;
    top:200px;
    flex-direction: row;
    gap: 10px;
}
.icons{
  position: absolute;
  bottom: 25px; right: 0;
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
.floorPrice, .owners, .volume{
    border-right: solid 2px rgb(221, 221, 221);
    padding: 5px;
}
.numbers{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 611px;
    background:#F9F9F9;
    border-radius: 25px;
    justify-content: sa;
    margin: auto;
    padding: 15px 20px;
    align-items: center;
    font: normal normal 300 16px/19px Montserrat;
    &>*{
        flex: 1 1 50px;
        text-align: center;
    }
    span{
        font-weight: 600;
    }
}

@media(max-width:1200px ){
  .whiteContainer{
    border-radius: 30px;
    margin: 50px auto 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
  .circleImage,
  .artistInfo{
    left: 0; right: 0;
  }
  .collectionArtistshow{
    text-align: center;
    right: 0; left: 0;
  }
}
@media(max-width: 611px){
  .indige-video{
    margin-right: 60px;
    width: 300px;
    height: 200px;
    margin-top: 30px;
    border-radius: 21px;
    position:absolute;
    left: 45px;
  }
  .collectionName{
    font: normal normal 300 30px/55px Montserrat;
  }
  .numbers{
    display: flex;
    flex-direction: column;
    max-width: 240px;
    font: normal normal 300 16px/19px Montserrat;
    &>*{
        flex: 1 1 50px;
        text-align: center;
    }
    span{
        font-weight: 600;
    }
  }
  .artistInfo{
    max-width: 370px;
  }
  .floorPrice, .owners{
    border-right: none;
    max-width: 240px;
    padding: 5px;
    margin-top:10px;
    border-bottom: solid 2px rgb(221, 221, 221);
  }
}
</style>
