import { render, fireEvent } from '@/test/test-wrapper'
import AppBar from './app-bar.vue'

test('Open Drawer with Button', async () => {
  const { getByTestId } = render(AppBar, { props: { open: false } })

  const button = getByTestId('AppBarBtn')

  await fireEvent.click(button)

  expect(getByTestId('app-drawer')).toHaveClass('v-navigation-drawer--open')
})
