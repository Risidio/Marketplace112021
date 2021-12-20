<template>
    <section class="homeBottomBanner">
        <div v-if="profile.loggedIn" class="homeBottomContainer">
            <h2>{{content.bottomcontent[0].maintitle[0].text}}</h2>
            <h3>{{content.bottomcontent[0].text[0].text}}<br/><br/>
            {{content.bottomcontent[0].text[1].text}}</h3>
            <div class="buttonCont">
                <router-link class="button notFilled" to="/how-it-works"> Find Out More </router-link>
            </div>
        </div>
        <div v-else class="homeBottomContainer">
            <h2>{{content.bottomcontent[0].maintitle[0].text}}</h2>
            <h3>{{content.bottomcontent[0].text[0].text}}<br/><br/>
            {{content.bottomcontent[0].text[1].text}}</h3>
            <div class="buttonCont">
                <button class="button filled" @click="startLogin"> Connect with a Wallet to Start!</button>
                <router-link class="button notFilled" to="/how-it-works"> Find Out More </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'

export default {
  name: 'homeBottomBanner',
  props: ['profile', 'content'],
  data () {
    return {
    }
  },
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
    padding-top: 8%;
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
