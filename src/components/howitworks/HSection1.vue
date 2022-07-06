<template>
<div class = "Htitle">
    <img class="banner" src="https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg" alt="">
  <div class = "container">
      <h1>{{content.howsection0[0].howtitle[0].text}}</h1>
      <!-- <p>{{content.howsection0[0].howtext[0].text}} </p> -->
      <!-- <button class="button notFilled"> Get Started </button> -->
  </div>
</div>
</template>

<script>
export default {
  name: 'HTitle',
  components: {

  },
  props: ['content'],
  data () {
    return {
    }
  },
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
.HTitle{
  width:100%;
  color:white;
}
.container {
  display: grid;
  place-items: center;
  min-width: 100%;
  padding: 50px;
  align-items: center;
  text-align: center;
  color:white;
  margin-top: -35px;
  min-height: 300px;
}
.container h1{
  font: normal 300 37px/30px Montserrat;
  color:white;

}
.container p{
  margin: 30px auto;
  font: normal 200 1em Montserrat;
  max-width: 700px;
    color:white;
}
.container button{
  margin: auto;
}
a, a:after, a:hover{
    color:black;
}
</style>
