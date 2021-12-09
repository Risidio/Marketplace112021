<template>
<section>
  <div class="" style="min-height: 80px;" header-tag="header" footer-tag="footer">
    <!-- <header-screen :allowEdit="false" :item="item"/> -->
    <div class=" " v-html="errorMessage"></div>
    <EditEditions v-if="allowEditEditions" :item="item"/>
    <!-- <Beneficiaries :hidePrimaries="hidePrimaries" :beneficiaries="beneficiaries" v-on="$listeners"/> -->
    <!-- <ListBeneficiaries :loopRun="loopRun" :item="item" /> -->
      <div style="position: absolute; top: 102%; left:50%" class="d-flex justify-content-between">
        <b-button @click="saveData()" class="mintingButtons cyanBg" >Cancel</b-button>
        <b-button @click="sendMintEvent()" class="mintingButtons cyanBg" ><span v-if="mintButtonText">{{mintButtonText}}</span><span v-else>Mint Now</span></b-button>
      </div>
  </div>
</section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
// import Beneficiaries from './Beneficiaries'
import EditEditions from './EditEditions'
import ListBeneficiaries from '@/views/marketplace/components/toolkit/ListBeneficiaries'

export default {
  name: 'RoyaltyScreen',
  components: {
    EditEditions
    // ListBeneficiaries
  },
  props: ['loopRun', 'item', 'errorMessage', 'hidePrimaries', 'mintButtonText'],
  data () {
    return {
      allowEditEditions: true, // process.env.VUE_APP_ALLOW_EDIT_EDITIONS,
      mintedMessage: null
    }
  },
  methods: {
    rangeEvent (displayCard) {
      this.$store.commit(APP_CONSTANTS.SET_DISPLAY_CARD, displayCard)
    },
    getRangeValue () {
      const displayCard = this.$store.getters[APP_CONSTANTS.KEY_DISPLAY_CARD]
      if (displayCard === 100) return 0
      else if (displayCard === 102) return 1
      else if (displayCard === 104) return 2
    },
    /**
    allowMint () {
      let sum = 0
      this.beneficiaries.forEach((o) => {
        sum += o.royalty
      })
      sum = Math.round(sum * 100) / 100
      return sum === 100.00
    },
    **/
    saveData: function () {
      window.eventBus.$emit('rpayEvent', { opcode: 'cancel-minting' })
    },
    sendMintEvent: function () {
      this.$emit('mintToken')
    }
  },
  computed: {
    displayCard () {
      const displayCard = this.$store.getters[APP_CONSTANTS.KEY_DISPLAY_CARD]
      return displayCard
    },
    enableRoyalties () {
      // const configuration = this.$store.getters[APP_CONSTANTS.KEY_RPAY_CONFIGURATION]
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
.mintingButtons{
  height:40px;
  border-radius: 25px;
  width: 150px;
  margin-left: 20px;
  font-weight: 500;
  font-size: 1.2rem;
}
</style>
