import { matches, matchDetails } from '@/plugins/firebase'
import { saveAs } from 'file-saver'

const DashboardClient = {
  getAllMatches: (options) => options.iKnowThisCanBeALotOfDataThatIProbablyDontNeed === true &&
    matches.once('value').then(snapshot => snapshot.val()),
  getMatchesPerPage: (offset, date = null) => {
    const query = date == null
      ? matches.orderByChild('date').limitToLast(offset)
      : matches.orderByChild('date').endAt(date).limitToLast(offset)
    return query.once('value').then(snapshot => Object.values(snapshot.val()).sort((a, b) => b.date - a.date))
  },
  searchMatchesByName: (queryText) => matches.orderByChild('matchName').startAt(queryText).endAt(queryText+'\uf8ff').limitToFirst(10)
    .once('value').then(snapshot => Object.values(snapshot.val()).sort((a,b) => 
      a.matchName < b.matchName ? -1 : a.matchName > b.matchName ? 1 : 0,
    )),
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
