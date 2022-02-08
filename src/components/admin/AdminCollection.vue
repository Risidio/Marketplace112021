<template>
    <div class="adminContainer">
        <div class="adminCollections">
            <h2> Collections </h2>
            <div v-for="(loopRun, index) in projects" :key="index" class="adminCollectionList" @click="selectedCollection(loopRun)">
                <p class="singleLoopRun">{{loopRun.contractId.split(".").pop()}}</p>
            </div>
        </div>
        <div class="adminNfts">
            <div v-if="currentRun">
                <h2>{{currentRun.contractId.split(".").pop()}}</h2>
                <hr/>
                <div v-if="currentRunAssets" class="adminNFTs">
                    <div v-for="(nft, index) in currentRunAssets.gaiaAssets" :key="index" class="adminSingleNFTs">
                        <p>NFT #{{nft.contractAsset.nftIndex || 0}}</p>
                        <p>STX: {{nft.contractAsset.listingInUstx.price ||  0}}</p>
                        <div class="flex" v-if="nft.contractAsset.listingInUstx.price == 0">
                            <p>Not On Sale </p>
                            <button class="buy-button" @click="buyNFT()">List</button>
                        </div>
                        <div v-else>
                            <button class="buy-button" @click="buyNFT()">Buy</button>
                        </div>
                    </div>
                    <hr style="margin-top: 50px;"/>
                    <h4> Would you like to mint more in this Collection ?</h4>
                    <p>Index: <input type="number"/><button class="mint-button" @click="buyNFT()">Mint</button></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AdminCollectionMint',
  props: ['allLoopRuns', 'projects'],
  data () {
    return {
      currentRun: [],
      currentRunAssets: []
    }
  },
  mounted () {
    this.currentRun = this.allLoopRuns[1]
  },
  methods: {
    selectedCollection (selected) {
      this.currentRun = selected
      this.getAssets(selected)
    },
    getAssets (currentRun) {
      const data = {
        runKey: (currentRun) ? currentRun.currentRunKey : null,
        contractId: currentRun.contractId,
        // query: queryStr,
        page: 0,
        pageSize: 100
      }
      this.$store.dispatch('rpayStacksContractStore/fetchTokensByContractId', data).then((result) => {
        this.currentRunAssets = result
      })
    },
    buyNFT (buyNowData) {
      this.$store.dispatch('rpayMarketStore/buyInUstx', buyNowData).then((result) => {
        this.result = result
        this.flowType = 2
      }).catch((err) => {
        this.errorMessage = err
        this.flowType = 3
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.adminContainer{
    min-height: 50rem;
    max-width: 1500px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin: auto;
}
.adminCollectionList{
    display: grid;
    place-items: center;
    padding: 10px;
    background: rgba(128, 128, 128, 0.5);
    margin: 5px;
    border-radius: 5px;
    p{
        font-size: 14px;
        padding: 0;
        margin: 0;
    }
    &:hover{
        transform: scale(1.05);
    }
}
.adminNFTs{
    h4{
    }
}
.singleLoopRun{
}
.adminCollections{
    flex: 1 1 20%;
    min-width: 300px;
}
.adminNfts{
    flex: 1 1 60%;
    min-width: 500px;
}
.adminSingleNFTs{
    border-bottom: solid 1px grey;
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    P{
        padding: 0;
        margin: 0;text-align: center;
    }
}
.buy-button{
    display: grid;
    place-items: center;
    border: 0;
    margin: 0 auto;
    padding: 0 15px;
    font-size: 14px;
}
.mint-button{
    border: solid 1px black;
    margin: 0 auto;
    padding: 4px 15px;
    font-size: 14px;
}
.buy-button:hover,
.mint-button:hover{
    background: rgba(71, 71, 88, 0.5);
}
</style>
