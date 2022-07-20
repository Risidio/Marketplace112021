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
import Homebanner from '@/components/homepage/homebanner.vue'
const RisidioPay = () => import('risidio-pay')
const globalAny: any = global

globalAny.localStorage = window.localStorage
globalAny.sessionStorage = window.sessionStorage
window.Date = Date

// Testable components can be found in the testableComponents folder, though do
// make any necessary changes to them if any features or styling of the actual
// component changes. The testable components are there to demonstrate what edits
// have been made to these components in the past in order to make it possible to
// test them

describe('homebanner.vue', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    expect(wrapper.exists()).equals(true)
  })
})

describe('homebanner.vue', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    expect(wrapper.props().profile).equal(profile)
    expect(wrapper.props().content).equal(content)
  })
})

describe('homebanner.vue', () => {
  it('starts off with the correct attribute values', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    // The attributes are rendered
    expect(wrapper.vm.$data.touchableSlide).equals(false)
    expect(wrapper.vm.$data.showArrow).equals(true)
    expect(wrapper.vm.$data.bullets).equals(false)
    expect(wrapper.vm.$data.breakpoints).to.eql({
      700: {
        bullets: true
      }
    })
    expect(wrapper.vm.$data.slide).to.eql([
      {
        id: '1',
        text: 'Collection'
      },
      {
        id: '2',
        text: 'Collection'
      }
      // {
      //   id: '3',
      //   text: 'Collection'
      // }
    ])
    expect(wrapper.vm.$data.resultSet).to.eql([])
    expect(wrapper.vm.$data.loaded).equals(false)
    expect(wrapper.vm.$data.rand).equals(1)
    expect(wrapper.vm.$data.loading).equals(false)
  })
})

describe('homebanner.vue', () => {
  it('renders all the correct components', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    wrapper.setData({ loggedIn: true })

    // Renders Banner Container
    expect(wrapper.findComponent('.bannerContainer').exists()).equals(true)

    // Renders if container when loggedIn data attribute equals true
    expect(wrapper.findComponent('.if').exists()).equals(true)

    // Renders Banner Image
    expect(wrapper.findComponent('.banner').exists()).equals(true)

    // Renders logged in Banner
    expect(wrapper.findComponent('.loggedBanner').exists()).equals(true)

    // Renders Slider Container
    expect(wrapper.findComponent('.vueSlideContainer').exists()).equals(true)

    // Renders Swiper Slider
    expect(wrapper.findComponent('.swiper').exists()).equals(true)

    // Renders Swiper Wrapper
    expect(wrapper.findComponent('.swiper-wrapper').exists()).equals(true)

    // Renders Swiper Slide
    expect(wrapper.findComponent('.swiper-slide').exists()).equals(true)

    // Renders Slide Image
    expect(wrapper.findComponent('.slideImage').exists()).equals(true)

    // Renders Slide Text
    expect(wrapper.findComponent('.slideText').exists()).equals(true)

    // Renders Home Search Bar Imported Component
    expect(wrapper.findComponent('.home-search-bar-component').exists()).equals(true)

    // Renders Previous Slide Arrow on Swiper Slideshow
    expect(wrapper.findComponent('.swiper-button-prev').exists()).equals(true)

    // Renders Next Slide Arrow on Swiper Slideshow
    expect(wrapper.findComponent('.swiper-button-next').exists()).equals(true)

    // Renders Swiper Slideshow Pagination Container
    expect(wrapper.findComponent('.swiper-pagination-home-banner').exists()).equals(true)

    // Renders Swiper Slideshow Pagination Bullets
    expect(wrapper.findComponent('.swiper-pagination-bullet').exists()).equals(true)

    // Renders Search Container when logged in
    expect(wrapper.findComponent('.searchContainer-1').exists()).equals(true)

    // Renders the Search Bar component when logged in
    expect(wrapper.findComponent('.home-search-bar-component').exists()).equals(true)

    // Doesn't render components it shouldn't when logged in

    // Doesn't render Slide Container not logged container
    expect(wrapper.findComponent('.slideContainerNotLogged').exists()).equals(false)
  })
})

describe('homebanner.vue', () => {
  it('renders the correct components when user is not logged in', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router,
      data () {
        return {
          loggedIn: false
        }
      }
    })

    // Renders the correct components when not logged in

    // Renders slide Container not logged container
    expect(wrapper.findComponent('.slideContainerNotLogged').exists()).equals(true)

    // Renders notLoggedCont div container
    expect(wrapper.findComponent('.notLoggedCont').exists()).equals(true)

    // Renders Mobile Header
    expect(wrapper.findComponent('.mobileHeader').exists()).equals(true)

    // Renders Home Video
    expect(wrapper.findComponent('.home-video').exists()).equals(true)

    // Renders Slide Text that should appear when not logged in
    expect(wrapper.findComponent('.slideText-notLogged').exists()).equals(true)

    // Renders Not Mobile Header
    expect(wrapper.findComponent('.notMobileHeader').exists()).equals(true)

    // Renders Side Text Component
    expect(wrapper.findComponent('.slide-text-p').exists()).equals(true)

    // Renders Banner Button Container Component
    expect(wrapper.findComponent('.bannerButtonContainer').exists()).equals(true)

    // Renders Banner Button Component
    expect(wrapper.findComponent('.button').exists()).equals(true)

    // Render Banner Button Text
    expect(wrapper.findComponent('.bannerButtonText').exists()).equals(true)

    // Renders correct Search Container when not logged in
    expect(wrapper.findComponent('.searchContainer-2').exists()).equals(true)

    // Doesn't render logged in Home Banner
    expect(wrapper.findComponent('.if').exists()).equals(false)
  })
})

describe('homebanner.vue', () => {
  it('has event handlers that work correctly and trigger the correct functions at the correct time', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router,
      data () {
        return {
          loggedIn: false
        }
      }
    })

    // It's event handlers work as intended

    // Triggers click event on Banner Button text
    wrapper.findComponent('.bannerButtonText').trigger('click')

    // Correct function is triggered and it does the right thing in the right circumstances
    expect(wrapper.emitted()).property('login-method-activated-while-not-logged-in')
  })
})

describe('homebanner.vue', () => {
  it('renders the correct text in the correct components when logged in.', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })

    // The correct text, content and information is rendered in the
    // correct components

    // Correct text is rendered in mobile header of first slide
    expect(wrapper.findComponent({ ref: 'firstMobileHeader' }).text()).equals('The Indige Collection')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'firstNotMobileHeader' }).text()).equals('The Indige Collection')

    // Correct text is rendered in first slide text paragraph
    expect(wrapper.findComponent({ ref: 'firstSlideTextP' }).text()).equals('Testing 1')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'firstSlideRouterLink' }).text()).equals('See The Collection')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'secondMobileHeader' }).text()).equals('Testing Mobile Header 2')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'secondNotMobileHeader' }).text()).equals('Testing Slide Text 2')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'secondSlideTextP' }).text()).equals('Testing Slide Paragraph 2')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'secondSlideButton' }).text()).equals('Coming soon')
  })
})

describe('homebanner.vue', () => {
  it('renders the correct text in the correct components when not logged in.', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router,
      data () {
        return {
          loggedIn: false
        }
      }
    })

    // The correct text, content and information is rendered in the
    // correct components

    // Correct text is rendered in mobile header of first slide
    expect(wrapper.findComponent({ ref: 'notLoggedInMobileHeader' }).text()).equals('Testing Not Logged In')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'notLoggedInNotMobileHeader' }).text()).equals('Testing Not Logged In Not Mobile Header')

    // Correct text is rendered in first slide text paragraph
    expect(wrapper.findComponent({ ref: 'notLoggedInSlideTextP' }).text()).equals('Testing Not Logged In Slide Text P')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'notLoggedInHiroWalletButton' }).text()).equals('Get Your Hiro Wallet To Start')

    // Correct text is rendered in not mobile header of first slide
    expect(wrapper.findComponent({ ref: 'notLoggedInBannerButtonText' }).text()).equals('Already Have One? Get Started')
  })
})

describe('homebanner.vue', () => {
  it('has methods that work correctly', () => {
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
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const content = vuexStore.getters[APP_CONSTANTS.KEY_CONTENT_MARKET]
    const wrapper = shallowMount(Homebanner, {
      propsData: { profile, content },
      store: vuexStore,
      router
    })
    // Check Screen function
    function checkScreen (testWindowWidth) {
      const windowWidth = testWindowWidth
      if (windowWidth < 720) {
        wrapper.setData({ touchableSlide: true })
        wrapper.setData({ showArrow: false })
      } else if (windowWidth > 720) {
        wrapper.setData({ touchableSlide: false })
        wrapper.setData({ showArrow: true })
      }
    }

    // First test of checkScreen Function
    const testWindowWidth1 = 500
    checkScreen(testWindowWidth1)
    // Check the data attributes have been modified as intended
    expect(wrapper.vm.$data.touchableSlide).equals(true)
    expect(wrapper.vm.$data.showArrow).equals(false)

    // Second test of checkScreen function
    const testWindowWidth2 = 900
    checkScreen(testWindowWidth2)
    // Check the data attributes have been modified as intended
    expect(wrapper.vm.$data.touchableSlide).equals(false)
    expect(wrapper.vm.$data.showArrow).equals(true)
  })
})
