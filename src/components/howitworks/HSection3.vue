<template>
  <div class = "hS3_container">
    <h2>{{ content.howsection2_title[0].text }}</h2>

    <div class="question-container" v-for="(item, index) in content.howsection2" :key="index">
    <div v-if="index == 0 || index == 3"> <!-- comment this code out to return all the text on prismic-->
      <button v-b-toggle="`question-${index}`" @click="isCollapsed.splice(index, 1, !isCollapsed[index])" class="question-button">
        {{ item.subtitle[0].text }}
        <b-icon v-if="isCollapsed[index]" icon="x"></b-icon>
        <b-icon v-else icon="info-circle"></b-icon>
        </button>
      <b-collapse :id="`question-${index}`">
        <div v-if="item.instructions[0]">
          <div class="question-content">
            <prismic-rich-text class="question-content--text" :field="item.text"/>
          </div>
          <div class="question-instructions">
            <img :src="item.img" alt="image">
            <prismic-rich-text class="question-instructions--text" :field="item.instructions"/>
            <a href="/hiro-wallet" class="button filled">{{ item.button[0].text }}</a>
          </div>
        </div>
        <div v-else>
          <div class="question-content solo">
            <prismic-rich-text class="question-content--text" :field="item.text"/>
            <!-- <a href="#" class="button filled">{{ item.button[0].text }}</a> -->
          </div>
        </div>
      </b-collapse>
    </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'Group3',
  components: {
  },
  props: ['content'],
  data: () => ({
    isCollapsed: [false, false, false]
  }),
  methods: {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.hS3_container {
  justify-content: center;
  background-color:#170A6D;
  padding: 100px 15px;
}
.question-button {
  display: flex;
  align-items: center;
  font: normal normal 300 25px/30px Montserrat;
  text-align: left;
  margin: 0px auto 23px;
  padding: 20px 30px;
  max-width: 730px;
  width: 100%;
  min-height: 73px;
  background: rgba(255, 255, 255, 0.7) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 15px;
  border: none;
 }
 .question-button p{
  letter-spacing: 0px;
  color: #170A6D;
  font-size: 20px;
 }
.question-button.not-collapsed {
  border-radius: 6px 6px 0 0;
  margin: 0 auto 0;
}
.question-button svg {
  margin-left: auto;
  width: 28px;
  height: auto;
}
.question-content {
  text-align: center;
  background: rgba(255, 255, 255, 0.7) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0;
  max-width: 730px;
  width: 100%;
  margin: 1px auto 1px;
  padding: 45px 30px;
}
.question-content--text, .question-instructions--text {
  font: normal normal normal 14px/20px Montserrat;
  text-align: left;
  color: #000000;
  margin: 0;
}
.solo {
  border-radius: 0 0 6px 6px;
}
.question-container a.button {
  display: inline-flex;
  font: normal normal bold 11px/14px Montserrat;
  letter-spacing: 0px;
  color: #FFFFFF;
  text-transform: capitalize;
  justify-content: center;
  min-width: 177px;
  height: 43px;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 50px;
}
h2{
  color:white;
  font: normal normal 300 37px/30px Montserrat;
  text-align: center;
  margin-bottom: 100px;
}
img {
  width: 150px;
  height: auto;
  margin-bottom: 50px;
}
.question-instructions {
  text-align: center;
  background: rgba(255, 255, 255, 0.7) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0 0 6px 6px;
  max-width: 730px;
  width: 100%;
  padding: 70px 20px;
  margin: 0 auto 45px;
}
.question-instructions--text {
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}
.question-instructions--text >>> li {
  padding-left: 40px;
  margin-bottom: 35px;
}
.question-instructions--text >>> li:last-child {
   margin-bottom: 0;
}
@media only screen and (max-width: 500px)  {
  .question-instructions--text >>> li {
    padding-left: 20px;
  }
}
@media only screen and (max-width: 360px)  {
  .question-instructions--text >>> li {
    padding-left: 10px;
  }
}
</style>
