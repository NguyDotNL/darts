<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        v-model="selected"
        data-testid="match-table"
        :headers="headers"
        :items="matchesArray || []"
        item-key="matchId"
        :show-select="matchExport"
        :loading="loading || isLoadingData"
        loading-text="Bezig met het ophalen van data"
        disable-sort
        hide-default-footer
        :page.sync="page"
        :items-per-page.sync="numberOfItemsPerPage"
        :custom-filter="customMatchSearch"
        class="overflow-y-auto"
        style="max-height: 650px"
        @page-count="pageCount = $event"
      >
        <template v-slot:item="row">
          <tr>
            <td>
              <v-checkbox
                v-model="selected"
                :value="row.item"
              />
            </td>
            <td>
              <span class="block">{{ row.item.matchName }}</span>
              <span>{{ showDate(row.item.date) }}</span>
            </td>
            <td>
              <ul>
                <li
                  v-for="(player, key) in row.item.players"
                  :key="key"
                  class="font-medium flex"
                  style="align-items: center"
                  :class="key === row.item.winner ? 'text-success' : 'text-danger'"
                >
                  <span style="margin-right: 1px;">{{ player.playerName }}</span>
                  <Match9Darter
                    v-if="player.statistics['9Dart'] >= 1"
                    width="15"
                    height="16"
                  />
                </li>
              </ul>
            </td>
            <td>
              <ul v-if="row.item.bestOfSets !== 1">
                <li
                  v-for="(player, key) in row.item.players"
                  :key="key"
                  class="font-medium"
                  :class="key === row.item.winner ? 'text-success' : 'text-danger'"
                >
                  {{ player.statistics.setsWon }}
                </li>
              </ul>
            </td>
            <td>
              <ul v-if="row.item.bestOfSets === 1">
                <li
                  v-for="(player, key) in row.item.players"
                  :key="key"
                  class="font-medium"
                  :class="key === row.item.winner ? 'text-success' : 'text-danger'"
                >
                  {{ player.statistics.legsWon }}
                </li>
              </ul>
            </td>
            <td>
              <span>{{ row.item.bestOfSets !== 1 ? row.item.bestOfSets + ' Sets' : row.item.bestOfLegs + ' Legs' }}</span>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-row>
        <v-spacer />
        <v-col>
          <div class="flex">
            <v-btn :disabled="page === 1" class="m-1" @click="previousPage">
              previous
            </v-btn>
            <v-btn class="v-pagination__item v-pagination__item--active primary m-1">
              {{ page }}
            </v-btn>
            <v-btn class="m-1" @click="nextPage">
              next
            </v-btn>
          </div>
        </v-col>
        <v-spacer />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import Match9Darter from '@/components/9-darter/match-9-darter'
import DashboardClient from '@/clients/dashboard.client'
import last from 'lodash/last'

export default {
  name: 'MatchTable',
  components: {Match9Darter},
  props: {
    matchExport: {
      type: Boolean,
      default: true,
    },
    matches: {
      type: [Object, Array],
      required: false,
    },
    loading: Boolean,
    search: String,
  },
  data: function () {
    return {
      selected: [],
      headers: [
        {text: 'Wedstrijdnaam', align: 'left'},
        {text: 'Spelers', align: 'left'},
        {text: 'Sets', align: 'left'},
        {text: 'Legs', align: 'left'},
        {text: 'Best of', align: 'left'},
      ],
      matchesArray: [],
      page: 1,
      lastPage: 0,
      pageCount: 0,
      numberOfItemsPerPage: 10,
      pageStack: [],
      pageData: {},
      isLoadingData: false,
    }
  },
  watch: {
    matches() {
      const matches = Object.values(this.matches)
      this.matchesArray = matches
      this.pageStack.push(last(matches).date)
      this.pageData = { ...this.pageData, [this.page]: matches }
    },
  },
  methods: {
    showDate(value) {
      return moment(value, 'X').format('DD-MM HH:mm')
    },
    customMatchSearch () {
      // if(this.search.length >= 4){
      //
      // }
    },
    nextPage: async function() {
      this.isLoading = true
      this.page = this.page + 1
      const date = last(this.pageStack)

      const matches = this.pageData[this.page] != null
        ? this.pageData[this.page]
        : await DashboardClient.getMatchesPerPage(this.numberOfItemsPerPage, date)
      this.pageStack.push(last(matches).date)
      this.matchesArray = matches
      this.pageData = { ...this.pageData, [this.page]: matches }
      this.isLoading = false
    },
    previousPage() {
      this.page = this.page - 1
      this.pageStack.pop()
      this.matchesArray = Object.values(this.pageData[this.page])
    },
  },
}
</script>

