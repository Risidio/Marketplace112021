<template>
<div class = "Htitle">
  <div class = "title-container">
      <h1>{{content.howsection1[0].howtitle[0].text}}</h1>
      <div class="pCont">
        <p> {{content.howsection1[0].howtext[0].text}}<br/></p></div>
      </div>
      <router-link to="/about" class="button filled"> About Risidio</router-link>
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

<style lang="scss" scoped>
.Htitle{
  position: relative;
  min-height: 30vh;
  margin: 200px auto 100px auto;
}
.title-container {
  padding: 20px;
  max-width: 1000px;
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
  max-width: 570px;
}
.button {
  background-color: rgba(80, 177, 181, 0.1);
  margin: 40px auto 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #5FBDC1;
  // margin-left: 700px;
  // margin-right: 680px;
  margin: auto;
  display: block;
}
.faq-tag{
  position: absolute;
  font: normal normal normal 14px/16px Helvetica Neue;
  text-transform: uppercase;
  color: #1B0A72;
  text-align: center;
  bottom: -40px;
  right: 0;
  left: 0;
  margin: auto;
}
.line{
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  width: 200px;
  height: 70px;
  display: flex;
  flex-direction: row;
  bottom: -125px;
  & > * {
    width: 50%;
  }
  & :nth-child(1){
    border-right: 1px solid #1B0A72;
  }
}
</style>
