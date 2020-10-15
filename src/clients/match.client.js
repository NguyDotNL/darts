import { matches, matchDetails, db } from '@/plugins/firebase'

const MatchClient = {
  getMatch: async (matchId) => {
    const match = await matches.child(matchId).once('value').then(snap => snap.val())
    const matchDetailsData = await matchDetails.child(matchId).once('value').then(snap => snap.val())
    return { match, matchDetails: matchDetailsData }
  },
  deleteMatch: async (matchId) => {
    const match = await matches.child(matchId).once('value').then(snap => snap.val())
    const playerKeys = Object.keys(match.players)

    const updateObject = {
      [`matches/${matchId}`]: null,
      [`matchDetails/${matchId}`]: null,
      [`playerMatches/${playerKeys[0]}/${matchId}`]: null,
      [`playerMatches/${playerKeys[1]}/${matchId}`]: null,
    }

    await db.ref().update(updateObject)
  },
  getRtMatch: (matchId, callback) => {
    matches.child(matchId).on('value', callback)
  },
  getRtMatchDetails: (matchId, callback) => {
    matchDetails.child(matchId).on('value', callback)
  },
  rtMatchAndDetailsOff: (matchId) => {
    matches.child(matchId).off()
    matchDetails.child(matchId).off()
  },
  updateThrow: ({ matchId, setKey, legKey, playerKey, turn, throwKey, throwData, newTurnPoints }) => {
    const updateObject = {
      [`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/players/${playerKey}/${turn}/throws/${throwKey}`]: throwData,
      [`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/players/${playerKey}/${turn}/total`]: newTurnPoints,
    }

    db.ref().update(updateObject)
  },
  removeLegWinner: (matchId, setKey, legKey) => {
    const updateObject = {
      [`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/winner`]: '',
    }
    
    db.ref().update(updateObject)
  },
  addLegWinner: (matchId, setKey, legKey, playerKey) => {
    const updateObject = {
      [`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/winner`]: playerKey,
    }

    db.ref().update(updateObject)
  },
  addSetWinner: (matchId, setKey, playerKey) => {
    const updateObject = {
      [`matchDetails/${matchId}/sets/${setKey}/winner`]: playerKey,
    }

    db.ref().update(updateObject)
  },
  removeSetWinner: (matchId, setKey) => {
    const updateObject = {
      [`matchDetails/${matchId}/sets/${setKey}/winner`]: '',
    }

    db.ref().update(updateObject)
  },
  increaseLegsWon: (matchId, setKey, playerKey, increase) => {
    const playerMatchStatsRef = db.ref(`matches/${matchId}/players/${playerKey}/statistics/legsWon`)
    const playerSetStatsRef = db.ref(`matchDetails/${matchId}/sets/${setKey}/players/${playerKey}/legsWon`)

    playerMatchStatsRef.transaction((current) => {
      return (current || 0) + parseInt(increase)
    })
    playerSetStatsRef.transaction((current) => {
      return (current || 0) + parseInt(increase)
    })
  },
  increaseSetsWon: (matchId, playerKey, increase) => {
    const playerMatchStatsRef = db.ref(`matches/${matchId}/players/${playerKey}/statistics/setsWon`)

    playerMatchStatsRef.transaction((current) => {
      return (current || 0) + parseInt(increase)
    })
  },
  addMatchWinner: (matchId, playerKey, playerName) => {
    const updateObject = {
      [`matches/${matchId}/winner`]: playerKey,
      [`matches/${matchId}/winnerName`]: playerName,
    }

    db.ref().update(updateObject)
  },
  removeMatchWinner: (matchId) => {
    const updateObject = {
      [`matches/${matchId}/winner`]: '',
      [`matches/${matchId}/winnerName`]: '',
    }

    db.ref().update(updateObject)
  },
}

export default MatchClient
