<template>
    <section class="homeBottomBanner">
        <div v-if="profile.loggedIn" class="homeBottomContainer">
            <h2>{{content.bottomcontent[0].maintitle[0].text}}</h2>
            <p>{{content.bottomcontent[0].text[0].text}}<br/>
            {{content.bottomcontent[0].text[1].text}}</p>
            <div class="buttonCont">
                <router-link class="button notFilled" to="/how-it-works"> Find Out More </router-link>
            </div>
        </div>
        <div v-else class="homeBottomContainer">
            <h2>{{content.bottomcontent[0].maintitle[0].text}}</h2>
            <p>{{content.bottomcontent[0].text[0].text}}<br/>
            {{content.bottomcontent[0].text[1].text}}</p>
            <div class="buttonCont">
                <button class="button filled" @click="startLogin"> Connect with Hiro Wallet</button>
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
.homeBottomBanner {
  width: 100%;
  margin: auto;
  min-height: 560px;
  // max-height: 50vh;
  background: url(https://res.cloudinary.com/risidio/image/upload/v1633609373/RisidioMarketplace/Group_-304_ofssmk.svg)
    no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.homeBottomContainer {
  display: flex;
  flex-direction: column;
  margin: auto auto;
  padding-top: 100px;
  text-align: center;
  max-width: 800px;
  height: 40rem;
}
.homeBottomContainer h2 {
  font-size: 40px;
  font-weight: 200;
  margin-bottom: 50px;
  color: white;
}
.homeBottomContainer p {
  font-size: 17px;
  color: white;
  margin-bottom: 50px;
}
.button {
  width: 180px;
  padding: 15px;
  text-align: center;
  display: grid;
  place-items: center;
}
.buttonCont {
  display: flex;
  justify-content: center;
  & > * {
    margin-left: 10px;
    margin-right: 10px;
  }
  & a:hover {
    color: white;
  }
}
@media only screen and (max-width: 520px) {
  .homeBottomContainer h2 {
    font-size: 30px;
  }
  .homeBottomContainer h3 {
    font-size: 13px;
  }
}
</style>
