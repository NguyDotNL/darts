<template>
  <div>
    <AppBar />
    <v-container class="overflow-hidden pt-0">
      <div v-if="loadingData">
        <v-row>
          <v-col class="text-center d-flex align-center justify-center" style="height: calc(100vh - 100px)">
            <v-progress-circular
              size="90"
              indeterminate
              color="primary"
            />
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col>
          <h1 class="text-4xl font-medium text-grey">{{ player && `${player.firstName} ${player.lastName}` }}</h1>
        </v-col>
      </v-row>
      <v-row v-if="!loadingData && matches && player" class="overflow-y-auto" style="max-height: calc(100vh - 190px)">
        <v-col>
          <PlayerPlayedMatches v-if="!loadingData && matches && player" :player="player" :matches="matches" />
          <v-row>
            <v-col>
              <h3 class="text-3xl font-medium">Gespeelde wedstrijden</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <MatchTable v-if="!loadingData && matches && player" :matches="matches" :match-export="false" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/app-bar/app-bar'
import PlayerPlayedMatches from '@/components/player-played-matches-chart/player-played-matches-chart'
import MatchTable from '@/components/match-table/match-table'
import PlayersClient from '@/clients/players.client'

export default {
  name: 'PlayerStatistics',
  components: {
    AppBar,
    PlayerPlayedMatches,
    MatchTable,
  },
  data() {
    return {
      playerId: this.$route.params.player_id,
      player: {},
      matches: [],
      loadingData: true,
    }
  },
  mounted() {
    this.setPlayerData(this.playerId)
  },
  methods: {
    async setPlayerData(playerId) {
      this.getPlayerData(playerId).then(data => {
        this.player = data.player
        this.matches = data.playerMatches
        this.loadingData = false
      })
    },
    async getPlayerData(playerId) {
      return await PlayersClient.getPlayerData(playerId)
    },
  },
}
</script>
