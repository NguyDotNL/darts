import { matches } from '@/plugins/firebase'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),
  getMatchesPerPage: (offset, date = null) => {
    const query = date == null
      ? matches.orderByChild('date').limitToLast(offset)
      : matches.orderByChild('date').endAt(date).limitToLast(offset)
    return query.once('value').then(snapshot => Object.values(snapshot.val()).sort((a, b) => b.date - a.date))
  },
}

export default DashboardClient
