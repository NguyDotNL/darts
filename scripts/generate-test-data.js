
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
let playerMatches = {}

// Generate players
for(let i = 0; i < totalNames; i++) {
  const playerId = uuidv4()
  players[playerId] = {
    playerId,
    playerName: testData.names[i],
  }
}

// Generate player matches
Object.values(players).map(player => {
  playerMatches[player.playerId] = []
})

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
  const date = moment().add(-i, 'day').unix()
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
    sets: {
      0: {
        winner: winner.playerId,
        players: {
          [winner.playerId]: matchDetailsData.sets[0].players.player2,
          [loser.playerId]: matchDetailsData.sets[0].players.player1,
        },
        legs: testData.legs,
      },
    },

  }

  for(let i = 0; i < 8; i++) {
    const winnerPlaceholder = matchDetailsData.sets[0].legs[i].winner
    matchDetails[matchId].sets[0].legs[i].winner = winnerPlaceholder === 'player2' ? winner.playerId : loser.playerId
    matchDetails[matchId].sets[0].legs[i].players[winner.playerId] = matchDetailsData.sets[0].legs[i].players.player2
    matchDetails[matchId].sets[0].legs[i].players[loser.playerId] = matchDetailsData.sets[0].legs[i].players.player1
    
  }

  playerMatches[winner.playerId].push(matchId)
  playerMatches[loser.playerId].push(matchId)
}

db.ref('matches').set(matches)
db.ref('players').set(players)
db.ref('matchDetails').set(matchDetails)
db.ref('playerMatches').set(playerMatches)



