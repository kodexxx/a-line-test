import { Context } from 'koa'

export default class BookController {
  static addBook(ctx: Context) {
    ctx.body = 'OKgi'
  }

  static list(ctx: Context) {
    ctx.body = [
      {
        title: 'Book1'
      }
    ]
  }
}
