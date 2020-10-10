const { db } = require('../src/plugins/firebase')
const { v4: uuidv4 } = require('uuid')
const playerNames = require('./player-names.js')
const process = require('process')
const moment = require('moment')

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
const bestOfOptions = [1,3,5,7,9,11,13]

for (let i = 0; i < 2; i++){
  const matchId = uuidv4()
  const player1Key = playerKeys[rand(0, (playerKeys.length/2)-1)]
  const player1 = dartsDev.players[player1Key]
  const player2Key = playerKeys[rand(Math.floor(playerKeys.length/2), playerKeys.length-1)]
  const player2 = dartsDev.players[player2Key]
  const bestOfSets = bestOfOptions[rand(0,bestOfOptions.length-1)]
  const bestOfLegs = bestOfOptions[rand(0,bestOfOptions.length-1)]
  const date = moment().add(-i, 'day').unix()
  const startPoints = rand(0,10) > 8 ? 301 : 501
  const matchName = `Test WK ${i + 1}`
  const winner = undefined
  const winnerName = undefined
  const players = {}


  dartsDev.playerMatches[player1Key] = dartsDev.playerMatches[player1Key] ? [...dartsDev.playerMatches[player1Key], matchId] : [matchId]
  dartsDev.playerMatches[player2Key] = dartsDev.playerMatches[player2Key] ? [...dartsDev.playerMatches[player2Key], matchId] : [matchId]

  players[player1Key] = {
    playerName: player1.playerName,
    statistics: {
      '180': 0,
      '9Dart': 0,
      'legsWon': 0,
      'setsWon': 0,
    },
  }
  players[player2Key] = {
    playerName: player2.playerName,
    statistics: {
      '180': 0,
      '9Dart': 0,
      'legsWon': 0,
      'setsWon': 0,
    },
  }

  const match = {
    bestOfSets,
    bestOfLegs,
    date,
    matchId,
    matchName,
    startPoints,
    players,
    winner,
    winnerName,
  }

  const matchDetail = {
    sets: {},
  }

  let setsWinPlayer1 = 0
  let setsWinPlayer2 = 0
  for (let setKey = 0; setKey < bestOfSets; setKey++){
    const setPlayers = {}

    setPlayers[player1Key] = {
      '180': 0,
      '9Dart': 0,
      'legsWon': 0,
    }
    setPlayers[player2Key] = {
      '180': 0,
      '9Dart': 0,
      'legsWon': 0,
    }

    matchDetail.sets[setKey] = {
      legs: {},
      players: setPlayers,
      winner: '',
    }

    let player1Wins = 0
    let player2Wins = 0

    for (let legKey = 0; legKey < bestOfLegs; legKey++){
      matchDetail.sets[setKey].legs[legKey] = {
        players: {},
        winner: '',
      }

      matchDetail.sets[setKey].legs[legKey].players[player1Key] = {}
      matchDetail.sets[setKey].legs[legKey].players[player2Key] = {}

      let legPointsPlayer1 = startPoints
      let legPointsPlayer2 = startPoints
      let turncount = 0
      let hasSetWinner = false

      while(legPointsPlayer1 > 0 && legPointsPlayer2 > 0) {
        matchDetail.sets[setKey].legs[legKey].players[player1Key][turncount] = {
          throws: {},
          total: 0,
        }

        matchDetail.sets[setKey].legs[legKey].players[player2Key][turncount] = {
          throws: {},
          total: 0,
        }
        let hasWinner = false
        for (let dartThrow = 0; dartThrow < 3; dartThrow++){
          const Player1Throw = getPlayerThrow(legPointsPlayer1)
          matchDetail.sets[setKey].legs[legKey].players[player1Key][turncount].throws[dartThrow] = {
            multiplier: Player1Throw.multiplier,
            points: Player1Throw.points,
          }

          const newPlayer1LegPoints = legPointsPlayer1 - getTotalThrowPoints(Player1Throw.multiplier, Player1Throw.points)
          if (newPlayer1LegPoints === 0 && Player1Throw.multiplier === 2){
            matchDetail.sets[setKey].legs[legKey].players[player1Key][turncount].total += getTotalThrowPoints(Player1Throw.multiplier, Player1Throw.points)
            matchDetail.sets[setKey].legs[legKey].winner = player1Key
            legPointsPlayer1 = newPlayer1LegPoints
            match.players[player1Key].statistics.legsWon++
            matchDetail.sets[setKey].players[player1Key].legsWon++
            hasWinner = true
            player1Wins++

            if(Object.keys(matchDetail.sets[setKey].legs[legKey].players[player1Key]).length === 3 && startPoints === 501){
              match.players[player1Key].statistics['9Dart']++
              matchDetail.sets[setKey].players[player1Key]['9Dart']++
            }
            break
          } else if(newPlayer1LegPoints > 1){
            matchDetail.sets[setKey].legs[legKey].players[player1Key][turncount].total += getTotalThrowPoints(Player1Throw.multiplier, Player1Throw.points)
            legPointsPlayer1 = newPlayer1LegPoints
          } else if (newPlayer1LegPoints <= 1){
            break
          }
        }

        if(matchDetail.sets[setKey].legs[legKey].players[player1Key][turncount].total === 180){
          match.players[player1Key].statistics['180']++
          matchDetail.sets[setKey].players[player1Key]['180']++
        }
        
        if(!hasWinner){
          for (let dartThrow = 0; dartThrow < 3; dartThrow++){
            const Player2Throw = getPlayerThrow(legPointsPlayer2)
            matchDetail.sets[setKey].legs[legKey].players[player2Key][turncount].throws[dartThrow] = {
              multiplier: Player2Throw.multiplier,
              points: Player2Throw.points,
            }

            const newPlayer2LegPoints = legPointsPlayer2 - getTotalThrowPoints(Player2Throw.multiplier, Player2Throw.points)
            if (newPlayer2LegPoints === 0 && Player2Throw.multiplier === 2){
              matchDetail.sets[setKey].legs[legKey].players[player2Key][turncount].total += getTotalThrowPoints(Player2Throw.multiplier, Player2Throw.points)
              matchDetail.sets[setKey].legs[legKey].winner = player2Key
              legPointsPlayer2 = newPlayer2LegPoints
              match.players[player2Key].statistics.legsWon++
              matchDetail.sets[setKey].players[player2Key].legsWon++
              player2Wins++

              if(Object.keys(matchDetail.sets[setKey].legs[legKey].players[player2Key]).length === 3 && startPoints === 501){
                match.players[player2Key].statistics['9Dart']++
                matchDetail.sets[setKey].players[player2Key]['9Dart']++
              }
              break
            } else if(newPlayer2LegPoints > 1){
              matchDetail.sets[setKey].legs[legKey].players[player2Key][turncount].total += getTotalThrowPoints(Player2Throw.multiplier, Player2Throw.points)
              legPointsPlayer2 = newPlayer2LegPoints
            } else if (newPlayer2LegPoints <= 1){
              break
            }
          }

          if(matchDetail.sets[setKey].legs[legKey].players[player2Key][turncount].total === 180){
            match.players[player2Key].statistics['180']++
            matchDetail.sets[setKey].players[player2Key]['180']++
          }
        } else {
          delete matchDetail.sets[setKey].legs[legKey].players[player2Key][turncount]
        }
        
        if( player1Wins === Math.ceil(bestOfLegs/2)){
          matchDetail.sets[setKey].winner = player1Key

          setsWinPlayer1++
          match.players[player1Key].statistics.setsWon++
          hasSetWinner = true
          
          break
        } else if(player2Wins === Math.ceil(bestOfLegs/2)){
          matchDetail.sets[setKey].winner = player2Key

          setsWinPlayer2++
          match.players[player2Key].statistics.setsWon++
          hasSetWinner = true
          break
        }

        turncount++
      }
      if(hasSetWinner) break
    }

    if(setsWinPlayer1 === Math.ceil(bestOfSets / 2)) {
      match.winner = player1Key
      match.winnerName = player1.playerName
      break
    } else if(setsWinPlayer2 === Math.ceil(bestOfSets / 2)){
      match.winner = player2Key
      match.winnerName = player2.playerName
      break
    }
  }

  dartsDev.matches[matchId] = {...match}
  dartsDev.matchDetails[matchId] = {...matchDetail}
}

function getTotalThrowPoints(multiplier, points){
  if(multiplier === 4){
    return 25
  } else if ( multiplier === 5){
    return 50
  } else {
    return  multiplier * points
  }
}

function getPlayerThrow(legPointsPlayer ){
  let throwObj = {
    multiplier: 0,
    points: 0,
  }
      
  if(!(legPointsPlayer % 2) && legPointsPlayer/2 <= 20) {
    if(legPointsPlayer > 25) {
      if(rand(0,10) > 2){
        throwObj.multiplier = 2
        throwObj.points = legPointsPlayer/2
      } else {
        throwObj.multiplier = rand(0,5)
        throwObj.points = throwObj.multiplier > 0 && throwObj.multiplier < 4 ? rand(1,20) :
          throwObj.multiplier === 0 ? 0 :
            throwObj.multiplier === 4 ? 25 : 50
      }
    } else {
      if(rand(0,15) > 1) {
        throwObj.multiplier = 2
        throwObj.points = legPointsPlayer / 2
      } else {
        throwObj.multiplier = rand(3,5)
        throwObj.points = throwObj.multiplier > 0 && throwObj.multiplier < 4 ? rand(1,20) :
          throwObj.multiplier === 0 ? 0 :
            throwObj.multiplier === 4 ? 25 : 50
      }
    }
  } else {
    if(legPointsPlayer >= 180){
      if(rand(0,9) >= 5){
        throwObj.multiplier = rand(0,5)
        throwObj.points = throwObj.multiplier > 0 && throwObj.multiplier < 4 ? rand(1,20) :
          throwObj.multiplier === 0 ? 0 :
            throwObj.multiplier === 4 ? 25 : 50
      } else {
        throwObj.multiplier = 3
        throwObj.points = 20
      }
    } else if(legPointsPlayer === 141){
      throwObj.multiplier = 3
      throwObj.points = 20
    }
    else if(legPointsPlayer === 81){
      throwObj.multiplier = 3
      throwObj.points = 19
    }
    else {
      if(legPointsPlayer % 2 && legPointsPlayer < 40) {
        throwObj.multiplier = 1
        let randomNumberThrow = rand(1,legPointsPlayer < 21 ? legPointsPlayer : 20)
        throwObj.points = !(randomNumberThrow % 2) ? randomNumberThrow + 1 : randomNumberThrow
      } else {
        throwObj.multiplier = rand(0,5)
        throwObj.points = throwObj.multiplier > 0 && throwObj.multiplier < 4 ? rand(1,20) :
          throwObj.multiplier === 0 ? 0 :
            throwObj.multiplier === 4 ? 25 : 50
      }
    }
  }
  
  return throwObj
}

function rand(min, max){
  return Math.floor(Math.random() * (max-min+1)) + min
}

// console.log(dartsDev)
// process.exit(0)

const test = async () => {
  await db.ref('matches').set(dartsDev.matches)
  await db.ref('players').set(dartsDev.players)
  await db.ref('matchDetails').set(dartsDev.matchDetails)
  await db.ref('playerMatches').set(dartsDev.playerMatches)

  console.log('Done')
  process.exit(0)
}

test()


