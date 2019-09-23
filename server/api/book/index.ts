import Router from 'koa-router'
import BookController from '@Server/api/book/BookController'
import { fromCacheMiddleware, setCache, weekCache } from '@Server/api/book/BookCache'

const router = new Router()

router
  .get('/', fromCacheMiddleware, BookController.list, setCache)
  .post('/', BookController.addBook, weekCache)
  .delete('/:id', BookController.deleteById, weekCache)
  .put('/:id')
  .get('/:id', BookController.getById, weekCache)

export default router
