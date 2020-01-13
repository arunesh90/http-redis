import { app } from '../main'
import WorkersController from '../workersController'

const redisWorkers = new WorkersController(8, './workerLoader.js')

app.get('/api/get/:key', async (request, reply) => {
  const { key } = request.params

  if (!key) {
    return reply.send('Missing key')
  }

  const keyInfo = await redisWorkers.roundRobinAsyncExec('get-redis', {
    key
  })

  return reply.send(keyInfo)
})
