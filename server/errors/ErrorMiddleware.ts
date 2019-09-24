import { Context } from 'koa'
import BaseGatewayError from '@Server/errors/gateway/BaseGatewayError'

export async function errorMiddleware(ctx: Context, next: () => Promise<any>) {
  try {
    await next()
  } catch (err) {
    if (err instanceof BaseGatewayError) {
      ctx.status = err.statusCode

      ctx.body = {
        code: err.statusCode,
        error: err.message,
        name: err.name,
      }
    } else {
      ctx.status = 500

      ctx.body = {
        error: err.message,
        name: err.name,
      }
    }

    ctx.app.emit('error', err, ctx)
  }
}
