import { render, Vue } from '@/test/test-wrapper'
import PlayerPlayedMatchesChart from './player-played-matches-chart.vue'
import MockData from './player-played-matches-chart.mock'

test('Expect to show played matches 1', async () => {
  const { getByText } = render(PlayerPlayedMatchesChart, { 
    props: {
      player: MockData.player,
      matches: MockData.matches,
    },
  })

  await Vue.nextTick()
  await Vue.nextTick()

  getByText('Gespeelde wedstrijden: 1')
})
