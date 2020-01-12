import 'dotenv/config'
import fastify from 'fastify'

export const app = fastify({
  logger: false
})

// Load routes
import './api/get'
import './api/set'

app.listen(Number(process.env.APP_PORT) || 8080)
