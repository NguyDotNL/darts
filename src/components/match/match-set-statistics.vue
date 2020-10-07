<template>
  <v-row>
    <v-col>
      <v-row dense>
        <v-col class="font-weight-bold text-xl">
          Set statistieken
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="1">
          <v-select 
            v-model="selectedSet"
            :items="items"
            label="Sets"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold text-hd">
          Set winnaar: {{ winner }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <StatisticLineBar
            title="Gewonnen legs"
            :subtitle="statiscsObject.legSub"
            :total-number="statiscsObject.legTotal"
            :player-left-number="statiscsObject.legPlayer1"
            :player-right-number="statiscsObject.legPlayer2"
          />
          <StatisticLineBar
            title="180 gegooid"
            :total-number="statiscsObject['180Total']"
            :player-left-number="statiscsObject['180Player1']"
            :player-right-number="statiscsObject['180Player2']"
          />
          <StatisticLineBar
            title="9-darter"
            :total-number="statiscsObject['9DartTotal']"
            :player-left-number="statiscsObject['9DartPlayer1']"
            :player-right-number="statiscsObject['9DartPlayer2']"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import StatisticLineBar from '@/components/match/statistic-line-bar'
export default {
  name: 'MatchSetStatistics',
  components: {
    StatisticLineBar,
  },
  props: {
    setData:{
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      selectedSet: 1,
      winner: '',
      setStatistics: '',
      statiscsObject: {},
      items: [...Array(Object.keys(this.setData).length+1).keys()].slice(1),
    }
  },
  watch: {
    selectedSet: {
      immediate: true,
      handler (val) {
        const set = this.setData[Object.keys(this.setData)[val-1]]
        this.winner = set.winner
        this.setStatistics = set.players
        
        const player1Stats = set.players[Object.keys(set.players)[0]].statistics
        const player2Stats = set.players[Object.keys(set.players)[1]].statistics
        this.statiscsObject = {
          legSub: `${player1Stats.legsWon+player2Stats.legsWon} gewonnen legs`,
          legTotal: player1Stats.legsWon+player2Stats.legsWon,
          legPlayer1: player1Stats.legsWon,
          legPlayer2: player2Stats.legsWon,
          '180Total': player1Stats['180']+player2Stats['180'],
          '180Player1': player1Stats['180'],
          '180Player2': player2Stats['180'],
          '9DartTotal': player1Stats['9dart']+player2Stats['9dart'],
          '9DartPlayer1': player1Stats['9dart'],
          '9DartPlayer2': player2Stats['9dart'],
        }
      },
    },
  },
}
</script>
