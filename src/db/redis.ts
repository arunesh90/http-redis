import Redis from 'redis'
import { FastifyReply } from 'fastify'
import { ServerResponse } from 'http'

const host = process.env.REDIS_HOST || '127.0.0.1'
const port = Number(process.env.REDIS_PORT) || 6379

export const mainDB = Redis.createClient({
  host,
  port,
  password: process.env.REDIS_PASS
})

export const callbackHandler = (err: Error | null, reply: FastifyReply<ServerResponse>) => {
  if (err) {
    return reply.status(500).send(err)
  } else {
    return reply.send('OK')
  }
}
