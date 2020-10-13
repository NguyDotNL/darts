<template>
  <div>
    <Appbar />
    <v-container>
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
              <v-col cols="5" sm="2" class="pr-0">
                <VBtn
                  class="bg-primary rounded-0"
                  dark
                  block
                  depressed
                >
                  Import
                </VBtn>
              </v-col>
              <v-col cols="5" sm="2" class="pl-0">
                <VBtn
                  :class=" selectedMatches.length < 1 ? 'bg-buttongray' : 'bg-primary'"
                  class="rounded-0 text-white"
                  style="margin-left: 1px"
                  block
                  depressed
                  :disabled="selectedMatches.length < 1"
                  :loading="exportingMatches"
                  @click="exportMatches"
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
              :loading="loading"
              :reset="resetSelection"
              @change-page="getPage($event)"
              @items-per-page="changeItemsPerPage"
              @selected-matches="selectedMatches = $event"
              @reset-finished="resetSelection = false"
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
  data: function() {
    return {
      search: '',
      matches: [],
      loading: true,
      itemsPerPage: 0,
      selectedMatches: [],
      resetSelection: false,
      exportingMatches: false,
    }
  },
  watch: {
    matches() {
      if(!this.matches.length > 0) return
      this.currentLocation = {
        firstArrayMatch: this.matches[0].date,
        lastArrayMatch: this.matches[this.matches.length - 1].date,
      }
    },
    search() {
      if(this.search.length > 3)  this.searchMatch()
      if(this.search.length === 0) this.page = 1, this.getPage()
    },
  },
  methods: {
    exportMatches() {
      if(this.selectedMatches.length < 1) {
        return
      }
      this.exportingMatches = true
      DashboardClient.exportMatches(this.selectedMatches).then(() => { 
        this.resetSelection = true
        this.exportingMatches = false
      })
    },
    changeItemsPerPage(pageInfo) {
      this.matches = []
      this.itemsPerPage = pageInfo
      this.getPage()
    },
    async getPage(obj = null) {
      this.loading = true
      if(obj == null) {
        this.getMatchData().then(data => {
          this.matches = data
          this.loading = false
        })
      } else {
        this.getMatchData(obj).then(data => {
          this.matches = data
          this.loading = false
        })
      }
    },
    async getMatchData(obj = null) {
      const type = (obj === null) ? false : obj.type
      const itemsPerPage = (obj === null) ? this.itemsPerPage : obj.itemsPerPage
      const location = (obj == null) ? false
        : (obj.page >= 1 && obj.type === 'prev') ? this.currentLocation.firstArrayMatch
          : (obj.page > 0 && obj.type === 'next') ? this.currentLocation.lastArrayMatch
            : false

      return await DashboardClient.getMatchesPerPage(itemsPerPage, location, type)
    },
    async searchMatch() {
      this.matches = []
      this.loading = true
      await DashboardClient.searchMatchesByName(this.search, this.itemsPerPage).then(data => {
        if(data.length > 0) this.matches = data
        else this.matches = []
        this.loading = false
      })
    },
  },
}
</script>
