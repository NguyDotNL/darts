<template>
  <div>
    <Appbar />
    <v-container>
      <v-row>
        <v-col>
          <h1 class="text-4xl font-medium text-grey">{{ $route.params.name }}</h1>
        </v-col>
      </v-row>
      <PlayerPlayedMatches />
      <v-row>
        <v-col>
          <h3 class="text-3xl font-medium">Gespeelde wedstrijden</h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import PlayerPlayedMatches from '@/components/player-played-matches-chart/player-played-matches-chart'

export default {
  name: 'PlayerStatistics',
  components: {
    Appbar,
    PlayerPlayedMatches,
  },
}
</script>
