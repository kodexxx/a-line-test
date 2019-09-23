import redis, { ClientOpts } from 'redis'
import Config from '@Server/Config'

export const client = redis.createClient(Config.redis as ClientOpts)
