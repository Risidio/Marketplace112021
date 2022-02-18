<template>
<div>
  <b-row>
    <b-col cols="12" style="text-align: center;">
      <h1 style="font: normal normal 300 30px/55px Montserrat;">Confirm</h1>
      <p style="center; font: normal normal normal 14px/18px Montserrat;"> You are going to buy</p>
      <p style="font: normal normal 300 20px/24px Montserrat;">{{item.name}}</p>
    </b-col>
  </b-row>
  <b-row class="row text-left mt-2">
    <b-col md="4" sm="12">
      <p>The owner of the artwork sets the numebr of editions that can be minted but the owner of each edition decides how much to mint each for.</p>
    </b-col>
    <b-col md="5" sm="6" style="border-right: 1pt solid #000;">
      <div>
        <h3>Mint Edition: <span class="text-warning">{{currentCost}}</span> STX</h3>
        <h5>{{currentMaxEditions - (editionCounter - 1)}} available in current run</h5>
      </div>
      <div class="text-small">
        <RatesListing :message="''" :amount="currentCost"/>
      </div>
    </b-col>
  </b-row>
  <button class="button notFilledBlue" :buttonLabel="'BUY EDITION'" @click="mintEdition">BUY EDITION</button>
</div>
</template>

<script>
import RatesListing from '@/views/marketplace/components/toolkit/RatesListing'

export default {
  name: 'EditionFlow',
  components: {
    RatesListing
  },
  props: ['item', 'loopRun'],
  data () {
    return {
      loading: true,
      formSubmitted: false,
      errorMessage: null,
      defaultRate: null
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    rateMessage: function () {
      return 'Mint the next edition for ' + this.currentCost + ' STX'
    },
    mintEdition: function () {
      this.errorMessage = 'Minting non fungible token - takes a minute or so..'
      const methos = (process.env.VUE_APP_NETWORK === 'local') ? 'callContractRisidio' : 'callContractBlockstack'
      const data = {
        sendAsSky: true,
        owner: this.item.contractAsset.owner,
        editionCost: this.currentCost,
        action: methos,
        nftIndex: this.item.contractAsset.nftIndex,
        contractAddress: this.loopRun.contractId.split('.')[0],
        contractName: this.loopRun.contractId.split('.')[1],
        functionName: 'mint-edition'
      }
      this.$store.dispatch('rpayPurchaseStore/mintEdition', data).then((result) => {
        this.$emit('mintedEvent', result)
      }).catch(() => {
        this.$emit('mintedEvent', { opcode: 'mint-edition-failed' })
      })
    },
    buyNFT (currentRun, nft) {
      console.log(currentRun)
      const data = {
        commissionContractAddress: 'ST22QPESFJ8XKJDWR1MHVXV2S4NBE44BA944NS4D2',
        commissionContractName: 'commission',
        owner: currentRun.owner,
        nftIndex: nft.contractAsset.nftIndex,
        price: nft.contractAsset.listingInUstx.price,
        sendAsSky: true, // only applicable in local
        contractAddress: nft.contractAsset.contractId.split('.')[0],
        contractName: nft.contractAsset.contractId.split('.')[1],
        functionName: 'buy-in-ustx',
        assetName: nft.contractAsset.contractId.split('.')[1],
        batchOption: 1
      }
      this.$store.dispatch('rpayMarketStore/buyInUstx', data).then((result) => {
        this.result = result
        this.flowType = 2
      }).catch((err) => {
        this.errorMessage = err
        this.flowType = 3
      })
    }
  },
  computed: {
    currentCost: function () {
      return this.item.contractAsset.listingInUstx.price
    },
    editionsMintable: function () {
      return (this.item.contractAsset.tokenInfo.maxEditions >= this.item.contractAsset.editionCounter)
    },
    editionCounter: function () {
      return this.item.contractAsset.editionCounter
    },
    currentMaxEditions: function () {
      return this.item.contractAsset.tokenInfo.maxEditions
    }
  }
}
</script>
<style lang="scss" scoped>
.input-group-text {
  background: #fff;
  color: #000;
}
.button{
  display: grid;
  place-items: center;
  margin: auto;
  font: normal normal bold 11px/14px Montserrat;
 width: 251px;
height: 43px;
}
</style>
