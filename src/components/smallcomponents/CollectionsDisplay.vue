<template>
  <div class="galleryContainer">
    <div v-for="(item, index) in activeLoopRuns" :key="index" class="NFTbackgroundColour NFTbackgroundColour-collection">
      <div class="">
          <b-link class="galleryNFTContainer" :to="item.currentRunKey" >
            <img class="nftGeneralView" :src="item.image"/>
            <p class="nFTName" style="color: white;"> {{!item.currentRun ? "Collection" : item.currentRun }} </p>
            <p class="nFTArtist" style="color: white;">By <span>{{!item.makerName ? 'unknown' : item.makerName }}</span></p>
          </b-link>
        </div>
    </div>
    <div class="NFTbackgroundColour NFTbackgroundColour-collection createCollection" >
      <p class="title"> Your Collection </p>
      <p class="text"> You have a good idea for a collection? Want to collaborate with use on that ? <br/> Awesome </p>
      <button class="button notFilledBlue"> Get In Touch </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollectionsDisplay',
  props: ['activeLoopRuns']
}
</script>

<style lang="scss" scoped>
.createCollection {
  text-align: center;
  .title {
    margin-top: 35px;
    color: white;
    font: normal normal medium 14px/18px Montserrat;
  }
  .text {
    color: white;
    font: normal normal normal 12px/20px Montserrat;
  }
  button {
    padding: 15px 40px;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.5s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
}
.galleryContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, max-content));
  gap: 20px;
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
p {
  padding: 0;
  margin: 0;
}
</style>
