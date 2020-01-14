import fastify from 'fastify'

export const app = fastify({
  logger: false,
})

// Load routes
import './api/get'
import './api/set'

const appPort = Number(process.env.APP_PORT) || 8080
app.listen(appPort, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on ${appPort}`)
})
