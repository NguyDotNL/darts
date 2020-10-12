import { render } from '@/test/test-wrapper'
import MatchTable from '@/components/match-table/match-table'

const props = {
  matchExport: true,
  matches: [{
    bestOfLegs: 7,
    bestOfSets: 3,
    date: 1602097674,
    matchId: '2974c8f6-7bc2-4a05-82d4-efa3c6190eb6',
    matchName: 'Test WK 5',
    startPoints: 501,
    players: {
      '2735f0e5-9192-472e-b822-53179123877a': {
        playerName: 'Wesley Harms',
        statistics: {},
      },
      'f859f680-3916-42af-8d5d-36dd37086189': {
        playerName: 'Raymond van Barneveld',
        statistics: {},
      },
    },
    winner: 'f859f680-3916-42af-8d5d-36dd37086189',
    winnerName: 'Raymond van Barneveld',
  }],
  loading: true,
  search: 'zoektest',
}

test('Export visible ', async () => {
  const { getByTestId } = render(MatchTable, { props })
  expect(getByTestId('match-table').querySelectorAll('i.v-icon.notranslate.mdi.mdi-checkbox-blank-outline.theme--light').length).toBe(1)
})

test('Is loading ', async () => {
  const { getByTestId } = render(MatchTable, { props })
  expect(getByTestId('match-table').querySelectorAll('.v-progress-linear__buffer').length).toBe(1)
})

test('Has data', async () => {
  const { getByTestId } = render(MatchTable, { props })
  expect(getByTestId('match-table').querySelector('tr').nodeName).toBe('TR')
})

