import { matches, matchDetails } from '@/plugins/firebase'
import { saveAs } from 'file-saver'

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
  exportMatches: async (matchIds) => {
    const matchesData = matchIds.map(async matchId => {
      const match = await matches.child(matchId).once('value').then(snapshot => snapshot.val())
      const matchDetailsData = await matchDetails.child(matchId).once('value').then(snapshot => snapshot.val())
      return { match, matchDetails: matchDetailsData }
    })
    Promise.all(matchesData).then((values) => {
      let blob = new Blob([JSON.stringify({ matches: values }, null, 2)], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'dartinmolema.json')
    })
  },
}

export default DashboardClient
