<template>
  <v-col cols="12" :md="6">
    <v-row>
      <v-col cols="12" :md="6">
        <v-menu
          ref="menu"
          v-model="dateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Datum"
              hint="DD/MM/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              @blur="date = parseDate(dateFormatted)"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="date"
            no-title
            @input="dateMenu = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" :md="6">
        <v-menu
          ref="menu"
          v-model="timeMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
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
            v-if="timeMenu"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
          />
        </v-menu>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>

export default {
  name: 'MatchDateTime',
  props: {
    defaultTime: {
      type: String,
      default: '12:34',
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      timeMenu: false,
      time: this.defaultTime,
    }
  },
  computed: {
    dateFormatted () {
      return this.formatDate(this.date)
    },
  },
  watch: {
    dateFormatted() {
      this.$emit('date', this.dateFormatted)
    },
    time() {
      this.$emit('time', this.time)
    },
  },
  methods: {
    formatDate(date) {
      if(!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if(!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
