import { render } from '@/test/test-wrapper'
import MatchTextField from './match-text-field.vue'

test('Text field contains name', async () => {
  const { getByText } = render(MatchTextField, { props: { label: 'Wedstrijd naam' } })

  getByText('Wedstrijd naam')

})
