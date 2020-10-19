import { matches, matchDetails, db, players } from '@/plugins/firebase'
import { saveAs } from 'file-saver'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),
  getMatchesPerPage: (offset, date = false, type = false) => {
    const query = !type
      ? matches.orderByChild('date').limitToLast(offset)
      : type == 'prev' 
        ? matches.orderByChild('date').limitToFirst(offset).startAt(date + 1)
        : type == 'next' 
          ? matches.orderByChild('date').limitToLast(offset).endAt(date - 1) 
          : matches.orderByChild('date').limitToLast(offset)

    return query.once('value').then(snapshot => snapshot.val() ? Object.values(snapshot.val()).sort((a, b) => b.date - a.date) : [])
  },
  searchMatchesPerPage: async (queryText, itemsPerPage, page) => {
    const matchSearchKeys = await db.ref('matchSearches').once('value').then(snap => snap.val())
    const searchResults = Object.entries(matchSearchKeys).filter(([, val]) => val.includes(queryText.toLowerCase()))
      .sort(([, aVal],[, bVal]) => aVal > bVal ? -1 : aVal < bVal ? 1 : 0)
    const searchPerPage = itemsPerPage > searchResults.length 
      ? searchResults
      : page === 1 
        ? searchResults.slice(0, itemsPerPage)
        : searchResults.slice(0 + (itemsPerPage * (page - 1)), itemsPerPage * page)
    return await Promise.all(searchPerPage.map(async ([matchId]) => (
      await matches.child(matchId).once('value').then(snap => snap.val())
    )))
  },
  exportMatches: async (matchIds) => {
    const playersArray = []
    const matchesData = await Promise.all(matchIds.map(async matchId => {
      const match = await matches.child(matchId).once('value').then(snapshot => snapshot.val())
      const matchDetailsData = await matchDetails.child(matchId).once('value').then(snapshot => snapshot.val())
      playersArray.push(Object.keys(match.players))
      return { matchId, match, matchDetails: matchDetailsData }
    }))
    
    const playersData = await Promise.all([...new Set(playersArray.flat())].map(async playerId => (
      await players.child(playerId).once('value').then(snapshot => snapshot.val())
    )))
      
    let blob = new Blob([JSON.stringify({ matches: matchesData, players: playersData }, null, 2)], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'dartinmolema.json')
  },
  importMatches: async (importData) => {
    if(!Array.isArray(importData?.matches) || !Array.isArray(importData.players)) {
      return { found: 0, success: 0, error: 0 }
    }

    const imports = importData.matches.map(async (match) => (
      new Promise(async (resolve, reject) => {
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

        // Search string for the match based on match name and player names
        const matchSearchString = `${match.match.matchName}_${playersData[0].name}_${playersData[1].name}`.toLowerCase()

        // Store all match data in batch
        await db.ref().update({
          [`matches/${match.matchId}`]: match.match,
          [`matchDetails/${match.matchId}`]: match.matchDetails,
          [`playerMatches/${playersData[0].playerId}/${match.matchId}`]: match.matchId,
          [`playerMatches/${playersData[1].playerId}/${match.matchId}`]: match.matchId,
          [`matchSearches/${match.matchId}`]: matchSearchString,
        }).catch(err => reject(err))

        // Create new player if player doesn't exist yet
        const storePlayers = importData.players.map(async (player) => {
          await players.child(player.playerId).transaction(currentData => (
            currentData != null ? currentData : player
          )).catch(err => reject(err))
        })

        // Wait for all player transactions to finish
        await Promise.allSettled(storePlayers).then(() => resolve())
      })
    ))

    return await Promise.allSettled(imports).then((results) => ({
      found: results.length, 
      success: results.filter((result) => result.status === 'fulfilled').length, 
      error: results.filter((result) => result.status === 'rejected').length, 
    }))
  },
}

export default DashboardClient
