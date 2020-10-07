<template>
  <v-row>
    <v-col>
      <MatchGeneralStatistics />
      <MatchSetStatistics :set-data="setData" />
      <MatchLegStatistics />
    </v-col>
  </v-row>
</template>
<script>
import MatchGeneralStatistics from '@/components/match/match-general-statistics'
import MatchSetStatistics from '@/components/match/match-set-statistics'
import MatchLegStatistics from '@/components/match/match-leg-statistics'

export default {
  name: 'MatchStatisticsContent',
  components: {
    MatchGeneralStatistics,
    MatchSetStatistics,
    MatchLegStatistics,
  },
  data: function () {
    return {
      setData: {
        '1': {
          winner: 'Michael van Gerwen',
          players: {
            '1': {
              statistics: {
                'legsWon': 3,
                '180': 3,
                '9dart': 1,
              },
            },
            '2': {
              statistics: {
                'legsWon': 1,
                '180': 5,
                '9dart': 0,
              },
            },
          },
        },
        '2': {
          winner: 'Raymond van Barneveld',
          players: {
            '1': {
              statistics: {
                'legsWon': 2,
                '180': 6,
                '9dart': 0,
              },
            },
            '2': {
              statistics: {
                'legsWon': 3,
                '180': 7,
                '9dart': 0,
              },
            },
          },
        },
        '3': {
          winner: 'Michael van Gerwen',
          players: {
            '1': {
              statistics: {
                'legsWon': 3,
                '180': 5,
                '9dart': 0,
              },
            },
            '2': {
              statistics: {
                'legsWon': 1,
                '180': 3,
                '9dart': 0,
              },
            },
          },
        },
      },
    }
  },
}
</script>
