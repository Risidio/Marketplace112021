<template>
    <div class="aboutRisid">
        <div class="Acontainer">
          <div class="aboutSection1Container">
            <img src="https://images.prismic.io/radsoc/26f1e22e-5565-4f32-8761-e1b69a3d8e50_risisdilogo.png?auto=compress,format"/>
            <p>{{content.aboutsection1[0].abouttext[0].text}}<br><br>
               {{content.aboutsection1[0].abouttext1[0].text}}</p>
            <p>{{content.aboutsection1[1].abouttext[0].text}}<br><br>
               {{content.aboutsection1[1].abouttext1[0].text}}</p>
          </div>
        </div>
      </div>
</template>

<script>

export default {
  name: 'AboutSection1',
  components: {

  },
  props: ['content']
}
</script>

<style scoped>
.aboutRisid{
  min-height: 400px;
  margin: 0 10px;
  display: grid;
  place-items: center;
  text-align: center;
}
.aboutSection1Container p{
  font: normal normal normal 14px/20px Montserrat;
  max-width: 600px;
  padding: 15px;
}
</style>
