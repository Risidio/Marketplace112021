<template>
  <section class ="our_values" >
    <div class ="values_container">
        <div>
          <h1 style="font: normal normal 300 37px/30px Montserrat; color: white; margin-bottom: 50px;">{{content.aboutsection2[0].abouttitle[0].text}}</h1>
          <p style="color: white; font: normal normal normal 14px/20px Montserrat; max-width: 600px">{{content.aboutsection2[0].abouttext[0].text}}<br><br>
             {{content.aboutsection2[0].abouttext1[0].text}}</p>
            <div class="m-5 d-flex justify-content-center">
              <a title="join us on discord" href="https://discord.com/invite/sQaKVft"><button class="button filled">Read More</button></a>
            </div>
        </div>
      </div>
  </section>
</template>

<script>

export default {
  name: 'AboutSection2',
  components: {
  },
  props: ['content'],
  data () {
    return {
      response: null
    }
  }
}

</script>

<style lang="scss" scoped>
/* General style */
.our_values{
  background-color: rgb(11, 11, 116);
  min-height: 400px;
  text-align: center;
  justify-content: center;
  color:white;
}

.values_container{
  margin: auto;
  max-width: 600px;
  padding: 100px 0;
}
h1{
  padding-bottom: 25px;
  text-align: center;
}
p{
  padding: 0 10px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
