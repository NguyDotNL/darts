<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col class="text-center">
          {{ title }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CircularLoader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
