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
import HomeMarket from '@/components/homepage/homeMarket.vue'
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

describe('homeMarket.vue', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets, profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      }
    })
    expect(wrapper.exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets, profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      }
    })

    // Is passed the correct props with the correct values

    expect(wrapper.props().gaiaAssets).equal(gaiaAssets)
    expect(wrapper.props().profile).equal(profile)
  })
})

describe('homeMarket.vue', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets, profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      }
    })

    // The correct attributes are rendered with the correct values

    expect(wrapper.vm.$data.windowWidth).equals(window.innerWidth)
    expect(wrapper.vm.$data.resultSet).to.eql([])
    expect(wrapper.vm.$data.loaded).equals(false)
    expect(wrapper.vm.$data.placeHolderItems).to.eql([])
    expect(wrapper.vm.$data.shownAssets).to.eql([])
    expect(wrapper.vm.$data.tab).equals('discover')
    expect(wrapper.vm.$data.loopRuns).to.eql([])
    expect(wrapper.vm.$data.currency).equals(null)
    expect(wrapper.vm.$data.loading).equals(false)
  })
})

describe('homeMarket.vue', () => {
  it('renders all the correct components when the discover tab is chosen and the screen width is more than 600 pixels', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      }
    })

    // The correct components are rendered at the correct time

    expect(wrapper.findComponent('.homeMarket').exists()).equals(true)

    // Renders Gallery Nav
    expect(wrapper.findComponent('.galleryNav').exists()).equals(true)

    // Renders Gallery Nav Container
    expect(wrapper.findComponent('.galleryNavContainer').exists()).equals(true)

    // Renders Discover Tab Option
    expect(wrapper.findComponent('#discover').exists()).equals(true)

    // Renders Collections Tab Option
    expect(wrapper.findComponent('#collections').exists()).equals(true)

    // Renders correct components when window width is greater than 600

    // Renders Home Market Items
    expect(wrapper.findComponent('.homeMarketItems').exists()).equals(true)

    // Renders Default NFT Imported Component
    expect(wrapper.findComponent({ ref: 'defaultNFTComponentOnLargeWidth' }).exists()).equals(true)

    // Renders See More Collectables Router Link
    expect(wrapper.findComponent('.routerL').exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
  it('renders all the correct components when the collections tab is chosen and the screen width is more than 600 pixels', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'collections'
        }
      }
    })

    // The correct components are rendered at the correct time

    expect(wrapper.findComponent('.homeMarket').exists()).equals(true)

    // Renders Gallery Nav
    expect(wrapper.findComponent('.galleryNav').exists()).equals(true)

    // Renders Gallery Nav Container
    expect(wrapper.findComponent('.galleryNavContainer').exists()).equals(true)

    // Renders Discover Tab Option
    expect(wrapper.findComponent('#discover').exists()).equals(true)

    // Renders Collections Tab Option
    expect(wrapper.findComponent('#collections').exists()).equals(true)

    // Renders correct components when window width is greater than 600

    // Renders Home Market Items
    expect(wrapper.findComponent('.homeMarketItems').exists()).equals(true)

    // Renders Collections Display Imported Component
    expect(wrapper.findComponent({ ref: 'collectionsDisplayOnLargeWidth' }).exists()).equals(true)

    // // Renders Coming Soon Container
    // expect(wrapper.findComponent('.comingSoon').exists()).equals(true)

    // // Renders Coming Soon Heading
    // expect(wrapper.findComponent({ ref: 'comingSoonHeadingOnLargeWidth' }).exists()).equals(true)

    // Renders See More Collectables Router Link
    expect(wrapper.findComponent('.routerL').exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
  it('renders all the correct components when the collections tab is chosen, the screen width is more than 600 pixels, and the activeLoopRuns computed property is empty and has a length of 0', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = []
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'collections'
        }
      }
    })

    // The correct components are rendered at the correct time

    // Renders Home Market Element
    expect(wrapper.findComponent('.homeMarket').exists()).equals(true)

    // Renders Gallery Nav
    expect(wrapper.findComponent('.galleryNav').exists()).equals(true)

    // Renders Gallery Nav Container
    expect(wrapper.findComponent('.galleryNavContainer').exists()).equals(true)

    // Renders Discover Tab Option
    expect(wrapper.findComponent('#discover').exists()).equals(true)

    // Renders Collections Tab Option
    expect(wrapper.findComponent('#collections').exists()).equals(true)

    // Renders correct components when window width is greater than 600

    // Renders Home Market Items
    expect(wrapper.findComponent('.homeMarketItems').exists()).equals(true)

    // Renders Gallery Container 1 Component
    expect(wrapper.findComponent('.galleryContainer1').exists()).equals(true)

    // Renders Coming Soon Container
    expect(wrapper.findComponent('.comingSoon').exists()).equals(true)

    // Renders Coming Soon Heading
    expect(wrapper.findComponent({ ref: 'comingSoonHeadingOnLargeWidth' }).exists()).equals(true)

    // Renders See More Collectables Router Link
    expect(wrapper.findComponent('.routerL').exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
  it('renders all the correct components when the discover tab is chosen and the screen width is less than 600 pixels', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      data () {
        return {
          windowWidth: 500
        }
      },
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      }
    })

    // The correct components are rendered at the correct time

    expect(wrapper.findComponent('.homeMarket').exists()).equals(true)

    // Renders Gallery Nav
    expect(wrapper.findComponent('.galleryNav').exists()).equals(true)

    // Renders Gallery Nav Container
    expect(wrapper.findComponent('.galleryNavContainer').exists()).equals(true)

    // Renders Discover Tab Option
    expect(wrapper.findComponent('#discover').exists()).equals(true)

    // Renders Collections Tab Option
    expect(wrapper.findComponent('#collections').exists()).equals(true)

    // Renders correct components when window width is less than 600

    // Renders Home Market Items
    expect(wrapper.findComponent('.homeMarketItems').exists()).equals(true)

    // Renders Default NFT Imported Component
    expect(wrapper.findComponent({ ref: 'defaultNFTComponentOnSmallWidth' }).exists()).equals(true)

    // Renders See More Collectables Router Link
    expect(wrapper.findComponent('.routerL').exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
  it('renders all the correct components when the collections tab is chosen and the screen width is less than 600 pixels', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'collections',
          windowWidth: 500
        }
      }
    })

    // The correct components are rendered at the correct time

    expect(wrapper.findComponent('.homeMarket').exists()).equals(true)

    // Renders Gallery Nav
    expect(wrapper.findComponent('.galleryNav').exists()).equals(true)

    // Renders Gallery Nav Container
    expect(wrapper.findComponent('.galleryNavContainer').exists()).equals(true)

    // Renders Discover Tab Option
    expect(wrapper.findComponent('#discover').exists()).equals(true)

    // Renders Collections Tab Option
    expect(wrapper.findComponent('#collections').exists()).equals(true)

    // Renders correct components when window width is greater than 600

    // Renders Home Market Items
    expect(wrapper.findComponent('.homeMarketItems').exists()).equals(true)

    // Renders Collections Display Imported Component
    expect(wrapper.findComponent({ ref: 'collectionsDisplayOnSmallWidth' }).exists()).equals(true)

    // // Renders Coming Soon Container
    // expect(wrapper.findComponent('.comingSoon').exists()).equals(true)

    // // Renders Coming Soon Heading
    // expect(wrapper.findComponent({ ref: 'comingSoonHeadingOnLargeWidth' }).exists()).equals(true)

    // Renders See More Collectables Router Link
    expect(wrapper.findComponent('.routerL').exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
  it('renders all the correct components when the collections tab is chosen, the screen width is less than 600 pixels, and the activeLoopRuns computed property is empty and has a length of 0', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = []
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'collections',
          windowWidth: 500
        }
      }
    })

    // The correct components are rendered at the correct time

    expect(wrapper.findComponent('.homeMarket').exists()).equals(true)

    // Renders Gallery Nav
    expect(wrapper.findComponent('.galleryNav').exists()).equals(true)

    // Renders Gallery Nav Container
    expect(wrapper.findComponent('.galleryNavContainer').exists()).equals(true)

    // Renders Discover Tab Option
    expect(wrapper.findComponent('#discover').exists()).equals(true)

    // Renders Collections Tab Option
    expect(wrapper.findComponent('#collections').exists()).equals(true)

    // Renders correct components when window width is greater than 600

    // Renders Home Market Items
    expect(wrapper.findComponent('.homeMarketItems').exists()).equals(true)

    // Renders Gallery Container 1 Component
    expect(wrapper.findComponent('.galleryContainer1').exists()).equals(true)

    // Renders Coming Soon Container
    expect(wrapper.findComponent('.comingSoon').exists()).equals(true)

    // Renders Coming Soon Heading
    expect(wrapper.findComponent({ ref: 'comingSoonHeadingOnSmallWidth' }).exists()).equals(true)

    // Renders See More Collectables Router Link
    expect(wrapper.findComponent('.routerL').exists()).equals(true)
  })
})

describe('homeMarket.vue', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = [1, 2, 3, 4, 5]
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'collections',
          windowWidth: 500
        }
      }
    })

    // It's event handlers work as intended

    // Triggers click event on Discover Tab Link
    wrapper.findComponent('#discover').trigger('click')

    expect(wrapper.vm.$data.tab).equals('discover')

    // Triggers click event on Collections Tab Link
    wrapper.findComponent('#collections').trigger('click')

    expect(wrapper.vm.$data.tab).equals('collections')
  })
})

describe('homeMarket.vue', () => {
  it('renders the correct text in the correct components when screen width is less than 600', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = []
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'collections',
          windowWidth: 500
        }
      }
    })

    // The correct text, content and information is rendered in the
    // correct components

    // Correct text is rendered in Discover Tab Button
    expect(wrapper.findComponent('#discover').text()).equals('Discover')

    // Correct text is rendered in Collections Tab Button
    expect(wrapper.findComponent('#collections').text()).equals('Collections')

    // Correct text is rendered in Coming Soon heading
    expect(wrapper.findComponent({ ref: 'comingSoonHeadingOnSmallWidth' }).text()).equals('Coming soon!')

    // Correct Text is rendered in router link
    expect(wrapper.findComponent('.routerL').text()).equals('See More Collectables')
  })
})

describe('homeMarket.vue', () => {
  it('it\'s methods work correctly', () => {
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
    const gaiaAssets = vuexStore.getters['contentStore/getDataResults'].gaiaAssets
    const profile = vuexStore.getters[APP_CONSTANTS.KEY_PROFILE]
    const wrapper = shallowMount(HomeMarket, {
      propsData: { gaiaAssets: [1, 2, 3, 4, 5], profile },
      attachTo: document.body,
      store: vuexStore,
      router,
      computed: {
        activeLoopRuns () {
          const loopRuns = []
          return loopRuns
        }
      },
      data () {
        return {
          tab: 'discover'
        }
      }
    })

    // It's methods work correctly

    // tabChange method works as intended
    wrapper.findComponent('#collections').trigger('click')

    const collectionsTabButton = wrapper.findComponent('#collections')
    const discoverTabButton = wrapper.findComponent('#discover')

    expect(wrapper.emitted()).property('Tab-Change-Method-Activated')
    expect(wrapper.vm.$data.tab).equals('collections')
    expect(collectionsTabButton.element.getAttribute('class')).contains('active')
    expect(discoverTabButton.element.getAttribute('class')).not.contains('active')

    wrapper.findComponent('#discover').trigger('click')

    expect(wrapper.emitted()).property('Tab-Change-Method-Activated')
    expect(wrapper.vm.$data.tab).equals('discover')
    expect(collectionsTabButton.element.getAttribute('class')).not.contains('active')
    expect(discoverTabButton.element.getAttribute('class')).contains('active')

    // checkScreen method works as intended
    wrapper.findComponent('.test-check-screen').trigger('click')

    expect(wrapper.emitted()).property('Check-Screen-Method-Activated')
    expect(wrapper.vm.$data.windowWidth).equals(window.innerWidth)

    // findAssets method works as intended
    wrapper.findComponent('.test-find-assets').trigger('click')

    expect(wrapper.emitted()).property('Find-Assets-Method-Activated')
    expect(wrapper.vm.$data.loaded).equals(true)
  })
})
