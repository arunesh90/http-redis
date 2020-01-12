import { app } from '../main'
import { mainDB, callbackHandler } from '../db/redis'
import { brotliCompressSync } from 'zlib'

export interface RedisEntry {
  ttl?: number,
  compression?: 'brotli',
  value: string,
}

app.post('/api/set/:key', async (request, reply) => {
  const { key }             = request.params
  const setBody: RedisEntry = request.body
  let   setValue            = setBody.value

  if (!key) {
    return reply.send('Missing key')
  }

  if (!setValue) {
    return reply.status(400).send('Missing value in body')
  }

  // Compression
  switch (setBody.compression) {
    case 'brotli': {
      const compressedBuffer = brotliCompressSync(Buffer.from(setValue))
            setValue         = compressedBuffer.toString('base64')
      break
    }

    default: {
      return reply.status(400).send('Unknown compression method')
    }
  }

  const stringifiedBody = JSON.stringify({
    compression: setBody.compression,
    value      : setValue
  })
  if (setBody.ttl) {
    mainDB.SET(key, stringifiedBody, 'EX', setBody.ttl, (err) => callbackHandler(err, reply))
  } else {
    mainDB.SET(key, stringifiedBody, (err) => callbackHandler(err, reply))
  }
})
