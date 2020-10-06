<template>
  <v-card>
    <v-card-title>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="players"
      :search="search"
      loading
      loading-text="Loading... Please wait"
    />
  </v-card>
</template>

<script>
export default {
  name: 'Table',
  data: function () {
    return {
      search: '',
      headers: [
        {
          text: 'Voornaam',
          align: 'start',
          value: 'first_name',
        },
        {
          text: 'Achternaam',
          value: 'last_name',
        },
      ],
      players: [
        {
          first_name: 'Michael',
          last_name: 'Van Gerwen',
        },
        {
          first_name: 'Gary',
          last_name: 'Anderson',
        },
        {
          first_name: 'Adrian',
          last_name: 'Lewis',
        },
        {
          first_name: 'Phil',
          last_name: 'Taylor',
        },
        {
          first_name: 'Gerwyn',
          last_name: 'Price',
        },
        {
          first_name: 'Michael',
          last_name: 'Smith',
        },
        {
          first_name: 'James',
          last_name: 'Wade',
        },
        {
          first_name: 'Rob',
          last_name: 'Cross',
        },
        {
          first_name: 'Raymond',
          last_name: 'Van Barneveld',
        },
      ],
    }
  },
}
</script>
