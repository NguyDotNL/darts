<template>
  <v-row>
    <v-col>
      <v-row dense>
        <v-col class="text-center font-weight-bold text-2xl pb-0 leading-none">{{ title }}</v-col>
      </v-row>
      <v-row dense>
        <v-col class="pb-0 pt-0">{{ playerLeftNumber }}</v-col>
        <v-col v-if="subtitle" class="pb-0 pt-0 text-center">{{ subtitle }}</v-col>
        <v-col class="pb-0 pt-0 text-right">{{ playerRightNumber }}</v-col>
      </v-row>
      <v-row dense>
        <v-col class="pr-1 pt-0">
          <VProgressLinear
            :value="percLeft"
            color="#FF5D5D"
            background-color="#C4C4C4"
            height="25"
            reverse
            :disabled="true"
          />
        </v-col>
        <v-col class="pl-1 pt-0">
          <VProgressLinear
            :value="percRight"
            color="#5D74CF"
            background-color="#C4C4C4"
            height="25"
            :disabled="true"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'StatisticLineBar',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
    totalNumber: {
      type: Number,
      required: true,
    },
    playerLeftNumber: {
      type: Number,
      required: true,
    },
    playerRightNumber: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      percLeft: 0,
      percRight: 0,
    }
  },
  watch: {
    playerLeftNumber: {
      immediate: true,
      handler: 'calculateBarPerc',
    },
    playerRightNumber: {
      immediate: true,
      handler: 'calculateBarPerc',
    },
    totalNumber: {
      immediate: true,
      handler: 'calculateBarPerc',
    },
  },
  methods: {
    calculateBarPerc() {
      this.percLeft = this.totalNumber ? this.playerLeftNumber/this.totalNumber*100 : 0
      this.percRight = this.totalNumber ? this.playerRightNumber/this.totalNumber*100 : 0
    },
  },
}
</script>
