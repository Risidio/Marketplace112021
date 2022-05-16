<template>
<div class="gallerySquare">
    <div v-for="(item, index) in resultSet" :key="index">
        <div class="square-display" >
            <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
            <img :src="item.image || errorImage" v-on:error="errorImage"
            alt="Risidio Gallery" class="square-display-img" loading="lazy">
            <div class="rel">
            <div class="galleryHover">
                <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;" v-if="item && item.contractAsset && item.contractAsset.saleData && item.contractAsset.saleData.buyNowOrStartingPrice">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span></p>
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
  background: transparent url("../../assets/img/sticksnstones_logo.png") center
    no-repeat;
}
.square-display-img {
  width: 211px;
  height: 189px;
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
  .nFTName,
  .nFTArtist {
    width: 180px;
  }
  .nFTName {
    font-size: 20px;
    margin-top: 10px;
    span {
      font-size: 13px;
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
  display: grid;
  display: -ms-grid;
  grid-template-columns: repeat(auto-fit, 255px);
  -ms-grid-columns: repeat(auto-fit, 255px);
  justify-content: space-evenly;
  row-gap: 40px;
  transition: all smooth 2s ease-in-out;
}
</style>
