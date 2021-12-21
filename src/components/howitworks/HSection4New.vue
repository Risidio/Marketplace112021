<template>
  <div id="frame">
    <div class = "hS4_container">
      <div class = "container step-container">
        <div class="tip-number">Tip #1</div>
        <h1>{{content.howsectionslide1[0].howslidetitle[0].text}}</h1>
      <img src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg" alt="wallet" class="wallet">
        <!-- <h2> Step <br><span>0{{slide.id}} </span> </h2> -->
        <div class = "textContainer">
              <ol>
                  <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[0].text}}</p></li><br/>
                  <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[1].text}}</p></li><br/>
                  <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[2].text}}</p></li><br/>
                  <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[3].text}}</p></li><br/>
                  <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[4].text}}</p></li><br/>
                  <li><p> &nbsp; {{content.howsectionslide1[0].howslidetext[5].text}}</p></li>
              </ol>
              <button class="button"> Get Your Stacks/Hiro Wallet </button>
        </div>
      </div>
      <div class = "container step-container">
        <div class="tip-number">Tip #2</div>
        <h1>{{content.howsectionslide2[0].howslidetitle[0].text}}</h1>
        <img src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg" alt="wallet" class="wallet">
        <!-- <h2> Step <br><span>0{{slide.id}} </span> </h2> -->
        <div class = "textContainer">
          <ol>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[0].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[1].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[2].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[3].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[4].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[5].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[6].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide2[0].howslidetext[7].text}}</p></li>
          </ol>
          <button class="button"> Upload Your Items </button>
        </div>
      </div>
      <div class = "container step-container">
        <div class="tip-number">Tip #3</div>
        <h1>{{content.howsectionslide3[0].howslidetitle[0].text}}</h1>
        <img src="https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg" alt="wallet" class="wallet">
        <!-- <h2> Step <br><span>0{{slide.id}} </span> </h2> -->
        <div class = "textContainer">
          <ol>
              <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[0].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[1].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[2].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[3].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[4].text}}</p></li><br/>
              <li><p> &nbsp; {{content.howsectionslide3[0].howslidetext[5].text}}</p></li>
          </ol>
          <button class="button"> Mint Your NFTs </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Group4',
  components: {
  },
  props: ['content'],
  data: () => ({
  }),
  computed: {
  }
}
</script>

<style scoped>
#frame{
  margin: 50px auto;
}
.hS4_container{
  justify-content: center;
  padding: 150px 80px;
}
.vueperslide {
  background-color:#ffffff;
}
.vueperslides--fixed-height {
  height: 1100px;
  min-width: 500px;
  max-width: 1100px;
  margin: 150px auto;
  padding: 0 50px;
}
h1{
  font: 300 37px/30px Montserrat;
  text-align: center;
  margin-bottom: 50px;
  max-width: 410px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.2;
}
h2{
  padding-top: 30px;
  text-align: center;
  font-weight: 400;
}
span{
  font-weight: 600;
  font-size: 1.2em;
}
img{
  height: 250px;
  width: 250px;
  margin-left: 125px;
}
p{
  font: normal normal normal 14px/22px Montserrat;
  margin: 0 auto;
}
li {
  padding-left: 40px;
}
li::marker {
  font: normal normal normal 14px/22px Montserrat;
}
ol{
    margin: 30px;
    max-width: 550px;
    margin: auto;
}
.container{
  margin: 50px auto;
}
.step-container {
  position: relative;
  max-width: 670px;
  padding-top: 50px;
  padding-bottom: 50px;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #1B0A72;
  border-radius: 6px;
}
.step-container img {
  width: 150px;
  height: auto;
}
.textContainer{
  margin-top: 50px;
}
.arrow{
  width: 30px;
  height: 30px;
  margin: auto;
}
.button{
  margin: 50px auto 0 auto;
  color: white;
  background-color: rgb(0, 177, 201);
}
.wallet{
  margin: 0 auto 25px auto;
  display: block;
  width: 250px;
  height: 250px;
}
.tip-number {
  text-align: center;
  font: normal normal 300 29px/24px Montserrat;
  letter-spacing: 0px;
  color: #1B0A72;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #1B0A72;
  border-radius: 6px;
  padding: 20px;
  display: inline-block;
  position: absolute;
  left: -11%;
}
@media only screen and (max-width: 640px)  {
  .hS4_container{
    padding: 150px 15px;
  }
}
@media only screen and (max-width: 500px)  {
  li {
    padding-left: 20px;
  }
}
@media only screen and (max-width: 360px)  {
  li {
    padding-left: 10px;
  }
}
</style>
