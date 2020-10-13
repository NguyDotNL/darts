import { render, Vue, screen } from '@/test/test-wrapper'
import Breadcrumbs from './breadcrumbs.vue'
import Last from 'lodash/last'

test('Player id is rendered in breadcrumbs', async () => {
  const matchId = 'E9dbe7ac-d51c-4555-ad1f-ebcb89037e1c'
  const { getByText, findAllByTestId } = render(Breadcrumbs, {}, (vue, store, router) => {
    router.push(`/spelers/${matchId}`)
  })

  await Vue.nextTick()

  getByText('Dashboard')
  
  getByText('Spelers')

  expect(Last(await findAllByTestId('test'))).toHaveTextContent(matchId)
})
