import { players } from '@/plugins/firebase'

const PlayersClient = {
  getFirstPlayers: (offset) => players.orderByChild('playerName').limitToFirst(offset)
    .once('value').then(snapshot => {
      const array = [] 
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        array.push({playerId: childData.playerId, playerName: childData.playerName})
      })
      return array
    }),
  getPlayersByNextPage: (offset, name) => players.orderByChild('playerName').limitToFirst(offset).startAt(name)
    .once('value').then(snapshot => {
      const array = [] 
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        array.push({playerId: childData.playerId, playerName: childData.playerName})
      })
      return array
    }),
  getPlayersByPrevPage: (offset, name) => players.orderByChild('playerName').limitToLast(offset).endAt(name)
    .once('value').then(snapshot => {
      const array = [] 
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        array.push({playerId: childData.playerId, playerName: childData.playerName})
      })
      return array
    }),
}

export default PlayersClient
