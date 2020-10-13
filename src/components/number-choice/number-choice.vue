<template>
  <v-row dense>
    <v-col class="d-flex">
      <span class="text-xl float-left align-center d-inline-flex w-10" data-testid="number-choice-title">{{ title }}</span>
      <div class="d-inline-flex align-start">
        <v-btn
          v-for="number in numbers"
          :key="number"
          depressed
          elevation="2"
          class="ml-1 mr-1 pa-3 outline-none min-w-0"
          :class="{ 'bg-primary text-white': number === value}"
          text
          :disabled="number > choiceEnabled"
          @click="changeValue(number)"
        >
          {{ number }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'NumberChoice',
  props: {
    title: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    choiceEnabled: {
      type: Number,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  }, 
  data: function () {
    return {
      value: 1,
      numbers: [...Array(this.length).keys()].slice(1),
    }
  },
  watch: {
    'active': {
      immediate: true,
      handler: 'initActive',
    },
  },
  methods: {
    initActive(val) {
      this.value = val
    },
    changeValue(val) {
      this.value = val
      this.$emit('input', this.value)
    },
  },
}
</script>
