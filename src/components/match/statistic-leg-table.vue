<template>
  <v-simple-table class="mb-10">
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
          v-for="(leg, key) in items"
          :key="key"
        >
          <td class="text-center">{{ key+1 }}</td>
          <td>
            <ul>
              <li
                v-for="(dart, dartKey) in leg.throws"
                :key="dartKey"
              >
                {{ `Worp ${dartKey+1}: ${typeDart(dart.multiplier)} ${dart.points}` }}
              </li>
            </ul>
          </td>
          <td>{{ leg.total }}</td>
          <td>{{ totalPoints(leg.total) }}</td>
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
      type: Array,
      required: true,
    },
    startpoints: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      totalStartpoints: this.startpoints, 
    }
  },
  computed: {
    totalStartingPoints(){
      return this.startpoints
    },
  },
  methods: {
    totalPoints(itemPoints){
      this.totalStartpoints -= itemPoints
      return this.totalStartpoints
    },
    typeDart(multiplier){
      let multiText = ''
      switch (multiplier) {
      case 0:
        multiText = 'Missed'
        break
      case 1:
        multiText = 'Single'
        break
      case 2:
        multiText = 'Double'
        break
      case 3:
        multiText = 'Triple'
        break
      case 4:
        multiText = 'Bull'
        break
      case 5:
        multiText = 'Bull eye'
        break
      }
      return multiText
    },
  },
}
</script>
