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
  createMatch: (data) => {
    console.log(data)
  },
}

export default MatchClient
