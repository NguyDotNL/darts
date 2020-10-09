const { v4: uuidv4 } = require('uuid')
const playerNames = require('./test-data.js')
const process = require('process')

const dartsDev = {
  matchDetails: {},
  matches: {},
  playerMatches: {},
  players: {},
}

for (let i = 0; i < playerNames.names.length; i++) {
  const playerObj = {
    playerId: uuidv4(),
    playerName: playerNames.names[i],
  }

  dartsDev.players[playerObj.playerId] = {...playerObj}
}

const playerKeys = Object.keys(dartsDev.players)
for (let i = 0; i < 2; i++){
  const matchId = uuidv4()
  const player1 = playerKeys[Math.floor(Math.random() * playerKeys.length)]
}

console.log(dartsDev)
process.exit(0)
