<template>
<div>
  <section id="about" class="about">
    <AboutSection0 :content="content"/>
    <AboutSection1 :content="content"/>
    <AboutSection2 :content="content"/>
    <!-- <AboutSection3 :content="content"/> -->
  </section>
</div>
</template>

<script>

import { APP_CONSTANTS } from '@/app-constants'
import AboutSection0 from '@/components/about/AboutSection0'
import AboutSection1 from '@/components/about/AboutSection1'
import AboutSection2 from '@/components/about/AboutSection2'
// import AboutSection3 from '@/components/about/AboutSection3'

export default {
  name: 'About',
  components: {
    AboutSection0,
    AboutSection1,
    AboutSection2
    // AboutSection3
  },
  data () {
    return {

    }
  },
  methods: {
    changeModel (name) {
      this.currentModel = this.rootPath + name
    }
  },
  computed: {
    sectionDimensions () {
      const height = this.$store.getters[APP_CONSTANTS.KEY_SECTION_HEIGHT]
      return 'min-height: ' + height + 'px; width: auto;'
    },
    content () {
      const content = this.$store.getters[APP_CONSTANTS.KEY_CONTENT_ABOUT]
      return content
    }
  }
}
</script>

<style>

</style>
