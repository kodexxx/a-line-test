import Router from 'koa-router'
import bookRoute from '@Server/api/book'

const router = new Router()

router.use('/book', bookRoute.middleware())

export default router
