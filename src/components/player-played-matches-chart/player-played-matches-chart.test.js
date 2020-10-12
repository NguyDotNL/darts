import { render, Vue } from '@/test/test-wrapper'
import PlayerPlayedMatchesChart from './player-played-matches-chart.vue'

test('Expect to show played matches 1', async () => {
  const { getByText } = render(PlayerPlayedMatchesChart, { 
    props: {
      player: {
        playerId: 'dit-is-een-id',
        firstName: 'Jantje',
        lastName: 'Bakker',
      },
      matches: [
        {
          bestOfLegs: 1,
          bestofSets: 5,
          date: 1594408074,
          matchId: '10b8d8df-ff96-4f09-9338-c9ecce6e1719',
          matchName: 'Test WK 94',
          players: Object,
          startPoints: 501,
          winner: 'd88033b9-14fe-41f6-98d2-f9f35d7024a1',
          winnerName: 'Francis Hoenselaar',
        },
      ],
    },
  })

  await Vue.nextTick()
  await Vue.nextTick()

  getByText('Gespeelde wedstrijden: 1')
})
