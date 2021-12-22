<template>
  <div id="frame">
    <div class = "hS3_container">
      <h1>{{ content.howsection1_5_title[0].text }}</h1>

      <div class="question-container" v-for="(item, index) in content.howsection1_5" :key="index">
        <button v-b-toggle="`question-${index}`" @click="isCollapsed.splice(index, 1, !isCollapsed[index])" class="question-button">
          {{ item.howsection1_5_subtitle[0].text }}
          <b-icon v-if="isCollapsed[index]" icon="x"></b-icon>
          <b-icon v-else icon="info-circle"></b-icon>
        </button>
        <b-collapse :id="`question-${index}`">
          <div class="question-content">
            <prismic-rich-text class="question-text" :field="item.howsection1_5_text"/>
            <a href="#" class="button filled">{{ item.howsection1_5_button[0].text }}</a>
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

<style scoped>
#frame{
  margin: 50px auto;
}
.hS3_container {
  justify-content: center;
  background-color:#170A6D;
  padding: 100px 15px;
}
.question-button {
  display: flex;
  align-items: center;
  font: normal normal 300 25px/30px Montserrat;
  letter-spacing: 0px;
  color: #170A6D;
  text-align: left;
  margin: 0 auto 23px;
  padding: 20px 30px;
  max-width: 730px;
  width: 100%;
  min-height: 73px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 6px;
  border: none;
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
  display: flex;
  align-items: center;
  text-align: left;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 0 0 6px 6px;
  max-width: 730px;
  width: 100%;
  margin: 1px auto 45px;
  position: relative;
}
.question-text {
  font: normal normal normal 14px/20px Montserrat;
  text-align: left;
  color: #000000;
  padding: 20px 30px;
  margin: 0;
  max-width: 600px;
}
.question-content a.button {
  font: normal normal bold 11px/14px Montserrat;
  letter-spacing: 0px;
  color: #FFFFFF;
  text-transform: capitalize;
  justify-content: center;
  width: 177px;
  height: 43px;
  padding-left: 30px;
  padding-right: 30px;
  position: absolute;
  bottom: -20px;
  right: 40px;
}
h1{
  color:white;
  font: normal normal 300 37px/30px Montserrat;
  text-align: center;
  margin-bottom: 100px;
}
</style>
