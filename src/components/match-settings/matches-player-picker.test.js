import { render } from '@/test/test-wrapper'
import MatchesPlayerPicker from './matches-player-picker.vue'

test('Render input', async () => {
  const { getByText } = render(MatchesPlayerPicker, { props: { items: [], itemValue: 'playerId', itemText: 'fullName', label: 'Speler 1' } })

  getByText('Speler 1')

})
