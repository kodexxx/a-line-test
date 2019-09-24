import Koa from 'koa'
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import Config from '@Server/Config'

import apiRoute from '@Server/api'
import { errorMiddleware } from '@Server/errors/ErrorMiddleware'
import Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.use('/api', apiRoute.middleware())

app
  .use(logger())
  .use(json())
  .use(errorMiddleware)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(Config.port, () => {
  console.log(`Server successfully started on :${Config.port}`)
})
