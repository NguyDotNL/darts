<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden">
      <v-row>
        <v-col offset="1" cols="10">
          <v-card class="shadow-none">
            <v-card-title class="px-0">
              Wedstrijden
              <VSpacer />
              <VTextField
                v-model="search"
                append-icon="mdi-magnify"
                label="Zoeken"
                single-line
                hide-details
              />
            </v-card-title>
            <v-row>
              <v-col cols="2" class="pr-0">
                <VBtn
                  class="bg-primary rounded-0"
                  dark
                  block
                  depressed
                >
                  Import
                </VBtn>
              </v-col>
              <v-col cols="2" class="pl-0">
                <VBtn
                  class="bg-buttongray rounded-0"
                  dark
                  block
                  depressed
                >
                  Export
                </VBtn>
              </v-col>
              <VSpacer />
              <router-link to="/wedstrijd/toevoegen">
                <VIcon
                  x-large
                >
                  mdi-plus
                </VIcon>
              </router-link>
            </v-row>
            <MatchTable 
              :matches="matches"
              :search="search"
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
    }
  },
  beforeMount() {
    this.getMatchData()
  },
  methods: {
    getMatchData:async function (){
      DashboardClient.getMatchesPerPage(10).then((data) => { this.matches = data })
    },
  },
}
</script>
