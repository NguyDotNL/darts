<template>
  <v-row>
    <v-col>
      <FillInHeader :start-points="startPoints" />
      <v-row>
        <FillInTable
          :title="players[0].playerName"
          :player-key="players[0].playerKey"
          :turn-data="legData.players[players[0].playerKey]"
          :winner="legData.winner === players[0].playerKey"
          :start-points="matchData.match.startPoints"
          :is-last-set-and-leg="isLastSetAndLeg"
          @update="updateThrow"
        />
        <FillInTable
          :title="players[1].playerName"
          :player-key="players[1].playerKey"
          :turn-data="legData.players[players[1].playerKey]"
          :winner="legData.winner === players[1].playerKey"
          :start-points="matchData.match.startPoints"
          :is-last-set-and-leg="isLastSetAndLeg"
          @update="updateThrow"
        />
      </v-row>
      <v-row>
        <v-col class="d-flex align-end flex-column">
          <v-btn
            elevation="2"
            tile
            dark
            class="bg-primary"
            disabled
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

      const setsKeys = Object.keys(sets)
      const legs = sets[setsKeys[this.set-1]].legs
      const legsKeys = Object.keys(legs)

      this.legData = legs[legsKeys[this.leg-1]]
      const legWinner = playerKeys.indexOf(this.legData.winner)
      this.legWinner = legWinner > -1 ? legWinner : false
    },
    updateThrow(data) {
      this.$emit('update', data)
    },
  },
}
</script>
