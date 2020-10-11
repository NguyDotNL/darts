import {matches, matchDetails, playerMatches} from '@/plugins/firebase'

const MatchClient = {
  getMatch: async (matchId) => {
    const match = await matches.child(matchId).once('value').then(snap => snap.val())
    const matchDetailsData = await matchDetails.child(matchId).once('value').then(snap => snap.val())
    return { match, matchDetails: matchDetailsData }
  },
  deleteMatch: async (matchId) => {
    const matchIsDeleted = await matches.child(matchId).once('value').then(snap => {
      if(snap.val() != null){
        playerMatches.child(Object.keys(snap.val().players)[0]).child(matchId).remove()
        playerMatches.child(Object.keys(snap.val().players)[1]).child(matchId).remove()
        matchDetails.child(matchId).remove()
        matches.child(matchId).remove()
        return true
      }
      return false
    })
    
    return matchIsDeleted
  },
}

export default MatchClient
