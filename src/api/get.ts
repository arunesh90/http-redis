import { app } from '../initialize'
import { mainDB } from '../db/redis'
import { RedisEntry } from './set'
import { brotliDecompressSync } from 'zlib'

app.get('/api/get/:key', async (request, reply) => {
  const { key } = request.params

  if (!key) {
    return reply.send('Missing key')
  }

  mainDB.GET(key, async (err, redisEntry) => {
    if (err) {
      return reply.status(500).send(err)
    } if (!redisEntry) {
      return reply.send({
        found: false
      })
    }

    let parsedEntry: RedisEntry = JSON.parse(redisEntry)

    // Uncompress as needed
    switch (parsedEntry.compression) {
      case 'brotli': {
        const test = Buffer.from(parsedEntry.value, 'base64')
        const decompressedBuffer = brotliDecompressSync(test)
              parsedEntry.value  = decompressedBuffer.toString()
        break
      }
    }

    return reply.send({ 
      found      : !!parsedEntry,
      compression: parsedEntry.compression,
      value      : parsedEntry.value
    })
  })
})
