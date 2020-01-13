import { mainDB } from "./db/redis";
import { parentPort } from "worker_threads";
import { promisify } from "util";
import { RedisEntry } from "./api/set";
import { brotliDecompressSync } from "zlib";

interface WorkerMessage {
  eventID: string;
  event  : string;
  data   : any;
}

const asyncRedisGet = promisify(mainDB.get).bind(mainDB);

parentPort!.on("message", async (msg: WorkerMessage) => {

  switch (msg.event) {
    case "get-redis": {
      const redisEntry              = await asyncRedisGet(msg.data.key);
      let   parsedEntry: RedisEntry = JSON.parse(redisEntry);

      // Uncompress as needed
      switch (parsedEntry.compression) {
        case "brotli": {
          const test               = Buffer.from(parsedEntry.value, "base64");
          const decompressedBuffer = brotliDecompressSync(test);
                parsedEntry.value  = decompressedBuffer.toString();
          break;
        }
      }

      return parentPort!.postMessage({
        eventID: msg.eventID,
        event: msg.event,
        data: {
          found: !!parsedEntry,
          compression: parsedEntry.compression,
          value: parsedEntry.value
        }
      });
    }
  }
});
