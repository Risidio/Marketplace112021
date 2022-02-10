<template>
<div class = "Htitle">
  <div class = "container">
     <img class="banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg" alt="">
      <h1>{{content.aboutsection0[0].abouttitle[0].text}}</h1>
      <p>{{content.aboutsection0[0].abouttext[0].text}}</p>
      <button class="button notFilled" > <a href="https://risidio.com/">Risidio Website</a></button>
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
  transform: rotate(180deg);
  color:white;
}

.container {
  min-width: 100%;
  padding: 50px;
  align-items: center;
  text-align: center;
  color:white;
  margin-top: -35px;
  min-height: 400px;
}
.container h1{
  margin-top: 40px;
  font-family: inherit;
  font-size: 40px;
  font-weight: 300;
  color: white;
}
.container p{
  font-size: 1em;
  font-weight: 300;
  padding: 20px 0;
  color: white;
  max-width: 600px;
  margin: auto;
}
.container button{
  margin: auto;
}
a, a:after, a:hover{
    color:var(--cyan);
}
</style>
