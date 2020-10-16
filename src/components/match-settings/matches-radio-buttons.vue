<template>
  <v-col cols="12" :md="cols">
    <p class="font-medium">{{ title }}</p>
    <v-radio-group
      v-model="choice"
      row
    >
      <VRadio
        v-for="(item, key) in items"
        :key="key"
        :label="item.toString()"
        :value="item"
      />
    </v-radio-group>
  </v-col>
</template>

<script>

export default {
  name: 'MatchesRadioButtons',
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    cols: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      choice: this.items[0],
    }
  },
  watch: {
    choice() {
      this.$emit('input', this.choice)
    },
  },
}
</script>
