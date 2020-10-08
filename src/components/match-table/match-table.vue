<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        v-model="selected"
        data-testid="match-table"
        :headers="headers"
        :items="matchesArray"
        item-key="matchId"
        :show-select="matchExport"
        :loading="loading"
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
          <v-pagination
            v-model="page"
            :length="100"
            :total-visible="1"
            @next="nextPage"
            @previous="previousPage"
          />
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

export default {
  name: 'MatchTable',
  components: {Match9Darter},
  props: {
    matchExport: {
      type: Boolean,
      default: true,
    },
    matches: Object,
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
    }
  },
  watch:{
    matches(value){
      this.matchesArray = Object.values(value)
      this.pageStack.push(this.matchesArray[this.matchesArray.length - 1].date)
    },
  },
  methods: {
    showDate(value){
      return moment(value, 'X').format('DD-MM HH:mm')
    },
    customMatchSearch () {
      // if(this.search.length >= 4){
      //
      // }
    },
    nextPage(){
      this.getMatchData(this.pageStack[this.pageStack.length - 1]).then((data) => {
        console.log(data.sort((a,b) => a.date < b.date))
        let temp = data.sort((a,b) => a.date < b.date)
        this.matchesArray = temp
        this.pageStack.push(temp[temp.length - 1].date)
      })
    },
    previousPage(){
      this.pageStack.pop()
      this.getMatchData(this.pageStack[this.pageStack.length - 1]).then((data) => {
        this.matchesArray = data
      })
    },
    getMatchData:async function (date){
      return await DashboardClient.getMatchesPerPage(this.numberOfItemsPerPage, date).then((data) => Object.values(data))
    },
  },
}
</script>

