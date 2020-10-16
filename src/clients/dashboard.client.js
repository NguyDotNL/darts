import { matches, matchDetails, db, players } from '@/plugins/firebase'
import { saveAs } from 'file-saver'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),

  getMatchesPerPage: (offset, date = false, type = false) => {
    const query = !type
      ? matches.orderByChild('date').limitToLast(offset)
      : type == 'prev' ? matches.orderByChild('date').limitToFirst(offset).startAt(date + 1)
        : type == 'next' ? matches.orderByChild('date').limitToLast(offset).endAt(date - 1) : matches.orderByChild('date').limitToLast(offset)

    return query.once('value').then(snapshot => Object.values(snapshot.val()).sort((a, b) => b.date - a.date))
  },
  searchMatchesByName: (queryText, itemsPerPage) => matches.orderByChild('matchName').startAt(queryText).endAt(queryText+'\uf8ff').limitToFirst(itemsPerPage)
    .once('value').then(snapshot => snapshot.val() ? Object.values(snapshot.val()).sort((a,b) =>
      a.matchName < b.matchName ? -1 : a.matchName > b.matchName ? 1 : 0,
    ) : []),
  exportMatches: async (matchIds) => {
    const matchesData = matchIds.map(async matchId => {
      const match = await matches.child(matchId).once('value').then(snapshot => snapshot.val())
      const matchDetailsData = await matchDetails.child(matchId).once('value').then(snapshot => snapshot.val())
      return { matchId, match, matchDetails: matchDetailsData }
    })
    await Promise.all(matchesData).then((values) => {
      let blob = new Blob([JSON.stringify({ matches: values }, null, 2)], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'dartinmolema.json')
    })
  },
  uploadMatches: async (uploadData) => {
    if(!Array.isArray(uploadData?.matches)) {
      return { found: 0, success: 0, error: 0 }
    }

    const uploads = uploadData.matches.map(async (match) => {
      return new Promise(async (resolve, reject) => {
        // Check for player names
        if(!(typeof match?.match?.players === 'object' && 
          Object.entries(match.match.players).length == 2 && 
          match?.matchId?.length === 36)) {
          reject('invalid match')
        }

        // Get players
        const playersData = Object.entries(match.match.players).map(([key, value]) => ({ 
          playerId: key, 
          name: value?.playerName, 
        }))

        // Store all match data in batch
        await db.ref().update({
          [`matches/${match.matchId}`]: match.match,
          [`matchDetails/${match.matchId}`]: match.matchDetails,
          [`playerMatches/${playersData[0].playerId}/${match.matchId}`]: match.matchId,
          [`playerMatches/${playersData[1].playerId}/${match.matchId}`]: match.matchId,
        }, (err) => err != null && reject(err))

        // Create new player if player doesn't exist yet
        const storePlayers = playersData.map(async (player) => {
          await players.child(player.playerId).transaction(currentData => {
            if(currentData != null) {
              return currentData
            } else {
              return {
                firstName: player.name.split` `[0],
                lastName: player.name.replace(`${player.name.split` `[0]} `, ''),
                playerId: player.playerId,
              }
            }
          }, err => err != null && reject(err))
        })

        // Wait for all player transactions to finish
        await Promise.allSettled(storePlayers).then(() => resolve())
      })
    })

    return await Promise.allSettled(uploads).then((results) => ({
      found: results.length, 
      success: results.filter((result) => result.status === 'fulfilled').length, 
      error: results.filter((result) => result.status === 'rejected').length, 
    }))
  },
}

export default DashboardClient
