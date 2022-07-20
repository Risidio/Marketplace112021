<template>
    <section class="homeBottomBanner">
        <div ref="homeBottomContainerLoggedIn" v-if="profile.loggedIn" class="homeBottomContainer">
            <h2 ref="contentMainHeadingLoggedIn">{{content.bottomcontent[0].maintitle[0].text}}</h2>
            <p ref="contentMainTextLoggedIn">{{content.bottomcontent[0].text[0].text}}<br/>
            {{content.bottomcontent[0].text[1].text}}</p>
            <div ref="buttonContLoggedIn" class="buttonCont">
                <router-link ref="routerLinkLoggedIn" class="button notFilled" to="/how-it-works"> Find Out More </router-link>
            </div>
        </div>
        <div ref="homeBottomContainerNotLoggedIn" v-else class="homeBottomContainer">
            <h2 ref="contentMainHeadingNotLoggedIn">{{content.bottomcontent[0].maintitle[0].text}}</h2>
            <p ref="contentMainTextNotLoggedIn">{{content.bottomcontent[0].text[0].text}}<br/>
            {{content.bottomcontent[0].text[1].text}}</p>
            <div ref="buttonContNotLoggedIn" class="buttonCont">
                <button ref="buttonNotLoggedIn" class="button filled" @click="startLogin"> Connect with Hiro Wallet</button>
                <router-link ref="routerLinkNotLoggedIn" class="button notFilled" to="/how-it-works"> Find Out More </router-link>
            </div>
        </div>
        <!-- Method Testing Buttons -->
        <button @click="startLogin" class="test-start-login-method">Start Login Method</button>
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
      this.$emit('start-login-function-called', this.profile)
      const myProfile = this.profile
      if (myProfile.loggedIn) {
        this.$emit('start-login-function-called-logged-in', this.profile)
      } else {
        this.$emit('start-login-function-called-not-logged-in', this.profile)
        // this.$store.dispatch('rpayAuthStore/startLogin').then((profile) => {
        //   location.reload()
        // }).catch(() => {
        //   this.$store.commit(APP_CONSTANTS.SET_WEB_WALLET_NEEDED)
        //   window.open('https://www.hiro.so/wallet', '_blank')
        // })
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
