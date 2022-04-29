<template>
  <div class="pagination-container">
    <router-link v-if="page > 0" :to="'/' + loopRun.currentRunKey + '/' + (page - 1)">&lt; Previous</router-link>
    <div v-for="(item, index) in pages" :key="index">
      <router-link :to="'/' + loopRun.currentRunKey + '/' + item">{{item}}</router-link>
    </div>
    <router-link v-if="numberOfItems > pageSize && page !== Math.floor(numberOfItems / pageSize)" :to="'/' + loopRun.currentRunKey + '/' + (page + 1) "> Next ></router-link>
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
  watch: {
    '$route' () {
      this.page = parseInt(this.$route.params.page)
    },
    'numberOfItems' () {
      this.getPageNumbers()
    }
  },
  methods: {
    getPageNumbers () {
      const pageNumbers = this.numberOfItems / this.pageSize
      const page = []
      for (let i = 0; i <= pageNumbers; i++) {
        page.push(i)
      }
      this.pages = page
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
  }
}
.router-link-exact-active {
  text-decoration: underline;
  color: rgb(75, 75, 75) !important;
}
</style>
