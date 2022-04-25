<template>
    <div class="launchS2">
        <div>
            <b-nav class="galleryNav" >
                <div class="galleryNavContainer" >
                <b-nav-item class="galleryNavItem active" id="Transaction" @click="tabChange('Transaction')">All Transaction</b-nav-item>
                <b-nav-item class="galleryNavItem" id="Selling" @click="tabChange('Selling')">Selling</b-nav-item>
                <b-nav-item class="galleryNavItem" id="Buying" @click="tabChange('Buying')">Buying</b-nav-item>
                </div>
            </b-nav>
        </div>
        <div class="homeMarketItems">
            <div v-if="transactionData && transactionData.length > 0 && tab === 'Transaction'">
              <StxTransaction2 :StxTransaction2="transactionData"/>
            </div>
            <div v-else-if="!transactionData && tab === 'Transaction' && activityLoad">
              <div class="pass-container">
                <img src="@/assets/img/loading-risid.gif" style="margin-auto;" class="loading-image" alt="loading"/>
                <p style="text-align: center;"> Hmm... Can't seem to find anything. Try to <span style="font-weight: 500; cursor: pointer; color: #5FBDC1;" @click="fetchStxData()"> refresh </span></p>
              </div>
            </div>
            <button v-if="tab === 'Transaction'" class="button notFilledBlue" @click="loadMore()" :disabled="isDisabled ? true : false"> See More </button>
        </div>
            <div class="homeMarketItems">
            <div v-if="transactionData && transactionData.length > 0 && tab === 'Selling'">
              <StxTransaction2 :StxTransaction2="fetchResult"/>
            </div>
            <div v-else-if="!transactionData && tab === 'Selling' && activityLoad">
              <div class="pass-container">
                <img src="@/assets/img/loading-risid.gif" style="margin-auto;" class="loading-image" alt="loading"/>
                <p style="text-align: center;"> Hmm... Can't seem to find anything. Try to <span style="font-weight: 500; cursor: pointer; color: #5FBDC1;" @click="fetchStxData()"> refresh </span></p>
              </div>
            </div>
            <button v-if="tab === 'Selling'" class="button notFilledBlue" @click="loadMore()" :disabled="isDisabled ? true : false"> See More </button>
        </div>
          <div class="homeMarketItems">
            <div v-if="transactionData && transactionData.length > 0 && tab === 'Buying'">
              <StxTransaction2 :StxTransaction2="fetchResult1"/>
            </div>
            <div v-else-if="!transactionData && tab === 'Buying' && activityLoad">
              <div class="pass-container">
                <img src="@/assets/img/loading-risid.gif" style="margin-auto;" class="loading-image" alt="loading"/>
                <p style="text-align: center;"> Hmm... Can't seem to find anything. Try to <span style="font-weight: 500; cursor: pointer; color: #5FBDC1;" @click="fetchStxData()"> refresh </span></p>
              </div>
            </div>
            <button v-if="tab === 'Buying'" class="button notFilledBlue" @click="loadMore()" :disabled="isDisabled ? true : false"> See More </button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import StxTransaction2 from '@/components/smallcomponents/StxTransaction2.vue'
export default {
  name: 'UserTrasaction',
  props: ['loopRun'],
  components: {
    StxTransaction2
  },
  data () {
    return {
      dayjs: dayjs,
      tab: 'Transaction',
      loading: true,
      loadingLogo: '../../assets/img/loading-risid.gif',
      activityLoad: true,
      limit: 15,
      isDisabled: false,
      transactionData: [],
      fetchResult: []
    }
  },
  mounted () {
    this.fetchStxData()
  },
  watch: {
    'loopRun' () {
      this.fetchStxData()
    },
    'tab' () {
      if (this.tab === 'Selling') {
        this.fetchResult = this.transactionDataa.filter(item => item.contract_call.function_name === 'list-in-token')
      }
      if (this.tab === 'Buying') {
        this.fetchResult1 = this.transactionDataa.filter(item => item.contract_call.function_name === 'buy-in-token')
      }
    },
    'limit' () {
      this.fetchStxData()
    }
  },
  methods: {
    fetchStxData () {
      axios.get(`https://stacks-node-api.testnet.stacks.co/extended/v1/address/ST112ZVZ2YQSW74BQ65VST84806RV5ZZZTW0261CV/transactions?limit=${this.limit}`).then((res) => {
        this.transactionData = res.data.results
        this.activityLoad = false
      }).catch((error) => {
        this.isDisabled = true
        console.log(error)
        console.log('err')
      })
      axios.get('https://stacks-node-api.testnet.stacks.co/extended/v1/address/ST112ZVZ2YQSW74BQ65VST84806RV5ZZZTW0261CV/transactions?limit=37').then((res) => {
        this.transactionDataa = res.data.results
        this.activityLoad = false
      }).catch((error) => {
        this.isDisabled = true
        console.log(error)
        console.log('err')
      })
    },
    tabChange (tab) {
      this.tab = tab
      document.getElementById('Transaction').classList.remove('active')
      document.getElementById('Selling').classList.remove('active')
      document.getElementById('Buying').classList.remove('active')
      document.getElementById(tab).classList.add('active')
    },
    loadMore () {
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
  padding: 0 20px;
  margin-top: 50px;
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

.loading-pass {
  text-align: center;
}
.homeMarketItems {
  max-width: 1135px;
  margin: auto;
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

</style>
