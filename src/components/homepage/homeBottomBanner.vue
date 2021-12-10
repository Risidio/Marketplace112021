<template>
    <section class="homeBottomBanner">
        <div class="homeBottomContainer">
            <h2>Start Trading Collectables</h2>
            <h3>Create an account and join our marketplace.<br/><br/>
            It's quick, Safe and Free</h3>
            <div class="buttonCont">
                <button class="button filled"> Create An Account</button>
                <button class="button notFilled"> Find Out More </button>
            </div>
        </div>
    <div class="homeMarketItems">

    </div>
    </section>
</template>

<script>

export default {
  name: 'homeBottomBanner',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.homeBottomBanner{
    width:100%;
    height: 40vh;
    background: url(https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg)no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.homeBottomContainer{
    display:block;
    margin: auto auto;
    padding-top: 10vh;
    text-align: center;
    max-width: 800px;
}
.homeBottomContainer h2{
    font-size: 40px;
    font-weight: 200;
    color: white;
}
.homeBottomContainer h3{
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
}
.buttonCont{
    display: flex;
    justify-content: center;
    &>*{
        margin-left: 10px;
        margin-right: 10px;
    }
}
</style>
