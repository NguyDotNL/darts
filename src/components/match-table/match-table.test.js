import { render } from '@/test/test-wrapper'
import MatchTable from '@/components/match-table/match-table'
import MockData from '@/components/match-table/match-table.mock.js'


test('Export visible ', async () => {
  const { getByTestId } = render(MatchTable, { props: MockData.props })
  expect(getByTestId('match-table').querySelector('i.v-icon.notranslate.mdi.mdi-checkbox-blank-outline.theme--light').nodeName).toBe('I')
})

test('Is loading ', async () => {
  const { getByTestId } = render(MatchTable, { props: MockData.props })
  expect(getByTestId('match-table').querySelectorAll('.v-progress-linear__buffer').length).toBe(1)
})

test('Has data', async () => {
  const { getByTestId } = render(MatchTable, { props: MockData.props })
  expect(getByTestId('match-table').querySelector('tr').nodeName).toBe('TR')
})

