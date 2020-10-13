import { render } from '@/test/test-wrapper'
import MatchTable from '@/components/match-table/match-table'
import MockData from '@/components/match-table/match-table.mock.js'


test('Export visible ', async () => {
  const { getByTestId } = render(MatchTable, { props: MockData.props })
  getByTestId('rowCheckBox')
})

test('Is loading ', async () => {
  const { getByRole } = render(MatchTable, { props: MockData.props })
  getByRole('progressbar')
})

test('Has data', async () => {
  const { getByText } = render(MatchTable, { props: MockData.props })
  getByText('Test WK 5')
})

