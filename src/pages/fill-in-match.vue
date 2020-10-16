<template>
  <div>
    <AppBar />
    <div class="overflow-y-auto" style="max-height: calc(100vh - 100px)">
      <v-container class="overflow-hidden pt-0 ">
        <PageTitle title="Wedstrijd invullen" />
        <CircularLoader v-if="loadingMatch && loadingMatchDetails" title="Wedstrijd wordt ingeladen..." />
        <v-row v-if="!loadingMatch && !loadingMatchDetails">
          <v-col>
            <NumberChoice
              v-model="set"
              :length="matchData.match.bestOfSets"
              title="Set"
              :active="set"
              :choice-enabled="playedSets"
            />
            <NumberChoice
              v-model="leg"
              :length="matchData.match.bestOfLegs"
              title="Leg"
              :active="leg"
              :choice-enabled="playedLegs"
            />
            <FillInContent
              :match-data="matchData"
              :match-id="matchId"
              :set="set"
              :leg="leg"
              :is-last-set-and-leg="playedSets === set && playedLegs === leg"
              @update="updateThrow"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/app-bar/app-bar'
import MatchClient from '@/clients/match.client'
import NumberChoice from '@/components/number-choice/number-choice'
import CircularLoader from '@/components/circular-loader/circular-loader'
import PageTitle from '@/components/page-title/page-title'
import FillInContent from '@/components/fill-in-match/fill-in-content'

export default {
  name: 'FillInMatch',
  components: {
    FillInContent,
    PageTitle,
    AppBar,
    NumberChoice,
    CircularLoader,
  },
  data: function () {
    return {
      loadingMatch: true,
      loadingMatchDetails: true,
      matchData: {
        match: null,
        matchDetails: null,
      },
      matchId: this.$route.params.id,
      set: 1,
      leg: 1,
      playedSets: 0,
      playedLegs: 0,
    }
  },
  watch: {
    'set': {
      handler: 'setChanged',
    },
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
        this.loadingMatch = false
      })

      MatchClient.getRtMatchDetails(id, snapshot => {
        this.loadingMatchDetails = false
        this.matchData.matchDetails = snapshot.val()

        const sets = this.matchData.matchDetails.sets
        const setKeys = Object.keys(sets)
        this.playedSets = setKeys.length
        this.set = this.playedSets
        this.playedLegs = Object.keys(sets[setKeys[this.set-1]].legs).length
        this.leg = this.playedLegs
      })
    },
    setChanged() {
      const sets = this.matchData.matchDetails.sets
      const setKeys = Object.keys(sets)
      this.playedLegs = Object.keys(sets[setKeys[this.set-1]].legs).length
    },
    updateThrow(data) {
      const setKey = this.set - 1
      const legKey = this.leg - 1
      const newData = { ...data, matchId: this.matchId, setKey, legKey }

      console.log(newData)

      MatchClient.updateThrow(newData)
      this.updateWinners(newData)
    },
    updateWinners(data) {
      const legWinnerUpdate = this.updateLegWin(data)
      if(!legWinnerUpdate) return
      const setWinnerUpdate = this.updateSetWin(data)
      if(!setWinnerUpdate) return
      this.updateMatchWin(data)
    },
    
    updateLegWin(data) {
      const set = this.matchData.matchDetails.sets[data.setKey]
      const leg = set.legs[data.legKey]
      const legWinner = leg.winner

      if(legWinner !== data.playerKey && legWinner !== '') {
        return false
      }

      switch (data.legWinChange) {
      case 'remove':
        MatchClient.removeLegWinner(data.matchId, data.setKey, data.legKey)
        MatchClient.increaseLegsWon(data.matchId, data.setKey, data.playerKey, -1)
        return true
      case 'add':
        MatchClient.addLegWinner(data.matchId, data.setKey, data.legKey, data.playerKey)
        MatchClient.increaseLegsWon(data.matchId, data.setKey, data.playerKey, 1)
        return true
      default:
        return false
      }
    },
    updateSetWin(data) {
      const set = this.matchData.matchDetails.sets[data.setKey]
      const setPlayers = Object.values(set.players)
      const setPlayersKeys = Object.keys(set.players)
      const highestLegScorePlayerKey = setPlayers.reduce((a, b) => a.legsWon > b.legsWon ? setPlayersKeys[0] : setPlayersKeys[1])
      const bestOfLegs = this.matchData.match.bestOfLegs
      const winLegs = Math.ceil(bestOfLegs / 2)
      const setWinner = set.winner

      if(winLegs === set.players[highestLegScorePlayerKey].legsWon && setWinner === '') {
        MatchClient.addSetWinner(data.matchId, data.setKey, data.playerKey)
        MatchClient.increaseSetsWon(data.matchId, data.playerKey, 1)
      } else if (highestLegScorePlayerKey === setWinner)  {
        MatchClient.removeSetWinner(data.matchId, data.setKey)
        MatchClient.increaseSetsWon(data.matchId, data.playerKey, -1)
      }

      return true
    },
    updateMatchWin(data) {
      const match = this.matchData.match
      const players = Object.values(match.players)
      const playersKeys = Object.keys(match.players)
      const highestMatchScorePlayerKey = players.reduce((a, b) => a.statistics.setsWon > b.statistics.setsWon ? playersKeys[0] : playersKeys[1])
      const bestOfSets = this.matchData.match.bestOfSets
      const winSets = Math.ceil(bestOfSets / 2)
      const matchWinner = match.winner

      if(winSets === match.players[highestMatchScorePlayerKey].statistics.setsWon && matchWinner === '') {
        MatchClient.addMatchWinner(data.matchId, data.playerKey, match.players[highestMatchScorePlayerKey].playerName)
      } else if (highestMatchScorePlayerKey === matchWinner)  {
        MatchClient.removeMatchWinner(data.matchId)
      }
    },
  },
}
</script>
