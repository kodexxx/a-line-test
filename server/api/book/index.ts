import Router from 'koa-router'
import BookController from '@Server/api/book/BookController'

const router = new Router()

router
  .get('/', BookController.list)
  .post('/', BookController.addBook)
  .delete('/:id', BookController.deleteById)
  // .put('/:id')
  .get('/:id', BookController.getById)

export default router
