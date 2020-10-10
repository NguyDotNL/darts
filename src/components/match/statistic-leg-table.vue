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
          v-for="(turn, key) in turnData"
          :key="key"
        >
          <td class="text-center">{{ key + 1 }}</td>
          <td>
            <ul>
              <li
                v-for="(dart, dartKey) in turn.throws"
                :key="dartKey"
              >
                {{ `Worp ${dartKey + 1}: ${typeDart(dart.multiplier)} ${dart.points}` }}
              </li>
            </ul>
          </td>
          <td>{{ turn.total }}</td>
          <td>{{ turn.remainingPoints }}</td>
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
    startPoints: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      turnData: [],
    }
  },
  watch: {
    items() {
      this.calculateLegData()
    },
  },
  mounted: function () {
    this.calculateLegData()
  },
  methods: {
    calculateLegData() {
      let remainingPoints = this.startPoints
      this.turnData = this.items.map(turn => {
        remainingPoints -= turn.total
        return {
          ...turn,
          remainingPoints,
        }
      })
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
        multiText = 'Bullseye'
        break
      }
      return multiText
    },
  },
}
</script>
