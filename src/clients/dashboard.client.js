import { matches } from '@/plugins/firebase'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),
  getMatchesPerPage: (offset, date) => matches.orderByChild('date').startAt(date).limitToFirst(offset)
    .once('value').then(snapshot => snapshot.val()),
}

export default DashboardClient
