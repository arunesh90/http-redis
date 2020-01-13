import { Worker } from "worker_threads";
import uuid from "uuid"

export default class WorkersController {
  workers: Worker[] = [];

  constructor(workerCount: number, fileName: string) {
    if (workerCount <= 0) {
      throw new Error('Invalid count of workers given')
    }

    for (let i = 0; i < workerCount; i++) {
      const worker = new Worker(fileName)
      worker.setMaxListeners(500)

      this.workers.push(worker);
    }
  }

  async roundRobinAsyncExec(event: string, data: any) {
    return new Promise(resolve => {
      const eventID = uuid();
      const worker = this.workers.shift()!;
      this.workers.push(worker);

      worker.postMessage({ eventID, event, data });

      const eventListener = (msg: any) => {
        if (msg.eventID === eventID) {
          worker.removeListener("message", eventListener);
          resolve(msg.data);
        }
      };

      worker.on("message", eventListener);
    });
  }
}
