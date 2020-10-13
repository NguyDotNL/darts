import { matches } from '@/plugins/firebase'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),

  getMatchesPerPage: (offset, date = false, type = false) => {
    const query = !type
      ? matches.orderByChild('date').limitToLast(offset)
      : type == 'prev' ? matches.orderByChild('date').limitToFirst(offset).startAt(date + 1)
        : type == 'next' ? matches.orderByChild('date').limitToLast(offset).endAt(date - 1) : matches.orderByChild('date').limitToLast(offset)

    return query.once('value').then(snapshot => Object.values(snapshot.val()).sort((a, b) => b.date - a.date))
  },
  searchMatchesByName: (queryText, itemsPerPage) => matches.orderByChild('matchName').startAt(queryText).endAt(queryText+'\uf8ff').limitToFirst(itemsPerPage)
    .once('value').then(snapshot => snapshot.val() ? Object.values(snapshot.val()).sort((a,b) =>
      a.matchName < b.matchName ? -1 : a.matchName > b.matchName ? 1 : 0,
    ) : []),
}

export default DashboardClient
