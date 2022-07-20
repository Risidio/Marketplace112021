import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { APP_CONSTANTS } from '@/app-constants'
import Vuex from 'vuex'
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueSocialSharing from 'vue-social-sharing'
import Vue2TouchEvents from 'vue2-touch-events'
import browserDetect from 'vue-browser-detect-plugin'
import { BNavItem, BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Notifications from 'vue-notification'
import PrismicVue from 'prismic-vue'
import linkResolver from '../../src/prismic/link-resolver'
import htmlSerializer from '../../src/prismic/html-serializer'
import { defaultStore } from '@/store'
import router from '../../src/router'
import homeBottomBanner from '@/components/homepage/homeBottomBanner.vue'
import utils from '@/services/utils'
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

describe('homeBottomBanner.vue', () => {
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
    const content = {
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    }
    const wrapper = shallowMount(homeBottomBanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    expect(wrapper.exists()).equals(true)
  })
})

describe('homeBottomBanner.vue', () => {
  it('correct props are rendered with corret values', () => {
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
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    }
    const wrapper = shallowMount(homeBottomBanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    expect(wrapper.props().profile).to.eql({ loggedIn: true })
    expect(wrapper.props().content).to.eql({
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    })
  })
})

describe('homeBottomBanner.vue', () => {
  it('correct components are rendered in the correct circumstances', () => {
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
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    }
    const wrapper = shallowMount(homeBottomBanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    const wrapper2 = shallowMount(homeBottomBanner, {
      propsData: { profile: { loggedIn: false }, content },
      store: vuexStore,
      router
    })

    // Renders Correct Components at the correct time

    // Renders correct components when logged in
    expect(wrapper.findComponent('.homeBottomBanner').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'homeBottomContainerLoggedIn' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'contentMainHeadingLoggedIn' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'contentMainTextLoggedIn' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'buttonContLoggedIn' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'routerLinkLoggedIn' }).exists()).equals(true)

    // Renders correct components when not logged in
    expect(wrapper2.findComponent('.homeBottomBanner').exists()).equals(true)
    expect(wrapper2.findComponent({ ref: 'homeBottomContainerNotLoggedIn' }).exists()).equals(true)
    expect(wrapper2.findComponent({ ref: 'contentMainHeadingNotLoggedIn' }).exists()).equals(true)
    expect(wrapper2.findComponent({ ref: 'contentMainTextNotLoggedIn' }).exists()).equals(true)
    expect(wrapper2.findComponent({ ref: 'buttonContNotLoggedIn' }).exists()).equals(true)
    expect(wrapper2.findComponent({ ref: 'buttonNotLoggedIn' }).exists()).equals(true)
    expect(wrapper2.findComponent({ ref: 'routerLinkNotLoggedIn' }).exists()).equals(true)
  })
})

describe('homeBottomBanner.vue', () => {
  it('event handlers are working correctly and calling the correct functions', () => {
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
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    }
    const wrapper = shallowMount(homeBottomBanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    // Test event handlers are working correctly and calling the correct functions

    // Testing click event handler on Hiro Waller Login Button

    wrapper.findComponent({ ref: 'buttonNotLoggedIn' }).trigger('click')
    expect(wrapper.emitted()).property('start-login-function-called')
  })
})

describe('homeBottomBanner.vue', () => {
  it('correct information, text and attributes is passed into each component', () => {
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
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    }
    const wrapper = shallowMount(homeBottomBanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    const wrapper2 = shallowMount(homeBottomBanner, {
      propsData: { profile: { loggedIn: false }, content },
      store: vuexStore,
      router
    })

    // All components have the correct attributes and text content

    // All components have the correct attributes and text content when logged in

    expect(wrapper.findComponent({ ref: 'contentMainHeadingLoggedIn' }).text()).equals(content.bottomcontent[0].maintitle[0].text)
    expect(wrapper.findComponent({ ref: 'contentMainTextLoggedIn' }).text()).equals(content.bottomcontent[0].text[0].text + ' ' + content.bottomcontent[0].text[1].text)
    expect(wrapper.findComponent({ ref: 'routerLinkLoggedIn' }).text()).equals('Find Out More')

    // All components have the correct attributes and text content when not logged in

    expect(wrapper2.findComponent({ ref: 'contentMainHeadingNotLoggedIn' }).text()).equals(content.bottomcontent[0].maintitle[0].text)
    expect(wrapper2.findComponent({ ref: 'contentMainTextNotLoggedIn' }).text()).equals(content.bottomcontent[0].text[0].text + ' ' + content.bottomcontent[0].text[1].text)
    expect(wrapper2.findComponent({ ref: 'buttonNotLoggedIn' }).text()).equals('Connect with Hiro Wallet')
    expect(wrapper2.findComponent({ ref: 'routerLinkNotLoggedIn' }).text()).equals('Find Out More')
  })
})

describe('homeBottomBanner.vue', () => {
  it('it\'s methods all work correctly', () => {
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
      bottomcontent: [{
        maintitle: [{
          text: 'Testing Header 1'
        }],
        text: [
          {
            text: 'Testing Text 1'
          },
          {
            text: 'Testing Text 2'
          }
        ]
      }]
    }
    const wrapper = shallowMount(homeBottomBanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    const wrapper2 = shallowMount(homeBottomBanner, {
      propsData: { profile: { loggedIn: true }, content },
      store: vuexStore,
      router
    })

    // Test methods all work correctly

    // Testing startLogin method

    // Works correctly when not logged in
    wrapper.findComponent('.test-start-login-method').trigger('click')
    expect(wrapper.emitted()).property('start-login-function-called-not-logged-in')

    // Works correctly when logged in
    wrapper2.findComponent('.test-start-login-method').trigger('click')
    expect(wrapper2.emitted()).property('start-login-function-called-logged-in')
  })
})
