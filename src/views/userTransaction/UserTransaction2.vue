<template>
    <div class="launchS2">
        <div>
            <b-nav class="galleryNav" >
                <div class="galleryNavContainer" >
                <b-nav-item class="galleryNavItem " id="Activity" @click="tabChange('Activity')">All Transaction</b-nav-item>
                <b-nav-item class="galleryNavItem" id="Items" @click="tabChange('Items')">Selling</b-nav-item>
                <b-nav-item class="galleryNavItem" id="Buying" @click="tabChange('Buying')">Buying</b-nav-item>
                </div>
            </b-nav>
        </div>
        <div class="homeMarketItems">
            <div v-if="StxTransaction2 && StxTransaction2.length > 0 && tab === 'Activity'">
              <StxTransaction2 :StxTransaction2="StxTransaction2"/>
              <!-- <div v-for="(item, index) in StxTransaction2" :key="index">
                <p class="nFTName" v-if="item.contract_call && item.contract_call.function_name"> {{item.contract_call.function_name}} <span> {{item.contract_call.contract_id.split('.')[1]}} </span></p>
              </div> -->
            </div>
            <div v-else-if="!StxTransaction2 && tab === 'Activity'">
              <div class="pass-container">
                <img src="@/assets/img/loading-risid.gif" style="margin-auto;" class="loading-image" alt="loading"/>
                <p style="text-align: center;"> Hmm... Can't seem to find anything. Try to <span style="font-weight: 500; cursor: pointer; color: #5FBDC1;" @click="fetchStxData()"> refresh </span></p>
              </div>
            </div>
            <!-- <div class="galleryContainer" v-if="resultSet && resultSet.length > 0 && tab === 'Items' && (!mintPasses || mintPasses === 0)">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <ResultSet :item="item" />
                </div>
            </div> -->
            <!-- <p v-if="mintPassLoad" class="loading-pass">
              checking mint pass....<br/>
              <img class="loading-image" src="@/assets/img/loading-risid.gif"/>
            </p> -->
            <!-- <router-link to="/nft-marketplace/risidio/launch_collection_t1"><button class="button notFilledBlue"> See More </button></router-link> -->
            <button v-if="tab === 'Activity'" class="button notFilledBlue" @click="setPageSize()" :disabled="isDisabled ? true : false"> See More </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import StxTransaction2 from '@/components/smallcomponents/StxTransaction2.vue'
import ResultSet from '@/components/smallcomponents/ResultSet.vue'
export default {
  name: 'UserTrasaction2',
  props: ['content', 'loopRun', 'resultSet', 'page', 'numberOfItems', 'pageSize'],
  components: {
    // MyPageableItems
    StxTransaction2
    // ResultSet
  },
  data () {
    return {
      dayjs: dayjs,
      tab: 'Items',
      currentRunAssets: [],
      loading: true,
      mintPasses: null,
      mintPassMessage: '',
      mintPassLoad: true,
      commissions: null,
      commission: null,
      tokenContractId: null,
      loadingLogo: '../../assets/img/loading-risid.gif',
      activityLoad: true,
      currencyPreference: null,
      TransactionH: [],
      limit: 15,
      isDisabled: false,
      pages: []
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
    },
    'numberOfItems' () {
      this.getPageNumbers()
    }
  },
  methods: {
/* eslint-disable */
    getPageNumbers () {
      let pageNumbers = this.numberOfItems / this.pageSize
      let page = []
      for (let i = 1; i <= pageNumbers; i++){
        page.push(i)
      }
      console.log('pages', page)
      this.pages = page
    },
    fetchStxData () {
      axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/ST112ZVZ2YQSW74BQ65VST84806RV5ZZZTW0261CV/transactions?limit=${this.limit}`).then((res) => {
        console.log('res', res)
        this.StxTransaction2 = res.data.results

      }).catch((error) => {
        this.isDisabled = true
        console.log(error)
        console.log('err')
      })
    },
    /* eslint-enable */
    fetchMintPass () {
      if (this.loopRun) {
        const data = {
          stxAddress: this.profile.stxAddress,
          contractAddress: this.loopRun.contractId.split('.')[0],
          contractName: this.loopRun.contractId.split('.')[1],
          currentRunKey: null
        }
        console.log(data)
        this.$store.dispatch('rpayMarketStore/lookupMintPassBalance', data).then((result) => {
          if (result && result.result.value > 0) {
            this.mintPasses = Number(result.result.value)
            this.mintPassMessage = 'Mint Pass Found'
            this.mintPassLoad = false
          } else {
            this.mintPassMessage = 'Mint Pass Not Found'
            this.mintPassLoad = false
          }
          console.log(result)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    tabChange (tab) {
      this.tab = tab
      document.getElementById('Items').classList.remove('active')
      document.getElementById('Activity').classList.remove('active')
      document.getElementById('Buying').classList.remove('active')
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
      console.log('mint')
      const commissionData = {
        contractId: this.loopRun.contractId
      }
      this.$store.dispatch('rpayMarketGenFungStore/getCommissionTokensByContract', commissionData).then((commissions) => {
        if (commissions) {
          console.log(commissions)
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
        contractAddress: this.loopRun.contractId.split('.')[0],
        contractName: this.loopRun.contractId.split('.')[1],
        batchOption: 1
      }
      if (!commission) {
        this.$notify({ type: 'error', title: 'Select Tender', text: 'Please select the tender to use topay for minting' })
        return
      }
      data.sipTenToken = commission.sipTenToken
      data.mintPrice = commission.price
      data.tokenContractAddress = commission.tokenContractId.split('.')[0]
      data.tokenContractName = commission.tokenContractId.split('.')[1]
      console.log(data)
      this.$store.dispatch('rpayMarketGenFungStore/mintWithToken', data)
    },
    setPageSize () {
      this.limit += 10
      console.log(this.limit)
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
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
.pagination-container {
  padding: 50px;
  max-width: 300px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  p {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  span {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
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
