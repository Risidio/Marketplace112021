<template>
<div class = "Htitle">
  <div class = "about_container">
     <img class="banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg" alt="">
      <h1>{{content.aboutsection0[0].abouttitle[0].text}}</h1>
      <p>{{content.aboutsection0[0].abouttext[0].text}}</p>
      <a class="button notFilled" href="https://risidio.com/" target="_blank">Risidio Website</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'AboutSection0',
  components: {

  },
  props: ['content'],
  computed: {
  }
}
</script>

<style scoped>
.banner{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 37rem;
  object-fit: cover;
  z-index: -10;
  color:white;
}

.about_container {
  min-width: 100%;
  padding: 50px;
  align-items: center;
  text-align: center;
  color:white;
  margin-top: -35px;
  min-height: 400px;
}
.about_container h1{
  margin-top: 40px;
  font-family: inherit;
  font-size: 40px;
  font-weight: 300;
  color: white;
}
.about_container p{
  font-size: 1em;
  font-weight: 300;
  padding: 20px 0;
  color: white;
  max-width: 600px;
  margin: auto;
}
.button {
  margin: auto;
}
a, a:after, a:hover{
  color:var(--cyan);
}
</style>
