import {matches, matchDetails, playerMatches} from '@/plugins/firebase'

const MatchClient = {
  getMatch: async (matchId) => {
    const match = await matches.child(matchId).once('value').then(snap => snap.val())
    const matchDetailsData = await matchDetails.child(matchId).once('value').then(snap => snap.val())
    return { match, matchDetails: matchDetailsData }
  },
  deleteMatch: async (matchId) => {
    return await matches.child(matchId).once('value').then(snap => {
      const data = snap.val()
      const playerKeys = Object.keys(data.players)

      if(data){
        playerMatches.child(playerKeys[0]).child(matchId).remove()
        playerMatches.child(playerKeys[1]).child(matchId).remove()
        matchDetails.child(matchId).remove()
        matches.child(matchId).remove()
        return true
      }
      return false
    })
  },
}

export default MatchClient
