<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden pt-0">
      <v-row v-if="loading">
        <v-col>
          <v-row>
            <v-col class="text-center">
              Wedstrijd wordt ingeladen...
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center">
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

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
import Appbar from '@/components/app-bar/app-bar'
import MatchStatisticsHeader from '@/components/match/match-statistics-header'
import MatchStatisticsContent from '@/components/match/match-statistics-content'
import MatchClient from '@/clients/match.client'

export default {
  name: 'MatchStatistics',
  components: {
    Appbar,
    MatchStatisticsHeader,
    MatchStatisticsContent,
  },
  data: function() {
    return {
      loading: true,
      matchData: {
        match: null,
        matchDetails: null,
      },
      matchId: this.$route.params.id,
    }
  },
  mounted() {
    this.setRtMatchData(this.$route.params.id)
  },
  beforeDestroy() {
    this.destroyRtMatchData(this.matchId)
  },
  methods: {
    destroyRtMatchData(id) {
      MatchClient.rtMatchAndDetailsOff(id)
    },
    setRtMatchData(id) {
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
