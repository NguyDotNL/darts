<template>
  <v-row>
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
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :loading="loading"
            loading-text="Loading... Please wait"
            hide-default-footer
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center d-flex align-center justify-end">
          <v-btn
            class="mr-2"
            depressed
            :disabled="page == 1"
            @click="prevPage()"
          >
            Vorige
          </v-btn>
          <span>{{ page }}</span>
          <v-btn
            class="ml-2"
            depressed
            @click="nextPage()"
          >
            Volgende
          </v-btn>
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
      itemsPerPage: 20,
      page: 1,
    }
  },
  mounted () {
    this.getStartPage().then(obj => {
      this.convertToArray(obj)
    })
  },
  methods: {
    getStartPage: async function() {
      return await PlayersClient.getAllPlayers(this.itemsPerPage)
    },
    prevPage: async function() {
      if(this.page > 1) {
        this.page--
        this.loading = true
        // await this.convertToArray(PlayersClient.getPlayersByNextPage(this.itemsPerPage, this.items[this.itemsPerPage - 1].full_name).then(data => { return data }))
      }
    },
    nextPage: async function() {
      if(this.page > 0) {
        this.page++
        this.loading = true
        console.log(this.items[this.itemsPerPage - 1].full_name.toString())
        await PlayersClient.getPlayersByNextPage(this.itemsPerPage, this.items[this.itemsPerPage - 1].full_name.toString()).then(data => {
          this.convertToArray(data)
        })
      }
    },
    convertToArray: function(data) {
      const newItems = []
      Object.values(data).map((player) => {
        const full_name = player.playerName.split(' ')
        newItems.push({
          playerId: player.playerId,
          full_name: player.playerName,
          first_name: full_name[0],
          last_name: full_name[1] + ' ' +(full_name[2] ? full_name[2]: ''),
        })
      })
      this.items = newItems
      this.loading = false
    },
  },
}
</script>
