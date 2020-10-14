import { render } from '@/test/test-wrapper'
import MatchesDateTime from './matches-date-time.vue'

test('Contains date picker', async () => {
  const { getByText } = render(MatchesDateTime, { props: { defaultDate: '20/7/2020' } })

  getByText('Datum')
  getByText('DD/MM/YYYY')

})

test('Contains time picker', async () => {
  const { getByText } = render(MatchesDateTime, { props: { defaultDate: '20/7/2020' } })

  getByText('Tijd')

})
