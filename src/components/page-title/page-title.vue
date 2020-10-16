<template>
  <v-row>
    <v-col>
      <h1 class="text-3xl">{{ title }}</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
