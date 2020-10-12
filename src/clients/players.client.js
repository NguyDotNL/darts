import { players, playerMatches, matches } from '@/plugins/firebase'

const PlayersClient = {
  getPlayers: (offset, name = null, type = null) => {
    const query = type == null 
      ? players.orderByChild('firstName').limitToFirst(offset)
      : type == 'prev' ? players.orderByChild('firstName').limitToLast(offset).endAt(name)
        : type == 'next' ? players.orderByChild('firstName').limitToFirst(offset).startAt(name) : ''
        
    return query.once('value').then(snapshot => Object.values(snapshot.val()).sort((a, b) => {
      const aFirstName = a.firstName.toLowerCase(), bFirstName = b.firstName.toLowerCase()
      return (aFirstName < bFirstName) ? -1 : (aFirstName > bFirstName) ? 1 : 0
    }))
  },
  searchPlayers: (name) => players.orderByChild('firstName').startAt(name.toUpperCase).endAt(`${name.toUpperCase}\uf8ff`)
    .once('value').then(snapshot => snapshot.val() ? Object.values(snapshot.val()).sort((a, b) => {
      const aFirstName = a.firstName.toLowerCase(), bFirstName = b.firstName.toLowerCase()
      return (aFirstName < bFirstName) ? -1 : (aFirstName > bFirstName) ? 1 : 0
    }): []),
  getPlayerData: async (playerId) => {
    const playerData = await players.child(playerId).once('value').then(snap => snap.val())
    const playerMatchesData = []

    await playerMatches.child(playerId).on('child_added',
      snap => matches.child(snap.val()).on('value', snapshot => playerMatchesData.push(snapshot.val())),
    )
    return { player: playerData, playerMatches: playerMatchesData } 
  },
}

export default PlayersClient
