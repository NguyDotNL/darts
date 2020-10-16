import { render } from '@/test/test-wrapper'
import MatchesTextField from './matches-text-field.vue'

test('Text field contains name', async () => {
  const { getByText } = render(MatchesTextField, { props: { label: 'Wedstrijd naam' } })

  getByText('Wedstrijd naam')

})
