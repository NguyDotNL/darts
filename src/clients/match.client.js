import { matches, matchDetails, playerMatches, db } from '@/plugins/firebase'

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
  createMatch: (data, matchId) => {
    const playersId = Object.keys(data.players)
    // Set Match
    matches.child(matchId).set(data)

    // Set Player Matches
    for(const id of playersId) {
      playerMatches.child(id).child(matchId).set(matchId)
    }

    // Set Match Details
    matchDetails.child(matchId).set({
      sets: {
        0: {
          legs: {
            0: {
              players: {
                [playersId[0]]: '',
                [playersId[1]]: '',
              },
              winner: '',
            },
          },
          players: {
            [playersId[0]]: {
              '180': 0,
              '9Dart': 0,
              legsWon: 0,
            },
            [playersId[1]]: {
              '180': 0,
              '9Dart': 0,
              legsWon: 0,
            },
          },
          winner: '',
        },
      },
    })
  },
  updateMatch: async (data, matchId) => {
    const updateObject = {
      [`matches/${matchId}/matchName`]: data.matchName,
      [`matches/${matchId}/date`]: data.date,
    }

    await db.ref().update(updateObject)
  },
  getRtMatch: (matchId, callback) => {
    matches.child(matchId).on('value', callback)
  },
  getRtMatchDetails: (matchId, callback) => {
    matchDetails.child(matchId).on('value', callback)
  },
  rtMatchOff: (matchId) => {
    matches.child(matchId).off()
  },
  rtMatchAndDetailsOff: (matchId) => {
    matches.child(matchId).off()
    matchDetails.child(matchId).off()
  },
  updateThrow: (newData, newLeg, newSet, playerKeys) => {
    const { matchId, setKey, legKey, playerKey, turn, throwKey, throwData, newTurnPoints } = newData
    const otherPlayerKey = playerKeys[0] === playerKey ? playerKeys[1] : playerKeys[0]

    const updateObject = {
      [`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/players/${playerKey}/${turn}/throws/${throwKey}`]: throwData,
      [`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/players/${playerKey}/${turn}/total`]: newTurnPoints,
    }

    if(newSet) {
      updateObject[`matchDetails/${matchId}/sets/${setKey}/winner`] = ''
      updateObject[`matchDetails/${matchId}/sets/${setKey}/players`] = {
        [playerKeys[0]]: {
          legsWon: 0,
          '180': 0,
          '9Dart': 0,
        },
        [playerKeys[1]]: {
          legsWon: 0,
          '180': 0,
          '9Dart': 0,
        },
      }
    }
    
    if(newLeg) {
      updateObject[`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/players/${otherPlayerKey}`] = ''
      updateObject[`matchDetails/${matchId}/sets/${setKey}/legs/${legKey}/winner`] = ''
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

  increaseSetsWon: (matchId, playerKey, increase) => {
    const playerMatchStatsRef = db.ref(`matches/${matchId}/players/${playerKey}/statistics/setsWon`)

    playerMatchStatsRef.transaction((current) => {
      return (current || 0) + parseInt(increase)
    })
  },

  increaseStats: (matchId, setKey, playerKey, increase, statsKey) => {
    const playerMatchStatsRef = db.ref(`matches/${matchId}/players/${playerKey}/statistics/${statsKey}`)
    const playerSetStatsRef = db.ref(`matchDetails/${matchId}/sets/${setKey}/players/${playerKey}/${statsKey}`)

    playerMatchStatsRef.transaction((current) => {
      return (current || 0) + parseInt(increase)
    })
    playerSetStatsRef.transaction((current) => {
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
