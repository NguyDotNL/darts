<template>
  <div>
    <AppBar />
    <div class="overflow-y-auto" style="max-height: calc(100vh - 100px)">
      <v-container class="overflow-hidden pt-0 ">
        <PageTitle title="Wedstrijd invullen" />
        <CircularLoader v-if="loadingMatch && loadingMatchDetails" title="Wedstrijd wordt ingeladen..." />
        <v-row v-else>
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
            <FillInTable
              :match-data="matchData"
              :match-id="matchId"
              set="set"
              leg="leg"
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
import FillInTable from '@/components/fill-in-match/fill-in-table'


export default {
  name: 'FillInMatch',
  components: {
    FillInTable,
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
        this.playedLegs = Object.keys(sets[setKeys[this.set-1]].legs).length
      })
    },
    setChanged() {
      const sets = this.matchData.matchDetails.sets
      const setKeys = Object.keys(sets)
      this.leg = 1
      this.playedLegs = Object.keys(sets[setKeys[this.set-1]].legs).length
    },
  },
}
</script>
