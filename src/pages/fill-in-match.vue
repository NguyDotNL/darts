<template>
  <div>
    <AppBar />
    <div class="overflow-y-auto" style="max-height: calc(100vh - 100px)">
      <v-container class="overflow-hidden pt-0 ">
        <PageTitle title="Wedstrijd invullen" />
        <CircularLoader v-if="loadingMatch && loadingMatchDetails" title="Wedstrijd wordt ingeladen..." />
        <v-row v-if="!loadingMatch && !loadingMatchDetails && matchData.match">
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
              :is-last-set-and-leg="(playedSets === set && playedLegs === leg) || (playedSetsDB === set && playedLegsDB === leg)"
              @update="updateThrow"
              @nextLeg="nextLeg"
            />
          </v-col>
        </v-row>
        <v-row v-if="!loadingMatch && !loadingMatchDetails && !matchData.match" class="text-center font-weight-bold text-xl">
          <v-col>
            Geen wedstrijd gevonden met dit ID
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
      playedLegsDB: 0,
      playedSetsDB: 0,
    }
  },
  watch: {
    'set': {
      handler: 'setChanged',
    },
    'matchData.match': {
      handler: 'updatePlayedSetsLegs',
    },
    'matchData.matchDetails': {
      handler: 'updatePlayedSetsLegs',
    },
  },
  mounted() {
    this.setRtMatchData(this.$route.params.id)
  },
  beforeDestroy() {
    this.destroyRtMatchData(this.matchId)
  },
  methods: {
    nextLeg() {
      this.leg++
      
      if(this.leg > this.playedLegs) {
        this.set++
        this.leg = 1
      }
    },
    updatePlayedSetsLegs() {
      if(this.loadingMatch || this.loadingMatchDetails) return

      const matchWinner = this.matchData.match.winner !== ''
      const sets = this.matchData.matchDetails.sets
      const lastSet = sets[sets.length - 1]

      this.playedSets = sets.length
      this.playedSetsDB = sets.length
      this.set = this.playedSets

      const legs = sets[this.set-1].legs
      const lastLeg = legs[legs.length - 1]
      const setWinner = sets[this.set-1].winner !== ''
      this.playedLegs = legs.length
      this.playedLegsDB = legs.length
      this.leg = this.playedLegs

      if(!matchWinner) {
        if(lastSet.winner !== '') {
          this.playedSets += 1
        }
      }
      
      if(!setWinner) {
        if(lastLeg.winner !== '') {
          this.playedLegs += 1
        }
      }
    },
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
      })
    },
    setChanged() {
      const sets = this.matchData.matchDetails.sets

      if(this.set > sets.length) {
        this.playedLegs = 1
        this.playedLegsDB = 1
        this.leg = 1
        return
      }

      const legs = sets[this.set-1].legs
      const lastLeg = legs[legs.length - 1]
      const setWinner = sets[this.set-1].winner !== ''

      this.playedLegs = legs.length
      this.playedLegsDB = legs.length

      if(!setWinner) {
        if(lastLeg.winner !== '') {
          this.playedLegs += 1
        }
      }
    },
    updateThrow(data) {
      const setKey = this.set - 1
      const legKey = this.leg - 1
      const newData = { ...data, matchId: this.matchId, setKey, legKey }

      const sets = this.matchData.matchDetails.sets[setKey]
      const legs = sets ? this.matchData.matchDetails.sets[setKey].legs[legKey] : false
      const playerKeys = Object.keys(this.matchData.match.players)

      MatchClient.updateThrow(newData, !legs, !sets, playerKeys)
      this.updateWinners(newData)
      this.updateStats(newData)
    },
    updateStats(data) {
      switch (data.change180) {
      case 'remove':
        MatchClient.increaseStats(data.matchId, data.setKey, data.playerKey, -1, '180')
        break
      case 'add':
        MatchClient.increaseStats(data.matchId, data.setKey, data.playerKey, 1, '180')
        break
      }

      switch (data.change9Dart) {
      case 'remove':
        MatchClient.increaseStats(data.matchId, data.setKey, data.playerKey, -1, '9Dart')
        break
      case 'add':
        MatchClient.increaseStats(data.matchId, data.setKey, data.playerKey, 1, '9Dart')
        break
      }
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
        MatchClient.increaseStats(data.matchId, data.setKey, data.playerKey, -1, 'legsWon')
        return true
      case 'add':
        MatchClient.addLegWinner(data.matchId, data.setKey, data.legKey, data.playerKey)
        MatchClient.increaseStats(data.matchId, data.setKey, data.playerKey, 1, 'legsWon')
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
