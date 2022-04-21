import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

// templates
import MainNavbar from '@/components/layout/MainNavbar.vue'
import MainFooter from '@/components/layout/MainFooter.vue'

// public pages
import HiroWallet from '../views/HiroWallet.vue'

// private pages
const Homepage = () => import('../views/Homepage.vue')
const About = () => import('../views/About.vue')

// Public Marketplace Routes
const ItemPreview = () => import('@/views/marketplace/ItemPreview.vue')
const AssetDetails = () => import('@/views/marketplace/AssetDetails.vue')

const Gallery = () => import('@/views/Gallery.vue')
const HowItWorks = () => import('@/views/HowItWorks.vue')
const LaunchCollection = () => import('@/views/collections/LaunchCollection.vue')
const IndigeCollection = () => import('@/views/collections/IndigeCollection.vue')
const QandA = () => import('@/views/QandA.vue')
const errorFour = () => import('@/views/FourOFour.vue')
const AdminPage = () => import('@/views/AdminPage.vue')
const MyAccount = () => import('@/views/userProfile/MyAccount.vue')

Vue.use(VueRouter)

const isPermitted = function (to, profile) {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      return profile.superAdmin
    }
    return profile.loggedIn
  } else {
    return false
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    components: { default: Homepage, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Home - Risidio' }
  },
  {
    path: '/admin-collection-mint',
    name: 'adminCollectionMint',
    components: { default: AdminPage, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Hi Risidio Admin' }
  },
  {
    path: '/my-account',
    name: 'my-account',
    components: { default: MyAccount, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Your Account - Risidio' }
  },
  {
    path: '/how-it-works',
    name: 'how-it-works',
    components: { default: HowItWorks, header: MainNavbar, footer: MainFooter },
    meta: { title: 'How it Works - Risidio' }
  },
  {
    path: '/nft-marketplace',
    name: 'gallery',
    components: { default: Gallery, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Marketplace for NFTs by the Number One Team Secured by Bitcoin' }
  },
  {
    path: '/qa',
    name: 'QandA',
    components: { default: QandA, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Ask your questions' }
  },
  {
    path: '/about',
    name: 'about',
    components: { default: About, header: MainNavbar, footer: MainFooter },
    meta: { title: 'About - Risidio' }
  },
  {
    path: '/hiro-wallet',
    name: 'hiro-wallet',
    components: { default: HiroWallet, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Hiro Wallet - Risidio' }
  },
  {
    path: '/numberone_roots',
    name: 'launch-collection',
    components: { default: LaunchCollection, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Launch Collection Featuring Benny' }
  },
  // {
  //   path: '/indige_mirror/',
  //   name: 'indige-collecion',
  //   components: { default: IndigeCollection, header: MainNavbar, footer: MainFooter },
  //   meta: { title: 'The Indige Collection' }
  // },
  {
    path: '/indige_mirror/:page',
    name: 'indige-collecion',
    components: { default: IndigeCollection, header: MainNavbar, footer: MainFooter },
    meta: { title: 'The Indige Collection' }
  },
  {
    path: '/assets/:assetHash/:edition',
    name: 'asset-by-hash',
    components: { default: AssetDetails, header: MainNavbar, footer: MainFooter },
    meta: { title: 'Asset informations' }
  },
  {
    path: '/nfts/:nftIndex',
    redirect: '/nfts/' + process.env.VUE_APP_STACKS_CONTRACT_ADDRESS + '.' + process.env.VUE_APP_STACKS_CONTRACT_NAME + '/:nftIndex'
  },
  {
    path: '/nfts/:contractId/:nftIndex',
    name: 'asset-by-index',
    components: { default: AssetDetails, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'NFT display'
    }
  },
  {
    path: '/nft-preview/:contractId/:nftIndex',
    name: 'nft-preview',
    components: { default: ItemPreview, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'NFT Preview'
    }
  },
  {
    path: '/item-preview/:assetHash/:edition',
    name: 'item-preview',
    components: { default: ItemPreview, header: MainNavbar, footer: MainFooter },
    meta: {
      requiresAuth: false,
      requiresAdmin: false,
      title: 'Item preview'
    }
  },
  {
    path: '*',
    components: {
      default: errorFour
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let myProfile = store.getters['rpayAuthStore/getMyProfile']
    if (myProfile && myProfile.loggedIn) {
      if (isPermitted(to, myProfile)) {
        return next()
      } else {
        return next({ path: '/home', query: { redirect: to.fullPath } })
      }
    } else {
      let counter = 0
      const myint = setInterval(function () {
        counter++
        myProfile = store.getters['rpayAuthStore/getMyProfile']
        if (myProfile && myProfile.loggedIn) {
          if (isPermitted(to, myProfile)) {
            return next()
          }
        }
        if (counter >= 5) {
          clearInterval(myint)
          return next({ path: '/home', query: { redirect: to.fullPath } })
        }
      }, 2000)
    }
  } else {
    return next() // make sure to always call next()!
  }
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  if (!nearestWithMeta) return next()

  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta')

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key])
    })

    tag.setAttribute('data-vue-router-controlled', '')

    return tag
  }).forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
