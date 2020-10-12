import { render, Vue } from '@/test/test-wrapper'
import Breadcrumbs from './Breadcrumbs.vue'
import Last from 'lodash/last'

test('Player id is rendered in breadcrumbs', async () => {
  const matchId = 'E9dbe7ac-d51c-4555-ad1f-ebcb89037e1c'
  const { findAllByTestId } = render(Breadcrumbs, {}, (vue, store, router) => {
    router.push(`/spelers/${matchId}`)
  })

  await Vue.nextTick()
  expect(Last(await findAllByTestId('test'))).toHaveTextContent(matchId)
})
