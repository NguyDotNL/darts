import { render } from '@/test/test-wrapper'
import MatchRadioButtons from './match-radio-buttons.vue'

test('Has array items', async () => {
  const { getByText } = render(MatchRadioButtons, { props: { title: 'Dit is een test', items: [1, 3, 5] } })

  getByText('1')
  getByText('3')
  getByText('5')

})

test('Has a title', async () => {
  const { getByText } = render(MatchRadioButtons, { props: { title: 'Dit is een test', items: [1, 3, 5] } })

  getByText('Dit is een test')

})
