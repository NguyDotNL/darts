<template>
  <v-row>
    <v-col>
      <FillInHeader :start-points="startPoints" />
      <v-row>
        <FillInTable
          :title="players[0].playerName"
          :player-key="players[0].playerKey"
          :turn-data="getTurnData(players[0].playerKey)"
          :winner="legData.winner === players[0].playerKey"
          :start-points="matchData.match.startPoints"
          :is-last-set-and-leg="isLastSetAndLeg"
          :leg-winner="!!legData.winner"
          :player-has-turn="turn === 1 || !turn"
          @update="updateThrow"
        />
        <FillInTable
          :title="players[1].playerName"
          :player-key="players[1].playerKey"
          :turn-data="getTurnData(players[1].playerKey)"
          :winner="legData.winner === players[1].playerKey"
          :start-points="matchData.match.startPoints"
          :is-last-set-and-leg="isLastSetAndLeg"
          :leg-winner="!!legData.winner"
          :player-has-turn="turn === 2 || !turn"
          @update="updateThrow"
        />
      </v-row>
      <v-row v-if="isLastSetAndLeg && matchData.match.winner !== ''">
        <v-col class="text-center text-2xl">
          - Wedstrijd is afgelopen -
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-end flex-column">
          <v-btn
            elevation="2"
            tile
            :dark="!(legWinner === false || (isLastSetAndLeg && matchData.match.winner !== ''))"
            class="bg-primary"
            :disabled="legWinner === false || (isLastSetAndLeg && matchData.match.winner !== '')"
            @click="$emit('nextLeg')"
          >
            Volgende leg
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import FillInHeader from '@/components/fill-in-match/fill-in-header'
import FillInTable from '@/components/fill-in-match/fill-in-table'

export default {
  name: 'FillInContent',
  components: {
    FillInTable,
    FillInHeader,
  },
  props: {
    matchId: {
      type: String,
      required: true,
    },
    matchData: {
      type: Object,
      required: true,
    },
    set: {
      type: Number,
      required: true,
    },
    leg: {
      type: Number,
      required: true,
    },
    isLastSetAndLeg: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      players: [],
      startPoints: '',
      onTurn: 1,
      legData: false,
      legWinner: false,
      turn: false,
      turnSwitched: false,
    }
  },
  watch: {
    'matchData.match': {
      immediate: true,
      handler: 'initData',
    },
    'matchData.matchDetails': {
      immediate: true,
      handler: 'initData',
    },
    'set': {
      immediate: true,
      handler: 'initData',
    },
    'leg': {
      immediate: true,
      handler: 'initData',
    },
  },
  methods: {
    initData() {
      const match = this.matchData.match
      const players = this.matchData.match.players
      const playerKeys = Object.keys(this.matchData.match.players)
      this.players = [
        {
          playerName: players[playerKeys[0]].playerName,
          playerKey: playerKeys[0],
        },
        {
          playerName: players[playerKeys[1]].playerName, 
          playerKey: playerKeys[1],
        },
      ]
      this.startPoints = match.startPoints

      const sets = this.matchData.matchDetails.sets
      let setsKeys = []
      let legs = []
      let legsKeys = []
      
      if(this.set > sets.length) {
        console.log('err')
      } else {
        setsKeys = Object.keys(sets)
        legs = sets[setsKeys[this.set-1]].legs
        legsKeys = Object.keys(legs)
      }

      if(this.leg > legs.length) {
        this.legData = {
          players: {
            [playerKeys[0]]: '',
            [playerKeys[1]]: '',
          },
          winner: '',
        }
      } else{
        this.legData = legs[legsKeys[this.leg-1]]
      }

      const legWinner = playerKeys.indexOf(this.legData.winner)
      this.legWinner = legWinner > -1 ? legWinner : false

      this.updatePlayerTurn()
    },
    updatePlayerTurn() {
      const player1Key = this.players[0].playerKey
      const player2Key = this.players[1].playerKey
      const playersData = this.legData.players
      const player1Turns = playersData[player1Key]
      const player2Turns = playersData[player2Key]

      if(player1Turns === '' && player2Turns === '') {
        this.turn = false
        return
      }

      const lastTurnPlayer1 = player1Turns !== '' ? player1Turns[player1Turns.length - 1] : false
      const lastTurnPlayer2 = player2Turns !== '' ? player2Turns[player2Turns.length - 1] : false

      if(!lastTurnPlayer1 && lastTurnPlayer2) {
        this.turn = this.playersTurnIsNotActive(lastTurnPlayer2) ? 1 : 2
      } else if(lastTurnPlayer1 && !lastTurnPlayer2) {
        this.turn = this.playersTurnIsNotActive(lastTurnPlayer1) ? 2 : 1
      } else if(player1Turns.length > player2Turns.length) {
        this.turn = this.playersTurnIsNotActive(lastTurnPlayer1) ? 2 : 1
      } else if(player1Turns.length < player2Turns.length) {
        this.turn = this.playersTurnIsNotActive(lastTurnPlayer2) ? 1 : 2
      } else if(player1Turns.length === player2Turns.length) {
        const player1LastTurnNotActive = this.playersTurnIsNotActive(lastTurnPlayer1)
        const player2LastTurnNotActive = this.playersTurnIsNotActive(lastTurnPlayer2)
        
        if(player1LastTurnNotActive && player2LastTurnNotActive && !this.turnSwitched) {
          this.turnSwitched = true
          this.turn = this.turn === 1 ? 2 : this.turn === 2 ? 1 : false
        } else if (!player1LastTurnNotActive) {
          this.turn = 1
        } else if(!player2LastTurnNotActive) {
          this.turn = 2
        }
      } else {
        this.turn = false
      }
    },
    playersTurnIsNotActive(lastTurn) {
      const lastThrow = lastTurn.throws[lastTurn.throws.length - 1]
      const throwsIs3AndNoWinner = lastTurn.throws.length === 3 && !this.legData.winner
      const lastTurnBust = !this.legData.winner && lastTurn.total === 0 && lastThrow.multiplier !== 0 && lastTurn.throws.length < 3

      return throwsIs3AndNoWinner || lastTurnBust
    },
    updateThrow(data) {
      if(data.turn === this.legData.players[data.playerKey].length && this.turnSwitched) {
        this.turnSwitched = false
      }
      this.$emit('update', data)
    },
    getTurnData(playerKey) {
      const turnData = this.legData.players[playerKey]
      return turnData !== '' ? turnData : []
    },
  },
}
</script>
