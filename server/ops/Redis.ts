import redis from 'redis'
import Config from '@Server/Config'

const client = redis.createClient(Config.redis.port)

client.on('error', (err) => {
  console.log('Error ' + err)
})


