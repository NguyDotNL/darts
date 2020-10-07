<template>
  <div>
    <div class="mb-12">
      <v-app-bar
        color="deep-purple accent-4"
        class="z-50"
        dense
        dark
        fixed
      >
        <v-app-bar-nav-icon @click.stop="toggleDrawer" />

        <v-toolbar-title>Dashboard</v-toolbar-title>

        <v-spacer />
      </v-app-bar>
    </div>

    <AppDrawer
      :open="drawerOpen"
      class="z-50"
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
