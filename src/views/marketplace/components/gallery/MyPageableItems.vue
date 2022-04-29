<template>
     <div class="galleryinfoContainer" id="my-table" v-if="resultSet && resultSet.length > 0">
        <div v-for="(asset, index) of resultSet" :key="index">
          <MySingleItem :parent="'list-view'" :loopRun="loopRun" :asset="asset" :key="index" class=""/>
        </div>
      </div>
      <div v-else>
        <div class="noNFT">
        <h3> You do not own any Items yet</h3>
          <div class="profileBtns">
            <router-link class="button filled" to="/">Gallery</router-link>
          </div>
        </div>
      </div>
</template>

<script>
import MySingleItem from './MySingleItem'
// import Pagination from './common/Pagination'
import { APP_CONSTANTS } from '@/app-constants'

const LOOP_RUN_DEF = process.env.VUE_APP_DEFAULT_LOOP_RUN

export default {
  name: 'MyPageableItems',
  components: {
    MySingleItem
  },
  props: ['loopRun', 'resultSet'],
  data () {
    return {
      showMinted: true,
      tokenCount: null,
      doPaging: true,
      numberOfItems: 0,
      componentKey: 0,
      nowOnPage: 0,
      currentRunKey: null
    }
  },
  mounted () {
    this.currentRunKey = this.loopRun.currentRunKey
    // this.numberOfItems = 500 // this.loopRun.tokenCount
    const $self = this
    let resizeTimer
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        $self.componentKey += 1
      }, 400)
    })
    window.onscroll = () => {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        // $self.page++
        // $self.fetchPage()
      }
    }
  },
  methods: {
  },
  computed: {
    profile () {
      const profile = this.$store.getters[APP_CONSTANTS.KEY_PROFILE]
      return profile
    },
    mintCounter () {
      const application = this.$store.getters[APP_CONSTANTS.KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID](process.env.VUE_APP_STACKS_CONTRACT_ADDRESS + '.' + process.env.VUE_APP_STACKS_CONTRACT_NAME)
      return application.tokenContract.mintCounter
    }
  }
}
</script>
<style lang="scss" scoped>
.myItemsIntroText {font-weight: 200; font-size: 1.1rem; color: #fff;}
  .profileBtns{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: auto;
    margin: 20px auto auto auto;
  }
  .profileBtns{
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    margin: 0 10px;
  }
  & > *:hover{
    color: white;
  }
}
  .noNFT{
  display: block;
  margin: auto;
  max-width: 100%;
  text-align: center;
  h3{
    margin: 50px 0;
    font-size: 40px;
    font-weight: 300;
  }
}
</style>
