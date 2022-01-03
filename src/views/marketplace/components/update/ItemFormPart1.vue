<template>
<div>
<!--
  <div class="text-left">
    <b-form-checkbox size="lg" @change="togglePrivacy" v-model="publicAvailable" name="check-button" switch class="text-warning">
      <h2 v-if="!publicAvailable" class=" "><b>Private</b> <b-link router-tag="span" v-b-tooltip.hover="{ variant: 'light' }" :title="'Not visible in search and not displayed in the Marketplace'" class="ml-2" variant="outline-success"><b-icon icon="question-circle"/></b-link></h2>
      <h2 v-else class="text-success"><b>Public</b> <b-link router-tag="span" v-b-tooltip.hover="{ variant: 'light' }" :title="'Visible in search and displayed in the Marketplace'" class="ml-2" variant="outline-success"><b-icon icon="question-circle"/></b-link></h2>
    </b-form-checkbox>
  </div> -->

  <div class="mb-3" role="group">
    <label for="item-name" class="label">Title :</label>
    <input
      id="item-name"
      v-model="item.name"
      :state="itemNameState"
      aria-describedby="item-name-help item-name-feedback"
      placeholder="Add a title for your NFT"
      trim
      class="inputArea"
      minlength="3"
      required
    />
    <b-form-invalid-feedback id="item-name-feedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>
  </div>
  <div class="mb-4" role="group">
    <label for="item-name" class="label">Description :</label>
    <textarea
      ref="description"
      v-model="item.description"
      rows="5"
      class="inputArea"
      minlength="3"
      placeholder="Add a short description for better search results"
      />
  </div>
    <CategoryChoice :item="item" />
</div>
</template>

<script>
import { APP_CONSTANTS } from '@/app-constants'
import CategoryChoice from '@/views/marketplace/components/update/CategoryChoice'

export default {
  name: 'ItemFormPart1',
  components: {
    CategoryChoice
  },
  props: ['upload', 'item', 'formSubmitted'],
  data: function () {
    return {
      publicAvailable: true
    }
  },
  mounted () {
    if (!this.item.privacy) {
      this.item.privacy = 'public'
    }
    this.publicAvailable = this.item.privacy === 'public'
  },
  methods: {
    togglePrivacy: function () {
      if (this.publicAvailable) {
        this.item.privacy = 'public'
      } else {
        this.item.privacy = 'private'
      }
    }
  },
  computed: {
    categories () {
      const categories = this.$store.getters[APP_CONSTANTS.KEY_CATEGORIES]
      if (categories) return categories
      return []
    },
    itemNameState () {
      if (!this.formSubmitted && !this.item.name) return null
      return (this.item.name && this.item.name.length > 2)
    },
    itemArtistState () {
      if (!this.formSubmitted && !this.item.artist) return null
      return (this.item.artist && this.item.artist.length > 2)
    }
  }
}
</script>

<style lang="scss" scoped>
.inputArea{
  width: 100%;
  border: none;
  font-weight: 300;
  font-size: 14px;
  padding: 15px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  margin: 6px 0;
  letter-spacing: 0px;
  color: #000000;
}
.inputArea::placeholder {
  font-weight: 400;
  opacity: 0.75;
}
.label{
  font-weight: 500;
  font-size: 0.8em;
}
textArea{
  min-height: 200px;
}
</style>
