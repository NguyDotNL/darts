<template>
  <v-row>
    <v-col>
      <FillInHeader
        :players="players"
        :on-turn="onTurn"
        :start-points="startPoints"
        :player-turn="playerTurn"
      />
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            fixed-header
            mobile-breakpoint="0"
            :items="turns"
            disable-pagination
            disable-sort
            disable-filtering
            hide-default-footer
            class="elevation-1"
            style="box-shadow: none !important;"
          >
            <template v-slot:item.type="{ item }">
              <v-radio-group
                v-model="item.type"
                row
                dense
                @change="changeType(item)"
              >
                <v-radio
                  label="Bull"
                  color="primary"
                  :selected="item.type === 4"
                  :value="4"
                />
                <v-radio
                  label="Double"
                  color="primary"
                  :selected="item.type === 2"
                  :value="2"
                  class="pl-8"
                />
                <v-radio
                  label="Single"
                  color="primary"
                  :selected="item.type === 1"
                  :value="1"
                />
                <v-radio
                  label="Bullseye"
                  color="primary"
                  :selected="item.type === 5"
                  :value="5"
                  dense
                />
                <v-radio
                  label="Triple"
                  color="primary"
                  :selected="item.type === 3"
                  :value="3"
                />
                <v-radio
                  label="Missed"
                  color="primary"
                  :selected="item.type === 0"
                  :value="0"
                  style="padding-left: 10px !important;"
                />
              </v-radio-group>
            </template>
            <template v-slot:item.points="{item}">
              <v-autocomplete
                v-if="item.type < 4 && item.type"
                v-model="item.points"
                :items="autoCompleteChoices"
                dense
                label="Punten"
                class="mt-2"
              />
              Totaal: {{ total( item.type, item.points ) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-end flex-column">
          <v-btn
            elevation="2"
            tile
            dark
            class="bg-primary"
          >
            Volgende speler
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import FillInHeader from '@/components/fill-in-match/fill-in-header'

export default {
  name: 'FillInTable',
  components: {
    FillInHeader,
  },
  props: {
    matchId: {
      type: String,
      required: true,
    },
    matchData: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      playerSelected: '',
      players: [],
      startPoints: '',
      playerTurn: 0,
      bestOfSets: 1,
      bestOfLegs: 1,
      onTurn: 1,
      autoCompleteChoices: [...Array(21).keys()].slice(1).reverse(),
      turns: [
        {
          turn: 1,
          type: 1,
          points: 0,
          total: 501,
        },
      ],
      headers: [
        { text: 'Worp', value: 'turn', width: 100 },
        { text: 'Type', value: 'type', width: 370 },
        { text: 'Beurt punten', value: 'points' },
        { text: 'Totaal', value: 'total' },
      ],
    }
  },
  watch: {
    'matchData.match': {
      immediate: true,
      handler: 'initData',
    },
    'matchData.details': {
      immediate: true,
      handler: 'initData',
    },
  },
  methods: {
    initData() {
      const match = this.matchData.match
      const players = this.matchData.match.players
      const playerKeys = Object.keys(this.matchData.match.players)
      this.players = [
        players[playerKeys[0]].playerName,
        players[playerKeys[1]].playerName,
      ]
      this.startPoints = match.startPoints
      this.bestOfsets = match.bestOfSets
      this.bestOfLegs = match.bestOfLegs
    },
    total(type, points) {
      return type < 4 ? type * points : points
    },
    changeType(item) {
      if(item.type === 4) {
        item.points = 25
        this.updateThrowDB(item)
      } else if (item.type === 5) {
        item.points = 50
        this.updateThrowDB(item)
      } else if (!item.type) {
        item.points = 0
        this.updateThrowDB(item)
      } else {
        item.points = 0
      }
    },
    updateThrowDB(item) {
      console.log('update throw', item)
    },
    
  },
}
</script>
