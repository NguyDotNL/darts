<template>
  <v-row dense>
    <v-col>
      <v-row dense>
        <v-col class="text-end">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                class="text-gray-800 mr-3"
                v-bind="attrs"
                v-on="on"
              >
                mdi-cog
              </v-icon>
            </template>
            <span>Wedstrijd instellingen</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                class="text-primary mr-3"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil-outline
              </v-icon>
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
        <v-col class="text-center font-bold text-2xl pb-0">
          {{ matchData.matchName }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="block font-bold text-h6">
            {{ matchData.players[Object.keys(matchData.players)[0]].playerName }}
            <NineDarterIcon v-if="matchData.players[Object.keys(matchData.players)[0]].statistics['9Dart'] > 0" />
          </div>
          <div v-if="Object.keys(matchData.players)[0] === matchData.winner" class="block text-uppercase text-xs font-bold">Winnaar</div>
        </v-col>
        <v-col class="text-center font-bold text-4xl text-no-wrap">
          <span v-if="matchData.bestOfSets > 1">
            {{ matchData.players[Object.keys(matchData.players)[0]].statistics.setsWon }}
          </span>
          <span v-else>
            {{ matchData.players[Object.keys(matchData.players)[0]].statistics.legsWon }}
          </span>
          VS
          <span v-if="matchData.bestOfSets > 1">
            {{ matchData.players[Object.keys(matchData.players)[1]].statistics.setsWon }}
          </span>
          <span v-else>
            {{ matchData.players[Object.keys(matchData.players)[1]].statistics.legsWon }}
          </span>
        </v-col>
        <v-col class="text-end">
          <div class="block font-bold text-h6">
            {{ matchData.players[Object.keys(matchData.players)[1]].playerName }}
            <NineDarterIcon v-if="matchData.players[Object.keys(matchData.players)[1]].statistics['9Dart'] > 0" />
          </div>
          <div v-if="Object.keys(matchData.players)[1] === matchData.winner" class="block text-uppercase text-xs font-bold">Winnaar</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import NineDarterIcon from '@/components/9-darter/9-darter-icon'
import { matches, matchDetails } from '@/plugins/firebase'
import MatchClient from '@/clients/match.client'

export default {
  name: 'MatchStatisticsHeader',
  components: {
    NineDarterIcon,
  },
  props:{
    matchData: {
      type: Object,
      required: true,
    },
    matchId:{
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Wedstrijd',
          disabled: false,
          href: '/',
        },
        {
          text: 'WK 2020',
          disabled: true,
          href: '',
        },
      ],
    }
  },
  methods: {

    deleteMatch: async function(){
      matches.child(this.matchId).off()
      matchDetails.child(this.matchId).off()

      const deleted = await MatchClient.deleteMatch(this.matchId)

      if(deleted){
        window.location.href = `/wedstrijd/${this.matchId}`
      }
    },
  },
}
</script>
