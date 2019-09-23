import { BaseCache } from '@Server/base/BaseCache'
import { Context } from 'koa'

export class BookCache extends BaseCache {
  constructor() {
    super('books')
  }

  calculateKey(key: any): string {
    return JSON.stringify(key)
  }
}

export enum CacheStatus {
  hit = 'HIT',
  miss = 'MISS'
}

export const CACHE_HEADER = 'X-Cache'

const cache = new BookCache()

export async function fromCacheMiddleware(ctx: Context, next: () => Promise<any>) {
  const key = {
    query: ctx.query,
  }

  const data = JSON.parse(await cache.get(key))

  if (data) {
    ctx.set(CACHE_HEADER, CacheStatus.hit)
    ctx.body = data
    return
  }
  ctx.set(CACHE_HEADER, CacheStatus.miss)
  await next()
}

export async function setCache(ctx: Context, next: () => Promise<any>) {
  const key = {
    query: ctx.query,
  }
  await cache.set(key, JSON.stringify(ctx.body))
  await next()
}

export async function weekCache(ctx: Context, next: () => Promise<any>) {
  await cache.deleteAll()
  await next()
}
