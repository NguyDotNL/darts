<template>
  <v-col cols="12" :md="cols">
    <v-text-field
      v-model="inputModel"
      :label="label"
      :rules="rules"
    />
  </v-col>
</template>

<script>

export default {
  name: 'MatchesTextField',
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    rules: {
      type: Array,
      default() {
        return [value => !!value || 'Dit veld is verplicht.']
      },
    },
    hint: {
      type: String,
    },
    persistentHint: {
      type: Boolean,
      default: true,
    },
    cols: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      inputModel: '',
    }
  },
  watch: {
    inputModel() {
      this.$emit('input', this.inputModel)
    },
  },
}
</script>
