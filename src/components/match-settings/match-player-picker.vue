<template>
  <v-col :cols="12" :md="cols">
    <v-combobox
      v-model="chosenPlayer"
      :items="computedItems"
      :loading="loading"
      :search-input.sync="search"
      :item-value="itemValue"
      :item-text="itemText"
      :label="label"
      :rules="rules"
      :return-object="returnObject"
      :error-messages="errorMessage"
      :disabled="disabled"
      clearable
      hide-selected
      hide-no-data
    />
  </v-col>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'MatchPlayerPicker',
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
    error: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: [String, Array],
    },
    disabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    rules: {
      type: Array,
      default() {
        return [
          value => !!value || 'Dit veld is verplicht.',
          value => (value instanceof Object || value && value.trim().split(' ').length > 1) || 'Een speler moet een voor en achternaam bevatten.',
        ]
      },
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
      if(this.items) return this.items
      if(this.chosenPlayer instanceof Object) return this.chosenPlayer
      return []
    },
  },
  watch: {
    chosenPlayer() {
      if(typeof this.chosenPlayer === 'string') {
        if(this.chosenPlayer.split(' ').length > 1) {
          let obj = {}
          const fullName = this.chosenPlayer.trim().split(' ')
          const uniqueId = uuidv4()

          obj.firstName = fullName[0] && fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1)
          const lastName = this.chosenPlayer.substring(fullName[0].length).trim().split(' ')
          obj.lastName = lastName.map((word, index) => index == (lastName.length - 1) ? word[0] && word[0].toUpperCase() + word.slice(1) : word).join(' ')

          if(obj.firstName && obj.lastName) { 
            this.chosenPlayer = {
              firstName: obj?.firstName,
              lastName: obj?.lastName,
              fullName: `${obj.firstName} ${obj.lastName}`,
              fullNameLower: `${obj.firstName.toLowerCase()} ${obj.lastName.toLowerCase()}`,
              playerId: uniqueId,
            }
          }
        }
      }
      this.$emit('input', this.chosenPlayer)
    },
    search() {
      this.$emit('search', this.search)
    },
  },
}
</script>
