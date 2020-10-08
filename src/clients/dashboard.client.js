import { matches } from '@/plugins/firebase'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),
  getMatchesByPage: (offset, startKey) => matches.orderByChild('date').startAt(startKey).limitToFirst(offset + 1)
    .once('value').then(snapshot => snapshot.val()),
}

export default DashboardClient
