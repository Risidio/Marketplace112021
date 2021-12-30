<template>
    <div class="qnasection1">
        <div class="qnacontainer">
            <h1>Join our Competition</h1>
            <p>Catch phrase</p>
            <p class="qna-p">(Exmanation / rulles ) <br> Lorem ipsum dolor sit amet, consetetu. Storem ipsum dolore magna. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</p>
            <button class="button notFilledBlue">Participate</button>
        </div>
        <div class="qna-questions">
            <!-- <button class="qna-arrow"></button> -->
            <div class="qna-p-container">
                <h1>QnA question</h1>
                <div class="qna-p">
                    <p>(Little explanation on what it is to min an item)</p>
                    <p>You can mint your own NFT on Risidio Marletplace. All you need to do is to make sure you are connecter, go to your profil, and clique on the «+» sine. You will lode a file and get all the infos. Once its done, you are ready to min. Little bonus, you can set Royalties you will get every time your artwork is resell.</p>
                </div>
                <button class="button filled qaregister-button">Register</button>
            </div>
            <!-- <button class="qna-arrow"></button> -->
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .qnasection1 {
        width: 100%;
        min-height: 500px;
        text-align: center;

        h1  {
            font: normal normal 300 40px/55px Montserrat;
            margin-bottom: 24px;
        }
    }

    .qnacontainer {
        max-width: 700px;
        margin: auto;
        margin-top: 180px;

        h1 + p {
            font-size: 17px;
            font-weight: 500;
            margin-bottom: 25px;
        }

        .qna-p {
            font-size: 14px;
            margin-bottom: 28px;
            font-weight: 300;
        }

        }

        .qna-questions {
            background: rgba(23, 10, 109, 1);
            margin-top: 70px;
            min-height: 417px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            h1 {
                color: white;
                padding: 45px 0 25px;
            }

            p {
                color: white;
                font-size: 14px;
                max-width: 540px;
                margin: auto;
                margin-bottom: 15px;
                font: normal normal normal 14px/20px Montserrat;
                letter-spacing: 0;
            }

            .qna-arrow {
                border-radius: 100%;
                padding: 0;
                width: 26px;
                height: 26px;
                background: white;
                color: rgba(23, 10, 109, 1);
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

        }

        .button {
            margin: auto;
        }

        .qaregister-button {
            margin-top: 30px;
            margin-bottom: 40px;
        }
</style>
