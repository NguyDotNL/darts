<template>
  <v-row dense>
    <v-col>
      <v-row dense>
        <v-col class="text-end">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                class="text-gray-800 mr-3"
                v-bind="attrs"
                v-on="on"
              >
                mdi-cog
              </v-icon>
            </template>
            <span>Wedstrijd instellingen</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                class="text-primary mr-3"
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil-outline
              </v-icon>
            </template>
            <span>Wedstrijd worpen aanpassen</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                large
                class="text-iconred"
                v-bind="attrs"
                v-on="on"
              >
                mdi-trash-can-outline
              </v-icon>
            </template>
            <span>Wedstrijd verwijderen</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="text-center font-bold text-2xl pb-0">
          WK 2020
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="block font-bold text-h6">
            Michael van Gerwen
            <NineDarterIcon />
          </div>
          <div class="block text-uppercase text-xs font-bold">Winnaar</div>
        </v-col>
        <v-col class="text-center font-bold text-4xl text-no-wrap">
          7 VS 3
        </v-col>
        <v-col class="text-end">
          <div class="block font-bold text-h6">Raymond van Barneveld</div>
          <div class="block text-uppercase text-xs font-bold" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import NineDarterIcon from '@/components/9-darter/9-darter-icon'

export default {
  name: 'MatchStatisticsHeader',
  components: {
    NineDarterIcon,
  },
  data: function () {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Wedstrijd',
          disabled: false,
          href: '/',
        },
        {
          text: 'WK 2020',
          disabled: true,
          href: '',
        },
      ],
    }
  },
}
</script>
