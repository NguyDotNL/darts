import { players } from '@/plugins/firebase'

const PlayersClient = {
  getLoadingPlayersPage: (offset) => players.orderByChild('playerName').limitToFirst(offset)
    .once('value').then(snapshot => {
      const array = [] 
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        array.push({playerId: childData.playerId, playerName: childData.playerName})
      })
      return array
    }),
  getPrevPlayersPage: (offset, name) => players.orderByChild('playerName').limitToLast(offset).endAt(name)
    .once('value').then(snapshot => {
      const array = [] 
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        array.push({playerId: childData.playerId, playerName: childData.playerName})
      })
      return array
    }),
  getNextPlayersPage: (offset, name) => players.orderByChild('playerName').limitToFirst(offset).startAt(name)
    .once('value').then(snapshot => {
      const array = [] 
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        array.push({playerId: childData.playerId, playerName: childData.playerName})
      })
      return array
    }),
  searchPlayers: (name) => players.orderByChild('playerName').startAt(`\uf8ff${name}`).endAt(`${name}\uf8ff`)
    .once('value').then(snapshot => console.log(snapshot.val())),
}

export default PlayersClient
