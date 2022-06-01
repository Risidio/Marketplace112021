<template>
<div>
    <div class="background"/>
    <div class="launchS1">
        <div class="absolute-contain">
            <div class="artistContainer">
                <h1 class="collectionName">The Indige Collection </h1>
                <img @click="showArtistInfo()" alt="Collection Image"
                src="https://res.cloudinary.com/risidio/image/upload/q_auto:eco/f_auto/RisidioMarketplace/unknown_fhqpon.png"  class="circleImage"/>
                <p class="collectionArtistshow" id="artistName"> John Smith Gumbula </p>
                <p class="collectionArtistshow1">
                  Cultural Ambassador, Indige Founder, Chief Indige Officer & Risidio Chief Indigenous Officer.
                </p>
                <div class="artistInfo" id="artistInfo">
                    <p @click="showArtistInfo()" class="close-btn" >x</p>
                    <!-- <img alt="Collection Image" src="https://res.cloudinary.com/risidio/image/upload/q_auto:eco/f_auto/RisidioMarketplace/unknown_fhqpon.png" class="circleImageInfo"/> -->
                    <div class="collectionDiv">
                        <p class="collectionInfo1"> John Smith Gumbula </p>
                        <p class="collectionInfo3"> Cultural Ambassador, Indige Founder, Chief Indige Officer & Risidio Chief Indigenous Officer. </p>
                        <p class="collectionInfoDetail"> {{content.artistinfo[0].artistdescription[0].text}}</p>
                    </div>
                    <div class="icons">
                        <a href="https://twitter.com/jsgumbula" target="_blank"><img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102430/RisidioMarketplace/twitter-black-shape-svgrepo-com_pfxicm.svg" alt="twitter-logo"></a>
                        <a href=" https://www.instagram.com/johnsmithgumbula/" target="_blank"><img class="icon" src="https://res.cloudinary.com/risidio/image/upload/v1640102517/RisidioMarketplace/instagram-svgrepo-com_apkdhy.svg" alt="instagram-logo"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class = "container">
            <!-- <p class="collectionInfo">Catch news about the Indige Collection</p> -->
            <div class="whiteContainer">
                <!-- <p class="contentTitle" >{{content.intro[0].contenttitle[0].text}}</p> -->
                <p class="collectionInfo2">{{content.intro[0].beforereadmore[0].text}} </p>
                <div class="extraContent" id="hiddenContent"> <p class="collectionInfo2">{{content.intro[0].afterreadmore[0].text}}</p>
                <video class="indige-video"
                src="https://res.cloudinary.com/risidio/video/upload/v1645180952/du_30.0/q_70:qmax_20/RisidioMarketplace/Video_JSG_Large_Mural_qajyum.mp4"
                controls
                ></video>
                </div>
                <p @click="showContent(1)" class="readMore show" id="readMore"> Read More </p>
                <p @click="showContent(2)" class="readMore" id="hide"> Hide </p>
            </div>
        </div>
        <div class="numbers">
            <div class="floorPrice">
                <p> Floor Price</p>
                <p v-if="!loadingFloor"> <span class="blue">{{floorPrice || 'N/A'}} </span>STX</p>
                <img class="loading-small" v-else alt="loading" :src="loadingImage">
            </div>
            <div class="owners">
                <p> Owners </p>
                <p v-if="!loadingOwners"> <span class="blue">{{owners || 'N/A'}}</span> </p>
                <img class="loading-small" v-else alt="loading" :src="loadingImage">
            </div>
            <div class="items">
                <p> Items</p>
                <p v-if="!loadingItems"> <span class="blue">{{numberOfItems || 'N/A'}}</span> </p>
                <img class="loading-small" v-else alt="loading" :src="loadingImage">
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import loadingImage from '@/assets/img/loading2.gif'

export default {
  name: 'Indige-Collection-S1',
  props: ['content', 'project'],
  data () {
    return {
      background: 'https://res.cloudinary.com/risidio/image/upload/v1649414606/RisidioMarketplace/indige-15_raduat.jpg',
      loadingImage: loadingImage,
      showArtist: false,
      resultSet: [],
      numberOfItems: null,
      loading: false,
      floorPrice: null,
      owners: null,
      loadingOwners: true,
      loadingFloor: true,
      loadingItems: true
    }
  },
  watch: {
    'project' () {
      console.log('project')
      this.sortCollection(this.project)
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
    },
    sortCollection (loopRun) {
      this.loadingItems = true
      const data = {
        contractId: loopRun.contractId,
        asc: true,
        runKey: loopRun ? loopRun.currentRunKey : null,
        page: 0,
        pageSize: 10000
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        this.resultSet = result.gaiaAssets
        this.numberOfItems = result.tokenCount
        this.getFloorPrice()
        this.getOwners()
        this.loading = false
        this.loadingItems = false
      })
    },
    getFloorPrice () {
      this.loadingFloor = true
      const price = []
      this.resultSet.map((item) => {
        if (item.contractAsset.listingInUstx && item.contractAsset.listingInUstx.price !== null) {
          price.push(item.contractAsset.listingInUstx.price)
        }
      })
      this.floorPrice = Math.min(...price)
      this.loadingFloor = false
    },
    getOwners () {
      this.loadingOwners = true
      const owner = []
      this.resultSet.map((item) => {
        if (!owner.includes(item.contractAsset.owner)) {
          owner.push(item.contractAsset.owner)
        }
      })
      this.owners = owner.length
      this.loadingOwners = false
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS1 {
  min-height: 10rem;
  z-index: -10;
  padding: 20px;
}
.absolute-contain {
  position: relative;
  max-width: 1500px;
  margin: auto;
}
.loading-small{
  max-width: 100px;
  margin: 0;
}
.background {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    ),
    url("https://res.cloudinary.com/risidio/image/upload/v1649414606/RisidioMarketplace/indige-15_raduat.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 165px;
  position: relative;
  object-fit: cover;
}
.container {
  padding-top: -2px;
  text-align: center;
  max-width: 700px;
  min-height: 100px;
}
.indige-video {
  width: 430px;
  height: 200px;
  border-radius: 21px;
  margin: auto;
  object-fit: cover;
}

.whiteContainer {
  //   background-color:rgba(255, 255, 255, 0.637);
  //   backdrop-filter: blur(2rem);
  border-radius: 30px;
  margin: -35px auto 10px auto;
  padding: 20px 20px;
}
.collectionName {
  text-align: center;
  font: normal normal 300 40px/55px Montserrat;
  padding: 10px;
  color: White;
  margin-top: 30px;
}

.collectionArtist {
  display: none;
  font: normal normal medium 17px/20px Montserrat;
  padding: 10px;
  // color: white;
  text-align: center;
}
.collectionArtistshow {
  display: inline-block;
  position: absolute;
  top: 190px;
  left: 125px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.collectionArtistshow1 {
  display: inline-block;
  position: absolute;
  left: 55px;
  top: 230px;
  font-size: 13px;
  text-align: center;
  max-width: 300px;
  color: #2e638c;
  font-weight: 500;
}
.contentTitle {
  font: normal normal normal 20px/24px Helvetica Neue;
}
.collectionInfo {
  font: normal normal medium 17px/20px Montserrat;
  color: white;
}
.collectionInfoDetail {
  font-size: 14px;
  max-width: 575px;
  margin: auto;
  margin-top: 0px;
  padding: 5px;
  margin-bottom: 30px;
  font: normal normal medium 17px/20px Montserrat;
}
.collectionInfo2 {
  // font: normal normal normal 14px/20px Montserrat;
  font-size: 14px;
  max-width: 575px;
  margin: auto;
  margin-top: 45px;
  padding: 5px;
  margin-bottom: 30px;
}
.collectionInfo1 {
  font: normal normal medium 17px/20px Montserrat;
  max-width: 450px;
  padding: 0 5px;
  text-align: center;
}
.collectionInfo3 {
  font-size: 14px;
  max-width: 450px;
  padding: 0 5px;
  text-align: center;
  // margin-top: -10px;
  color: #2e638c;
}
.readMore {
  font: normal normal 700 14px/20px Montserrat;
  cursor: pointer;
  display: none;
  color: #50b1b5;
}
.blue{color: #50b1b5}
// @media(max-width: 611px){
//     .readMore{
//     padding-bottom: 200px;
//     }
// }
.readMore.show {
  display: block;
}
.close-btn {
  position: absolute;
  right: 30px;
  top: 10px;
  color: #707070;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
.extraContent {
  display: none;
}
.extraContent.show {
  display: block;
}
.artistContainer {
  position: absolute;
  top: -175px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  transition: all smooth 2s ease-in-out;
}
.circleImage {
  display: inline-block;
  top: 100px;
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

.circleImageInfo {
  width: 120px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
.circleImage:hover {
  transform: scale(1.1);
}
.artistInfo {
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
.artistInfo.show {
  display: flex;
  // left: -1100px;
  top: 200px;
  flex-direction: row;
  gap: 10px;
}
.icons {
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
.icon {
  margin: 0 10px;
  width: 20px;
  height: 18px;
  cursor: pointer;
}
.icon:hover {
  transform: scale(1.1);
}
.floorPrice,
.owners,
.volume {
  border-right: solid 2px rgb(221, 221, 221);
  padding: 5px;
}
.numbers {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 611px;
  background: #f9f9f9;
  border-radius: 25px;
  justify-content: sa;
  margin: auto;
  padding: 15px 20px;
  align-items: center;
  font: normal normal 300 16px/19px Montserrat;
  & > * {
    flex: 1 1 50px;
    text-align: center;
  }
  span {
    font-weight: 600;
  }
}

@media (max-width: 1200px) {
  .whiteContainer {
    border-radius: 30px;
    margin: 120px auto 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
  .circleImage,
  .artistInfo {
    left: 0;
    right: 0;
  }
  .collectionArtistshow,
  .collectionArtistshow1 {
    text-align: center;
    right: 0;
    left: 0;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (max-width: 611px) {
  .indige-video {
    width: 330px;
  }
  .collectionName {
    font: normal normal 300 30px/55px Montserrat;
  }
  .numbers {
    display: flex;
    flex-direction: column;
    max-width: 240px;
    font: normal normal 300 16px/19px Montserrat;
    & > * {
      flex: 1 1 50px;
      text-align: center;
    }
    span {
      font-weight: 600;
    }
  }
  .artistInfo {
    max-width: 370px;
  }
  .floorPrice,
  .owners {
    border-right: none;
    max-width: 240px;
    padding: 5px;
    margin-top: 10px;
    border-bottom: solid 2px rgb(221, 221, 221);
  }
}
</style>
