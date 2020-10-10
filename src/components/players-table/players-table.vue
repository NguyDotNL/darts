<template>
  <v-row class="overflow-y-auto" style="max-height: calc(100vh - 150px)">
    <v-col>
      <v-row>
        <v-col>
          <VTextField
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            class="p-0"
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :loading="loading"
            disable-sort
            fixed-header
            loading-text="Loading... Please wait"
            hide-default-footer
            style="max-height: calc(100vh-150px);"
            @click:row="rowLink"
          >
            <template v-slot:footer>
              <div class="text-center d-flex align-center justify-end">
                <div class="whitespace-no-wrap d-flex align-center justify-end mr-3 text-xs">
                  Rows per page:
                  <v-select
                    v-model="itemsPerPage"
                    class="ml-5"
                    style="flex: 0 1 0 !important;"
                    :items="itemsPerPageArray"
                    :full-width="false"
                    @change="changeItemsPerPage"
                  />
                </div>
                <span class="ml-5 mr-5 text-sm">{{ page }}</span>
                <v-btn
                  icon
                  depressed
                  :disabled="page == 1"
                  @click="prevPage()"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  icon
                  depressed
                  :disabled="items.length < itemsPerPage"
                  @click="nextPage()"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import PlayersClient from '@/clients/players.client'

export default {
  name: 'Table',
  data: function () {
    return {
      headers: [
        {
          text: 'Voornaam',
          align: 'start',
          value: 'first_name',
        },
        {
          text: 'Achternaam',
          value: 'last_name',
        },
      ],
      loading: true,
      search: '',
      items: [],
      backup: {},
      itemsPerPageArray: [5, 10, 15, 20],
      itemsPerPage: 10,
      page: 1,
    }
  },
  watch: {
    items: function () {
      if(!this.items & this.search) return
      this.backup = {
        FirstArrayName: this.items[0].full_name.toString(),
        LastArrayName: this.items[this.items.length - 1].full_name.toString(), 
      }
    },
    search: function () {
      if(this.search.length > 0) this.searchPlayer()
      else this.getStartPage()
    },
    itemsPerPage: function () {
      this.getStartPage()
    },
  },
  mounted () {
    this.getStartPage()
  },
  methods: {
    getStartPage: async function () {
      return await PlayersClient.getLoadingPlayersPage(this.itemsPerPage).then(obj => {
        this.convertToArray(obj)
      })
    },
    prevPage: async function () {
      if(this.page > 1) {
        this.page--
        this.loading = true
        await PlayersClient.getPrevPlayersPage(this.itemsPerPage, this.backup.FirstArrayName).then(data => {
          this.convertToArray(data)
        })
      }
    },
    nextPage: async function () {
      if(this.page > 0) {
        this.page++
        this.loading = true
        await PlayersClient.getNextPlayersPage(this.itemsPerPage, this.backup.LastArrayName).then(data => {
          this.convertToArray(data)
        })
      }
    },
    searchPlayer: async function () {
      await PlayersClient.searchPlayers(this.search).then(data => {
        if(data) this.convertToArray(data)
      })
    },
    convertToArray: function (data) {
      const newItems = Object.values(data).map((player) => {
        const full_name = player.playerName.split(' ')
        return {
          playerId: player.playerId,
          full_name: player.playerName,
          first_name: full_name[0],
          last_name: full_name[1] + ' ' +(full_name[2] ? full_name[2]: ''),
        }
      })
      this.items = newItems
      this.loading = false
    },
    rowLink: function (data) {
      this.$router.push('/spelers/' + data.playerId)
    },
    changeItemsPerPage(val) {
      this.itemsPerPage = val
    },
  },
}
</script>
