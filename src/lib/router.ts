import { app } from './initialize'
import { FastifyInstance } from 'fastify'
import getKeyRoute from './api/get'
import setKeyRoute from './api/set'
import deleteKeyRoute from './api/delete'
import bulkDeleteKeyRoute from './api/bulkDelete'
import pingRoute from './api/ping'

const authKey = process.env.AUTH_KEY

const apiRouter = async (app: FastifyInstance) => {
  app.use((req, res, next) => {
    if (!authKey) {
      return next()
    }

    const authHeader = req.headers.authorization
    if (authHeader !== authKey) {
      res.statusCode = 401
      res.write('Invalid authorization code')
      return res.end()
    }

    next()
  })

  app.get('/ping', pingRoute)
  app.get('/get/:key', getKeyRoute)
  app.post('/set/:key', setKeyRoute)
  app.delete('/delete/:key', deleteKeyRoute)
  app.delete('/bulkDelete', bulkDeleteKeyRoute)
}

app.register(apiRouter, {
  prefix: '/api'
})
