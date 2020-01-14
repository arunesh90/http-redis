const path = require('path')
const fs   = require('fs')

const TSworkerFile = path.resolve(__dirname, './redisWorker.ts')
const JSworkerFile = path.resolve(__dirname, './redisWorker.js')

if (fs.existsSync(TSworkerFile)) {
  require('ts-node').register()
  require(TSworkerFile)
} else {
  require(JSworkerFile)
}
