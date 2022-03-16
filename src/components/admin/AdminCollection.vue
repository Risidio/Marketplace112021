<template>
  <div class='adminContainer'>
    <div class='adminCollections'>
      <h2>Collections!!!</h2>
      <div
        v-for='(loopRun, index) in allLoopRuns'
        :key='index'
        class='adminCollectionList'
        @click='selectedCollection(loopRun)'
      >
        <p class='singleLoopRun'>{{ loopRun.contractId.split('.').pop() }}</p>
      </div>
    </div>
    <div class='adminNfts'>
      <div v-if='currentRun'>
        <h2>{{ currentRun.contractId.split('.').pop() }}</h2>
        <hr />
        <div v-if='currentRunAssets' class='adminNFTs'>
          <div
            v-for='(nft, index) in currentRunAssets.gaiaAssets'
            :key='index'
            class='adminSingleNFTs'
          >
            <p>NFT #{{ nft.contractAsset.nftIndex || 0 }}</p>
            <p>STX: {{ nft.contractAsset.listingInUstx.price || 0 }}</p>
            <div
              class='flex'
              v-if='
                nft.contractAsset &&
                  nft.contractAsset.listingInUstx &&
                  nft.contractAsset.listingInUstx.price == 0
              '
            >
              <p>Not On Sale</p>
              <button class='buy-button' @click='listNFT(currentRun, nft)'>
                List
              </button>
            </div>
            <div v-else>
              <button class='buy-button' @click='buyNFT(currentRun, nft)'>
                Buy
              </button>
            </div>
          </div>
          <hr style='margin-top: 50px;' />
          <h4>Would you like to mint more in this Collection ?</h4>
          <p>
            Index: <input type='number' /><button
              class='mint-button'
              @click='mintNFT(currentRun)'
            >
              Mint
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'AdminCollectionMint',
  props: ['allLoopRuns', 'projects'],
  data () {
    return {
      currentRun: [],
      currentRunAssets: [],
      sipTokens: null,
      sipToken: null,
      loading: true,
      commission: null,
      tokenContractId: null,
      commissions: null
    }
  },
  mounted () {
    this.getSipTenTokens()
    this.currentRun = this.allLoopRuns.find((loopRun) => loopRun.contractId === 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.indige-mint')
  },
  methods: {
    getSipTenTokens () {
      this.$store.dispatch('rpayMarketGenFungStore/sipTenTokenFindBy').then((sipTenTokens) => {
        console.log(sipTenTokens[1])
        console.log('hi')
        if (sipTenTokens) {
          this.sipTenTokens = sipTenTokens
          this.sipTenToken = sipTenTokens[1]
          this.$notify({ type: 'success', title: 'Available Tokens', text: 'List NFT for x tokens' })
        }
        this.sipTokens = sipTenTokens
        this.sipToken = sipTenTokens[1]
        this.loading = false
      })
    },
    selectedCollection (selected) {
      this.currentRun = selected
      this.getAssets(selected)
    },
    getAssets (currentRun) {
      const data = {
        runKey: currentRun ? currentRun.currentRunKey : null,
        contractId: currentRun.contractId,
        // query: queryStr,
        page: 0,
        pageSize: 100
      }
      this.$store
        .dispatch('rpayStacksContractStore/fetchTokensByContractId', data)
        .then(result => {
          this.currentRunAssets = result
        })
    },
    buyNFT (currentRun, nft) {
      this.getSipTenTokens()
      const contractAsset = nft.contractAsset
      console.log(currentRun)
      const commission = nft.contractAsset.listingInUstx.commission
      const data = {
        contractAddress: currentRun.contractId.split('.')[0],
        contractName: currentRun.contractId.split('.')[1],
        commissionContractAddress: commission.split('.')[0],
        commissionContractName: commission.split('.')[1],
        tokenContractAddress: (contractAsset.listingInUstx.token) ? contractAsset.listingInUstx.token.split('.')[0] : null,
        tokenContractName: (contractAsset.listingInUstx.token) ? contractAsset.listingInUstx.token.split('.')[1] : null,
        owner: contractAsset.owner,
        nftIndex: contractAsset.nftIndex,
        price: contractAsset.listingInUstx.price,
        sendAsSky: true, // only applicable in local
        assetName: currentRun.assetName,
        decimals: contractAsset.listingInUstx.decimals,
        tokenAssetName: contractAsset.listingInUstx.name
      }
      console.log(data)
      this.$store
        .dispatch('rpayMarketGenFungStore/buyInToken', data)
        .then(result => {
          this.result = result
        })
        .catch(err => {
          console.log(err)
        })
    },
    listNFT (currentRun, nft) {
      const data = {
        owner: currentRun.owner,
        nftIndex: nft.contractAsset.nftIndex,
        commissionContractAddress: currentRun.commissionContractId.split('.')[0],
        commissionContractName: currentRun.commissionContractId.split('.')[1],
        price: 1,
        sendAsSky: true, // only applicable in local
        contractAddress: nft.contractAsset.contractId.split('.')[0],
        contractName: nft.contractAsset.contractId.split('.')[1],
        functionName: 'list-in-ustx',
        batchOption: 1
      }
      this.$store
        .dispatch('rpayMarketStore/listInUstx', data)
        .then(result => {
          const item = this.$store.getters[APP_CONSTANTS.KEY_MY_ITEM](
            result.assetHash
          )
          if (result.txId) {
            item.mintInfo = {
              txId: result.txId,
              txStatus: result.txStatus,
              timestamp: result.timestamp
            }
            this.$store
              .dispatch('rpayMyItemStore/quickSaveItem', item)
              .then(item => {
                this.$emit('update', item)
              })
          }
        })
        .catch(err => {
          this.errorMessage = 'Minting error: ' + err
        })
    },
    mintNFT (currentRun) {
      const commissionData = {
        contractId: this.currentRun.contractId
      }
      this.$store.dispatch('rpayMarketGenFungStore/getCommissionTokensByContract', commissionData).then((commissions) => {
        console.log(commissions)
        if (commissions) {
          this.tokenContractId = commissions[0].tokenContractId
          this.commissions = commissions
          this.commission = commissions[0]
          this.$notify({ type: 'success', title: 'Mint Commission', text: 'Mint commission: ' + commissions.length })
        }
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
      const commission = this.commission
      const data = {
        contractAddress: currentRun.contractId.split('.')[0],
        contractName: currentRun.contractId.split('.')[1],
        batchOption: 1
      }
      if (currentRun.marketplaceVersion === 3) {
        if (!commission) {
          this.$notify({ type: 'error', title: 'Select Tender', text: 'Please select the tender to use topay for minting' })
          return
        }
        data.sipTenToken = commission.sipTenToken
        data.mintPrice = commission.price
        data.tokenContractAddress = commission.tokenContractId.split('.')[0]
        data.tokenContractName = commission.tokenContractId.split('.')[1]
        // data.postConditions = (data.sipTenToken.name === 'Test Wrapper') ? getGFTMintPostConds(data, this.profile.stxAddress) : null
        this.marketplaceMint(data, 'rpayMarketGenFungStore/mintWithToken')
        console.log(data)
      } else {
        data.mintPrice = this.loopRun.mintPrice
        this.marketplaceMint(data, 'rpayPurchaseStore/cpsMintToken')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.adminContainer {
  min-height: 50rem;
  max-width: 1500px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  margin: auto;
}
.adminCollectionList {
  display: grid;
  place-items: center;
  padding: 10px;
  background: rgba(128, 128, 128, 0.5);
  margin: 5px;
  border-radius: 5px;
  p {
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
  &:hover {
    transform: scale(1.05);
  }
}
.adminNFTs {
  h4 {
  }
}
.singleLoopRun {
}
.adminCollections {
  flex: 1 1 20%;
  min-width: 300px;
}
.adminNfts {
  flex: 1 1 60%;
  min-width: 500px;
}
.adminSingleNFTs {
  border-bottom: solid 1px grey;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  p {
    padding: 0;
    margin: 0;
    text-align: center;
  }
}
.buy-button {
  display: grid;
  place-items: center;
  border: 0;
  margin: 0 auto;
  padding: 0 15px;
  font-size: 14px;
}
.mint-button {
  border: solid 1px black;
  margin: 0 auto;
  padding: 4px 15px;
  font-size: 14px;
}
.buy-button:hover,
.mint-button:hover {
  background: rgba(71, 71, 88, 0.5);
}
</style>
