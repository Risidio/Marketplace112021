<template>
<div class = "web3">
<div class= "container">
    <!-- <img src="https://res.cloudinary.com/risidio/image/upload/v1633002004/RisidioMarketplace/web_uywlea.svg" rounded="circle" alt="Circle image"> -->
  <h2 class="title1"> {{content.aboutsection3[0].abouttitle[0].text}}</h2>
  <h2 class="title2"> {{content.aboutsection3[0].aboutsubtitle[0].text}}</h2>
  <div class="theTeamContainer">
    <div class="theTeamContainer1">
      <img alt="icon" class="imgIcon" src="https://res.cloudinary.com/risidio/image/upload/v1640169427/RisidioMarketplace/Component_9_10_xqioky.svg"/>
      <div>
        <h2 class="name">{{content.aboutsection3[0].name[0].text}}</h2>
        <p class="nameTitle">{{content.aboutsection3[0].nametitle[0].text}}</p>
        <p class="nameInfo">{{content.aboutsection3[0].nameinfo[0].text}}</p>
      </div>
    </div>
    <div class="theTeamContainer1">
      <img alt="icon" class="imgIcon" src="https://res.cloudinary.com/risidio/image/upload/v1640169429/RisidioMarketplace/Group_16085_eynazo.svg"/>
      <div>
        <h2 class="name">{{content.aboutsection3[1].name[0].text}}</h2>
        <p class="nameTitle">{{content.aboutsection3[1].nametitle[0].text}}</p>
        <p class="nameInfo">{{content.aboutsection3[1].nameinfo[0].text}}</p>
      </div>
    </div>
    <div class="theTeamContainer1">
      <img alt="icon" class="imgIcon" src="https://res.cloudinary.com/risidio/image/upload/v1640169430/RisidioMarketplace/Group_16084_rm5b5v.svg"/>
      <div>
        <h2 class="name">{{content.aboutsection3[2].name[0].text}}</h2>
        <p class="nameTitle">{{content.aboutsection3[2].nametitle[0].text}}</p>
        <p class="nameInfo">{{content.aboutsection3[2].nameinfo[0].text}}</p>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'AboutSection3',
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
.web3{
  margin: 150px 0;
  background-color: white;
  font-family: inherit;
  min-height: 500px;
}
.container{
  text-align: center;
  max-width: 1500px;
}
h1{
  padding: 50px 0;
  font-size: clamp(4rem, 5rem, 6rem);
  font-weight: 300;
}
p{
  font: normal normal normal 14px/20px Montserrat;
}
.theTeamContainer, .theTeamContainer1{
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
.theTeamContainer{
  gap: 20px;
}
.theTeamContainer >* {
  flex: 1 1 400px;
}
.theTeamContainer1 >*:nth-child(1) {
  flex: 1 1 30%;
  min-width: 100px;
}
.theTeamContainer1 >*:nth-child(2) {
  flex: 1 1 70%;
  min-width: 300px;
}
.title1{
  font: normal normal 700 25px/30px Montserrat;
  margin-top: 75px;
}
.title2{
  font: normal normal 200 36px/36px Montserrat;
  margin-bottom: 75px;
}
.name{
  font: normal normal 300 17px Montserrat;
}
.nameTitle{
  font: normal normal 700 12px Montserrat;
}
.nameInfo{
  font: normal normal 300 15px Montserrat;
}
.imgIcon{
  width: 100px;
  height: 100px;
  margin-left: auto;
}
@media only screen and (max-width: 450px) {
}
</style>
