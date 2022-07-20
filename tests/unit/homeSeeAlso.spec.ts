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
import HomeSeeAlso from '@/components/homepage/homeSeeAlso.vue'
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

describe('homeSeeAlso.vue', () => {
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
    const gaiaAssets = [{
      contractId: '1a',
      contractAsset: {
        nftIndex: 1,
        listingInUstx: {
          price: 45
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-1'
    },
    {
      contractId: '2b',
      contractAsset: {
        nftIndex: 2,
        listingInUstx: {
          price: 60
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-2'
    },
    {
      contractId: '3c',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 25
        }
      },
      properties: {
        collection: 'Numberone'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Numberone #1'
    },
    {
      contractId: '4d',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 100
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-3'
    }
    ]
    const wrapper = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router
    })
    expect(wrapper.exists()).equals(true)
  })
})

describe('homeSeeAlso.vue', () => {
  it('the correct props are passed into the component with the correct values', () => {
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
    const gaiaAssets = [{
      contractId: '1a',
      contractAsset: {
        nftIndex: 1,
        listingInUstx: {
          price: 45
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-1'
    },
    {
      contractId: '2b',
      contractAsset: {
        nftIndex: 2,
        listingInUstx: {
          price: 60
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-2'
    },
    {
      contractId: '3c',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 25
        }
      },
      properties: {
        collection: 'Numberone'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Numberone #1'
    },
    {
      contractId: '4d',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 100
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-3'
    }
    ]
    const wrapper = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router
    })

    // Checks that the correct props are rendered and with the correct values
    expect(wrapper.vm.$props.profile).equals(profile)
    expect(wrapper.vm.$props.gaiaAssets).equals(gaiaAssets)
  })
})

describe('homeSeeAlso.vue', () => {
  it('the correct data attributes are rendered with the correct values', () => {
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
    const gaiaAssets = [{
      contractId: '1a',
      contractAsset: {
        nftIndex: 1,
        listingInUstx: {
          price: 45
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-1'
    },
    {
      contractId: '2b',
      contractAsset: {
        nftIndex: 2,
        listingInUstx: {
          price: 60
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-2'
    },
    {
      contractId: '3c',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 25
        }
      },
      properties: {
        collection: 'Numberone'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Numberone #1'
    },
    {
      contractId: '4d',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 100
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-3'
    }
    ]
    const wrapper = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router
    })

    // Checks that the correct data attributes are rendered and with the correct values
    expect(wrapper.vm.$data.currencyPreference).equals(null)
  })
})

describe('homeSeeAlso.vue', () => {
  it('renders the correct components', () => {
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
    const gaiaAssets = [{
      contractId: '1a',
      contractAsset: {
        nftIndex: 1,
        listingInUstx: {
          price: 45
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-1'
    },
    {
      contractId: '2b',
      contractAsset: {
        nftIndex: 2,
        listingInUstx: {
          price: 60
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-2'
    },
    {
      contractId: '3c',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 25
        }
      },
      properties: {
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Numberone #1'
    },
    {
      contractId: '4d',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 100
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-3'
    }
    ]
    const wrapper = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router
    })

    // Checks that all the correct components are rendered properly
    expect(wrapper.findComponent('.seeAlso').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'seeAlsoHeading' }).exists()).equals(true)
    expect(wrapper.findComponent('.seeAlsoContainer').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'swiper' }).exists()).equals(true)
    expect(wrapper.findComponent('.swiper-wrapper').exists()).equals(true)
    expect(wrapper.findComponent('.swiper-pagination-see-also').exists()).equals(true)
    expect(wrapper.findComponent('.swiper-pagination-bullet-see-also').exists()).equals(true)
    expect(wrapper.findComponent('.swiper-button-prev-see-also').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'swiper-button-prev-image' }))
    expect(wrapper.findComponent('.swiper-button-next-see-also').exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'swiper-button-next-image' }))

    // Checks each swiper slide is rendered correctly under the correct conditions
    // expect(wrapper.findAllComponents({ ref: 'swiperSlide' }).length).equals(4)
    expect(wrapper.findComponent({ ref: 'swiperSlide1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideRouterLink1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTImage1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTName1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTArtist1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCollectionName1' }).exists()).equals(true)
    // expect(wrapper.findComponent({ ref: 'slideNFTAnonymous1' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCurrencyTag1' }).exists()).equals(true)

    expect(wrapper.findComponent({ ref: 'swiperSlide2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideRouterLink2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTImage2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTName2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTArtist2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCollectionName2' }).exists()).equals(true)
    // expect(wrapper.findComponent({ ref: 'slideNFTAnonymous2' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCurrencyTag2' }).exists()).equals(true)

    // Renders correct components when a collection name isn't given
    expect(wrapper.findComponent({ ref: 'swiperSlide3' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideRouterLink3' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTImage3' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTName3' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTArtist3' }).exists()).equals(true)
    // expect(wrapper.findComponent({ ref: 'slideNFTCollectionName3' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTAnonymous3' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCurrencyTag3' }).exists()).equals(true)

    expect(wrapper.findComponent({ ref: 'swiperSlide4' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideRouterLink4' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTImage4' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTName4' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTArtist4' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCollectionName4' }).exists()).equals(true)
    // expect(wrapper.findComponent({ ref: 'slideNFTAnonymous4' }).exists()).equals(true)
    expect(wrapper.findComponent({ ref: 'slideNFTCurrencyTag4' }).exists()).equals(true)
  })
})

describe('homeSeeAlso.vue', () => {
  it('renders the correct information and text in the correct components and each component has the correct attributes and attribute values', () => {
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
    const gaiaAssets = [{
      contractId: '1a',
      contractAsset: {
        nftIndex: 1,
        listingInUstx: {
          price: 45
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-1'
    },
    {
      contractId: '2b',
      contractAsset: {
        nftIndex: 2,
        listingInUstx: {
          price: 60
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-2'
    },
    {
      contractId: '3c',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 25
        }
      },
      properties: {
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Numberone #1'
    },
    {
      contractId: '4d',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 100
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-3'
    }
    ]
    const wrapper = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router
    })

    // Renders the correct text and information in the correct components
    expect(wrapper.findComponent({ ref: 'seeAlsoHeading' }).text()).equals('See Also')

    // Checks each swiper slide has the correct text and attributes rendered into it

    // expect(wrapper.findAllComponents({ ref: 'swiperSlide' }).length).equals(4)
    expect(wrapper.findComponent({ ref: 'slideNFTImage1' }).element.getAttribute('src')).equals(gaiaAssets[0].image)
    expect(wrapper.findComponent({ ref: 'slideNFTName1' }).text()).equals(gaiaAssets[0].name + ' ' + gaiaAssets[0].contractAsset.listingInUstx.price + ' STX')
    expect(wrapper.findComponent({ ref: 'slideNFTArtist1' }).text()).equals('By ' + gaiaAssets[0].properties.collection + '£ ' + utils.toDecimals(gaiaAssets[0].contractAsset.listingInUstx.price * 0.3133))

    expect(wrapper.findComponent({ ref: 'slideNFTImage2' }).element.getAttribute('src')).equals(gaiaAssets[1].image)
    expect(wrapper.findComponent({ ref: 'slideNFTName2' }).text()).equals(gaiaAssets[1].name + ' ' + gaiaAssets[1].contractAsset.listingInUstx.price + ' STX')
    expect(wrapper.findComponent({ ref: 'slideNFTArtist2' }).text()).equals('By ' + gaiaAssets[1].properties.collection + '£ ' + utils.toDecimals(gaiaAssets[1].contractAsset.listingInUstx.price * 0.3133))

    expect(wrapper.findComponent({ ref: 'slideNFTImage3' }).element.getAttribute('src')).equals(gaiaAssets[2].image)
    expect(wrapper.findComponent({ ref: 'slideNFTName3' }).text()).equals(gaiaAssets[2].name + ' ' + gaiaAssets[2].contractAsset.listingInUstx.price + ' STX')
    expect(wrapper.findComponent({ ref: 'slideNFTArtist3' }).text()).equals('By ' + 'Anonymous' + '£ ' + utils.toDecimals(gaiaAssets[2].contractAsset.listingInUstx.price * 0.3133))

    expect(wrapper.findComponent({ ref: 'slideNFTImage4' }).element.getAttribute('src')).equals(gaiaAssets[3].image)
    expect(wrapper.findComponent({ ref: 'slideNFTName4' }).text()).equals(gaiaAssets[3].name + ' ' + gaiaAssets[3].contractAsset.listingInUstx.price + ' STX')
    expect(wrapper.findComponent({ ref: 'slideNFTArtist4' }).text()).equals('By ' + gaiaAssets[3].properties.collection + '£ ' + utils.toDecimals(gaiaAssets[3].contractAsset.listingInUstx.price * 0.3133))
  })
})

describe('homeSeeAlso.vue', () => {
  it('the methods all work correctly and do what\'s intended ', () => {
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
    const gaiaAssets = [{
      contractId: '1a',
      contractAsset: {
        nftIndex: 1,
        listingInUstx: {
          price: 45
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-1'
    },
    {
      contractId: '2b',
      contractAsset: {
        nftIndex: 2,
        listingInUstx: {
          price: 60
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-2'
    },
    {
      contractId: '3c',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 25
        }
      },
      properties: {
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Numberone #1'
    },
    {
      contractId: '4d',
      contractAsset: {
        nftIndex: 3,
        listingInUstx: {
          price: 100
        }
      },
      properties: {
        collection: 'indige100'
      },
      image: 'https://res.cloudinary.com/risidio/image/upload/f_auto/q_auto:low/indige-testing/',
      name: 'Indige-NFT-3'
    }
    ]
    const wrapper = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router
    })
    const wrapper2 = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router,
      data () {
        return {
          currencyPreference: { text: 'GBP' }
        }
      }
    })
    const wrapper3 = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router,
      data () {
        return {
          currencyPreference: { text: 'EUR' }
        }
      }
    })
    const wrapper4 = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router,
      data () {
        return {
          currencyPreference: { text: 'USD' }
        }
      }
    })
    const wrapper5 = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router,
      data () {
        return {
          currencyPreference: { text: 'JPY' }
        }
      }
    })
    const wrapper6 = shallowMount(HomeSeeAlso, {
      propsData: { profile, gaiaAssets },
      store: vuexStore,
      router,
      data () {
        return {
          currencyPreference: { text: 'CNY' }
        }
      }
    })

    // The methods all work correctly

    // Change Currency Method works correctly
    wrapper.findComponent('.test-change-currency-1').trigger('click')
    expect(wrapper.emitted()).property('change-currency-method-activated')
    expect(wrapper.vm.$data.nftPrice).equals(0)

    wrapper.findComponent('.test-change-currency-2').trigger('click')
    expect(wrapper.emitted()).property('change-currency-method-activated')
    expect(wrapper.vm.$data.nftPrice).equals(utils.toDecimals(100 * 0.3133))

    wrapper2.findComponent('.test-change-currency-3').trigger('click')
    expect(wrapper2.emitted()).property('change-currency-method-activated')
    expect(wrapper2.vm.$data.nftPrice).equals(utils.toDecimals(100 * 0.3133))

    wrapper3.findComponent('.test-change-currency-4').trigger('click')
    expect(wrapper3.emitted()).property('change-currency-method-activated')
    expect(wrapper3.emitted()).property('change-currency-method-activated-with-currency-preference')
    expect(wrapper3.vm.$data.nftPrice).equals(utils.toDecimals(100 * 0.3642))

    wrapper4.findComponent('.test-change-currency-5').trigger('click')
    expect(wrapper4.emitted()).property('change-currency-method-activated')
    expect(wrapper4.vm.$data.nftPrice).equals(utils.toDecimals(100 * 0.3864))

    // Change Currency Tag Method works correctly
    wrapper.findComponent('.test-change-currency-tag-1').trigger('click')
    expect(wrapper.emitted()).property('change-currency-method-activated')
    expect(wrapper.vm.$data.currencyTag).equals('£')

    wrapper2.findComponent('.test-change-currency-tag-2').trigger('click')
    expect(wrapper2.emitted()).property('change-currency-method-activated')
    expect(wrapper2.vm.$data.currencyTag).equals('£')

    wrapper3.findComponent('.test-change-currency-tag-6').trigger('click')
    expect(wrapper3.emitted()).property('change-currency-method-activated')
    expect(wrapper3.vm.$data.currencyTag).equals('€')

    wrapper4.findComponent('.test-change-currency-tag-3').trigger('click')
    expect(wrapper4.emitted()).property('change-currency-method-activated')
    expect(wrapper4.vm.$data.currencyTag).equals('$')

    wrapper5.findComponent('.test-change-currency-tag-4').trigger('click')
    expect(wrapper5.emitted()).property('change-currency-method-activated')
    expect(wrapper5.vm.$data.currencyTag).equals('¥')

    wrapper6.findComponent('.test-change-currency-tag-5').trigger('click')
    expect(wrapper6.emitted()).property('change-currency-method-activated')
    expect(wrapper6.vm.$data.currencyTag).equals('¥')
  })
})
