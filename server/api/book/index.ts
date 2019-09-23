import Router from 'koa-router'
import BookController from '@Server/api/book/BookController'
import { fromCacheMiddleware, setCache, weakCache } from '@Server/api/book/BookCache'

const router = new Router()

router
  .get('/', fromCacheMiddleware, BookController.list, setCache)
  .post('/', BookController.addBook, weakCache)
  .delete('/:id', BookController.deleteById, weakCache)
  .patch('/:id', BookController.patchBook, weakCache)
  .get('/:id', BookController.getById, weakCache)

export default router
