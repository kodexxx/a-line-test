import Koa from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import Config from '@Server/Config'

import apiRoute from '@Server/api'
import Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.use('/api', apiRoute.middleware())

app
  .use(logger())
  .use(json())
  .use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const code = err.statusCode || err.status || 500

      err.status = code
      ctx.body = {
        code,
        error: err.message,
        name: err.name,
      }
      ctx.app.emit('error', err, ctx)
    }
  })
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(Config.port, () => {
  console.log(`Server successfully started on :${Config.port}`)
})
