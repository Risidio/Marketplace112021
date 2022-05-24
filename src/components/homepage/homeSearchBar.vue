<template>
<div class="search_bar_container">
  <div :class="showSearchBar ? 'dropdown_container active' : 'dropdown_container'">
    <div class="dropdown_selector" @click="showHidden()"> <strong class="search">Search by <img class="arrow2" src="https://res.cloudinary.com/risidio/image/upload/v1637233819/RisidioMarketplace/Icon_awesome-caret-down_1_nih0lx.svg"/></strong>
      <div class="dropdown_option_container">
        <div class="dropdown_option" v-show="isHidden" value="All">All</div>
        <div class="dropdown_option" v-show="isHidden" value="Category">Category</div>
        <div class="dropdown_option" v-show="isHidden" value="Category">Category</div>
        <div class="dropdown_option" v-show="isHidden" value="Category">Category</div>
    </div>
    </div>
  </div>
  <form @submit="doSearch($event)" class="icon_container">
    <input :class="showSearchBar ? 'search_input_box active' : 'search_input_box'" type="text" placeholder=" Looking for something in particular?" ref="search" @input="searchWord($event)"><span class="searchIcon" v-on:click="openSearchBar()">&#8981;</span>
  </form>
</div>
</template>

<script>

export default {
  name: 'HomeSearchBar',
  components: {
  },
  props: ['showPrepend'],
  data () {
    return {
      query: null,
      isHidden: false,
      currentSearch: null,
      showSearchBar: false
    }
  },
  methods: {
    doSearch (e) {
      e.preventDefault()
      const searched = this.$refs.search.value
      console.log(this.$refs.search.value)
      this.$store.state.contentStore.content.searchWord = searched
      this.$router.push('/nft-marketplace')
      // this.$emit('set-filter', { query: this.query, filter: 'text-search' })
    },
    showHidden () {
      this.isHidden = !this.isHidden
    },
    searchWord (e) {
      this.currentSearch = e.target.value
      this.$store.state.contentStore.content.searchWord = this.currentSearch
    },
    openSearchBar () {
      this.showSearchBar = !this.showSearchBar
    }
  },
  computed: {
    search () {
      const content = this.$store.state.contentStore.content
      return content
    }
  }
}
</script>
<style lang="scss" scoped>
.search_bar_container {
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 10;
  margin: auto;
}
.icon_container {
  display: flex;
  align-items: center;
}

.searchIcon {
  font-size: 3.5rem;
  margin-left: -6rem;
  margin-top: -0.3rem;
  color: #50b1b5;
  transform: rotate(270deg);
  border-radius: 50%;
  cursor: pointer;
  width: 45px;
  height: 45px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.dropdown_selector {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  font: normal normal 300 11px/14px Montserrat;
  height: 50px;
  width: 155px;
  padding: 9px;
  outline: none;
  background: white;
  transition: 0.3s;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #f5f5f5;
  text-align: center;
  z-index: 10;
}

.dropdown_selector:hover {
  transform: scale(1.02);
  transition: 0.3s;
  cursor: pointer;
  z-index: 10;
}
.arrow2 {
  color: #50b1b5;
  font-size: 1.7rem;
  width: 9px;
  height: 5px;
  transform: rotate(180deg);
}
.search {
  display: flex;
  margin: 9px 15px;
  align-items: center;
  font-weight: 600;
}

.search_input_box {
  min-width: 500px;
  max-width: 1000px !important;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  height: 50px;
  outline: none;
  padding: 10px;
  background: white;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #f5f5f5;
  font: normal normal 300 11px/14px Montserrat;
  z-index: 1;
}

::-webkit-input-placeholder {
  font: normal normal 300 11px/14px Montserrat;
}

:-moz-placeholder {
  /* Firefox 18- */
  font: normal normal 300 11px/14px Montserrat;
}

::-moz-placeholder {
  /* Firefox 19+ */
  font: normal normal 300 11px/14px Montserrat;
}

:-ms-input-placeholder {
  font: normal normal 300 11px/14px Montserrat;
}

.dropdown_container {
  display: flex;
  font: normal normal 300 16px/24px Montserrat;
  justify-content: center;
  align-items: center;
}
.dropdown_option_container {
  background: none;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  margin-top: 25px;
  width: 150px;
  margin-left: -5px;
  z-index: 10;
  background: white;
}
.dropdown_option {
  padding: 10px;
  border: 1px solid grey;
  background: white;
  border-radius: 0px;
  margin: 2px;
  transition: 0.3s;
  z-index: 10;
}

.dropdown_option:hover {
  background: grey;
  border: 1px solid rgb(105, 105, 105);
  transition: 0.3s;
  z-index: 10;
}

@media only screen and (max-width: 720px) {
  .dropdown_container {
    display: none;
    width: 130px;
    z-index: 10;
  }
  .dropdown_selector {
    width: auto;
  }
  .search_input_box {
    display: none;
    min-width: 450px;
    max-width: 700px;
  }
  .active {
    display: block;
  }
  .searchIcon {
    box-shadow: 0px 0px 3px #00000029;
  }
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 40px;
  }
}
@media only screen and (max-width: 630px) {
  .dropdown_container {
    display: none;
    width: 130px;
    z-index: 10;
  }
  .dropdown_selector {
    width: auto;
  }
  .search_input_box {
    display: none;
    min-width: 350px;
    //max-width: 700px;
  }
  .active {
    display: block;
  }
  .searchIcon {
    box-shadow: 0px 0px 3px #00000029;
  }
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 30px;
  }
}
@media only screen and (max-width: 560px) {
  .dropdown_container {
    display: none;
    width: 130px;
    z-index: 10;
  }
  .dropdown_selector {
    width: auto;
  }
  .search_input_box {
    display: none;
    min-width: 300px;
    //max-width: 700px;
  }
  .active {
    display: block;
  }
  .searchIcon {
    box-shadow: 0px 0px 3px #00000029;
  }
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 30px;
  }
}
@media only screen and (max-width: 490px){
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 30px;
  }
}
@media only screen and (max-width: 470px) {
  .dropdown_container {
    display: none;
    width: 130px;
    z-index: 10;
  }
  .dropdown_selector {
    width: auto;
  }
  .search_input_box {
    display: none;
    min-width: 250px;
    //max-width: 700px;
  }
  .active {
    display: block;
  }
  .searchIcon {
    box-shadow: 0px 0px 3px #00000029;
  }
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 30px;
  }
}
@media only screen and (max-width: 375px){
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 10px;
  }
}
@media only screen and (max-width: 425px) {
  .dropdown_container {
    display: none;
    width: 130px;
    z-index: 10;
  }
  .dropdown_selector {
    width: auto;
  }
  .search_input_box {
    display: none;
    min-width: 200px;
    //max-width: 700px;
  }
  .active {
    display: block;
  }
  .searchIcon {
    box-shadow: 0px 0px 3px #00000029;
  }
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 10px;
  }
}
@media only screen and (max-width: 350px) {
  .dropdown_container {
    display: none;
    width: 100px;
    z-index: 10;
  }
  .dropdown_selector {
    width: auto;
  }
  .search_input_box {
    display: none;
    min-width: 180px;
    //max-width: 700px;
  }
  .active {
    display: block;
  }
  .searchIcon {
    box-shadow: 0px 0px 3px #00000029;
  }
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 15px;
  }
}
@media only screen and (max-width: 290px){
  .search_bar_container {
    justify-content: flex-end;
    margin-right: 0px;
  }
}
</style>
