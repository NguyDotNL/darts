<template>
  <div>
    <Appbar />
    <v-container fluid>
      <Breadcrumbs />
      <h1 class="text-4xl">Spelers</h1>
      <Table />
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import Table from '@/components/table/table'
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs'

export default {
  name: 'Players',
  components: {
    Appbar,
    Table,
    Breadcrumbs,
  },
}
</script>
