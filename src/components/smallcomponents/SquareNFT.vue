<template>
<div class="gallerySquare">
    <div v-for="(item, index) in resultSet" :key="index">
        <div v-if="item.image" class="square-display" >
            <b-link class="galleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
            <img :src="item.image"
            alt="Risidio Gallery" class="square-display-img" loading="lazy">
            <div class="rel">
            <div class="galleryHover">
                <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.saleData.buyNowOrStartingPrice}} STX</span>
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

export default {
  name: 'ResultSet',
  props: ['resultSet']
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
  background: #ffffff28 0% 0% no-repeat padding-box;
  box-shadow: 10px 10px 30px #0000002f;
  border-radius: 5px;
  opacity: 1;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
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
