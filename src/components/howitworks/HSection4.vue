<template>
<div class = "Htitle">
  <div class = "title-container">
      <h1>{{content.howsection1[0].howtitle[0].text}}</h1>
      <p>{{content.howsection1[0].howtitle2[0].text}} </p>
      <div class="pCont">
        <p> {{content.howsection1[0].howtext[0].text}}<br>
      {{content.howsection1[0].howtext[1].text}} <br>
      {{content.howsection1[0].howtext[2].text}}<br>
      {{content.howsection1[0].howtext[3].text}}</p>
      </div>

      </div>
      <router-link to="/about" style="display: block; margin: auto;"><button  class="button"> About Risidio </button></router-link>
</div>
</template>

<script>
export default {
  name: 'WRuma',
  props: ['content'],
  components: {

  }
}
</script>

<style scoped>
.Htitle{
  min-height: 30vh;
  margin: 200px auto 100px auto;
}
.title-container {
  padding: 20px;
  max-width: 700px;
  text-align: center;
  margin: auto;
}
.title-container h1{
  font: normal normal 300 37px/30px Montserrat;
}
.title-container p{
  font-family: inherit;
  font-size: 22px;
  font-weight: 500;
  padding-top: 25px;
  padding-bottom: 20px;
}
.pCont p{
  font: normal normal 300 14px/20px Montserrat;
  margin:auto;
}
.button{
  display: block;
  margin: 50px auto;
  padding: 15px 50px;
  border-radius: 100px;
  border: none;
  background-color: rgba(0, 162, 184, 0.1);
  font-size: 14px;
  font-weight:700;
  color: rgb(0, 177, 201);
}

</style>
