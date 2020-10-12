import { render } from '@/test/test-wrapper'
import MatchStatisticsHeaders from '@/components/match/match-statistics-header'
import MockData from '@/components/match/match-statistics.mock.js'

test('Match title', async () => {
  const { getByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(getByTestId('match-header-title')).toHaveTextContent('Test WK 162')
})

test('Match player left', async () => {
  const { getByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(getByTestId('match-header-player-left')).toHaveTextContent('Mieke de Boer')
})

test('Match player right', async () => {
  const { getByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(getByTestId('match-header-player-right')).toHaveTextContent('Wesley Harms')
})

test('Match player right score', async () => {
  const { getByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(getByTestId('match-header-player-right-sets')).toHaveTextContent('0')
})

test('Match player left score', async () => {
  const { getByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(getByTestId('match-header-player-left-sets')).toHaveTextContent('6')
})

test('Match winner', async () => {
  const { getByTestId, queryByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(getByTestId('match-header-player-left-won').innerHTML).toBe('Winnaar')
  expect(queryByTestId('match-header-player-right-won')).toBeNull()
})

test('9-dart icon', async () => {
  const { queryByTestId } = render(MatchStatisticsHeaders, { props: MockData.matchHeaderProps })
  expect(queryByTestId('match-header-player-left-nine-dart')).toBeNull()
  expect(queryByTestId('match-header-player-right-nine-dart')).not.toBeNull()
})
