const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
}
firebase.initializeApp(firebaseConfig)

// Utils
const db = firebase.database()

// Database references
const matches = db.ref('matches')
const matchDetails = db.ref('matchDetails')
const players = db.ref('players')

// Export utils/refs
module.exports = {
  db,
  matches,
  matchDetails,
  players,
}
