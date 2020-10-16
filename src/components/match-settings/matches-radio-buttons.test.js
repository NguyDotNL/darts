import { render } from '@/test/test-wrapper'
import MatchesRadioButtons from './matches-radio-buttons.vue'

test('Has array items', async () => {
  const { getByText } = render(MatchesRadioButtons, { props: { title: 'Dit is een test', items: [1, 3, 5] } })

  getByText('1')
  getByText('3')
  getByText('5')

})

test('Has a title', async () => {
  const { getByText } = render(MatchesRadioButtons, { props: { title: 'Dit is een test', items: [1, 3, 5] } })

  getByText('Dit is een test')

})
