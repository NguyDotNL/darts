<template>
  <v-row>
    <v-col>
      <StatisticLineBar
        title="Gewonnen sets"
        subtitle="10 gewonnen sets"
        :total-number="10"
        :player-left-number="7"
        :player-right-number="3"
      />
      <StatisticLineBar
        title="Gewonnen legs"
        subtitle="30 gewonnen legs"
        :total-number="30"
        :player-left-number="21"
        :player-right-number="9"
      />
      <StatisticLineBar
        title="180 gegooid"
        :total-number="14"
        :player-left-number="8"
        :player-right-number="6"
      />
      <StatisticLineBar
        title="9-darter"
        :total-number="1"
        :player-left-number="1"
        :player-right-number="0"
      />
      <StatisticLineBar
        title="Gemiddelde gegooide punten (per beurt)"
        :total-number="180"
        :player-left-number="132"
        :player-right-number="113"
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
}
</script>
