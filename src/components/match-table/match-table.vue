<template>
  <v-row>
    <v-col cols="12">
      <VDataTable
        v-model="selected"
        :headers="headers"
        :items="matches"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        data-testid="match-table"
        item-key="matchId"
        :show-select="matchExport"
        :loading="loading"
        loading-text="Bezig met het ophalen van data"
        no-data-text="Geen wedstrijden gevonden"
        disable-sort
        hide-default-footer
        class="overflow-y-auto"
        style="max-height: calc(100vh - 350px);"
      >
        <template v-slot:item="row">
          <tr>
            <td v-if="matchExport">
              <v-checkbox
                :key="row.item.matchId"
                v-model="selected"
                :value="row.item"
                :value-comparator="checkSelected"
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
        @prev="$emit('change-page', $event)"
        @next="$emit('change-page', $event)"
        @changeItemsPerPage="itemsPerPage = $event"
      />
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
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
    matches: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
    },
    reset: Boolean,
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
      itemsPerPage: 10,
      currentLocation: {},
      page: 1,
    }
  },
  watch: {
    itemsPerPage: {
      immediate: true,
      handler: 'sendItemsPerPage',
    },
    selected (selectedMatches) {
      const selectedMatchIds = selectedMatches.map(x => x.matchId)
      this.$emit('selected-matches', selectedMatchIds)
    },
    reset () {
      this.selected = []
      this.$emit('reset-finished')
    },
  },
  methods: {
    checkSelected (a, b) {
      return a.matchId === b.matchId
    },
    sendItemsPerPage() {
      this.$emit('items-per-page', this.itemsPerPage)
      this.page = 1
    },
    rowLink(matchId) {
      this.$router.push('/wedstrijd/' + matchId)
    },
    showDate(value) {
      return moment(value, 'X').format('DD-MM HH:mm')
    },
  },
}
</script>

