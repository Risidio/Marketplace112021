<template>
    <section class="homeBottomBanner">
        <div v-if="profile.loggedIn" class="homeBottomContainer">
            <h2>Start Trading Collectables</h2>
            <h3>Create an account and join our marketplace.<br/><br/>
            It's quick, Safe and Free</h3>
            <div class="buttonCont">
                <button class="button filled"> Create An Account</button>
                <button class="button notFilled"> Find Out More </button>
            </div>
        </div>
        <div v-else class="homeBottomContainer">
            <h2>Explore the New Era of Digital Collectables and NFT's</h2>
            <h3>Create an account and join our marketplace.<br/><br/>
            It's quick, Safe and Free</h3>
            <div class="buttonCont">
                <button class="button filled"> Create An Account</button>
                <button class="button notFilled"> Find Out More </button>
            </div>
        </div>
    </section>
</template>

<script>

export default {
  name: 'homeBottomBanner',
  props: ['profile'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.homeBottomBanner{
    width:100%;
    margin: auto;
    height: 60vh;
    // max-height: 50vh;
    background: url(https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg)no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.homeBottomContainer{
    display:flex;
    flex-direction: column;
    margin: auto auto;
    padding-top: 10%;
    text-align: center;
    max-width: 800px;
    height: 40rem;
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
