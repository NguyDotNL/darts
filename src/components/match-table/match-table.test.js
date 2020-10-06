import { render } from '@/test/test-wrapper'

import MatchTable from './match-table.vue'

test('Match table is visible', async () => {
  const { getByTestId } = render(MatchTable)

  expect(getByTestId('match-table'))
})

// test('Drawer is open', async () => {
//   const { getByTestId } = render(AppDrawer, { props: { open: true }})
//
//   expect(getByTestId('app-drawer')).toHaveClass('v-navigation-drawer--open')
// })
