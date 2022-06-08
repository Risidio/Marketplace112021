<template>
    <div id="loopbomb-description" class="main-loopbomb-description-container">
        <div class="main-loopbomb-description-section">
            <h2>The New Marketplace</h2>
            <p><span>Technology is progressing so art is evolving.</span></p>
            <p>
                Risidio Marketplace is a decentralised platform to mint, buy and sell digital collectibles and NFTs in the most simple and secure way on Stacks.
            </p>

            <div class="loopbomb-description-buttons-container">
                <router-link to="/about" class="button green-background-button">
                    About Risidio
                </router-link>
                <a href="https://www.stacks.co/learn/introduction" target="_blank" class="green-text-button">
                    About Stacks
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .main-loopbomb-description-container {
        width: 100vw;
        padding-top: 35vh;
        padding-bottom: 35vh;
        padding-left: 10vw;
        padding-right: 10vw;
        background-color: #fff;
        margin: 0;
        display: flex;
    }
    .main-loopbomb-description-section{
        max-width: 700px;
        margin: auto;
    }
    .main-loopbomb-description-section h2 {
        font: normal normal 300 40px/55px Montserrat;
        text-align: center;
    }
    .main-loopbomb-description-section p {
        margin-top: 2.5em;
        max-width: 570px;
        text-align: center;
        font: normal normal 300 14px/18px Montserrat;
        span{
            font: normal normal 500 17px/20px Montserrat;
            text-align: center;
        }
    }
    .loopbomb-description-buttons-container {
        margin-top: 2.5em;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .green-background-button {
        width: 141px;
        height: 43px;
        font: normal normal bold 11px/14px Montserrat;
        color: #fff;
        border: none;
        background: #5FBDC1 0% 0% no-repeat padding-box;
        border-radius: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0;
        transition: all 0.4s ease-in-out;
    }
    .green-background-button:hover {
        background: rgba(95, 189, 193, 0.6);
    }
    .green-text-button {
        margin-left: 20px;
        background-color: rgba(80, 177, 181, 0.1);
        border-radius: 22px;
        border: none;
        width: 141px;
        height: 43px;
        font: normal normal bold 11px/14px Montserrat;
        letter-spacing: 0px;
        color: #5FBDC1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s ease-in-out;
    }
    .green-text-button:hover {
        background-color: rgba(95, 189, 193, 0.6);
    }
    @media only screen and (max-width: 380px){
        .loopbomb-description-buttons-container {
            display: flex;
            flex-flow: column;
        }
        .green-text-button {
            margin-left: 0;
            margin-top: 10px;
        }
    }
</style>
