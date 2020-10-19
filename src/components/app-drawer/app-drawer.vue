<template>
  <v-navigation-drawer
    data-testid="app-drawer"
    :value="setOpen"
    temporary
    app
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
        <v-dialog
          v-model="dialog"
          persistent
          max-width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="error"
              block
              depressed
              tile
              v-bind="attrs"
              v-on="on"
            >
              Reset applicatie
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline">
              Weet je zeker het zeker?
            </v-card-title>
            <v-card-text>Dit zorgt ervoor dat de data wordt verwijderd. <b>Dit kan niet worden teruggedraaid!</b></v-card-text>
            <v-card-actions>
              <VSpacer />
              <v-btn
                color="red"
                text
                @click="dialog = false"
              >
                Nee
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="resetApplication"
              >
                Ja
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import ApplicationClient from '@/clients/application.client'

export default {
  name: 'AppDrawer',
  props: {
    open: Boolean,
  },
  data: function () {
    return {
      group: false,
      dialog: false,
      setOpen: false,
    }
  },
  watch: {
    open: {
      immediate: true,
      handler(val) {this.setOpen = val},
    },
  },
  methods: {
    async resetApplication() {
      await ApplicationClient.resetApplication()
      this.dialog = false
      this.setOpen = false
      this.$router.push('/')
    },
  },
}
</script>
