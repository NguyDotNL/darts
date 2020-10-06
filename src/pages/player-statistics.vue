<template>
  <div>
    <Appbar />
    <v-container fluid>
      <Breadcrumbs />
      {{ $route.params.name }}
      <div class="text-center d-flex align-center justify-space-around">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Bottom
            </v-btn>
          </template>
          <span>Bottom tooltip</span>
        </v-tooltip>
      </div>
    </v-container>
  </div>
</template>

<script>
import Appbar from '@/components/app-bar/app-bar'
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs'

export default {
  name: 'PlayerStatistics',
  components: {
    Appbar,
    Breadcrumbs,
  },
}
</script>
