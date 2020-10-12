import { render, router } from '@/test/test-wrapper'
import Breadcrumbs from './Breadcrumbs.vue'

test('Increment page on click next', async () => {
  const { container, debug } = render(Breadcrumbs)
  router.push('/spelers/ditiseenid')
  debug()
  console.log(container)
  // expect(Breadcrumbs).not.toHaveClass('v-navigation-drawer--open')
})
