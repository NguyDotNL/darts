<template>
  <div>
    <Appbar />
    <v-container>
      <MatchStatisticsHeader />
      <!-- matchstatisticscontent -->
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import MatchStatisticsHeader from '@/components/match/match-statistics-header'

export default {
  name: 'MatchStatistics',
  components: {
    Appbar,
    MatchStatisticsHeader,
  },
}
</script>
