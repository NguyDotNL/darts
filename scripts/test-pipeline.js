const process = require('process')

const params = require('minimist')(process.argv.slice(2))
const branch = params.branch

console.log(branch)