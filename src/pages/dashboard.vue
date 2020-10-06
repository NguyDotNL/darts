<template>
  <div>
    <Appbar />
    <v-row>
      <v-col offset="1" cols="10">
        <v-card class="shadow-none">
          <v-card-title>
            Wedstrijden
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Zoeken"
              single-line
              hide-details
            />
          </v-card-title>
          <match-table />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import MatchTable from '@/components/match-table/match-table'

export default {
  name: 'Dashboard',
  components: {
    MatchTable,
    Appbar,
  },
  data: function () {
    return {
      search: '',
    }
  },
}
</script>
