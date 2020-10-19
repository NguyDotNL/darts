<template>
  <div>
    <v-row class="overflow-y-auto" style="max-height: calc(100vh - 260px)">
      <v-col>
        <v-row>
          <MatchTextField
            v-model="matchNameSet"
            :value="matchNameSet"
            label="Wedstrijd naam"
            :cols="6"
          />
          <MatchDateTime
            :default-date="dateSet"
            :default-time="timeSet"
            @date="dateSet = $event"
            @time="timeSet = $event"
          />
        </v-row>
        <v-row>
          <v-col v-if="disableEdit" :cols="12" :md="6">
            <div class="font-weight-bold">Speler 1</div>
            {{ players[0] }}
          </v-col>
          <v-col v-if="disableEdit" :cols="12" :md="6">
            <div class="font-weight-bold">Speler 2</div>
            {{ players[1] }}
          </v-col>
          <MatchPlayerPicker
            v-if="!disableEdit"
            v-model="player1Set"
            :items="players"
            item-value="playerId"
            item-text="fullName"
            label="Speler 1"
            :loading="false"
            :disabled="disableEdit"
            :cols="6"
            :error-message="message"
            @search="$event => $emit('search', $event)"
          />
          <MatchPlayerPicker
            v-if="!disableEdit"
            v-model="player2Set"
            :items="players"
            item-value="playerId"
            item-text="fullName"
            label="Speler 2"
            :loading="false"
            :disabled="disableEdit"
            :cols="6"
            :error-message="message"
            @search="$event => $emit('search', $event)"
          />
        </v-row>
        <v-row>
          <MatchRadioButtons
            v-model="bestOfSetsSet"
            :value="bestOfSetsSet"
            title="Best of Sets"
            :disabled="disableEdit"
            :items="bestOfArray"
            :cols="6"
          />
          <MatchRadioButtons
            v-model="bestOfLegsSet"
            :value="bestOfLegsSet"
            title="Best of Legs"
            :disabled="disableEdit"
            :items="bestOfArray"
            :cols="6"
          />
        </v-row>
        <v-row>
          <MatchRadioButtons
            v-model="startPointsSet"
            :value="startPointsSet"
            title="Score per leg"
            :disabled="disableEdit"
            :items="[501, 301]"
            :cols="6"
          />
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-btn
              depressed
              tile
              color="primary"
              :disabled="disabled"
              @click="emitData"
            >
              {{ buttonText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MatchRadioButtons from '@/components/match-settings/match-radio-buttons'
import MatchTextField from '@/components/match-settings/match-text-field'
import MatchDateTime from '@/components/match-settings/match-date-time'
import MatchPlayerPicker from '@/components/match-settings/match-player-picker'
import moment from 'moment-timezone'

export default {
  name: 'MatchSettings',
  components: {
    MatchRadioButtons,
    MatchTextField,
    MatchDateTime,
    MatchPlayerPicker,
  },
  props: {
    matchName: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: moment().tz('Europe/Amsterdam').format('YYYY-MM-DD'),
    },
    time: {
      type: String,
      default: moment().tz('Europe/Amsterdam').format('HH:mm'),
    },
    player1: {
      type: Object,
      default: null,
    },
    player2: {
      type: Object,
      default: null,
    },
    bestOfSets: {
      type: Number,
      default: 1,
    },
    bestOfLegs: {
      type: Number,
      default: 1,
    },
    players: {
      type: Array,
      default: () => [],
    },
    disableEdit: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      required: true,
    },
    startPoints: {
      type: Number,
      default: 501,
    },
  },
  data() {
    return {
      bestOfArray: [1, 3, 5, 7, 9, 11, 13],
      bestOfSetsSet: 1,
      bestOfLegsSet: 1,
      startPointsSet: 501,
      error: false,
      message: [],
      timeSet: '',
      dateSet: '',
      matchNameSet: '',
      player1Set: null,
      player2Set: null,
    }
  },
  computed: {
    disabled() {
      if(!this.disableEdit) {
        return ((this.matchNameSet != '') &&
        (this.dateSet != '') &&
        (this.timeSet != '') &&
        (this.player1Set && typeof this.player1Set === 'object') &&
        (this.player2Set && typeof this.player2Set === 'object') &&
        !this.error) ? false : true
      } else {
        return ((this.matchNameSet != '') &&
        (this.dateSet != '') &&
        (this.timeSet != '') &&
        !this.error) ? false : true
      }
    },
  },
  watch: {
    matchName: {
      immediate: true,
      handler(val) {this.matchNameSet = val},
    },
    date: {
      immediate: true,
      handler(val) {this.dateSet = val},
    },
    time: {
      immediate: true,
      handler(val) {this.timeSet = val},
    },
    bestOfSets: {
      immediate: true,
      handler(val) {this.bestOfSetsSet = val},
    },
    bestOfLegs: {
      immediate: true,
      handler(val) {this.bestOfLegsSet = val},
    },
    startPoints: {
      immediate: true,
      handler(val) {this.startPointsSet = val},
    },
    player1Set: {
      handler: 'checkDoubleNames',
    },
    player2Set: {
      handler: 'checkDoubleNames',
    },
  },
  methods: {
    checkDoubleNames() {
      if(this.player1Set && this.player2Set && this.player1Set.fullName == this.player2Set.fullName) {
        this.error = true
        this.message = 'Spelernaam is al in gebruik.'
      } else {
        this.error = false
        this.message = []
      }
    },
    emitData() {
      this.$emit('click', {
        player1: this.player1Set,
        player2: this.player2Set,
        matchName: this.matchNameSet,
        time: this.timeSet, 
        date: this.dateSet,
        bestOfSets: this.bestOfSetsSet,
        bestOfLegs: this.bestOfLegsSet,
        startPoints: this.startPointsSet,
      })
    },
  },
}
</script>
