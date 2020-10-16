import { render } from '@/test/test-wrapper'
import PageTitle from '@/components/page-title/page-title'

test('Page title', async () => {
  const { getByText } = render(PageTitle, { props: { title: 'Test title' }  })
  getByText('Test title')
})
