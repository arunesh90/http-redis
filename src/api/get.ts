import { app } from '../main'
import path from 'path'
import WorkersController from '../workersController'

const redisWorkers = new WorkersController(Number(process.env.WORKER_COUNT) || 8, path.join(__dirname, '../workerLoader.js'))

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
