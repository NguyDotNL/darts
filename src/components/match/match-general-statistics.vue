<template>
  <v-row>
    <v-col>
      <StatisticLineBar
        title="Gewonnen sets"
        :subtitle="statisticsObj.setsSubTitle"
        :total-number="statisticsObj.setsTotal"
        :player-left-number="statisticsObj.setsPlayer1"
        :player-right-number="statisticsObj.setsPlayer2"
      />
      <StatisticLineBar
        title="Gewonnen legs"
        :subtitle="statisticsObj.legsSubTitle"
        :total-number="statisticsObj.legsTotal"
        :player-left-number="statisticsObj.legsPlayer1"
        :player-right-number="statisticsObj.legsPlayer2"
      />
      <StatisticLineBar
        title="180 gegooid"
        :total-number="statisticsObj['180Total']"
        :player-left-number="statisticsObj['180Player1']"
        :player-right-number="statisticsObj['180Player2']"
      />
      <StatisticLineBar
        title="9-darter"
        :total-number="statisticsObj['9Total']"
        :player-left-number="statisticsObj['9Player1']"
        :player-right-number="statisticsObj['9Player2']"
      />
      <StatisticLineBar
        title="Gemiddelde gegooide punten (per beurt)"
        :total-number="180"
        :player-left-number="statisticsObj.avgPlayer1"
        :player-right-number="statisticsObj.avgPlayer2"
      />
    </v-col>
  </v-row>
</template>
<script>
import StatisticLineBar from '@/components/match/statistic-line-bar'

export default {
  name: 'MatchGeneralStatistics',

  components: {
    StatisticLineBar,
  },
  props: {
    matchData: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      statisticsObj: {},
    }
  },
  watch: {
    'matchData': {
      immediate: true,
      handler: 'setStatisticsData',
    },
  },
  methods: {
    setStatisticsData() {
      const { match, matchDetails } = this.matchData
      const player1 = match.players[Object.keys(match.players)[0]]
      const player2 = match.players[Object.keys(match.players)[1]]

      let totalPointPlayer1 = 0
      let totalPointPlayer2 = 0
      let turnCountPlayer1 = 0
      let turnCountPlayer2 = 0

      for(let setKey in matchDetails.sets) {
        const set = matchDetails.sets[setKey]
        for(let legKey in set.legs) {
          const leg = set.legs[legKey]
          const pl1Key = Object.keys(leg.players)[0]
          const pl2Key = Object.keys(leg.players)[1]

          for(let turnKey in leg.players[pl1Key]) {
            const turn = leg.players[pl1Key][turnKey]
            totalPointPlayer1 += turn.total
            turnCountPlayer1++
          }

          for(let turnKey in leg.players[pl2Key]) {
            const turn = leg.players[pl2Key][turnKey]
            totalPointPlayer2 += turn.total
            turnCountPlayer2++
          }
        }
      }

      this.statisticsObj = {
        setsSubTitle: `${player1.statistics.setsWon + player2.statistics.setsWon} gewonnen sets`,
        setsTotal: player1.statistics.setsWon + player2.statistics.setsWon,
        setsPlayer1: player1.statistics.setsWon,
        setsPlayer2: player2.statistics.setsWon,
        legsSubTitle: `${player1.statistics.legsWon + player2.statistics.legsWon} gewonnen legs`,
        legsTotal: player1.statistics.legsWon + player2.statistics.legsWon,
        legsPlayer1: player1.statistics.legsWon,
        legsPlayer2: player2.statistics.legsWon,
        '180Total': player1.statistics['180'] + player2.statistics['180'],
        '180Player1': player1.statistics['180'],
        '180Player2': player2.statistics['180'],
        '9Total': player1.statistics['9Dart'] + player2.statistics['9Dart'],
        '9Player1': player1.statistics['9Dart'],
        '9Player2': player2.statistics['9Dart'],
        avgPlayer1: Math.round(totalPointPlayer1/turnCountPlayer1) ,
        avgPlayer2: Math.round(totalPointPlayer2/turnCountPlayer2),
      }
    },
  },
}
</script>
