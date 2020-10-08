<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden">
      <MatchStatisticsHeader />
      <MatchStatisticsContent />
    </v-container>
  </div>
</template>
<script>
import Appbar from '@/components/app-bar/app-bar'
import MatchStatisticsHeader from '@/components/match/match-statistics-header'
import MatchStatisticsContent from '@/components/match/match-statistics-content'

export default {
  name: 'MatchStatistics',
  components: {
    Appbar,
    MatchStatisticsHeader,
    MatchStatisticsContent,
  },
}
</script>
