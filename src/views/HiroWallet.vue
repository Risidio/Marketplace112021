<template>
<div>
  <HiroWalletSection0 :content="content"/>
  <HiroWalletSection1 :content="content"/>
</div>
</template>

<script>

import { APP_CONSTANTS } from '@/app-constants'
import HiroWalletSection0 from '@/components/hirowallet/HiroWalletSection0'
import HiroWalletSection1 from '@/components/hirowallet/HiroWalletSection1'

export default {
  name: 'HiroWallet',
  components: {
    HiroWalletSection0,
    HiroWalletSection1
  },
  data () {
    return {

    }
  },
  methods: {
  },
  computed: {
    sectionDimensions () {
      const height = this.$store.getters[APP_CONSTANTS.KEY_SECTION_HEIGHT]
      return 'min-height: ' + height + 'px; width: auto;'
    },
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_HIRO_WALLET]
      return content
    }
  }
}
</script>

<style>

</style>
