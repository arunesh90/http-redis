import fastify from 'fastify'

export const app = fastify({
  logger: false,
})

// Load router
import './router'

const appPort = Number(process.env.APP_PORT) || 8080
app.listen(appPort, '0.0.0.0', (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on ${appPort}`)
})
