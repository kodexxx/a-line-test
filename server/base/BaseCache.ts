import { client } from '@Server/ops/Redis'

export abstract class BaseCache {
  private readonly entity: string

  protected constructor(entity: string) {
    this.entity = entity
  }

  set(key: any, value: string) {
    return new Promise((resolve, reject) => {
      client.hset(this.entity, this.calculateKey(key), value, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      client.hgetall(this.entity, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      client.del(this.entity, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  get(key: any):Promise<string> {
    return new Promise((resolve, reject) => {
      client.hget(this.entity, this.calculateKey(key), (err, result: string) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }

  abstract calculateKey(key: any): string
}
