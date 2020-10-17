<template>
  <v-row>
    <v-col>
      <div class="w-full pr-5 pl-5 p-3 bg-primary text-white text-md flex pt-1 pb-1" style="min-height: 40px !important;">
        <span class="align-center align-start flex">Beurt: {{ turn }}</span>
        <v-chip
          v-if="bust"
          label
          dark
          :filter="false"
          class="align-center bg-red-700  text-center justify-center"
        >
          Bust
        </v-chip>
        <span class="flex justify-end align-center align-end">Totaal: {{ turnData.total }}</span>
      </div>
      <v-data-table
        :headers="headers"
        fixed-header
        mobile-breakpoint="0"
        :items="allThrows"
        disable-pagination
        disable-sort
        disable-filtering
        hide-default-footer
        class="elevation-1"
        style="box-shadow: none !important;"
      >
        <template v-slot:item.multiplier="{ item }">
          <v-radio-group
            v-if="isLast"
            v-model="item.multiplier"
            row
            dense
            @change="changeType(item)"
          >
            <v-radio
              label="Missed"
              color="primary"
              :selected="item.multiplier === 0"
              :value="0"
            />
            <v-radio
              label="Single"
              color="primary"
              :selected="item.multiplier === 1"
              :value="1"
              class="pl-2"
            />
            <v-radio
              label="Bull"
              color="primary"
              :selected="item.multiplier === 4"
              :value="4"
            />
            <v-radio
              label="Double"
              color="primary"
              :selected="item.multiplier === 2"
              :value="2"
              style="padding-left: 33px"
            />
            <v-radio
              label="Bullseye"
              color="primary"
              :selected="item.multiplier === 5"
              :value="5"
              dense
            />
            <v-radio
              label="Triple"
              color="primary"
              :selected="item.multiplier === 3"
              :value="3"
            />
          </v-radio-group>
          <span v-else>
            {{ multiplierText(item.multiplier) }}: {{ item.points }}
          </span>
        </template>
        <template v-slot:item.points="{item}">
          <v-autocomplete
            v-if="item.multiplier < 4 && item.multiplier && isLast"
            v-model="item.points"
            :items="autoCompleteChoices"
            dense
            label="Punten"
            class="mt-2"
            @change="updateThrowDB(item)"
          />
          Totaal: {{ total( item.multiplier, item.points ) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FillInTurn',
  props: {
    turnData: {
      type: Object,
      required: true,
    },
    turn: {
      type: Number,
      required: true,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    winner: {
      type: Boolean,
      default: false,
    },
    playerHasTurn: {
      type: Boolean,
      required: false,
    },
    legWinner: {
      type: Boolean,
      required: false,
    },
  },
  data: function () {
    return {
      autoCompleteChoices: [...Array(21).keys()].slice(1).reverse(),
      headers: [
        { text: 'Worp', value: 'throw', width: 50 },
        { text: 'Type', value: 'multiplier', width: 270 },
        { text: 'Beurt punten', value: 'points' },
        { text: `Totaal ${this.turnData.remainingPoints}`, value: 'total' },
      ],
      bust: false,
      allThrows: [],
    }
  },
  watch: {
    'turnData': {
      immediate: true,
      handler: 'initThrows',
    },
    'playerHasTurn': {
      immediate: true,
      handler: 'initThrows',
    },

  },
  methods: {
    initThrows() {
      const throwData = this.turnData.throws
      this.allThrows =  this.playerHasTurn ? [{
        multiplier: 3,
        points: 0,
        throw: 1,
        total: this.turnData.remainingPoints,
      }] : []

      if(!Object.keys(throwData).length) return

      this.allThrows = []
      let points = this.turnData.remainingPoints
      this.headers[3].text = `Totaal ${points}`
      let bust = false
      for(let dartKey in throwData) {
        const dart = throwData[dartKey]
        const dartTotal = this.total(dart.multiplier, dart.points)
        points -= dartTotal
        if(!bust && points <= 1 && !(points === 0 && dart.multiplier === 2)) {
          bust = true
        }
        this.allThrows.push({ ...dart, throw: +dartKey+1, total: points })
      }
      this.bust = bust
      
      if(!bust && this.allThrows.length < 3 && this.playerHasTurn && !this.legWinner) {
        this.allThrows.push({ multiplier: 3, points: 0, throw: this.allThrows.length+1, total: points })
      }
    },
    total(type, points) {
      return type < 4 ? type * points : points
    },
    multiplierText(multiplier) {
      switch (multiplier) {
      case 0:
        return 'Missed'
      case 1:
        return 'Single'
      case 2:
        return 'Double'
      case 3:
        return 'Triple'
      case 4:
        return 'Bull'
      default:
        return 'Bullseye'
      }
    },
    changeType(item) {
      if(item.multiplier === 4) {
        item.points = 25
        this.updateThrowDB(item)
      } else if (item.multiplier === 5) {
        item.points = 50
        this.updateThrowDB(item)
      } else if (!item.multiplier) {
        item.points = 0
        this.updateThrowDB(item)
      } else {
        item.points = 0
      }
    },
    updateThrowDB(item) {
      const throwData = {
        multiplier: item.multiplier,
        points: item.points,
      }

      let newTurnPoints = this.allThrows.reduce((total, dart) => total += this.total(dart.multiplier, dart.points), 0)
      const newRemainingPoints = this.turnData.remainingPoints - newTurnPoints
      const lastThrow = this.allThrows[this.allThrows.length-1]
      let legWinChange = false

      if(newRemainingPoints <= 1 && !(lastThrow.multiplier === 2 && newRemainingPoints === 0)) {
        newTurnPoints = 0
        
        if(this.winner) {
          legWinChange = 'remove'
        }
      } else if(lastThrow.multiplier === 2 && newRemainingPoints === 0) {
        legWinChange = 'add'
      } else if(this.winner && newRemainingPoints > 0) {
        legWinChange = 'remove'
      }

      this.$emit('update', { turn: this.turn - 1, throwKey: item.throw - 1, throwData,  newTurnPoints, legWinChange })
    },
  },
}
</script>

