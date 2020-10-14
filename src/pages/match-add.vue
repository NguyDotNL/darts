<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden pt-0">
      <v-row>
        <v-col>
          <h1 class="text-4xl">Wedstrijd toevoegen</h1>
        </v-col>
      </v-row>
      <v-row class="overflow-y-auto" style="max-height: calc(100vh - 260px)">
        <v-col>
          <v-row>
            <MatchesTextField
              v-model="matchName"
              label="Wedstrijd naam"
              :rules="rules"
              :cols="6"
            />
            <MatchesDateTime @date="date" @time="time" />
          </v-row>
          <v-row>
            <MatchesRadioButtons
              v-model="bestOfSets"
              title="Best of Sets"
              :items="bestOfArray"
              :cols="6"
            />
            <MatchesRadioButtons
              v-model="bestOfLegs"
              title="Best of Legs"
              :items="bestOfArray"
              :cols="6"
            />
          </v-row>
          <v-row>
            <MatchesRadioButtons
              v-model="startPoints"
              title="Best of Sets"
              :items="[501, 301]"
              :cols="6"
            />
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-btn
                depressed
                tile
                color="primary"
                @click="createMatch"
              >
                Wedstrijd toevoegen en starten
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Appbar from '@/components/app-bar/app-bar'
import MatchesRadioButtons from '@/components/match-settings/matches-radio-buttons'
import MatchesTextField from '@/components/match-settings/matches-text-field'
import MatchesDateTime from '@/components/match-settings/matches-date-time'
import playersClient from '@/clients/players.client'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'MatchAdd',
  components: {
    Appbar,
    MatchesRadioButtons,
    MatchesTextField,
    MatchesDateTime,
  },
  data() {
    return {
      matchName: '',
      date: '',
      time: '',
      bestOfArray: [1, 3, 5, 7, 9, 11, 13],
      bestOfSets: 1,
      bestOfLegs: 1,
      startPoints: 501,
      rules: [
        value => !!value || 'Verplicht.',
      ],
    }
  },
  methods: {
    createMatch() {
      const uniqueId = uuidv4()
      console.log({
        [uniqueId]: {
          bestOfLegs: this.bestOfLegs,
          bestOfSets: this.bestOfSets,
          date: this.date,
          matchId: uniqueId,
          matchName: this.matchName,
          players: {
            player1Id: {
              playerName: this.player1,
              statistics: {
                '180': 0,
                '9Dart': 0,
                legsWon: 0,
                setsWon: 0,
              },
            },
            player2Id: {
              playerName: this.player2,
              statistics: {
                '180': 0,
                '9Dart': 0,
                legsWon: 0,
                setsWon: 0,
              },
            },
          },
          startPonts: this.startPoints,
          winner: '',
          winnerName: '',
        },
      })
    },
    async getPlayers(name) {
      if(name && name.length > 0) {
        name = name.charAt(0).toUpperCase() + name.slice(1)
        return await playersClient.searchPlayers(name)
      }
    },
  },
}
</script>
