<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />

      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer />
    </v-app-bar>
    <AppDrawer
      :open="drawerOpen"
      @toggle="toggleDrawer"
    />
  </div>
</template>

<script>
import AppDrawer from '@/components/app-drawer/app-drawer'

export default {
  name: 'Appbar',
  components: { 
    AppDrawer,
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