<template>
  <div>
    <AppBar />
    <v-container class="overflow-hidden pt-0">
      <v-row>
        <v-col>
          <h1 class="text-3xl">Wedstrijd invullen</h1>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="d-flex">
          <span class="text-xl float-left align-center d-inline-flex">Set</span>
          <v-pagination
            v-model="set"
            :length="13"
            class="d-inline-flex align-start"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col class="d-flex">
          <span class="text-xl float-left align-center d-inline-flex">Leg</span>
          <v-pagination
            v-model="leg"
            :length="3"
            class="d-inline-flex align-start"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="playerSelected"
            :items="['Player1', 'Player2']"
            label="Speler"
            outlined
          />
        </v-col>
        <v-col class="align-center justify-center flex text-2xl">
          Beurt: 1
        </v-col>
        <v-col class="align-center justify-center flex text-2xl">
          Punten: 501
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Worp
                  </th>
                  <th class="text-left">
                    Type
                  </th>
                  <th class="text-left">
                    Beurt punten
                  </th>
                  <th class="text-left">
                    Totaal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in turns"
                  :key="item.name"
                >
                  <td>{{ item.turn }}</td>
                  <td>{{ item.type }}</td>
                  <td>{{ item.points }}</td>
                  <td>{{ item.total }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-end flex-column">
          <v-btn
            elevation="2"
            tile
            dark
            class="bg-primary"
          >
            Volgende speler
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppBar from '@/components/app-bar/app-bar'
import MatchClient from '@/clients/match.client'

export default {
  name: 'FillInMatch',
  components: {
    AppBar,
  },
  data: function () {
    return {
      loading: true,
      matchData: {
        match: null,
        matchDetails: null,
      },
      matchId: this.$route.params.id,
      set: 1,
      leg: 1,
      playerSelected: 'Player1',
      turns: [
        {
          turn: 0,
          type: 1,
          points: 20,
          total: 501,
        },
      ],
    }
  },
  mounted() {
    this.setRtMatchData(this.$route.params.id)
  },
  beforeDestroy() {
    this.destroyRtMatchData(this.matchId)
  },
  methods: {
    destroyRtMatchData(id) {
      MatchClient.rtMatchAndDetailsOff(id)
    },
    setRtMatchData(id) {
      MatchClient.getRtMatch(id, snapshot => {
        this.matchData.match = snapshot.val()
      })

      MatchClient.getRtMatchDetails(id, snapshot => {
        this.loading = false
        this.matchData.matchDetails = snapshot.val()
      })
    },
  },
}
</script>
