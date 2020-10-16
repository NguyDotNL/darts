<template>
  <div>
    <AppBar />
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
              :cols="6"
            />
            <MatchesDateTime @date="date = $event" @time="time = $event" />
          </v-row>
          <v-row>
            <MatchesPlayerPicker
              v-model="player1"
              :items="items"
              item-value="playerId"
              item-text="fullName"
              label="Speler 1"
              :loading="false"
              :cols="6"
              :error-message="message"
              @search="getPlayers"
            />
            <MatchesPlayerPicker
              v-model="player2"
              :items="items"
              item-value="playerId"
              item-text="fullName"
              label="Speler 2"
              :loading="false"
              :cols="6"
              :error-message="message"
              @search="getPlayers"
            />
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
              title="Score per leg"
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
                :disabled="disabled"
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
import AppBar from '@/components/app-bar/app-bar'
import MatchesRadioButtons from '@/components/match-settings/matches-radio-buttons'
import MatchesTextField from '@/components/match-settings/matches-text-field'
import MatchesDateTime from '@/components/match-settings/matches-date-time'
import MatchesPlayerPicker from '@/components/match-settings/matches-player-picker'
import PlayersClient from '@/clients/players.client'
import MatchClient from '@/clients/match.client'
import moment from 'moment-timezone'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'MatchAdd',
  components: {
    AppBar,
    MatchesRadioButtons,
    MatchesTextField,
    MatchesDateTime,
    MatchesPlayerPicker,
  },
  data() {
    return {
      matchName: '',
      date: '',
      time: '',
      player1: null,
      player2: null,
      bestOfArray: [1, 3, 5, 7, 9, 11, 13],
      bestOfSets: 1,
      bestOfLegs: 1,
      startPoints: 501,
      items: [],
      error: false,
      message: [],
    }
  },
  computed: {
    disabled() {
      return ((this.matchName != '') && (this.date != '') && (this.time != '') && (this.player1 && typeof this.player1 === 'object') && (this.player2 && typeof this.player2 === 'object') && !this.error) ? false : true
    },
  },
  watch: {
    player1() {
      if(this.player1 && this.player2 && this.player1?.fullName == this.player2?.fullName) {
        this.error = true
        return this.message = 'Spelernaam is al in gebruik.'
      }
      this.error = false
      return this.message = []
    },
    player2() {
      if(this.player1 && this.player2 && this.player2?.fullName == this.player1?.fullName) {
        this.error = true
        return this.message = 'Spelernaam is al in gebruik.'
      }
      this.error = false
      return this.message = []
    },
  },
  methods: {
    async createMatch() {
      await PlayersClient.addPlayers([this.player1, this.player2]).then(result => {
        const uniqueId = uuidv4()
        MatchClient.createMatch(
          {
            bestOfLegs: this.bestOfLegs,
            bestOfSets: this.bestOfSets,
            date: parseInt(moment(`${this.date} ${this.time}`, 'DD/MM/YYYY HH:mm').tz('Europe/Amsterdam').format('X')),
            matchId: uniqueId,
            matchName: this.matchName,
            players: {
              [result.player1.playerId]: {
                playerName: this.player1.fullName,
                statistics: {
                  '180': 0,
                  '9Dart': 0,
                  legsWon: 0,
                  setsWon: 0,
                },
              },
              [result.player2.playerId]: {
                playerName: this.player2.fullName,
                statistics: {
                  '180': 0,
                  '9Dart': 0,
                  legsWon: 0,
                  setsWon: 0,
                },
              },
            },
            startPoints: this.startPoints,
            winner: '',
            winnerName: '',
          },
          uniqueId,
        )
      })
    },
    async getPlayers(name) {
      if(name && name.length > 0) {
        name = name.toLowerCase()
        return await PlayersClient.searchPlayers(name).then((res) => this.items = res)
      }
    },
  },
}
</script>
