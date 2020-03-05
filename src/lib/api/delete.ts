import { RequestHandler } from 'fastify';
import { mainDB, callbackHandler } from '../db/redis';

const deleteKeyRoute: RequestHandler = async (request, reply) => {
  const { key } = request.params

  if (!key) {
    return reply.send('Missing key')
  }

  mainDB.DEL(key, async (err) => callbackHandler(err, reply))
}

export default deleteKeyRoute
