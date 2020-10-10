import { players, playerMatches, matches } from '@/plugins/firebase'

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
  searchPlayers: (name) => players.orderByChild('playerName').startAt(name).endAt(`${name}\uf8ff`)
    .once('value').then(snapshot => snapshot.val()),
  getPlayerData: async (playerId) => {
    const player = await players.child(playerId).once('value').then(snap => snap.val())
    const playerMatchesData = []

    await playerMatches.child(playerId).on('child_added',
      snap => matches.child(snap.val()).on('value', snapshot => playerMatchesData.push(snapshot.val())),
    )
    return { playerId: player.playerId, playerName: player.playerName, playerMatches: playerMatchesData } 
  },
}

export default PlayersClient
