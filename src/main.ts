// Create cluster
import 'dotenv/config'
import cluster from 'cluster'
import os from 'os'

if (process.env.DISABLE_CLUSTER !== "true" && cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  require('./lib/initialize')
}
