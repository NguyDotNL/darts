<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Beurt
          </th>
          <th class="text-left">
            Worpen
          </th>
          <th class="text-left">
            Totaal
          </th>
          <th class="text-left">
            Punten
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item.name"
        >
          <td>{{ item.turn }}</td>
          <td>worpendata</td>
          <td>{{ item.total }}</td>
          <td>newpoints</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: 'StatisticLegTable',
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
}
</script>
