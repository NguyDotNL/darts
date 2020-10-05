import { render } from '@testing-library/vue'
import AppBar from './app-drawer.vue'

test('Drawer renders when open prop is true', async () => {
  // The render method returns a collection of utilities to query your component.
  const { getByTestId } = render(AppBar)

  expect(getByTestId('app-drawer')).not.toBeInDocument()
})