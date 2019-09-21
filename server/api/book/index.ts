import Router from 'koa-router'
import BookController from '@Server/api/book/BookController'

const router = new Router()

router
  .get('/', BookController.list)
  .get('/:id', BookController.getById)
  .post('/', BookController.addBook)

export default router
