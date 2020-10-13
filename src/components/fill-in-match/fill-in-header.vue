<template>
  <v-row>
    <v-col>
      <v-select
        v-model="playerSelected"
        :items="players"
        label="Speler"
        outlined
      />
    </v-col>
    <v-col class="align-center justify-center flex text-2xl">
      Beurt: {{ onTurn }}
    </v-col>
    <v-col class="align-center justify-center flex text-2xl">
      Punten: {{ startPoints }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FillInHeader',
  props: {
    players: {
      type: Array,
      required: true,
    },
    onTurn: {
      type: Number,
      required: true,
    },
    startPoints: {
      type: Number,
      required: true,
    },
    playerTurn: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      playerSelected: '',
    }
  },
  watch: {
    playerSelected() {
      this.$emit('input', this.playerSelected)
    },
    'players': {
      immediate: true,
      handler: 'initData',
    },
  },
  methods: {
    initData() {
      this.playerSelected = this.players[this.playerTurn]
    },
  },
}
</script>
