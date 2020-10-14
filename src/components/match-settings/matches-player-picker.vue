<template>
  <v-col :cols="12" :md="cols">
    <v-autocomplete
      v-model="chosenPlayer"
      :items="computedItems"
      :loading="loading"
      :search-input.sync="search"
      :item-value="itemValue"
      :item-text="itemText"
      :label="label"
      :rules="rules"
      :return-object="returnObject"
      clearable
      hide-selected
      hide-no-data
    />
  </v-col>
</template>

<script>
export default {
  name: 'MatchesPlayerPicker',
  props: {
    items: {
      type: Array,
      required: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    hideSelected: {
      type: Boolean,
      default: true,
    },
    itemValue: {
      type: String,
      required: true,
    },
    itemText: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    returnObject: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
    },
    cols: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      chosenPlayer: null,
      search: '',
    }
  },
  computed: {
    computedItems() {
      const array = []
      if(this.items) this.items.map(item => array.push(item.firstName && item.lastName ? Object.assign({}, item, { fullName: `${item.firstName} ${item.lastName}` }) : Object.assign({}, item)))
      if(this.chosenPlayer) array.push(Object.assign({}, this.chosenPlayer, { fullName: `${this.chosenPlayer.firstName} ${this.chosenPlayer.lastName}` }))
      return array
    },
  },
  watch: {
    chosenPlayer() {
      this.$emit('input', this.chosenPlayer)
    },
    search() {
      this.$emit('search', this.search)
    },
  },
}
</script>
