import { matches, matchDetails } from '@/plugins/firebase'

const MatchClient = {
  getMatch: async (matchId) => {
    const match = await matches.child(matchId).once('value').then(snap => snap.val())
    const matchDetailsData = await matchDetails.child(matchId).once('value').then(snap => snap.val())
    return { match, matchDetails: matchDetailsData }
  },
}

export default MatchClient
