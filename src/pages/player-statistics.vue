<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden pt-0">
      <div v-if="loadingData">
        <v-row>
          <v-col class="text-center d-flex align-center justify-center">
            <v-progress-circular
              size="80"
              indeterminate
              color="primary"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col>
            <h1 class="text-4xl font-medium text-grey">{{ playerName ? playerName : '' }}</h1>
          </v-col>
        </v-row>
        <PlayerPlayedMatches />
        <v-row>
          <v-col>
            <h3 class="text-3xl font-medium">Gespeelde wedstrijden</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <MatchTable :matches="matches" :match-export="false" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import PlayerPlayedMatches from '@/components/player-played-matches-chart/player-played-matches-chart'
import MatchTable from '@/components/match-table/match-table'
import PlayersClient from '@/clients/players.client'

export default {
  name: 'PlayerStatistics',
  components: {
    Appbar,
    PlayerPlayedMatches,
    MatchTable,
  },
  data: function () {
    return {
      playerName: '',
      playerId: this.$route.params.player_id,
      matches: [],
      loadingData: true,
    }
  },
  mounted () {
    this.setPlayerData(this.playerId)
  },
  methods: {
    setPlayerData: async function (playerId) {
      this.getPlayerData(playerId).then(data => {
        this.playerName = data.playerName
        this.matches = data.playerMatches
        this.loadingData = false
      })
    },
    getPlayerData: async function (playerId) {
      return await PlayersClient.getPlayerData(playerId)
    },
  },
}
</script>
