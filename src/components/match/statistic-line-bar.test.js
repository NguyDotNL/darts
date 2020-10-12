import { render } from '@/test/test-wrapper'
import StatisticLineBar from '@/components/match/statistic-line-bar'

const props = {
  title: 'Gewonnen sets',
  subtitle: '20 gewonnen sets',
  totalNumber: 20,
  playerLeftNumber: 15,
  playerRightNumber: 5,
}


test('Line bar title', async () => {
  const { getByTestId } = render(StatisticLineBar, { props })
  expect(getByTestId('line-bar-title').innerHTML).toBe('Gewonnen sets')
})

test('Line bar subtitle', async () => {
  const { getByTestId } = render(StatisticLineBar, { props })
  expect(getByTestId('line-bar-subtitle').innerHTML).toBe('20 gewonnen sets')
})

test('Line bar left player score', async () => {
  const { getByTestId } = render(StatisticLineBar, { props })
  expect(getByTestId('line-bar-left-score').innerHTML).toBe('15')
})

test('Line bar right player score', async () => {
  const { getByTestId } = render(StatisticLineBar, { props })
  expect(getByTestId('line-bar-right-score').innerHTML).toBe('5')
})
