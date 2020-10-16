<template>
  <div>
    <AppBar />
    <v-container class="overflow-hidden pt-0">
      <CircularLoader v-if="loading" title="Wedstrijd wordt ingeladen..." />
      <MatchStatisticsHeader v-if="!loading && matchData.match && matchData.matchDetails" :match-data="matchData.match" :match-id="matchId" />
      <MatchStatisticsContent v-if="!loading && matchData.match && matchData.matchDetails" :match-data="matchData" />

      <v-row v-if="!loading && (!matchData.match || !matchData.matchDetails)" class="text-center font-weight-bold text-xl">
        <v-col>
          Geen wedstrijd gevonden met dit ID
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AppBar from '@/components/app-bar/app-bar'
import MatchStatisticsHeader from '@/components/match/match-statistics-header'
import MatchStatisticsContent from '@/components/match/match-statistics-content'
import MatchClient from '@/clients/match.client'
import CircularLoader from '@/components/circular-loader/circular-loader'

export default {
  name: 'MatchStatistics',
  components: {
    AppBar,
    MatchStatisticsHeader,
    MatchStatisticsContent,
    CircularLoader,
  },
  data: function() {
    return {
      loading: true,
      matchData: {
        match: null,
        matchDetails: null,
      },
      matchId: this.$route.params.id || 'NoId',
    }
  },
  mounted() {
    this.setRtMatchData(this.matchId)
  },
  beforeDestroy() {
    this.destroyRtMatchData(this.matchId)
  },
  methods: {
    destroyRtMatchData(id) {
      if(id === 'NoId') return
      MatchClient.rtMatchAndDetailsOff(id)
    },
    setRtMatchData(id) {
      if(id === 'NoId') { this.$router.push('/'); return }
      MatchClient.getRtMatch(id, snapshot => {
        this.matchData.match = snapshot.val()
      })

      MatchClient.getRtMatchDetails(id, snapshot => {
        this.loading = false
        this.matchData.matchDetails = snapshot.val()
      })
    },
  },
}
</script>
