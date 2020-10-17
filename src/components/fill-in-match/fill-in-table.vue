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
      :is-last="(key === (turns.length-1) || key === (turns.length-1-lastTurnToNotCount)) && isLastSetAndLeg"
      :winner="winner"
      :player-has-turn="playerHasTurn"
      :leg-winner="legWinner"
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
    isLastSetAndLeg: {
      type: Boolean,
      required: true,
    },
    legWinner: {
      type: Boolean,
      required: false,
    },
    playerHasTurn: {
      type: Boolean,
      required: false,
    },
  },
  data: function () {
    return {
      turnPoints: [],
      turns: [],
      lastTurnToNotCount: 0,
    }
  },
  watch: {
    'turnData': {
      immediate: true,
      handler: 'calculateTurnPoints',
    },
    'playerHasTurn': {
      immediate: true,
      handler: 'calculateTurnPoints',
    },
  },
  methods: {
    calculateTurnPoints() {
      this.turns = this.playerHasTurn ? [{
        remainingPoints: this.startPoints,
        throws: {},
        total: 0,
      }] : []

      if(!this.turnData.length) return
      
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
      
      const lastTurn = this.turns[this.turns.length - 1]
      const lastThrow = lastTurn.throws[lastTurn.throws.length - 1]
      remainingPoints -= lastTurn.total

      const throwsIs3AndNoWinner = lastTurn.throws.length === 3 && !this.legWinner
      const lastTurnBust = !this.legWinner && lastTurn.total === 0 && lastThrow.multiplier !== 0 && lastTurn.throws.length < 3

      if((throwsIs3AndNoWinner || lastTurnBust) && remainingPoints > 1 && this.playerHasTurn) {
        this.lastTurnToNotCount = 1
        this.turns.push({
          remainingPoints: remainingPoints,
          throws: {},
          total: 0,
        })
      }
      
    },
    updateThrow(data) {
      if(this.lastTurnToNotCount) {
        if(data.turn === this.turns.length - 1) {
          this.lastTurnToNotCount = 0
        }
      }
      this.$emit('update', { ...data, playerKey: this.playerKey })
    },
  },
}
</script>
