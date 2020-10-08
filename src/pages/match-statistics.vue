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

      <MatchStatisticsHeader v-if="!loading && matchData" />
      <MatchStatisticsContent v-if="!loading && matchData" />

      <v-row v-if="!loading && !matchData" class="text-center font-weight-bold text-xl">
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
  data: function(){
    return {
      loading: true,
      matchData: false,
    }
  },
  mounted() {
    this.setMatchData(this.$route.params.id)
  },
  methods: {
    setMatchData: async function(id){
      this.getMatchData(id).then(data => {
        this.matchData = data
        this.loading = false
      }).catch((err) => {
        console.warn('Match loading failed',{err})
        this.loading = false
      })
    },
    getMatchData: async function(id){
      return await MatchClient.getMatchDetails(id)
    },
  },
}
</script>
