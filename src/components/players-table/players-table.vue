<template>
  <v-row>
    <v-col>
      <v-row class="overflow-y-auto" style="max-height: calc(100vh - 260px)">
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
              <VDataTable
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
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <DataTableFooter
        :items-length="items.length"
        :items-per-page="itemsPerPage"
        @prev="prevPage"
        @next="nextPage"
        @changeItemsPerPage="changeItemsPerPage"
      />
    </v-col>
  </v-row>
</template>

<script>
import PlayersClient from '@/clients/players.client'
import DataTableFooter from '@/components/data-table-footer/data-table-footer'

export default {
  name: 'PlayersTable',
  components: {
    DataTableFooter,
  },
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
    prevPage: async function (obj) {
      if(obj.page > 0) {
        this.loading = true
        this.page = obj.page
        await PlayersClient.getPrevPlayersPage(obj.itemsPerPage, this.backup.FirstArrayName).then(data => {
          this.convertToArray(data)
        })
      }
    },
    nextPage: async function (obj) {
      if(obj.page > 0) {
        this.loading = true
        this.page = obj.page
        await PlayersClient.getNextPlayersPage(obj.itemsPerPage, this.backup.LastArrayName).then(data => {
          this.convertToArray(data)
        })
      }
    },
    changeItemsPerPage: function (val) {
      this.itemsPerPage = val
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
  },
}
</script>
