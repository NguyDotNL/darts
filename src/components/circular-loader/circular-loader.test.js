import { render } from '@/test/test-wrapper'
import CircularLoader from '@/components/circular-loader/circular-loader'

test('Circular loader title', async () => {
  const { getByText } = render(CircularLoader, { props: { title: 'Test title' }  })
  getByText('Test title')
})
