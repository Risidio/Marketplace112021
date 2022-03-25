<template>
    <div class="launchS2">
        <div>
            <b-nav class="galleryNav" >
                <div class="galleryNavContainer" >
                <b-nav-item class="galleryNavItem active" id="items" @click="tabChange('items')">Items</b-nav-item>
                <b-nav-item class="galleryNavItem" id="activity" @click="tabChange('activity')">Activity</b-nav-item>
                <!-- <b-nav-item class="galleryNavItem" @click="tabChange('Your NFT')">Your NFT's</b-nav-item> -->
                </div>
            </b-nav>
        </div>
        <div class="homeMarketItems">
            <div v-if="stxTransaction && stxTransaction.length > 0 && tab === 'activity'">
              <h3 style="font-size: 13px; font-weight: 700;"> Transactions</h3>
              <table class="transaction-table">
                <tr><th>Date</th><th>Method Type</th><th>By</th><th>Fees</th></tr>
                <tr class="transaction-data" v-for="(item, index) in stxTransaction" :key="index" @click="openTransaction(item)">
                  <th>{{dayjs(item.burn_block_time_iso).format('DD/MM/YYYY')}}</th>
                  <th v-if="item.contract_call && item.contract_call.function_name"> {{item.contract_call.function_name}}</th> <th v-else> Setup</th>
                  <th>{{item.sender_address.substring(0, 30)}}...</th>
                  <th>{{item.fee_rate ? `STX: ${item.fee_rate/1000000} ` : 'N/A'}}</th>
                </tr>
              </table>
              <!-- <div v-for="(item, index) in stxTransaction" :key="index">
                <p class="nFTName" v-if="item.contract_call && item.contract_call.function_name"> {{item.contract_call.function_name}} <span> {{item.contract_call.contract_id.split('.')[1]}} </span></p>
              </div> -->
            </div>
            <div v-else-if="!stxTransaction && tab === 'activity'">
              <div class="pass-container">
                <img src="@/assets/img/loading-risid.gif" style="margin-auto;" class="loading-image" alt="loading"/>
                <p style="text-align: center;"> Hmm... Can't seem to find anything. Try to <span style="font-weight: 500; cursor: pointer; color: #5FBDC1;" @click="fetchStxData()"> refresh </span></p>
              </div>
            </div>
            <div class="galleryContainer" v-else-if="resultSet && resultSet.length > 0 && tab === 'items'">
                <div v-for="(item, index) in resultSet" :key="index" class="NFTbackgroundColour" >
                    <div class="">
                        <b-link class="galleryNFTContainer" v-if="item && item.contractAsset" :to="assetUrl(item)">
                        <img class="nftGeneralView" v-on="$listeners" :src="item.image"/>
                      <p class="nFTName"> {{!item.name ? "NFT" : item.name }} <span style="float: right;">{{item.contractAsset.listingInUstx.price || 0}} STX</span></p>
                      <p class="nFTArtist">By <span>{{!item.properties.collection ? "Anonymous" : item.properties.collection }}</span><span style="float: right; font-weight: 300">{{changeCurrencyTag() || '£'}} {{changeCurrency(item.contractAsset.listingInUstx.price) || 0}}</span></p>
                    </b-link>
                    </div>
                </div>
            </div>
            <router-link to="/nft-marketplace/risidio/numberone_roots"><button class="button notFilledBlue"> See More </button></router-link>
        </div>
    </div>
</template>

<script>
import MyPageableItems from '@/views/marketplace/components/gallery/MyPageableItems'
import { APP_CONSTANTS } from '@/app-constants'
import utils from '@/services/utils'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'Launch-Collection-S2',
  props: ['content', 'loopRun', 'resultSet'],
  components: {
  },
  data () {
    return {
      dayjs: dayjs,
      tab: 'items',
      currentRunAssets: [],
      numberOfItems: 0,
      loading: true,
      pageSize: 20,
      mintPasses: null,
      mintPassMessage: '',
      mintPassLoad: true,
      commissions: null,
      commission: null,
      tokenContractId: null,
      loadingLogo: '../../assets/img/loading-risid.gif',
      activityLoad: true,
      currencyPreference: null,
      stxTransaction: null
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
      if (this.tab === 'activity') this.fetchStxData()
    }
  },
  methods: {
/* eslint-disable */
    fetchStxData () {
      axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/${this.loopRun.contractId}/transactions?limit=30&offset=0&unanchored=false`).then((res) => {
        console.log(res)
        this.stxTransaction = res.data.results
      }).catch((error) => {
        console.log(error)
      })
      console.log('hi')
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
      document.getElementById('items').classList.remove('active')
      document.getElementById('activity').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    openTransaction (item) {
      window.open(`https://explorer.stacks.co/txid/${item.tx_id}`)
    },
    setPageSize () {
      this.pageSize += 10
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
    changeCurrency (price) {
      if (this.currencyPreference) {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rates = tickerRates.find((rate) => rate.currency === this.currencyPreference.text)
        const nFTPrice = utils.toDecimals(rates.stxPrice * price)
        return nFTPrice
      } else {
        const tickerRates = this.$store.getters[APP_CONSTANTS.KEY_TICKER_RATES]
        const rates = tickerRates.find((rate) => rate.currency === 'GBP')
        const nFTPrice = utils.toDecimals(rates.stxPrice * price)
        return nFTPrice
      }
    },
    changeCurrencyTag () {
      if (this.currencyPreference && this.currencyPreference.text === 'GBP') {
        return '£'
      } else if (this.currencyPreference && this.currencyPreference.text === 'USD') {
        return '$'
      } else if (this.currencyPreference && this.currencyPreference.text === 'CNY') {
        return '¥'
      } else if (this.currencyPreference && this.currencyPreference.text === 'JPY') {
        return '¥'
      } else if (this.currencyPreference && this.currencyPreference.text === 'EUR') {
        return '€'
      } else {
        return '£'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.launchS2{
    min-height: 50rem;
  padding: 20px;
}
.container{
    text-align: center;
    max-width: 800px;
    h1{
        font: normal normal 300 40px/55px Montserrat;
        padding: 10px;
    }
    :nth-child(2){
        font: normal normal bolder 17px/20px Montserrat;
        padding: 10px;
    }
    :nth-child(3){
        font: normal normal normal 14px/20px Montserrat;
        padding: 10px;
    }
}
p{padding:0; margin:0;}

.galleryContainer{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(255px, max-content));
  gap: 20px;
  max-width: 1135px;
  justify-content: center;
  margin: auto;
}
.homeMarketItems{
  max-width: 1135px;
  margin: auto;
}
// .homeNFTView{
//   display: flex;
//   flex-wrap: wrap;
//   // margin: 4rem;
//   border-radius: 25px;
//   // padding: 4rem;
//   margin: auto;
// }
// .homeNFTView > *{
//   flex: 1 1 300px;
//   padding: 30px;
//   min-width: 300px;
//   max-height: 400px;
// }
.button{
  margin: 50px auto 50px auto;
}
#unsold {
  margin-right: 20px;
}

</style>
