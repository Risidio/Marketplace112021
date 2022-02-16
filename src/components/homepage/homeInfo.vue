<template>
    <section class="homeInfo">
        <div class="homeText">
            <h1 style="font: normal normal bold 17px/20px Montserrat;">{{content.needahand[0].needtitle[0].text}} </h1>
            <h2 style="font: normal normal 200 40px/49px Montserrat;"> {{content.needahand[0].needtitle2[0].text}} </h2>
        </div>
            <div v-if="profile.loggedIn">
            <div class="homeInfoContainer">
                <!-- <div>
                    <div>
                        <div class="textCon">
                            <img src='https://res.cloudinary.com/risidio/image/upload/v1637162043/RisidioMarketplace/Groupe_17296_smc1up.svg'/>
                            <p style="font-size: 16px; font-weight: 700;"> {{content.needahand[0].upload[0].text}}  <br/><br/></p>
                            <p class="homeInfoText"> {{content.needahand[0].uploadtext[0].text}}</p>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/create"> <span style="margin: auto" class="notFilledButtonText">Upload</span> </router-link>
                        </div>
                    </div>
                </div> -->
                <div>
                    <div>
                        <div class="textCon">
                            <img src='https://res.cloudinary.com/risidio/image/upload/v1637162044/RisidioMarketplace/002-distributed_ledger_b4tq2s.svg'/>
                            <p style="font-size: 14px; font-weight: 700;"> {{content.needahand[0].sell[0].text}}  <br/><br/></p>
                            <p class="homeInfoText">{{content.needahand[0].selltext[0].text}} </p>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/my-account"> <span style="margin: auto"  class="notFilledButtonText">My NFTs</span> </router-link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div class="textCon">
                        <img src='https://res.cloudinary.com/risidio/image/upload/v1637162045/RisidioMarketplace/009-coin_ojj2mp.svg'/>
                            <p style="font-size: 14px; font-weight: 700;"> {{content.needahand[0].buy[0].text}}  <br/><br/></p>
                            <p class="homeInfoText">{{content.needahand[0].buytext[0].text}} </p>
                            <router-link style="width:200px; margin:auto; text-align: center; padding: auto" class='button notFilled' to="/nft-marketplace/risidio/launch_collection_t1"> <span style="margin: auto"  class="notFilledButtonText">Gallery</span> </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="homeInfoContainer">
                <!-- <div>
                    <div>
                    <div class="textCon">
                         <h1 class="oneTwoThreeFour">1</h1>
                        <img src='https://res.cloudinary.com/risidio/image/upload/v1633609788/RisidioMarketplace/006-wallet_uy3myg.svg'/>
                        <p style="font-size: 16px; font-weight: 700;"> {{content.needahand[0].connect[0].text}}  <br/><br/></p>
                        <p class="homeInfoText"> {{content.needahand[0].connecttext[0].text}}</p>
                        <button class='button notFilled' @click="startLogin"> Connect A Web Wallet to Begin!</button>
                    </div>
                </div>
                </div> -->
                <!-- <div> -->
                    <!-- <div> -->
                        <!-- <div class="textCon"> -->
                            <!-- <h1 class="oneTwoThreeFour">2</h1> -->
                            <!-- <img src='https://res.cloudinary.com/risidio/image/upload/v1637162043/RisidioMarketplace/Groupe_17296_smc1up.svg'/>
                            <p style="font-size: 16px; font-weight: 700;"> {{content.needahand[0].upload[0].text}}  <br/><br/></p>
                            <p class="homeInfoText"> {{content.needahand[0].uploadtext[0].text}}</p> -->
                        <!-- <button class='button notFilled'> Upload </button> -->
                        <!-- </div> -->
                    <!-- </div> -->
                <!-- </div> -->
                <div>
                    <div>
                        <div class="textCon">
                            <!-- <h1 class="oneTwoThreeFour">3</h1> -->
                            <img src='https://res.cloudinary.com/risidio/image/upload/v1637162044/RisidioMarketplace/002-distributed_ledger_b4tq2s.svg'/>
                            <p style="font-size: 14px; font-weight: 700;"> {{content.needahand[0].sell[0].text}}  <br/><br/></p>
                            <p class="homeInfoText">{{content.needahand[0].selltext[0].text}} </p>
                        <!-- <button class='button notFilled'> My NFTs </button> -->
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div class="textCon">
                            <!-- <h1 class="oneTwoThreeFour">4</h1> -->
                        <img src='https://res.cloudinary.com/risidio/image/upload/v1637162045/RisidioMarketplace/009-coin_ojj2mp.svg'/>
                            <p style="font-size: 14px; font-weight: 700;"> {{content.needahand[0].buy[0].text}}  <br/><br/></p>
                            <p class="homeInfoText">{{content.needahand[0].buytext[0].text}} </p>
                         <!-- <button  class='button notFilled'> Gallery </button> -->
                        </div>
                    </div>
                </div>
            </div>
                <button v-if="!profile.loggedIn" class='button notFilled' v-on:click="startLogin()"> Connect with Hiro Wallet </button>
                <!-- <button style=" margin: 50px auto; width:30vw; max-height: 50vw" class='button notFilled' @click="startLogin"> <span style="margin:auto">Connect A Web Wallet to Get Started!</span> </button> -->
        </div>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
export default {
  name: 'HomeInfo',
  props: ['profile', 'content'],

  methods: {
    startLogin () {
      // this.$emit('updateEventCode', { eventCode: 'connect-login' })
      const myProfile = this.$store.getters['rpayAuthStore/getMyProfile']
      if (myProfile.loggedIn) {
        this.$emit('connect-login', myProfile)
      } else {
        this.$store.dispatch('rpayAuthStore/startLogin').then((profile) => {
          console.log(profile)
          location.reload()
        }).catch(() => {
          this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
          window.open('https://www.hiro.so/wallet', '_blank')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.oneTwoThreeFour{
    color: white;
    font-size: 5rem;
    font-weight: 200;
    margin-bottom: 5rem;
}
.homeInfo{
    min-height: 800px;
    background: transparent linear-gradient(180deg, rgba(54, 24, 165, 0.925) 0%, rgb(16, 29, 92) 100%) 0% 0% no-repeat padding-box;
    padding: 10rem 1rem;
    color: white;
    text-align: center;
}
.homeText > * {
  color:white;
  max-width: 800px;
  margin: 10px auto
}
.textCon{
    min-height: 30px;
    & button{
        margin: auto;
    }
    & a:hover {
        color: white;
    }
}
.button{
    margin: 50px auto;
}
.homeInfoContainer{
    // margin-top: 100px;
    max-width: 1135px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}
.homeInfoContainer > * {
    flex-direction: row;
    flex: 1 1 400px;
    text-align: center;
    img{
        border-radius: 10px;
        display: block;
        margin:20px auto;
        max-width: 100%;
        max-height: 300px;
    }
    p{
        font: normal normal 300 14px/18px Montserrat;
        display: block;
        margin:auto;
        color: white;
    }
}
.homeInfoText{
    max-width: 275px;
    padding-bottom: 50px;
}
</style>
