
const { db } = require('../src/plugins/firebase')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const testData = require('./test-data.js')
const isEqual = require('lodash/isEqual')

// Data
const matchData = testData.match1
const matchDetailsData = testData.match1Details
const totalNames = testData.names.length

// Results
let players = {}
let matches = {}
let matchDetails = {}

// Generate players
for(let i = 0; i < totalNames; i++) {
  const playerId = uuidv4()
  players[playerId] = {
    playerId,
    playerName: testData.names[i],
    matches: [],
  }
}

const getRandomPlayer = (except = null) => {
  let keys = Object.keys(players)
  const player = players[keys[ keys.length * Math.random() << 0]]
  if(except && isEqual(player, except)) {
    return getRandomPlayer(except)
  }
  return player
}

// Generate matches
for(let i = 0; i < 1000; i++) {
  const winner = getRandomPlayer()
  const loser = getRandomPlayer(winner)
  const matchId = uuidv4()
  const date = moment().format()
  const matchName = `WK ${i + 1}`

  matches[matchId] = {
    ...matchData,
    matchId,
    matchName,
    date,
    winner: winner.playerId,
    winnerName: winner.playerName,
    players: {
      [winner.playerId]: {
        ...matchData.players.player2,
        playerName: winner.playerName,
      },
      [loser.playerId]: {
        ...matchData.players.player1,
        playerName: loser.playerName,
      },
    },
  }

  matchDetails[matchId] = {
    ...matchDetailsData,
    winner: winner.playerId,
    players: {
      [winner.playerId]: matchDetailsData.set1.players.player2,
      [loser.playerId]: matchDetailsData.set1.players.player1,
    },
  }

  for(let i = 1; i < 9; i++) {
    const winnerPlaceholder = matchDetails[matchId].set1[`leg${i}`].winner
    matchDetails[matchId].set1[`leg${i}`].winner = winnerPlaceholder === 'player2' ? winner.playerId : loser.playerId
  }

  players[winner.playerId].matches.push(matchId)
  players[loser.playerId].matches.push(matchId)
}

db.ref('matches').set(matches, error => console.log(error))
db.ref('players').set(players)
db.ref('matchDetails').set(matchDetails)



