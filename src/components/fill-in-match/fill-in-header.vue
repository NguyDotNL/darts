<template>
  <v-row>
    <v-col />
    <v-col class="align-center justify-center flex text-2xl">
      Punten: {{ startPoints }}
    </v-col>
    <v-col />
  </v-row>
</template>

<script>
export default {
  name: 'FillInHeader',
  props: {
    startPoints: {
      type: Number,
      required: true,
    },
  },
}
</script>
