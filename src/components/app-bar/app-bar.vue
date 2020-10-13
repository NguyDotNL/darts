<template>
  <div>
    <div class="mb-12 z-50">
      <v-app-bar
        class="bg-primary"
        dense
        dark
        fixed
      >
        <VAppBarNavIcon data-testid="AppBarBtn" @click.stop="toggleDrawer" />

        <v-toolbar-title>Dashboard</v-toolbar-title>

        <VSpacer />
      </v-app-bar>
    </div>
    <v-container>
      <Breadcrumbs />
    </v-container>
    <AppDrawer
      :open="drawerOpen"
      class="z-50"
      @toggle="toggleDrawer"
    />
  </div>
</template>

<script>
import AppDrawer from '@/components/app-drawer/app-drawer'
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs'

export default {
  name: 'AppBar',
  components: { 
    AppDrawer,
    Breadcrumbs,
  },
  data: function () {
    return {
      drawerOpen: false,
    }
  },
  methods: {
    toggleDrawer: function () {
      this.drawerOpen = !this.drawerOpen
    },
  },
}
</script>
