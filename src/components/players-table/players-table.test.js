import { render, Vue } from '@/test/test-wrapper'
import PlayersTable from './players-table.vue'

test('Players table contains Test player', async () => {
  const { getByTestId } = render(PlayersTable)

  await Vue.nextTick()
  await Vue.nextTick()

  expect(getByTestId('players-table')).toHaveTextContent('Test')
})
