<template>
    <div class="launchS1">
        <div class = "container">
            <h1>{{content.intro[0].title[0].text}}</h1>
            <p>{{content.intro[0].text1[0].text}}</p>
            <p>{{content.intro[0].text2[0].text}}</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Launch-Collection-S1',
  props: ['content']
}
</script>

<style lang="scss" scoped>
.launchS1{
    min-height: 50vh;
    display: grid;
    place-items: center;
}
.container{
    text-align: center;
    max-width: 800px;
    h1{
        font: normal normal 300 40px/55px Montserrat;
        padding: 10px;
    }
    :nth-child(2){
        font: normal normal bolder 17px/20px Montserrat;
        padding: 10px;
    }
    :nth-child(3){
        font: normal normal normal 14px/20px Montserrat;
        padding: 10px;
    }
}
</style>
