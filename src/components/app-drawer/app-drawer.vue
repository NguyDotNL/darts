<template>
  <v-navigation-drawer
    data-testid="app-drawer"
    :value="open"
    absolute
    bottom
    temporary
    @input="(value) => !value && $emit('toggle')"
  >
    <v-list nav dense class="p-0">
      <router-link to="/">
        <v-list-item>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
      </router-link>
      <VDivider />
      <router-link to="/spelers">
        <v-list-item>
          <v-list-item-title>Spelers</v-list-item-title>
        </v-list-item>
      </router-link>
      <VDivider />
      <router-link to="/wedstrijd/toevoegen">
        <v-list-item>
          <v-list-item-title>Wedstrijd toevoegen</v-list-item-title>
        </v-list-item>
      </router-link>
      <VDivider />
    </v-list>
    <template v-slot:append>
      <div>
        <v-btn
          block
          depressed
          tile
          color="error"
        >
          Reset applicatie
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'AppDrawer',
  props: {
    open: Boolean,
  },
  data: function () {
    return {
      group: false,
    }
  },
}
</script>
