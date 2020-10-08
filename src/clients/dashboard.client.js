import { matches } from '@/plugins/firebase'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),
  //startkey = matchid van laatste match die vorige keer is opgehaald (kan leeg zijn). offset = aantal matches dat moet worden opgehaald
  getMatchesPerPage: (offset, startKey) => matches.orderByChild('date').startAt(startKey).limitToFirst(offset)
    .once('value').then(snapshot => snapshot.val()),
  //getSearchedMatches: (offset) =>matches.orderByChild('date').e
}

export default DashboardClient
