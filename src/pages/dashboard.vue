<template>
  <div>
    <Appbar />
    <v-row>
      <v-col offset="2">
        <match-table />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import MatchTable from '@/components/match-table/match-table'

export default {
  name: 'Dashboard',
  components: {
    MatchTable,
    Appbar,
  },
}
</script>
