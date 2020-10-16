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
    console.log(matchId)
    // Set Match
    matches.child(matchId).set(data)

    // Set Player Matches
    for(const id of playersId) {
      console.log(id)
      playerMatches.child(id).child(matchId).set(matchId)
    }

    // Set Match Details
    matchDetails.child(matchId).set({
      sets: {
        0: {
          legs: {
            0: {
              players: {
                [playersId[0]]: {},
                [playersId[1]]: {},
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
}

export default MatchClient
