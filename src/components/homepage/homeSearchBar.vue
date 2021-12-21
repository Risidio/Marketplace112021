<template>
<div class="search_bar_container searchWidth">
  <div class="dropdown_container">
    <div class="dropdown_selector" @click="showHidden()"> <span style="display:flex; margin: 9px auto; width: fit-content;">Search by <span style="color:#50B1B5; margin: 0 5px; font-size: 2.5rem;">▸</span></span>
      <div class="dropdown_option_container">
        <div class="dropdown_option" v-show="isHidden" value="All">All</div>
        <div class="dropdown_option" v-show="isHidden" value="Category">Category</div>
        <div class="dropdown_option" v-show="isHidden" value="Category">Category</div>
        <div class="dropdown_option" v-show="isHidden" value="Category">Category</div>
    </div>
    </div>
  </div>
  <div>
  <input class="search_input_box" type="text" placeholder=" Looking for something in particular? " @input="searchWord($event)"> <span class="searchIcon" v-on:click="openMarket()" >&#8981;</span>
  </div>
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
      currentSearch: null
    }
  },
  methods: {
    doSearch () {
      this.$emit('set-filter', { query: this.query, filter: 'text-search' })
    },
    showHidden () {
      this.isHidden = !this.isHidden
    },
    searchWord (e) {
      this.currentSearch = e.target.value
      this.$store.state.contentStore.content.searchWord = this.currentSearch
      console.log(e.target.value)
      console.log(this.$store.state.contentStore.content.searchWord)
    },
    openMarket () {
      this.$router.push('/nft-marketplace/risidio/launch_collection_t1')
      console.log('routerOpen')
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
.search_bar_container{
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 10;
  margin: auto;
}
.searchWidth{
    max-width: 400px !important;
}
.searchIcon{
  position: absolute;
  font-size: 4.5rem;
  margin-left: -5.5rem;
  margin-top: -0.5rem;
  color: #50B1B5;
  transform: rotate(270deg);
  cursor: pointer;
}

.dropdown_selector{
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
  height: 60px;
  width: 155px;
  padding: 10px;
  outline: none;
  background: white;
  transition: 0.3s;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #F5F5F5;
  text-align: center;
  z-index: 10;
}

.dropdown_selector:hover{
  transform: scale(1.05);
  transition: 0.3s;
  cursor: pointer;
  z-index: 10;
}

.search_input_box{
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  height: 60px;
  width: 50vw;
  outline: none;
  padding: 10px;
  background: white;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #F5F5F5;
  font: normal normal 300 16px/24px Montserrat;
  z-index: 1;
  }

::-webkit-input-placeholder {
   font: normal normal 300 16px/24px Montserrat;
}

:-moz-placeholder { /* Firefox 18- */
   font: normal normal 300 16px/24px Montserrat;
}

::-moz-placeholder {  /* Firefox 19+ */
   font: normal normal 300 16px/24px Montserrat;
}

:-ms-input-placeholder {
   font: normal normal 300 16px/24px Montserrat;
}

.dropdown_container{
  display: flex;
  flex-direction: column;
  font: normal normal 300 16px/24px Montserrat;
}
.dropdown_option_container{
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
.dropdown_option{
  padding: 10px;
  border: 1px solid grey;
  background: white;
  border-radius: 0px;
  margin: 2px;
  transition: 0.3s;
  z-index: 10;
}

.dropdown_option:hover{
  background: grey;
  border: 1px solid rgb(105, 105, 105);
  transition: 0.3s;
  z-index: 10;
}

</style>
