<template>
  <v-row dense>
    <v-col>
      <v-row dense>
        <v-col class="text-end">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <router-link :to="`/wedstrijd/${matchId}/instellingen/`">
                <v-icon
                  large
                  class="text-gray-800 mr-3"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-cog
                </v-icon>
              </router-link>
            </template>
            <span>Wedstrijd instellingen</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <router-link :to="`/wedstrijd/${matchId}/invullen/`">
                <v-icon
                  large
                  class="text-primary mr-3"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-pencil-outline
                </v-icon>
              </router-link>
            </template>
            <span>Wedstrijd worpen aanpassen</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                class="text-iconred"
                v-bind="attrs"
                v-on="on"
                @click="deleteMatch"
              >
                mdi-trash-can-outline
              </v-icon>
            </template>
            <span>Wedstrijd verwijderen</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center font-bold text-2xl pb-0" data-testid="match-header-title">
          {{ matchData.matchName }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="block font-bold text-h6" data-testid="match-header-player-left">
            {{ matchData.players[Object.keys(matchData.players)[0]].playerName }}
            <NineDarterIcon v-if="matchData.players[Object.keys(matchData.players)[0]].statistics['9Dart'] > 0" data-testid="match-header-player-left-nine-dart" />
          </div>
          <div v-if="Object.keys(matchData.players)[0] === matchData.winner" class="block text-uppercase text-xs font-bold" data-testid="match-header-player-left-won">Winnaar</div>
        </v-col>
        <v-col class="text-center font-bold text-4xl text-no-wrap">
          <span v-if="matchData.bestOfSets > 1" data-testid="match-header-player-left-sets">
            {{ matchData.players[Object.keys(matchData.players)[0]].statistics.setsWon }}
          </span>
          <span v-else>
            {{ matchData.players[Object.keys(matchData.players)[0]].statistics.legsWon }}
          </span>
          VS
          <span v-if="matchData.bestOfSets > 1" data-testid="match-header-player-right-sets">
            {{ matchData.players[Object.keys(matchData.players)[1]].statistics.setsWon }}
          </span>
          <span v-else>
            {{ matchData.players[Object.keys(matchData.players)[1]].statistics.legsWon }}
          </span>
        </v-col>
        <v-col class="text-end">
          <div class="block font-bold text-h6" data-testid="match-header-player-right">
            {{ matchData.players[Object.keys(matchData.players)[1]].playerName }}
            <NineDarterIcon v-if="matchData.players[Object.keys(matchData.players)[1]].statistics['9Dart'] > 0" data-testid="match-header-player-right-nine-dart" />
          </div>
          <div v-if="Object.keys(matchData.players)[1] === matchData.winner" class="block text-uppercase text-xs font-bold" data-testid="match-header-player-right-won">Winnaar</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import NineDarterIcon from '@/components/9-darter/9-darter-icon'
import MatchClient from '@/clients/match.client'

export default {
  name: 'MatchStatisticsHeader',
  components: {
    NineDarterIcon,
  },
  props: {
    matchData: {
      type: Object,
      required: true,
    },
    matchId: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteMatch: async function() {
      await MatchClient.rtMatchAndDetailsOff(this.matchId)
      await MatchClient.deleteMatch(this.matchId)
      await this.$router.replace('/')
    },
  },
}
</script>
