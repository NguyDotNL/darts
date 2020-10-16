<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col>
          <VTextField
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-col>
      </v-row>
      <v-row class="overflow-y-auto" style="max-height: calc(100vh - 260px)">
        <v-col>
          <v-row>
            <v-col>
              <VDataTable
                data-testid="players-table"
                class="p-0"
                :headers="headers"
                :items="items"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                :loading="loading"
                disable-sort
                fixed-header
                loading-text="Loading... Please wait"
                hide-default-footer
                no-data-text="Geen spelers gevonden."
                style="max-height: calc(100vh - 150px);"
                @click:row="rowLink"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'PlayersTable',
  
  props: {
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Voornaam',
          align: 'start',
          value: 'firstName',
        },
        {
          text: 'Achternaam',
          value: 'lastName',
        },
      ],
      search: '',
      backup: {},

    }
  },
  watch: {
    search() {
      this.$emit('search', this.search)
    },
  },
  methods: {
    rowLink(data) {
      this.$router.push('/spelers/' + data.playerId)
    },
  },
}
</script>
