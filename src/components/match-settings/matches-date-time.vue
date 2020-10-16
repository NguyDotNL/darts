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
              v-model="dateFormatted"
              label="Datum"
              hint="DD/MM/YYYY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              @blur="date = parseDate(dateFormatted)"
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

export default {
  name: 'MatchDateTime',
  props: {
    defaultDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
    defaultTime: {
      type: String,
      default: '12:34',
    },
  },
  data() {
    return {
      date: this.defaultDate,
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
  mounted() {
    this.$emit('date', this.dateFormatted)
    this.$emit('time', this.time)
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
