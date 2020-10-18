import { render } from '@/test/test-wrapper'
import MatchPlayerPicker from './match-player-picker.vue'

test('Render input', async () => {
  const { getByText } = render(MatchPlayerPicker, { props: { items: [], itemValue: 'playerId', itemText: 'fullName', label: 'Speler 1' } })

  getByText('Speler 1')

})
