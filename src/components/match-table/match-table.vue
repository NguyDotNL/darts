<template>
  <v-data-table
    v-model="selected"
    data-testid="match-table"
    :headers="headers"
    :items="matches"
    item-key="matchId"
    :show-select="matchExport"
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
              <svg
                v-if="player.statistics['9Dart'] >= 1"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="16"
                viewBox="0 0 35 38"
              >
                <g id="Group_32" data-name="Group 32" transform="translate(-828 -399)">
                  <g
                    id="Ellipse_1"
                    data-name="Ellipse 1"
                    transform="translate(828 401)"
                    fill="#fbd722"
                    stroke="#707070"
                    stroke-width="4"
                  >
                    <ellipse
                      cx="17.5"
                      cy="18"
                      rx="17.5"
                      ry="18"
                      stroke="none"
                    />
                    <ellipse
                      cx="17.5"
                      cy="18"
                      rx="15.5"
                      ry="16"
                      fill="none"
                    />
                  </g>
                  <text
                    id="_9"
                    data-name="9"
                    transform="translate(838 430)"
                    fill="#484848"
                    font-size="29"
                    font-family="SegoeUI-Semibold, Segoe UI"
                    font-weight="600"
                  ><tspan x="0" y="0">9</tspan></text>
                </g>
              </svg>
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
          <span>{{ row.item.bestOfSets !== '1 sets' ? row.item.bestOfSets : row.item.bestOfLegs }}</span>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MatchTable',
  props: {
    matchExport: {
      type: Boolean,
      default: true,
    },
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
      matches: [
        {
          matchId: 1,
          matchName: 'EK 2020 ',
          date: '25-09-2020 15:00',
          bestOfSets: '1 sets',
          bestOfLegs: '17 legs',
          startPoints: 501,
          winner: '10',
          players: {
            '10':{
              playedSets: 12,
              playerName: 'Michael van Gerwen',
              statistics: {
                legsWon: 8,
                setsWon: 7,
                180: 5,
                '9Dart': 1,
              },
            },
            '2':{
              playedSets: 12,
              playerName: 'Raymond van Barneveld',
              statistics: {
                legsWon: 5,
                setsWon: 5,
                180: 3,
                '9Dart': 0,
              },
            },
          },
        },
        {
          matchId: 2,
          matchName: 'EK 2020 ',
          date: '25-09-2020 16:00',
          bestOfSets: '1 sets',
          bestOfLegs: '17 legs',
          startPoints: 501,
          winner: '10',
          players: {
            '10':{
              playedSets: 12,
              playerName: 'Michael van Gerwen',
              statistics: {
                legsWon: 8,
                setsWon: 7,
                180: 5,
                '9Dart': 1,
              },
            },
            '2':{
              playedSets: 12,
              playerName: 'Raymond van Barneveld',
              statistics: {
                legsWon: 5,
                setsWon: 5,
                180: 3,
                '9Dart': 0,
              },
            },
          },
        },
      ],
    }
  },
  methods: {
    customMatchesSearch () {

    },
    showDate(value){
      return moment(value, 'DD-MM-YYYY hh:mm').format('DD-MM HH:mm')
    },
  },
}
</script>

