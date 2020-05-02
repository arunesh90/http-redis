import { RequestHandler } from 'fastify'
import { mainDB, callbackHandler } from '../db/redis'

const bulkDeleteKeyRoute: RequestHandler = async (request, reply) => {
  const { keys } = request.query

  if (!keys) {
    return reply.send('Missing key')
  }

  mainDB.DEL(keys.split(','), async (err) => callbackHandler(err, reply))
}

export default bulkDeleteKeyRoute
