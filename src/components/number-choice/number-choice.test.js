import { render, fireEvent } from '@/test/test-wrapper'
import NumberChoice from '@/components/number-choice/number-choice'
import MockData from '@/components/match/match-statistics.mock.js'

test('Number choice title', async () => {
  const { getByTestId } = render(NumberChoice, { props: MockData.buttonChoiceProps })
  expect(getByTestId('number-choice-title')).toHaveTextContent('leg')
})

test('Number choice options', async () => {
  const { getByText, queryByText } = render(NumberChoice, { props: MockData.buttonChoiceProps })
  getByText('1')
  getByText('2')
  getByText('3')
  expect(queryByText('4')).not.toBeInTheDocument()
})

test('Number choice active item', async () => {
  const { getByText } = render(NumberChoice, { props: MockData.buttonChoiceProps })
  const button = getByText('2').parentElement
  const buttonDefault = getByText('1').parentElement
  await fireEvent.click(button)
  expect(button).toHaveClass('bg-primary')
  expect(buttonDefault).not.toHaveClass('bg-primary')
})
