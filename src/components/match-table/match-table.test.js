import { render } from '@/test/test-wrapper'

import AppDrawer from './app-drawer.vue'

test('Drawer is closed', async () => {
  const { getByTestId } = render(AppDrawer, { props: { open: false }})

  expect(getByTestId('app-drawer')).not.toHaveClass('v-navigation-drawer--open')
})

test('Drawer is open', async () => {
  const { getByTestId } = render(AppDrawer, { props: { open: true }})
  
  expect(getByTestId('app-drawer')).toHaveClass('v-navigation-drawer--open')
})    
