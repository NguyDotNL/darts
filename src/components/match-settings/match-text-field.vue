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
  name: 'MatchTextField',
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: String,
    rules: {
      type: Array,
      default() {
        return [value => !!value || 'Dit veld is verplicht.']
      },
    },
    hint: String,
    persistentHint: {
      type: Boolean,
      default: true,
    },
    cols: {
      type: Number,
      default: 12,
    },
    value: String,
  },
  data() {
    return {
      inputModel: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {this.inputModel = val},
    },
    inputModel() {
      this.$emit('input', this.inputModel)
    },
  },
}
</script>
