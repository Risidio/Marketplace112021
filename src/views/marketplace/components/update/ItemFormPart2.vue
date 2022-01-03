<template>
<div>
  <div class="mb-3" role="group">
    <label class="label" for="item-name">Author:</label>
    <b-form-input
      id="artist-name"
      v-model="item.artist"
      :state="itemArtistState"
      aria-describedby="item-artist-help item-artist-feedback"
      placeholder="Add a name that will be shown as creator"
      trim
      class="inputArea"
    ></b-form-input>
    <b-form-invalid-feedback id="item-artist-feedback">
      Enter the name of the creator
    </b-form-invalid-feedback>
  </div>
  <div class="mb-3" role="group text-right w-100">
    <label class="label" for="item-editions"> Number of editions :</label>
    <b-form-input
      id="item-editions"
      type="number"
      v-model="item.attributes.editions"
      :state="itemEditionsState"
      aria-describedby="item-editions-help item-editions-feedback"
      placeholder="Enter editions"
      trim
      class="inputArea max"
    ></b-form-input>
    <b-form-invalid-feedback id="item-editions-feedback">
      How many editions of this NFT do you want to allow? At least 1 - at most 100
    </b-form-invalid-feedback>
  </div>
  <!-- <div class="mb-3" role="group text-right w-100">
    <label class="label" for="item-edition-cost">Cost per edition (STX) :</label>
    <b-form-input
      id="item-edition-cost"
      type="number"
      v-model="item.attributes.editionCost"
      :state="itemEditionCostState"
      aria-describedby="item-edition-cost-help item-edition-cost-feedback"
      placeholder="Cost to mint an edition"
      trim
      class="inputArea max"
    ></b-form-input>
    <b-form-invalid-feedback id="item-editions-feedback">
      How much STX tokens each subsequent edition costs
    </b-form-invalid-feedback>
  </div>-->
</div>
</template>

<script>
export default {
  name: 'ItemFormPart2',
  props: ['upload', 'item', 'formSubmitted'],
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
    itemEditionsState () {
      if (!this.formSubmitted && !this.item.attributes.editions) return null
      return (this.item.attributes.editions > 0 && this.item.attributes.editions < 101)
    },
    itemEditionCostState () {
      if (!this.formSubmitted && !this.item.attributes.editionCost) return null
      return (parseInt(this.item.attributes.editionCost) >= 0)
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

<style scoped>
.inputArea{
  width: 100%;
  border: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-weight: 200;
  font-size: 0.8em;
  padding: 15px;
}
.label{
  font-weight: 500;
  font-size: 0.8em;
}
.max{
  max-width: 300px;
}
</style>
