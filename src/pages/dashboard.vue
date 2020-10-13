<template>
  <div>
    <Appbar />
    <v-container>
      <v-row>
        <v-col offset="1" cols="10">
          <v-alert
            v-if="uploaded != null"
            :type="uploaded.success == 0 ? 'error' : 'success' "
            dismissible
            @input="uploaded = undefined"
          >
            {{ uploaded.found }} wedstrijd(en) gevonden waarvan {{ uploaded.success }} zijn opgeslagen, {{ uploaded.error }} wedstrijd(en) waren ongeldig.
          </v-alert>
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
                <input
                  ref="fileUpload"
                  type="file"
                  class="hidden"
                  accept=".json"
                  @change="uploadMatches"
                >
                <VBtn
                  class="bg-primary rounded-0"
                  dark
                  block
                  depressed
                  @click="$refs.fileUpload.click()"
                >
                  Import
                </VBtn>
              </v-col>
              <v-col cols="5" sm="2" class="pl-0">
                <VBtn
                  class="bg-buttongray rounded-0"
                  dark
                  block
                  depressed
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
      uploaded: undefined,
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
    uploadMatches: async function(event) {
      let reader = new FileReader()
      reader.readAsText(event.target.files[0])
      reader.onload = async (event) => { 
        const obj = JSON.parse(event.target.result)
        this.uploaded = await DashboardClient.uploadMatches(obj)
        this.getPage()
      }
    },
    exportMatches() {
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
        this.page = obj.page
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
