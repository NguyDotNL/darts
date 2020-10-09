<template>
  <v-row class="overflow-y-auto" style="max-height: calc(100vh - 273px)">
    <v-col>
      <MatchGeneralStatistics :match-data="matchData" />
      <MatchSetStatistics :set-data="matchData.matchDetails.sets" :match-players="matchData.match.players" />
      <MatchLegStatistics :set-data="matchData.matchDetails.sets" :match-players="matchData.match.players" :startpoints="matchData.match.startpoints" />
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
  props:{
    matchData: {
      type: Object,
      required: true,
    },
  },
}
</script>
