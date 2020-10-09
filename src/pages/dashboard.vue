<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden">
      <v-row>
        <v-col offset="1" cols="10">
          <v-card class="shadow-none">
            <v-card-title>
              Wedstrijden
              <VSpacer />
              <VTextField
                v-model="search"
                append-icon="mdi-magnify"
                label="Zoeken"
                single-line
                hide-details
                @change="handleSearch"
              />
            </v-card-title>
            <MatchTable
              :matches="matches"
              :search="search"
              :loading="loading"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import MatchTable from '@/components/match-table/match-table'
import DashboardClient from '@/clients/dashboard.client'

export default {
  name: 'Dashboard',
  components: {
    MatchTable,
    Appbar,
  },
  data: function () {
    return {
      search: '',
      matches: {},
      loading: true,
    }
  },
  beforeMount() {
    this.getMatchData()
  },
  methods: {
    getMatchData() {
      DashboardClient.getMatchesPerPage(10).then((data) => { 
        this.matches = data
        this.loading = false
      })
    },
  },
}
</script>
