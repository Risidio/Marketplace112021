<template>
  <div>
    <div v-for="(item, index) in resultSet" :key="index">
      <div v-if="item.image || errorImage" class="mobile-square-display" >
        <b-link class="mobilegalleryNFTContainer" v-bind:to="'/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex">
        <div>
          <img :src="item.image || errorImage"
            alt="Risidio Gallery" class="mobile-square-display-img" loading="lazy">
        </div>
          <h2 class="artwork">{{!item.name ? "NFT" : item.name }}</h2>
          <p class="mobilenFTArtist">By <span>{{!item.artist ? "Anonymous" : item.artist }}</span> </p>
          <div class="price">
          <p ><span v-if="item && item.contractAsset && item.contractAsset.listingInUstx">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
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
.mobile-square-display {
  min-width: 222px;
  height: 156px;
  background-color: #e4e4e4;
  justify-content: space-evenly;
  margin-top: 40px;
  z-index: -10;
  border-radius: 10px;
  // margin-left: 25px;
}
.mobile-square-display-img {
  width: 193px;
  height: 179px;
  z-index: 10;
  margin-top: -10px;
  border-radius: 8%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.artwork {
  margin-left: 220px;
  font-size: 20px;
  margin-top: -130px;
}
.mobilenFTArtist {
  margin-left: 220px;
  margin-top: -10px;
}
.mobilenFTArtist span {
  font-size: 14px;
  font-weight: 600;
  margin-top: -10px;
}
.price p {
  margin-left: 220px;
  font-size: 14px;
}

@media only screen and (max-width: 450px) {
  .artwork {
    font-size: 12px;
  }
  .mobilenFTArtist {
    font-size: 12px;
  }
  .mobilenFTArtist span {
    font-size: 12px;
  }
  .price p {
    font-size: 12px;
  }
}
@media only screen and (max-width: 320px) {
  .mobilenFTArtist span {
    font-size: 10px;
  }
}
</style>
