<template>
<section class="section0-container">
  <div class="container">
    <h1 class="text-white">{{ content.s2_title[0].text }}</h1>
    <prismic-rich-text class="main-content text-center" :field="content.s2_text"/>
    <button class="button"><a href="#">{{ content.s2_button[0].text }}</a></button>
  </div>
</section>
</template>

<script>
export default {
  name: 'HiroWalletSection0',
  components: {

  },
  props: ['content'],
  computed: {
  }
}
</script>

<style scoped>
  .section0-container {
    padding-top: 50px;
    padding-bottom: 50px;
    background-color: #170A6D;
  }
  h1 {
    text-align: center;
    margin-bottom: 44px;
  }
  .main-content {
    max-width: 530px;
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
    color: #FFFFFF !important;
  }
  button {
    background-color: #50B1B5;
    margin: 40px auto 0;
  }
  button a {
    font-size: 1.1rem;
    font-weight: 700;
    color: #FFFFFF;
  }
</style>
