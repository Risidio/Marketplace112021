<template>
  <div v-if="loopRun" class="pagination-container">
    <button :disabled="page > 0 ? false : true" @click="$router.push('/' + loopRun.currentRunKey + '/' + (page - 1) + '#pagination')">&#60;</button>
    <div v-for="(item, index) in pages" :key="index">
      <router-link :to="'/' + loopRun.currentRunKey + '/' + item + '#pagination'">{{item}}</router-link>
    </div>
    <button :disabled="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize) ? false : true" @click="$router.push('/' + loopRun.currentRunKey + '/' + (page + 1) + '#pagination')">&#62;</button>
  </div>
  <div v-else-if="$route.name === 'my-account'" class="pagination-container">
    <button :disabled="page > 0 ? false : true" @click="$router.push('/' + $route.name + '/' + $route.params.nftSection + '/' + (page - 1) + '#pagination')">&#60;</button>
      <div v-if="page >= 4">
      <router-link :to="'/' + $route.name + '/' + $route.params.nftSection + '/' + 0 + '#pagination'">0 ...</router-link>
    </div>
    <div v-for="(item, index) in pages" :key="index">
      <router-link :to="'/' + $route.name + '/' + $route.params.nftSection + '/' + item + '#pagination'">{{item}}</router-link>
    </div>
     <div v-if="page <= Math.floor(numberOfItems / pageSize) - 4 && pages.length > 3">
      <router-link :to="'/' + $route.name + '/' + $route.params.nftSection + '/' + Math.floor(numberOfItems / pageSize) + '#pagination'">... {{Math.floor(numberOfItems / pageSize)}}</router-link>
    </div>
    <button :disabled="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize) ? false : true" @click="$router.push('/' + $route.name + '/' + $route.params.nftSection + '/' + (page + 1) + '#pagination')">&#62;</button>
  </div>
  <div v-else-if="$route.name === 'gallery' && numberOfItems >= pageSize" class="pagination-container">
    <button :disabled="page > 0 ? false : true" @click="$router.push('/nft-marketplace/' + $route.params.title + '/' + (page - 1) + '#pagination')">&#60;</button>
    <div v-if="page >= 4">
      <router-link :to="'/nft-marketplace/' + $route.params.title + '/' + 0 + '#pagination'">0 ...</router-link>
    </div>
    <div v-for="(item, index) in pages" :key="index">
     <router-link :to="'/nft-marketplace/' + $route.params.title + '/' + item + '#pagination'">{{item}}</router-link>
    </div>
    <div v-if="page <= Math.floor(numberOfItems / pageSize) - 4 && pages.length > 3">
      <router-link :to="'/nft-marketplace/' + $route.params.title + '/' + Math.floor(numberOfItems / pageSize) + '#pagination'">... {{Math.floor(numberOfItems / pageSize)}}</router-link>
    </div>
    <button :disabled="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize) ? false : true" @click="$router.push('/nft-marketplace/' + $route.params.title + '/' +  (page + 1) + '#pagination')">&#62;</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageSize', 'numberOfItems', 'loopRun'],
  data () {
    return {
      pages: [],
      page: parseInt(this.$route.params.page)
    }
  },
  mounted () {
    this.getPageNumbers()
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
      const currentPage = parseInt(this.$route.params.page)
      const lastPage = Math.floor(this.numberOfItems / this.pageSize)
      // section for last 4 pages
      if (currentPage > lastPage - 4 && lastPage > 4) {
        for (let i = lastPage - 4; i <= lastPage; i++) {
          pages.push(i)
        }
        this.pages = pages
      // section for first 4 pages
      } else if (currentPage < 4) {
        for (let i = 0; i <= lastPage; i++) {
          pages.push(i)
        }
        this.pages = pages.slice(0, 5)
      // section for pages in middle between first 4 and last 4
      } else if (currentPage >= 4 && currentPage <= lastPage - 4) {
        const nextTwo = (currentPage + 2) < lastPage ? (currentPage + 2) : lastPage
        for (let i = currentPage - 2; i <= nextTwo; i++) {
          pages.push(i)
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
  max-width: 400px;
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
  button {
    font: normal normal bold 12px/15px Montserrat;
    color: #50b1b5;
    cursor: pointer;
    border: none;
    background: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
.router-link-exact-active {
  text-decoration: underline;
  color: rgb(75, 75, 75) !important;
}
button:disabled {
  color: gray;
}
</style>
