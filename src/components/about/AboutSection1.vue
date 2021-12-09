<template>
    <b-container style="min-height: 60vh" class="pb-4 text-center">
      <b-row align-h="center" style="min-height: 60vh">
        <div class="Acontainer">
          <div class="aboutSection1Container">
                <b-img src="https://images.prismic.io/radsoc/26f1e22e-5565-4f32-8761-e1b69a3d8e50_risisdilogo.png?auto=compress,format"></b-img>
            <p>{{content.aboutsection1[0].abouttext[0].text}}<br><br>
               {{content.aboutsection1[0].abouttext1[0].text}}</p>
          </div>
        </div>
      </b-row>
    </b-container>
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
.Acontainer{
  margin:auto;
}
.aboutSection1Container p{
  font: normal normal normal 14px/20px Montserrat;
  max-width: 600px;
}
</style>
