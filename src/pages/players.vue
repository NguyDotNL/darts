<template>
  <div>
    <Appbar />
    <v-container class="overflow-hidden pt-0">
      <v-row>
        <v-col>
          <h1 class="text-4xl">Spelers</h1>
        </v-col>
      </v-row>
      <PlayersTable />
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import PlayersTable from '@/components/players-table/players-table'

export default {
  name: 'Players',
  components: {
    Appbar,
    PlayersTable,
  },
}
</script>
