<template>
  <v-row>
    <v-col cols="12">
      <VDataTable
        :headers="headers"
        :items="matches || []"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        data-testid="match-table"
        item-key="matchId"
        :show-select="matchExport"
        :loading="loading || isLoadingData"
        loading-text="Bezig met het ophalen van data"
        no-data-text="Geen wedstrijden gevonden"
        disable-sort
        hide-default-footer
        class="overflow-y-auto"
        style="max-height: calc(100vh - 350px);"
        @toggle-select-all="toggleSelectAllMatches"
      >
        <template v-slot:item="row">
          <tr>
            <td v-if="matchExport">
              <v-checkbox
                :key="row.item.matchId"
                v-model="selected"
                :value="row.item.matchId"
              />
            </td>
            <td @click="rowLink(row.item.matchId)">
              <span class="block">{{ row.item.matchName }}</span>
              <span>{{ showDate(row.item.date) }}</span>
            </td>
            <td @click="rowLink(row.item.matchId)">
              <ul>
                <li
                  v-for="(player, key) in row.item.players"
                  :key="key"
                  class="font-medium flex"
                  style="align-items: center"
                  :class="!row.item.winner ? '' : key === row.item.winner ? 'text-success' : 'text-danger'"
                >
                  <span style="margin-right: 1px;">{{ player.playerName }}</span>
                  <NineDarterIcon
                    v-if="player.statistics['9Dart'] >= 1"
                  />
                </li>
              </ul>
            </td>
            <td @click="rowLink(row.item.matchId)">
              <ul v-if="row.item.bestOfSets !== 1">
                <li
                  v-for="(player, key) in row.item.players"
                  :key="key"
                  class="font-medium"
                  :class="!row.item.winner ? '' : key === row.item.winner ? 'text-success' : 'text-danger'"
                >
                  {{ player.statistics.setsWon }}
                </li>
              </ul>
            </td>
            <td @click="rowLink(row.item.matchId)">
              <ul v-if="row.item.bestOfSets === 1">
                <li
                  v-for="(player, key) in row.item.players"
                  :key="key"
                  class="font-medium"
                  :class="!row.item.winner ? '' : key === row.item.winner ? 'text-success' : 'text-danger'"
                >
                  {{ player.statistics.legsWon }}
                </li>
              </ul>
            </td>
            <td @click="rowLink(row.item.matchId)">
              <span>{{ row.item.bestOfSets !== 1 ? row.item.bestOfSets + ' Sets' : row.item.bestOfLegs + ' Legs' }}</span>
            </td>
          </tr>
        </template>
      </VDataTable>
      <DataTableFooter 
        :items-length="matches.length"
        :items-per-page="itemsPerPage"
        :page="page"
        @prev="getPage"
        @next="getPage"
        @changeItemsPerPage="itemsPerPage = $event"
      />
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import DashboardClient from '@/clients/dashboard.client'
import DataTableFooter from '@/components/data-table-footer/data-table-footer'
import NineDarterIcon from '@/components/9-darter/9-darter-icon'

export default {
  name: 'MatchTable',
  components: { NineDarterIcon, DataTableFooter },
  props: {
    matchExport: {
      type: Boolean,
      default: true,
    },
    search: String,
  },
  data: function () {
    return {
      headers: [
        { text: 'Wedstrijdnaam', align: 'left' },
        { text: 'Spelers', align: 'left' },
        { text: 'Sets', align: 'left' },
        { text: 'Legs', align: 'left' },
        { text: 'Best of', align: 'left' },
      ],
      selected: [],
      unselectedList: [],
      matches: [],
      itemsPerPage: 10,
      currentLocation: {},
      isLoadingData: false,
      page: 1,
      loading: true,
      selectAllMatches: false,
    }
  },
  watch: {
    matches() {
      console.log(this.matches)
      if(!this.matches.length > 0 && this.search) return
      if(this.unselectedList) this.selected = this.matches.map(x => x.matchId)
      this.currentLocation = {
        firstArrayMatch: this.matches[0].date,
        lastArrayMatch: this.matches[this.matches.length - 1].date,
      }
    },
    search() {
      if(this.search.length > 3) this.searchMatch()
      if(this.search.length === 0) this.page = 1, this.getPage()
    },
    itemsPerPage() {
      this.page = 1
      this.getPage()
    },
  },
  mounted () {
    this.getPage()
  },
  methods: {
    toggleSelectAllMatches(toggleAll) {
      this.selectAllMatches = toggleAll
    },
    rowLink(matchId) {
      this.$router.push('/wedstrijd/' + matchId)
    },
    showDate(value) {
      return moment(value, 'X').format('DD-MM HH:mm')
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
      if(obj == null) return await DashboardClient.getMatchesPerPage(this.itemsPerPage)
      else if(obj.page >= 1 && obj.type === 'prev') return await DashboardClient.getMatchesPerPage(obj.itemsPerPage, this.currentLocation.firstArrayMatch, obj.type)
      else if(obj.page > 0 && obj.type === 'next') return await DashboardClient.getMatchesPerPage(obj.itemsPerPage, this.currentLocation.lastArrayMatch, obj.type)
    },
    async searchMatch() {
      await DashboardClient.searchMatchesByName(this.search, this.itemsPerPage).then(data => {
        if(data.length > 0) this.matches = data
        else this.matches = []
      })
    },
  },
}
</script>

