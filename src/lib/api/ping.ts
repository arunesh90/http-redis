import { RequestHandler, FastifyReply } from 'fastify'
import { performance } from 'perf_hooks'
import { pingAsync } from '../utils/promisfiedCommands'
import { ServerResponse } from 'http'

const timeout = 1000

const timeoutHandler = (reply: FastifyReply<ServerResponse>) => {
  reply.status(408).send('Ping attempt timed out') 
}

const pingRoute: RequestHandler = async (_request, reply) => {
  const beginTime    = performance.now()
  const timeoutTimer = setTimeout(() => timeoutHandler(reply), timeout)
  const ping         = await pingAsync()

  clearTimeout(timeoutTimer)

  if (ping !== 'PONG') {
    return reply.status(500).send(`Received unexpected ping response: ${ping}`)
  }

  reply.send(performance.now() - beginTime)
}

export default pingRoute
