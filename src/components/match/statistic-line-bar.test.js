import { render } from '@/test/test-wrapper'
import StatisticLineBar from '@/components/match/statistic-line-bar'
import MockData from '@/components/match/match-statistics.mock.js'

test('Line bar title', async () => {
  const { getByTestId } = render(StatisticLineBar, { props: MockData.lineBarData })
  expect(getByTestId('line-bar-title')).toHaveTextContent('Gewonnen sets')
})

test('Line bar subtitle', async () => {
  const { getByTestId } = render(StatisticLineBar, { props: MockData.lineBarData })
  expect(getByTestId('line-bar-subtitle')).toHaveTextContent('20 gewonnen sets')
})

test('Line bar left player score', async () => {
  const { getByTestId } = render(StatisticLineBar, { props: MockData.lineBarData })
  expect(getByTestId('line-bar-left-score')).toHaveTextContent('15')
})

test('Line bar right player score', async () => {
  const { getByTestId } = render(StatisticLineBar, { props: MockData.lineBarData })
  expect(getByTestId('line-bar-right-score')).toHaveTextContent('5')
})
