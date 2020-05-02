import { promisify } from 'util'
import { mainDB } from '../db/redis'

export const pingAsync = promisify(mainDB.ping).bind(mainDB)
