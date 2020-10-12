import { render } from '@/test/test-wrapper'
import MatchSetStatistics from '@/components/match/match-set-statistics'
import MockData from '@/components/match/match-statistics.mock.js'

test('Match title', async () => {
  const { getByTestId } = render(MatchSetStatistics, { props: MockData.matchSetProps })
  expect(getByTestId('match-set-winner')).toHaveTextContent('Mieke de Boer')
})
