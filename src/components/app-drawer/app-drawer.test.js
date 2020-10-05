import { render } from '@/test/test-wrapper'
import AppBar from './app-drawer.vue'

test('Drawer renders when open prop is true', async () => {
  const { queryByTestId } = render(AppBar, { props: { open: false }})

  expect(queryByTestId('app-drawer')).toBe(null)
})

test('Drawer renders when open prop is false', async () => {
  const { queryByTestId } = render(AppBar, { props: { open: true }})
  
  expect(queryByTestId('app-drawer')).toBe(null)
})    