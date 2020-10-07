<template>
  <v-row>
    <v-col>
      <v-row dense>
        <v-col class="font-weight-bold text-xl">
          Leg statistieken
        </v-col>
      </v-row>
      <v-row dense>
        <v-col sm="6" md="1" cols="12">
          <v-select
            v-model="selectedSet"
            :items="setItems"
            label="Set"
          />
        </v-col>
        <v-col sm="6" md="1" cols="12">
          <v-select
            v-model="selectedLeg"
            :items="legItems"
            label="Leg"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold text-hd">
          Leg winnaar: {{ winner }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold text-hd text-center text-3xl">
          {{ legPoints }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          tableplayer 1
        </v-col>
        <v-col>
          tableplayer 2
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'MatchLegStatistics',
  props: {
    setData:{
      type: Object,
      required: true,
    },
  },
  data: function() {
    return {
      selectedSet: 1,
      selectedLeg: 1,
      winner: '',
      setItems: [],
      legItems: [1,2,3,4],
      legPoints: 501,
    }
  },
  watch: {
    selectedSet: {
      immediate: true,
      handler: 'setLegData',
    },
  },
  methods: {
    setLegData(){
      const setDataKeys = Object.keys(this.setData)
      const set = this.setData[setDataKeys[this.selectedSet-1]]

      this.setItems = [...Array(setDataKeys.length+1).keys()].slice(1)
      this.winner = set.winner
    },
  },
}
</script>
