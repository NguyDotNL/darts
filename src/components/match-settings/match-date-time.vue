<template>
  <v-col cols="12" :md="6">
    <v-row>
      <v-col cols="12" :md="6">
        <v-menu
          ref="menu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="formattedDate"
              label="Datum"
              hint="DD/MM/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="date"
            locale="nl-nl"
            @input="dateMenu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" :md="6">
        <v-menu
          ref="menu"
          v-model="timeMenu"
          :close-on-content-click="false"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Tijd"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-time-picker
            v-model="time"
            format="24hr"
            @click:minute="$refs.menu.save(time)"
          />
        </v-menu>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'MatchDateTime',
  props: {
    defaultDate: {
      type: String,
      default: moment().tz('Europe/Amsterdam').format('YYYY-MM-DD'),
    },
    defaultTime: {
      type: String,
      default: moment().tz('Europe/Amsterdam').format('HH:mm'),
    },
  },
  data() {
    return {
      date: '',
      dateMenu: false,
      timeMenu: false,
      time: '',
      formattedDate: '',
    }
  },
  watch: {
    defaultDate: {
      immediate: true,
      handler: 'setDate',
    },
    date: {
      immediate: true,
      handler: 'setDate',
    },
    defaultTime: {
      immediate: true,
      handler(val) { this.time = val },
    },
    time() {
      this.$emit('time', this.time)
    },
  },
  methods: {
    setDate(val) {
      this.formattedDate = moment(val, 'YYYY-MM-DD').format('DD/MM/YYYY')
      this.date = val
      this.$emit('date', this.date)
    },
  },
}
</script>
