
const contentStore = {
  namespaced: true,
  state: {
    content: {
      artists: [],
      charities: [],
      mainFooter: null,
      marketplacetemplate: null,
      launchcollection: null,
      indigecollection: null,
      information: null,
      navigation: null,
      homepage: null,
      about: null,
      tooltips: null,
      emails: null,
      howItWorks: null,
      hiroWallet: null,
      searchWord: '',
      dataResults: []
    },
    defaultArtist: 'chemicalx',
    waitingImage: 'https://images.prismic.io/dbid/c19ad445-eab4-4de9-9b5a-c10eb158dc5e_black_no1.png?auto=compress,format'
  },
  getters: {
    getWaitingCSS: state => image => {
      if (!image) image = state.waitingImage
      return {
        'min-height': '300px',
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        '-webkit-background-size': 'contain',
        '-moz-background-size': 'contain',
        '-o-background-size': 'contain',
        'background-size': 'contain',
        'background-image': `url(${image})`,
        opacity: 1,
        'text-align': 'center',
        border: '1pt solid #ccc'
      }
    },
    getSearch: state => {
      return state.content.searchWord
    },
    getCharityByArtistId: state => id => {
      try {
        const charities = state.content.charities.filter((o) => o.data.artist_id[0].text === id)
        if (!charities) return null
        return charities
      } catch (err) {
        return state.content.charities
      }
    },
    getCollaboration: state => {
      if (!state.content.collaboration) return
      return state.content.collaboration
    },
    getPixelBackground: state => {
      if (!state.content.homepage) return
      return state.content.homepage.pixelbackground.url
    },
    getBreakLine: state => {
      if (!state.content.homepage) return
      return state.content.homepage.breakline.url
    },
    getTooltip: state => tooltipId => {
      if (!state.content.tooltips || !state.content.tooltips[tooltipId]) return
      return state.content.tooltips[tooltipId]
    },
    getEmail: state => emailId => {
      if (!state.content.emails || !state.content.emails[emailId]) return
      return state.content.emails[emailId]
    },
    getTransactionDialogMessage: (state, getters) => data => {
      let dKey = data.dKey
      if (data.dKey === 'stx-transaction-finished') dKey = 'tx-success'
      else if (data.dKey === 'stx-transaction-error') dKey = 'tx-failed'
      else if (data.dKey === 'stx-transaction-sent') dKey = 'tx-pending'
      const key = 'getDialog'
      const dialog = getters[key](dKey)
      if (!dialog || dialog.length < 3) return 'Dialog content missing for key: ' + data.dKey
      let msg = '<h1>' + dialog[0].text + '</h1>'
      msg += '<p class="my-5">' + dialog[1].text + '</p>'
      if (data.txId) msg += '<p><a href="https://explorer.stacks.co/txid/' + data.txId + '?chain=' + process.env.VUE_APP_NETWORK + '" target="_blank">' + dialog[2].text + '</p>'
      return msg
    },
    getDialog: state => dialogId => {
      if (!state.content.dialogs || !state.content.dialogs[dialogId]) return
      return state.content.dialogs[dialogId]
    },
    getCharities: state => {
      return state.content.charities
    },
    getArtists: state => {
      return state.content.artists
    },
    getMarket: state => {
      return state.content.marketplacetemplate
    },
    getArtistById: state => id => {
      return (state.content.artists) ? state.content.artists.find((o) => o.uid === id) : null
    },
    getInformationById: state => id => {
      return (state.content.information) ? state.content.information.find((o) => o.uid === id) : null
    },
    getArtistId: state => artist => {
      try {
        return artist.toLowerCase().replace(/ /g, '')
      } catch (e) {
        return state.defaultArtist
      }
    },
    getHomepage: state => {
      return state.content.homepage
    },
    getAbout: state => {
      return state.content.about
    },
    getMainFooter: state => {
      return state.content.mainFooter
    },
    getNavbar: state => {
      return state.content.navigation
    },
    getLaunchCollection: state => {
      return state.content.launchcollection
    },
    getIndigeCollection: state => {
      return state.content.indigecollection
    },
    getHowItWorks: state => {
      return state.content.howItWorks
    },
    getHiroWallet: state => {
      return state.content.hiroWallet
    },
    getDataResults: state => {
      return state.content.dataResults
    }
  },
  mutations: {
    addTooltips (state, o) {
      state.content.tooltips = o
    },
    addEmails (state, o) {
      state.content.emails = o
    },
    addLaunchCollection (state, o) {
      state.content.launchcollection = o
    },
    addIndigeCollection (state, o) {
      state.content.indigecollection = o
    },
    addMarket (state, o) {
      state.content.marketplacetemplate = o
    },
    addDialogs (state, o) {
      state.content.dialogs = o
    },
    addHomeContent (state, o) {
      state.content.homepage = o
    },
    addAboutContent (state, o) {
      state.content.about = o
    },
    addHowItWorks (state, o) {
      state.content.howItWorks = o
    },
    addCollaboration (state, o) {
      state.content.collaboration = o
    },
    addMainFooter (state, o) {
      state.content.mainFooter = o
    },
    addNavigationContent (state, o) {
      state.content.navigation = o
    },
    addCharities (state, o) {
      state.content.charities = o
    },
    addInformation (state, o) {
      state.content.information = o
    },
    addArtists (state, o) {
      state.content.artists = o
    },
    addHiroWallet (state, o) {
      state.content.hiroWallet = o
    },
    addDataResults (state, o) {
      state.content.dataResults = o
    }
  },
  actions: {
  }
}
export default contentStore
