import { render, Vue, fireEvent } from '@/test/test-wrapper'
import DataTableFooter from './data-table-footer.vue'

test('Click next and previous page', async () => {
  const { getByText, getByTestId } = render(DataTableFooter, { 
    props: {
      itemsLength: 300,
    },
  })

  await Vue.nextTick()
  await Vue.nextTick()

  getByText('Items per pagina:')
  getByText('10')

  const NextButton = getByTestId('NextBtn')
  const PrevButton = getByTestId('PrevBtn')

  await fireEvent.click(NextButton)
  expect(getByTestId('currentPage')).toHaveTextContent('2')

  await fireEvent.click(PrevButton)
  expect(getByTestId('currentPage')).toHaveTextContent('1')

})
