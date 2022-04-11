<template>
  <div class="errorPage">
    <img src="@/assets/img/risidio.svg" alt="risidio logo" class="error-logo-risid"/>
    <img src="@/assets/img/404.png" alt="404-image" class="error-logo-error"/>
    <h2>SOMETHING IS MISSING</h2>
    <router-link to="/"><button class="button1 notFilledBlue">Back</button></router-link>
  </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang="scss" scoped>
.errorPage{
  max-width: 800px;
  margin: auto;
  padding: 70px 15px;
  text-align: center;
}
.error-logo-risid{
  margin-bottom: 25px;
}
.error-logo-error{
  width: 100%;
  max-height: 400px;
}
.button1{
  margin: 50px auto;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 10px 30px;
  border: none;
  border-radius: 50px;
}
</style>
