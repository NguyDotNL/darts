<template>
  <div>
    <AppBar />
    <v-container class="overflow-hidden pt-0">
      <v-row>
        <v-col>
          <h1 class="text-4xl">Spelers</h1>
        </v-col>
      </v-row>
      <PlayersTable
        :items="items"
        :page="page"
        :items-per-page="itemsPerPage"
        :loading="loading"
        @search="search"
      />
      <DataTableFooter
        :items-length="items.length"
        :items-per-page="itemsPerPage"
        :page="page"
        @prev="getPage"
        @next="getPage"
        @changeItemsPerPage="itemsPerPage = $event"
      />
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/app-bar/app-bar'
import PlayersClient from '@/clients/players.client'
import PlayersTable from '@/components/players-table/players-table'
import DataTableFooter from '@/components/data-table-footer/data-table-footer'

export default {
  name: 'Players',
  components: {
    AppBar,
    PlayersTable,
    DataTableFooter,
  },
  data() {
    return {
      items: [],
      itemsPerPage: 10,
      page: 1,
      loading: true,
    }
  },
  watch: {
    items() {
      if(!this.items?.length > 0 && this.search) return
      this.backup = {
        firstArrayName: this.items[0].firstName.toString(),
        lastArrayName: this.items[this.items.length - 1].firstName.toString(), 
      }
    },
    itemsPerPage() {
      this.page = 1
      this.getPage()
    },
  },
  mounted() {
    this.getPage()
  },
  methods: {
    search(val) {
      if(val) this.searchPlayer(val)
      else this.page = 1, this.getPage()
    },
    async getPage(obj = null) {
      this.loading = true
      if(obj == null) {
        this.getPlayersData(obj).then(data => {
          this.items = data
          this.loading = false
        })
      } else {
        this.page = obj.page
        this.getPlayersData(obj).then(data => {
          this.items = data
          this.loading = false
        })
      }
    },
    async getPlayersData(obj = null) {
      const type = (obj === null) ? false : obj.type
      const itemsPerPage = (obj === null) ? this.itemsPerPage : obj.itemsPerPage
      const location = (obj === null) ? false 
        : (obj.page >= 1 && obj.type === 'prev') ? this.backup.firstArrayName 
          : (obj.page > 0 && obj.type === 'next') ? this.backup.lastArrayName
            : false

      return await PlayersClient.getPlayers(itemsPerPage, location, type)
    },
    async searchPlayer(val) {
      await PlayersClient.searchPlayers(val.toLowerCase()).then(data => {
        if(data) this.items = data
      })
    },
  },
}
</script>
