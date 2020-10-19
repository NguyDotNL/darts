<template>
  <div>
    <AppBar />
    <v-container class="overflow-hidden pt-0">
      <v-row>
        <v-col>
          <h1 class="text-4xl">Wedstrijd toevoegen</h1>
        </v-col>
      </v-row>
      <MatchSettings
        button-text="Wedstrijd opslaan"
        :players="players"
        :disable-players="false"
        @click="createMatch"
        @search="getPlayers"
      />
    </v-container>
  </div>
</template>
<script>
import AppBar from '@/components/app-bar/app-bar'
import MatchSettings from '@/components/match-settings/match-settings'
import PlayersClient from '@/clients/players.client'
import MatchClient from '@/clients/match.client'
import moment from 'moment-timezone'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'MatchAdd',
  components: {
    AppBar,
    MatchSettings,
  },
  data() {
    return {
      players: [],
    }
  },
  methods: {
    async createMatch(data) {
      await PlayersClient.addPlayers([data.player1, data.player2]).then(result => {
        const uniqueId = uuidv4()
        const dateTime = moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm')
        MatchClient.createMatch(
          {
            bestOfLegs: data.bestOfLegs,
            bestOfSets: data.bestOfSets,
            date: moment(dateTime, 'DD/MM/YYYY HH:mm').tz('Europe/Amsterdam').format('X'),
            matchId: uniqueId,
            matchName: data.matchName,
            players: {
              [result.player1.playerId]: {
                playerName: data.player1.fullName,
                statistics: {
                  '180': 0,
                  '9Dart': 0,
                  legsWon: 0,
                  setsWon: 0,
                },
              },
              [result.player2.playerId]: {
                playerName: data.player2.fullName,
                statistics: {
                  '180': 0,
                  '9Dart': 0,
                  legsWon: 0,
                  setsWon: 0,
                },
              },
            },
            startPoints: data.startPoints,
            winner: '',
            winnerName: '',
          },
          uniqueId,
        )
        this.$router.push(`/wedstrijd/${uniqueId}/invullen`)
      })
    },
    async getPlayers(name) {
      if(name && name.length > 0) {
        name = name.toLowerCase()
        return await PlayersClient.searchPlayers(name).then((res) => this.players = res)
      }
    },
  },
}
</script>
