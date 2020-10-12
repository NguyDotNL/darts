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
        :page="page"
        @prev="getPage"
        @next="getPage"
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
          value: 'firstName',
        },
        {
          text: 'Achternaam',
          value: 'lastName',
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
    items() {
      if(!this.items && this.search) return
      this.backup = {
        FirstArrayName: this.items[0].firstName.toString(),
        LastArrayName: this.items[this.items.length - 1].firstName.toString(), 
      }
    },
    search() {
      if(this.search.length > 0) this.searchPlayer()
      else this.page = 1, this.getPage()
    },
    itemsPerPage() {
      this.page = 1, this.getPage()
    },
  },
  mounted () {
    this.getPage()
  },
  methods: {
    async getPage(obj = null) {
      this.loading = true
      if(obj == null) {
        this.getPlayersData().then(data => {
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
      if(obj == null) return await PlayersClient.getPlayers(this.itemsPerPage)
      else if(obj.page >= 1 && obj.type == 'prev') return await PlayersClient.getPlayers(obj.itemsPerPage, this.backup.FirstArrayName, obj.type)
      else if(obj.page > 0 && obj.type == 'next') return await await PlayersClient.getPlayers(obj.itemsPerPage, this.backup.LastArrayName, obj.type)
    },
    changeItemsPerPage(val) {
      this.itemsPerPage = val
    },
    async searchPlayer() {
      await PlayersClient.searchPlayers(this.search).then(data => {
        if(data) this.items = data
      })
    },
    rowLink(data) {
      this.$router.push('/spelers/' + data.playerId)
    },
  },
}
</script>
