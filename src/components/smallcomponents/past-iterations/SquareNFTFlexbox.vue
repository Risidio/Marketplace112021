<template>
<div class="gallerySquare">
    <div v-for="(item, index) in resultSet" :key="index">
        <div class="square-display" >
            <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
            <img :src="item.image || errorImage"
            alt="Risidio Gallery" class="square-display-img" loading="lazy">
            <div class="rel">
            <div class="galleryHover">
                <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;" v-if="item && item.contractAsset && item.contractAsset.listingInUstx">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
                <p class="nFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
            </div>
            </div>
            </b-link>
        </div>
    </div>
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
import errorImage from '@/assets/img/sticksnstones_logo.png'

export default {
  name: 'ResultSet',
  props: ['resultSet'],
  data () {
    return {
      errorImage: errorImage
    }
  }
}
</script>

<style lang="scss" scoped>
.square-display {
  background: transparent url("../../../assets/img/sticksnstones_logo.png") center
    no-repeat;
  max-width: 470px;
}
.square-display-img {
  max-width: 470px;
  max-height: 378px;
  min-height: 130px;
  // background-size: cover;
  object-fit: cover;
  // object-fit: scale-down;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
}
.rel {
  position: relative;
}
.galleryHover {
  display: none;
  position: absolute;
  bottom: 0;
  background: #ffffff28 5% 5% no-repeat padding-box;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
  opacity: 1;
  padding: 4px 16px;
  width: 100%;
  .nFTName,
  .nFTArtist {
    max-width: 100%;
  }
  .nFTName {
    font-size: 20px;
    margin-top: 10px;
    span {
      font-size: 13px;
      margin-left: 20px;
    }
  }
  .nFTArtist {
    font-size: 13px;
  }
}
@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
  .galleryHover {
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
  }
}

/* slightly transparent fallback for Firefox (not supporting backdrop-filter) */
@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .galleryHover {
    background-color: rgba(255, 255, 255, .8);
  }
}

.square-display:hover {
  .galleryHover {
    display: block;
  }
}
.gallerySquare {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 30px 0;
  transition: all smooth 2s ease-in-out;
}
@media(max-width: 735px){
  .square-display {
  background: transparent url("../../../assets/img/sticksnstones_logo.png") center
    no-repeat;
  max-width: 350px;
}
.square-display-img {
  max-width: 350px;
  max-height: 378px;
  // background-size: cover;
  object-fit: cover;
  // object-fit: scale-down;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
}
}
@media(max-width: 660px){
  .square-display {
  background: transparent url("../../../assets/img/sticksnstones_logo.png") center
    no-repeat;
  max-width: 290px;
}
.square-display-img {
  max-width: 290px;
  max-height: 378px;
  // background-size: cover;
  object-fit: cover;
  // object-fit: scale-down;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
}
}
</style>
