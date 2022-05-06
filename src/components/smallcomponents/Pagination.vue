<template>
  <div v-if="loopRun" class="pagination-container">
    <router-link v-if="page > 0" :to="'/' + loopRun.currentRunKey + '/' + (page - 1)">&lt; Previous</router-link>
    <div v-for="(item, index) in pages" :key="index">
      <router-link :to="'/' + loopRun.currentRunKey + '/' + item">{{item}}</router-link>
    </div>
    <router-link v-if="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize)" :to="'/' + loopRun.currentRunKey + '/' + (page + 1) "> Next ></router-link>
  </div>
  <div v-else-if="$route.name === 'my-account'" class="pagination-container">
    <router-link v-if="page > 0" :to="'/' + $route.name + '/' + $route.params.nftSection + (page - 1)">&lt; Previous</router-link>
    <div v-for="(item, index) in pages" :key="index">
      <router-link :to="'/' + $route.name + '/' + $route.params.nftSection + '/' + item">{{item}}</router-link>
    </div>
    <router-link v-if="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize)" :to="'/' + $route.name + '/' + $route.params.nftSection + '/' + (page + 1)"> Next ></router-link>
  </div>
  <div v-else-if="$route.name === 'gallery'" class="pagination-container">
    <router-link v-if="page > 0" :to="'/nft-marketplace/' + $route.params.title + '/' + (page - 1)">&lt; Previous</router-link>
    <div v-if="page > Math.floor(numberOfItems / pageSize) / 2">
      <router-link :to="'/nft-marketplace/' + $route.params.title + '/' + 0">0 ...</router-link>
    </div>
    <div v-for="(item, index) in pages.slice(0, 3)" :key="index">
     <router-link :to="'/nft-marketplace/' + $route.params.title + '/' + item">{{item}}</router-link>
    </div>
    <div v-if="page < Math.floor(numberOfItems / pageSize) / 2 && pages.length > 3">
      <router-link :to="'/nft-marketplace/' + $route.params.title + '/' + Math.floor(numberOfItems / pageSize)">... {{Math.floor(numberOfItems / pageSize)}}</router-link>
    </div>
    <router-link v-if="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize)" :to=" '/nft-marketplace/' + $route.params.title + '/' +  (page + 1) "> Next ></router-link>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageSize', 'numberOfItems', 'loopRun'],
  data () {
    return {
      pages: [],
      page: parseInt(this.$route.params.page),
      lastPage: false
    }
  },
  mounted () {
    this.getPageNumbers()
    this.lastPage = Math.floor(this.numberOfItems / this.pageSize)
  },
  watch: {
    '$route' () {
      this.getPageNumbers()
      this.page = parseInt(this.$route.params.page)
    },
    'numberOfItems' () {
      this.getPageNumbers()
    }
  },
  methods: {
    getPageNumbers () {
      const pages = []
      const currentPage = this.$route.params.page > 0 ? this.$route.params.page - 1 : this.$route.params.page
      const lastPage = Math.floor(this.numberOfItems / this.pageSize)

      if (currentPage === lastPage) {
        for (let i = currentPage; i >= 0; i--) {
          pages.push(i)
          this.lastPage = true
        }
        this.pages = pages
      } else {
        for (let i = currentPage; i <= lastPage; i++) {
          pages.push(i)
          this.lastPage = false
        }
        this.pages = pages
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 50px;
  max-width: 300px;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  p {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  a {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    align-self: center;
  }
}
.router-link-exact-active {
  text-decoration: underline;
  color: rgb(75, 75, 75) !important;
}
</style>
