<template>
<section class="container section0-container">
  <img class="wallet-img" src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg"/>
  <h1>{{ content.s1_title[0].text }}</h1>
  <prismic-rich-text class="main-content text-center" :field="content.s1_text"/>
  <button class="button" @click="startRegister()"><a href="#">{{ content.s1_button[0].text }}</a></button>
</section>
</template>

<script>
export default {
  name: 'HiroWalletSection0',
  props: ['content'],
  components: {

  },
  methods: {
    startRegister () {
      window.open('https://www.hiro.so/wallet', '_blank')
    }
  },
  computed: {
  }
}
</script>

<style scoped>
  .section0-container {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;
    min-height: 500px;
  }
  .wallet-img {
    max-width: 80px;
    height: auto;
    margin-bottom: 16px;
  }
  h1 {
    text-align: center;
    margin-bottom: 24px;
  }
  .main-content {
    max-width: 570px;
    margin: 0 auto;
  }
  .main-content >>> h5 {
    font-size: 1.7rem;
    font-weight: 500;
    margin-bottom: 30px;
  }
  .main-content >>> p {
    font-size: 1.4rem;
    font-weight: 300;
  }
  button {
    background-color: rgba(80, 177, 181, 0.1);
    margin: 40px auto 0;
  }
  button a {
    font-size: 1.1rem;
    font-weight: 700;
    color: #5FBDC1;
  }
</style>
