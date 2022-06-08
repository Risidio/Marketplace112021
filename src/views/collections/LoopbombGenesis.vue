<template>
    <main class="loopbomb-genesis-section">
      <LoopbombGenesisBanner />
      <LoopbombGenesisDescriptionSection />
    </main>
</template>

<script>
import LoopbombGenesisBanner from '@/components/loopbombGenesis/LoopbombGenesisBanner.vue'
import LoopbombGenesisDescriptionSection from '@/components/loopbombGenesis/LoopbombGenesisDescriptionSection.vue'
export default {
  components: {
    LoopbombGenesisBanner,
    LoopbombGenesisDescriptionSection
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
