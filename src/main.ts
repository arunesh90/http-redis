// Create cluster
import cluster from 'cluster'
import os from 'os'

if (cluster.isMaster) {
  console.log(0)
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  console.log(1)
  require('./initialize')
}
