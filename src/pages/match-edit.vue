<template>
  <div>
    <AppBar />
    <v-container class="overflow-hidden pt-0">
      <v-row>
        <v-col>
          <h1 class="text-4xl">Wedstrijd bewerken</h1>
        </v-col>
      </v-row>
      <CircularLoader v-if="loading" title="Match data ophalen..." />
      <MatchSettings
        v-if="!loading && (matchData.matchId)"
        button-text="Wedstrijd opslaan"
        :match-name="matchData.matchName"
        :players="players"
        :date="date"
        :time="time"
        :best-of-legs="matchData.bestOfLegs"
        :best-of-sets="matchData.bestOfSets"
        :start-points="matchData.startPoints"
        :disable-edit="true"
        @click="updateMatch"
      />
      <v-row v-if="!loading && !matchData.matchId" class="text-center font-weight-bold text-xl">
        <v-col>
          Geen wedstrijd gevonden met dit ID
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AppBar from '@/components/app-bar/app-bar'
import MatchSettings from '@/components/match-settings/match-settings'
import CircularLoader from '@/components/circular-loader/circular-loader'
import MatchClient from '@/clients/match.client'
import moment from 'moment-timezone'

export default {
  name: 'MatchEdit',
  components: {
    AppBar,
    MatchSettings,
    CircularLoader,
  },
  data() {
    return {
      matchId: this.$route.params.id,
      matchData: {},
      loading: true,
      date: '',
      time: '',
      players: [],
    }
  },
  mounted() {
    this.getMatchData()
  },
  beforeDestroy() {
    MatchClient.rtMatchOff(this.matchId)
  },
  methods: {
    updateMatch(data) {
      const dateTime = moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm')
      MatchClient.updateMatch({
        matchName: data.matchName,
        date: moment(dateTime, 'DD/MM/YYYY HH:mm').tz('Europe/Amsterdam').format('X'),
      }, this.matchId).then(() => this.$router.push(`/wedstrijd/${this.matchId}`))
    },
    getMatchData() {
      MatchClient.getRtMatch(this.matchId, (data) => {
        this.matchData = data.val()
        this.date = moment(this.matchData.date, 'X').format('YYYY-MM-DD')
        this.time = moment(this.matchData.date, 'X').format('HH:mm')
        const players = this.matchData.players
        const playerKeys = Object.keys(players)
        this.players = [players[playerKeys[0]].playerName, players[playerKeys[1]].playerName]
      })
      this.loading = false
    },
  },
}
</script>
