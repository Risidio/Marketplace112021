<template>
<div class="main-banner">
    <div class="top-triangle-container">
        <img src="@/assets/img/upper-left-triangle.png" alt="Triangle">
    </div>
    <div class="logo-container">
        <img class="risidio-marketplace-logo" src="@/assets/img/risidio_white_logo.svg" alt="Risidio Marketplace">
        <h3 class="logo-text">Marketplace</h3>
    </div>
    <div class="coming-soon-container">
        <img src="@/assets/img/coming-soon.png" alt="Coming Soon">
    </div>
    <div class="bottom-section-container">
        <img class="paint-palette-image" src="@/assets/img/paint-palette-risidio.png" alt="Paint Palette">
        <div class="read-more-section">
            <a href="#loopbomb-description" class="read-more-button">Read More</a>
            <span class="read-more-button-line"></span>
        </div>
        <img src="@/assets/img/triangle-and-painter.png" alt="Triangle and Painter" class="triangle-and-painter-image">
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
    body {
        overflow-x: hidden !important;
    }
</style>

<style scoped>
    .main-banner {
        height: 657px;
        width: 100vw;
        background-color: #170A6D;
        margin: 0;
    }
    .top-triangle-container img {
        width: 357px;
    }
    .logo-container {
        width: 100vw;
        display: grid;
        grid-template-rows: 1fr;
        font: normal normal medium 17px/20px Montserrat;
        justify-items: center;
    }
    .logo-container h3 {
        color: #fff;
    }
    .logo-container img {
        display: block;
        width: 230px;
    }
    .coming-soon-container {
        width: 100vw;
        margin-top: 80px;
        display: flex;
        justify-content: center;
        z-index: 2;
    }
    .coming-soon-container img {
        width: 734px;
        z-index: 2;
    }
    .bottom-section-container {
        width: 100vw;
    }
    .paint-palette-image {
        width: 195px;
        position: absolute;
        left: 0px;
        top: 496px;
    }
    .read-more-section {
        position: absolute;
        display: inline-flex;
        flex-flow: column;
        align-items: center;
        width: 30vw;
        left: 35vw;
        top: 525px;
    }
    .read-more-button {
        border: none;
        background-color: transparent;
        color: #fff;
        text-align: center;
        font: normal normal medium 17px/20px Montserrat;
        text-decoration: none;
    }
    .read-more-button-line {
        width: 1px;
        height: 102px;
        background-color: #fff;
    }
    .triangle-and-painter-image {
        position: absolute;
        z-index: 1;
        top: 413px;
        right: 0px;
    }
    @media only screen and (max-width: 1100px) {
        .read-more-section {
            top: 525px;
        }
        .triangle-and-painter-image {
            top: 413px;
        }
        .paint-palette-image {
        top: 496px;
        }
    }
    @media only screen and (max-width: 991px) {
    .triangle-and-painter-image {
        width: 200px;
        top: 444px;
    }
        .paint-palette-image {
            width: 130px;
            top: 550px;
        }
}
@media only screen and (max-width: 800px) {
    .triangle-and-painter-image {
        width: 180px;
        top: 465px;
    }
}
@media only screen and (max-width: 580px) {
    .triangle-and-painter-image {
        width: 120px;
        top: 529px;
    }
    .paint-palette-image {
        width: 100px;
        top: 574px;
    }
    .coming-soon-container img {
        width: 400px;
    }
}
@media only screen and (max-width: 440px) {
    .triangle-and-painter-image {
        width: 90px;
        top: 561px;
    }
    .paint-palette-image {
            width: 100px;
            top: 574px;
        }
}
@media only screen and (max-width: 440px) {
    .coming-soon-container img {
        width: 270px;
    }
}
@media only screen and (max-width: 380px) {
    .top-triangle-container img {
        width: 240px;
    }
}
</style>
