<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="text-center d-flex align-center justify-space-around">
          <h2 class="text-2xl font-medium">Gespeelde wedstrijden: {{ matches.length }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center d-flex align-center justify-space-around">
          <apexchart
            width="450"
            :options="chartOptions"
            :series="series"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'PlayerPlayedMatchesChart',
  props: {
    player: {
      type: Object,
      required: true,
    },
    matches: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      chartOptions: {
        labels: ['Gewonnen', 'Verloren'],
        colors: ['#32b132', '#ff4d4d'],
        chart: {
          type: 'donut',
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '18px',
          },
          formatter: function(val, opts) {
            return opts.w.config.series[opts.seriesIndex]
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '18px',
          inverseOrder: true,
          formatter: function(name, opts) {
            return [name + ':', opts.w.config.series[opts.seriesIndex]]
          },
        },
      },
    }
  },
  computed: {
    series: function () {
      const wins = this.matches.filter((match) => match.winner == this.player.playerId).length
      const loses = this.matches.length - wins
      return [wins, loses]
    },
  },
}
</script>
