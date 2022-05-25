<template>
    <div class="launchS2">
      <div id="mintModal" class="mintModal">

        <!-- Modal content -->
        <div class="mint-modal-content">
          <span class="close" @click="closeModal()">&times;</span>
          <h3 class="modalH3">Confirm</h3>
          <p class="modalP"> You're going to mint </p>
          <p class="modalP2"> A mystery item from the Indige Collection</p>
          <button class="button notFilledBlue" @click="startMint()"> Continue With Minting </button>
          <p class="modalP3" @click="closeModal()"> Cancel </p>
        </div>

      </div>
        <div>
            <b-nav class="galleryNav" >
                <div class="galleryNavContainer" >
                <b-nav-item class="galleryNavItem active" id="Items" @click="tabChange('Items')">Items</b-nav-item>
                <b-nav-item class="galleryNavItem" id="Activity" @click="tabChange('Activity')">Activity</b-nav-item>
                <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
                </div>
            </b-nav>
        </div>
        <div class="homeMarketItems">
            <div v-if="stxTransaction && stxTransaction.length > 0 && tab === 'Activity'">
              <StxTransaction :stxTransaction="stxTransaction"/>
            </div>
            <div v-else-if="!stxTransaction && tab === 'Activity'">
              <div class="pass-container">
                <img src="@/assets/img/loading-risid.gif" style="margin-auto;" class="loading-image" alt="loading"/>
                <p style="text-align: center;"> Hmm... Can't seem to find anything. Try to <span style="font-weight: 500; cursor: pointer; color: #5FBDC1;" @click="fetchStxData()"> refresh </span></p>
              </div>
            </div>
            <div class="" v-if="resultSet && resultSet.length > 0 && tab === 'Items' && (!mintPasses || mintPasses === 0)">
                <DefaultNFT v-bind:gaiaAssets="resultSet"/>
            </div>
            <div class="" v-else-if="resultSet && resultSet.length > 0 && tab === 'Items' && mintPasses > 0">
              <div class="pass-container">
                <div class="mint-pass">
                  <p class="mintPlus" @click="openModal()"> &plus; </p>
                  <p class="mint-text-1"> Mint a new NFT</p>
                  <p class="mint-text-2"> You have a mintpass balance of {{mintPasses}}. Therefore, you may mint in this collection !</p>
                </div>
              </div>
              <DefaultNFT v-bind:gaiaAssets="resultSet"/>
            </div>
            <div class="galleryContainer" v-else-if="tab === 'Items' && mintPasses > 0">
              <div class="mint-pass">
                <p class="mintPlus" @click="openModal()"> &plus; </p>
                <p class="mint-text-1"> Mint a new NFT</p>
                <p class="mint-text-2"> You have a mintpass balance of {{mintPasses}}. Therefore, you may mint in this collection !</p>
              </div>
            </div>
              <Pagination :pageSize="pageSize" :numberOfItems="numberOfItems" :loopRun="loopRun" v-if="tab === 'Items'"/>
            <p v-if="mintPassLoad" class="loading-pass">
              checking mint pass....<br/>
              <img class="loading-image" src="@/assets/img/loading-risid.gif" alt="loading">
            </p>
            <!-- <router-link to="/nft-marketplace/risidio/launch_collection_t1"><button class="button notFilledBlue"> See More </button></router-link> -->
            <button v-if="tab === 'Activity'" class="button notFilledBlue" @click="setPageSize()" :disabled="isDisabled ? true : false"> See More </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import StxTransaction from '../smallcomponents/StxTransaction.vue'
import Pagination from '../smallcomponents/Pagination.vue'
import DefaultNFT from '../smallcomponents/DefaultNFT.vue'

export default {
  name: 'Indige-Collection-S2',
  props: ['content', 'loopRun', 'resultSet', 'numberOfItems', 'pageSize'],
  components: {
    Pagination,
    StxTransaction,
    DefaultNFT
  },
  data () {
    return {
      tab: 'Items',
      loading: true,
      mintPasses: null,
      mintPassMessage: '',
      mintPassLoad: true,
      commissions: null,
      commission: null,
      tokenContractId: null,
      currencyPreference: null,
      stxTransaction: [],
      limit: 15,
      isDisabled: false
    }
  },
  mounted () {
    this.fetchMintPass()
    this.currencyPreference = JSON.parse(localStorage.getItem('currencyPreferences'))
  },
  watch: {
    'loopRun' () {
      this.fetchMintPass()
      this.fetchStxData()
    },
    'tab' () {
      if (this.tab === 'Activity') this.fetchStxData()
    },
    'limit' () {
      this.fetchStxData()
    }
  },
  methods: {
/* eslint-disable */
    fetchStxData () {
      axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${this.loopRun.contractId}/transactions?limit=${this.limit}&offset=0&unanchored=false`).then((res) => {
        this.stxTransaction = res.data.results
      }).catch((error) => {
        this.isDisabled = true
        console.log(error)
      })
    },
    /* eslint-enable */
    fetchMintPass () {
      if (this.loopRun) {
        const data = {
          stxAddress: this?.profile?.stxAddress,
          contractAddress: this?.loopRun?.contractId?.split('.')[0],
          contractName: this?.loopRun?.contractId?.split('.')[1],
          currentRunKey: null
        }
        this.$store.dispatch('rpayMarketStore/lookupMintPassBalance', data).then((result) => {
          if (result && result.result.value > 0) {
            this.mintPasses = Number(result.result.value)
            this.mintPassMessage = 'Mint Pass Found'
            this.mintPassLoad = false
          } else {
            this.mintPassMessage = 'Mint Pass Not Found'
            this.mintPassLoad = false
          }
        }).catch((error) => {
          console.log(error)
          this.mintPassMessage = 'Mint Pass Not Found'
          this.mintPassLoad = false
        })
        if (this.mintPasses == null) this.mintPassLoad = false
      }
    },
    tabChange (tab) {
      this.tab = tab
      document.getElementById('Items').classList.remove('active')
      document.getElementById('Activity').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    assetUrl (item) {
      if (item.contractAsset) {
        return '/nfts/' + item.contractAsset.contractId + '/' + item.contractAsset.nftIndex
      }
    },
    openModal () {
      const modal = document.getElementById('mintModal')
      modal.style.display = 'block'
    },
    closeModal () {
      const modal = document.getElementById('mintModal')
      modal.style.display = 'none'
    },
    startMint () {
      const commissionData = {
        contractId: this.loopRun.contractId
      }
      this.$store.dispatch('rpayMarketGenFungStore/getCommissionTokensByContract', commissionData).then((commissions) => {
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
      console.log(commission)
      const data = {
        contractAddress: this.loopRun.contractId.split('.')[0],
        contractName: this.loopRun.contractId.split('.')[1],
        batchOption: 1,
        sendAsSky: true,
        functionName: 'mint-with'
      }
      if (!commission) {
        this.$notify({ type: 'error', title: 'Select Tender', text: 'Please select the tender to use topay for minting' })
        return
      }
      data.sipTenToken = commission.sipTenToken
      data.mintPrice = commission.price
      data.tokenContractAddress = commission.tokenContractId.split('.')[0]
      data.tokenContractName = commission.tokenContractId.split('.')[1]
      this.$store.dispatch('rpayMarketGenFungStore/mintWithToken', data)
        .catch((error) => {
          console.log(error)
        })
    },
    setPageSize () {
      this.limit += 15
    }
  },
  computed: {
    profile () {
      const profile = this.$store.getters['rpayAuthStore/getMyProfile']
      return profile
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS2 {
  min-height: 50rem;
  padding: 20px;
}
.transaction-table {
  width: 100%;
  height: 200px;
  overflow-y: auto;
  font-size: 12px;
  font-weight: 300;
  tr:nth-child(even) {
    background-color: rgb(240, 240, 240);
  }
  .transaction-data {
    th {
      padding: 10px 5px;
      font-size: 12px;
      font-weight: 300;
      border-bottom: 0.5px solid grey;
    }
    &:hover {
      border-left: 2px solid blue;
    }
  }
}
.container {
  text-align: center;
  max-width: 800px;
  h1 {
    font: normal normal 300 40px/55px Montserrat;
    padding: 10px;
  }
  :nth-child(2) {
    font: normal normal bolder 17px/20px Montserrat;
    padding: 10px;
  }
  :nth-child(3) {
    font: normal normal normal 14px/20px Montserrat;
    padding: 10px;
  }
}
.galleryNavContainer{
  width: 600px;
  justify-content: space-between;
}
.loading-pass {
  text-align: center;
}
p {
  padding: 0;
  margin: 0;
}
.galleryContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, max-content));
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
.homeMarketItems {
  max-width: 1135px;
  margin: auto;
}
.mint-pass {
  padding: 15px 35px;
  background: #dddddd;
  border-radius: 26px;
  max-width: 260px;
  height: 320px;
  margin-bottom: 20px;
}
.mintPlus {
  font-size: 120px;
  transition: all 0.5s ease;
  color: grey;
  text-align: center;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    color: black;
  }
}
.mint-text-1 {
  font: normal normal medium 12px/15px Montserrat;
  text-align: center;
}
.mint-text-2 {
  font: normal normal 300 12px/18px Montserrat;
}
.button {
  margin: 50px auto 50px auto;
}
.mintModal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding: 100px 10px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  overflow-y: hidden;
}
/* Modal Content */
.mint-modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 34px;
  border: none;
  max-width: 450px;
  height: 379px;
  text-align: center;

  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 30px;
    font-weight: bold;
    text-align: right;
    max-width: 30px;
    margin-left: auto;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  .button {
    margin: 50px auto 0 auto;
  }
  .modalH3 {
    font: normal normal 300 30px/55px Montserrat;
    margin-top: 50px;
    padding: 0;
  }
  .modalP,
  .modalP2 {
    font: normal normal normal 14px/18px Montserrat;
    max-width: 300px;
    margin: 0 auto;
  }
  .modalP2 {
    font: normal normal 300 20px/24px Montserrat;
    color: #777777;
    margin-top: 30px;
  }
  .modalP3 {
    font: normal normal 700 11px/14px Montserrat;
    margin-top: 10px;
    color: #df9882;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .button {
    font: normal normal bold 11px/14px Montserrat;
  }
}
#Items {
  margin-right: 20px;
}
</style>
