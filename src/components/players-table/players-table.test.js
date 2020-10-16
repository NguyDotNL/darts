import { render, Vue } from '@/test/test-wrapper'
import PlayersTable from './players-table.vue'

test('Players table contains test player', async () => {
  const { getByTestId } = render(PlayersTable, { props: { items: [{ playersId: 'dit-is-een-test-id', firstName: 'Jantje', lastName: 'Ward' }], page: 1, itemsPerPage: 10 } })

  await Vue.nextTick()
  await Vue.nextTick()

  expect(getByTestId('players-table')).toHaveTextContent('Jantje')
})
