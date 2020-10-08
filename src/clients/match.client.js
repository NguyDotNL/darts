import { matchDetails } from '@/plugins/firebase'

const MatchClient = {
  getMatchDetails: (matchID) => matchDetails.child(matchID).once('value').then(snapshot => snapshot.val()),
}

export default MatchClient
