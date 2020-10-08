<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="text-center d-flex align-center justify-space-around">
          <h2 class="text-2xl font-medium">Gespeelde wedstrijden: {{ series[0] + series[1] }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center d-flex align-center justify-space-around">
          <apexchart
            width="450"
            :options="chartOptions"
            :series="series"
            :labels="labels"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'PlayerPlayedMatchesChart',
  data: function () {
    return {
      series: [85, 60],
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
}
</script>
