import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { APP_CONSTANTS } from '@/app-constants'
import Vuex from 'vuex'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueSocialSharing from 'vue-social-sharing'
import Vue2TouchEvents from 'vue2-touch-events'
import browserDetect from 'vue-browser-detect-plugin'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Notifications from 'vue-notification'
import PrismicVue from 'prismic-vue'
import linkResolver from '../../src/prismic/link-resolver'
import htmlSerializer from '../../src/prismic/html-serializer'
import { defaultStore } from '@/store'
import router from '../../src/router'
import HomeInfo from '@/components/homepage/homeInfo.vue'
const RisidioPay = () => import('risidio-pay')
const globalAny: any = global

// Set local storage, session storage and Date properties
globalAny.localStorage = window.localStorage
globalAny.sessionStorage = window.sessionStorage
window.Date = Date

// Testable components can be found in the testableComponents folder, though do
// make any necessary changes to them if any features or styling of the actual
// component changes. The testable components are there to demonstrate what edits
// have been made to these components in the past in order to make it possible to
// test them

describe('homeInfo.vue', () => {
  it('Tested Component is rendered and instantiated', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    // const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    expect(wrapper.exists()).equals(true)
  })
})

describe('homeInfo.vue', () => {
  it('is being passed the correct values for it\'s props', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    // Check props with correct values are passed to the component
    expect(wrapper.props().profile).equals(profile)
    expect(wrapper.props().content).equals(content)
  })
})

describe('homeInfo.vue', () => {
  it('starts off with the correct data attribute values', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    // Starts off with the correct data attribute values
    expect(wrapper.vm.$data.windowWidth).equals(window.innerWidth)
    expect(wrapper.vm.$data.resultSet).to.eql([])
    expect(wrapper.vm.$data.loaded).equals(false)
    expect(wrapper.vm.$data.rand).equals(1)
  })
})

describe('homeInfo.vue', () => {
  it('renders the correct components when the window width is less than 840 pixels', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router,
      data () {
        return {
          windowWidth: 500
        }
      }
    })

    // Renders the correct components
    expect(wrapper.findComponent('.homeInfo').exists()).equals(true)
    expect(wrapper.findComponent('.homeText').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeTextHeading' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeTextParagraph' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeInfoSwiperSlider' }).exists()).equals(true)
  })
})

describe('homeInfo.vue', () => {
  it('renders the correct components when the window width is more than or equal to 840 pixels', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    // Renders the correct components
    expect(wrapper.findComponent('.homeInfo').exists()).equals(true)
    expect(wrapper.findComponent('.homeText').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeTextHeading' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeTextParagraph' }).exists()).equals(true)
    expect(wrapper.findComponent('.homeInfoContainer').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'textCon1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideConImage1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideConHeading1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeInfoText1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'routerLink1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'notFilledButtonText1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'textCon2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideConImage2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideConHeading2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeInfoText2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'routerLink2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'notFilledButtonText2' }).exists()).equals(true)
  })
})

describe('homeInfo.vue', () => {
  it('renders the correct information and text in the correct components', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    // Renders the correct text and information in the correct components
    expect(wrapper.findComponent({ ref: 'homeTextHeading' }).text()).equals(content.needahand[0].needtitle[0].text)
    expect(wrapper.findComponent({ ref: 'homeTextParagraph' }).text()).equals(content.needahand[0].needtitle2[0].text)
    expect(wrapper.findComponent({ ref: 'slideConHeading1' }).text()).equals(content.needahand[0].sell[0].text)
    expect(wrapper.findComponent({ ref: 'homeInfoText1' }).text()).equals(content.needahand[0].selltext[0].text)
    expect(wrapper.findComponent({ ref: 'notFilledButtonText1' }).text()).equals('My NFTs')
    expect(wrapper.findComponent({ ref: 'slideConHeading2' }).text()).equals(content.needahand[0].buy[0].text)
    expect(wrapper.findComponent({ ref: 'homeInfoText2' }).text()).equals(content.needahand[0].buytext[0].text)
    expect(wrapper.findComponent({ ref: 'notFilledButtonText2' }).text()).equals('Gallery')
  })
})

describe('homeInfo.vue', () => {
  it('the component\'s methods all work correctly when the user is logged in', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: true }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router,
      attachTo: document.body
    })

    // It's methods all work correctly

    // The startLogin method works correctly

    // Works corrrectly when logged in
    wrapper.findComponent('.test-start-login-method').trigger('click')
    expect(wrapper.emitted()).property('Logged-In')

    // The startRegister method works correctly
    wrapper.findComponent('.test-start-register-method').trigger('click')
    expect(wrapper.emitted()).property('Start-Register')
  })
})

describe('homeInfo.vue', () => {
  it('the component\'s methods all work correctly when the user is logged in', () => {
    Vue.use(Vuex)
    Vue.use(browserDetect)
    Vue.use(BootstrapVue)
    Vue.use(VueScrollTo)
    Vue.use(VueSocialSharing)
    Vue.use(IconsPlugin)
    Vue.use(Notifications, { closeOnClick: true, duration: 6000 })
    Vue.use(PrismicVue, {
      endpoint: 'https://therisidioproject.prismic.io/api/v2',
      linkResolver,
      htmlSerializer
    })
    Vue.use(RisidioPay)
    Vue.use(Vue2TouchEvents)
    const vuexStore = new Vuex.Store(defaultStore())
    const profile = { loggedIn: false }
    const content = {
      needahand: [{
        needtitle: [{
          text: 'Testing 1'
        }],
        needtitle2: [{
          text: 'Testing 2'
        }],
        sell: [{
          text: 'Testing 3'
        }],
        selltext: [{
          text: 'Testing 4'
        }],
        buy: [{
          text: 'Testing 5'
        }],
        buytext: [{
          text: 'Testing 6'
        }]
      }]
    }
    const wrapper = shallowMount(HomeInfo, {
      propsData: { profile, content },
      store: vuexStore,
      router,
      attachTo: document.body
    })

    // It's methods all work correctly

    // The startLogin method works correctly

    // Works correctly when not logged in
    wrapper.findComponent('.test-start-login-method').trigger('click')
    expect(wrapper.emitted()).property('Not-Logged-In')

    // The startRegister method works correctly
    wrapper.findComponent('.test-start-register-method').trigger('click')
    expect(wrapper.emitted()).property('Start-Register')
  })
})
