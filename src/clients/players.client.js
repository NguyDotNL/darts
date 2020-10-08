import { players } from '@/plugins/firebase'

const PlayersClient = {
  getAllPlayers: () => players.orderByChild('playerName').limitToFirst(20).once('value').then(snapshot => snapshot.val()),
  // getAllPlayers: (offset) => players.orderByChild('playerName').limitToFirst(offset).startAt('')
  //   .once('value').then(snapshot => snapshot.val()),
  getPlayersByNextPage: (offset, name) => players.orderByChild('playerName').limitToFirst(offset).startAt(name)
    .once('value').then(snapshot => snapshot.val()),
  getPlayersByPrevPage: (offset, name) => players.orderByChild('playerName').limitToFirst(offset).endAt(name)
    .once('value').then(snapshot => snapshot.val()),
}

export default PlayersClient
