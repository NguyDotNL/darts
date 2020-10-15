<template>
  <v-col>
    <v-row>
      <v-col class="text-center text-2xl">
        {{ title }}
        <span class="block text-sm text-uppercase" style="min-height: 21px">{{ winner ? "Winnaar": "" }}</span>
      </v-col>
    </v-row>
    <FillInTurn
      v-for="(turn, key) in turns"
      :key="key"
      :turn-data="turn"
      :turn="key+1"
      :is-last="key === (turns.length-1)"
      :winner="winner"
      @update="updateThrow"
    />
  </v-col>
</template>

<script>
import FillInTurn from '@/components/fill-in-match/fill-in-turn'
export default {
  name: 'FillInTable',
  components: { FillInTurn },
  props: {
    title: {
      type: String,
      required: true,
    },
    winner: {
      type: Boolean,
      default: false,
    },
    playerKey: {
      type: String,
      required: true,
    },
    turnData: {
      type: Array,
      required: true,
    },
    startPoints: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      turnPoints: [],
      turns: [],
    }
  },
  watch: {
    'turnData': {
      immediate: true,
      handler: 'calculateTurnPoints',
    },
  },
  methods: {
    calculateTurnPoints() {
      let remainingPoints = this.startPoints
      let lastTotal = 0
      this.turns = this.turnData.map(turn => {
        remainingPoints -= lastTotal
        lastTotal = turn.total
        return {
          ...turn,
          remainingPoints,
        }
      })
    },
    updateThrow(data) {
      this.$emit('update', { ...data, playerKey: this.playerKey })
    },
  },
}
</script>
