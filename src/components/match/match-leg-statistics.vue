<template>
  <v-row>
    <v-col>
      <v-row dense>
        <v-col class="font-weight-bold text-xl">
          Leg statistieken
        </v-col>
      </v-row>
      <v-row dense>
        <v-col sm="6" md="1" cols="12">
          <v-select
            v-model="selectedSet"
            :items="setItems"
            label="Set"
          />
        </v-col>
        <v-col sm="6" md="1" cols="12">
          <v-select
            v-model="selectedLeg"
            :items="legItems"
            label="Leg"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold text-hd">
          Leg winnaar: {{ winner }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold text-hd text-center text-3xl">
          {{ startPoints }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <StatisticLegTable :items="legPlayer1" :start-points="startPoints" />
        </v-col>
        <v-col>
          <StatisticLegTable :items="legPlayer2" :start-points="startPoints" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import StatisticLegTable from '@/components/match/statistic-leg-table'
export default {
  name: 'MatchLegStatistics',
  components: {
    StatisticLegTable,
  },
  props: {
    setData: {
      type: Array,
      required: true,
    },
    matchPlayers: {
      type: Object,
      required: true,
    },
    startPoints: {
      type: Number,
      required: true,
    },
  },
  data: function() {
    return {
      selectedSet: 1,
      selectedLeg: 1,
      winner: '',
      setItems: [],
      legItems: [],
      legPlayer1: {},
      legPlayer2: {},
    }
  },
  watch: {
    selectedSet: {
      immediate: true,
      handler: 'setLegData',
    },
    selectedLeg: {
      immediate: true,
      handler: 'setLegData',
    },
    setData: {
      immediate: true,
      handler: 'setLegData',
    },
    startPoints: {
      immediate: true,
      handler: 'setLegData',
    },
  },
  methods: {
    setLegData() {
      const setDataKeys = Object.keys(this.setData)

      this.setItems = [...Array(setDataKeys.length+1).keys()].slice(1)

      const currentSetKey = setDataKeys[this.selectedSet-1]
      const legDataKeys = Object.keys(this.setData[currentSetKey].legs)
      const currentLegKey = legDataKeys[this.selectedLeg-1]
      const currentLeg = this.setData[currentSetKey].legs[currentLegKey]

      this.legItems = [...Array(legDataKeys.length+1).keys()].slice(1)
      this.winner = this.matchPlayers[currentLeg.winner].playerName

      this.legPlayer1 = currentLeg.players[Object.keys(currentLeg.players)[0]]
      this.legPlayer2 = currentLeg.players[Object.keys(currentLeg.players)[1]]
    },
  },
}
</script>
