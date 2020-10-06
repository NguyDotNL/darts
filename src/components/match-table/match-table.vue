<template>
  <v-card>
    <v-card-title>
      Wedstrijden
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Zoeken"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      v-model="selected"
      :search="search"
      :headers="headers"
      :items="matches"
      item-key="id"
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
            <span>{{ row.item.name }}</span>
          </td>
          <td>
            <span>{{ row.item.players }}</span>
          </td>
          <td>
            <span>{{ row.item.sets }}</span>
          </td>
          <td>
            <span>{{ row.item.legs }}</span>
          </td>
          <td>
            <span>{{ row.item.bestOf }}</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
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
      search: '',
      headers: [
        {text: 'Wedstrijdnaam', align: 'left', value: 'name'},
        {text: 'Spelers', align: 'left', value: 'players'},
        {text: 'Sets', align: 'left', value: 'sets'},
        {text: 'Legs', align: 'left', value: 'legs'},
        {text: 'Best of', align: 'left', value: 'bestOf'},
      ],
      matches: [
        {
          id: 1,
          name: 'EK 2020 25/9 15:00',
          players: ['Michael van Gerwen', 'Raymond van Barneveld'],
          sets:[7, 3],
          legs:[],
          bestOf: '13',
        },
        {
          id: 2,
          name: 'EK 2020 25/9 15:01',
          players: ['Michael van Gerwen', 'Raymond van Barneveld'],
          sets:[7, 3],
          legs:[],
          bestOf: '13',
        },
        {
          id: 3,
          name: 'EK 2020 25/9 15:02',
          players: ['Michael van Gerwen', 'Raymond van Barneveld'],
          sets:[7, 3],
          legs:[],
          bestOf: '13',
        },
        {
          id: 4,
          name: 'EK 2020 25/9 15:03',
          players: ['Michael van Gerwen', 'Raymond van Barneveld'],
          sets:[7, 3],
          legs:[],
          bestOf: '13',
        },
        {
          id: 5,
          name: 'EK 2020 25/9 15:04',
          players: ['Michael van Gerwen', 'Raymond van Barneveld'],
          sets:[7, 3],
          legs:[],
          bestOf: '13',
        },
        {
          id: 6,
          name: 'EK 2020 25/9 15:05',
          players: ['Michael van Gerwen', 'Raymond van Barneveld'],
          sets:[7, 3],
          legs:[],
          bestOf: '13',
        },
      ],
    }
  },
  methods: {
    customMatchesSearch () {
      
    },
  },
}
</script>

