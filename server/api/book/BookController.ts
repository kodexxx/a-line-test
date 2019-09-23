import { Context } from 'koa'
import { BookModel, IBook } from '@Server/api/book/BookModel'
import BookLogic from '@Server/api/book/BookLogic'
import StringHelper from '@Server/hellpers/StringHelper'

export default class BookController {
  static async addBook(ctx: Context, next: () => Promise<any>) {
    const bookData: IBook = ctx.request.body

    if (bookData.date) {
      bookData.date = new Date(bookData.date)
    }

    ctx.body = await BookLogic.createBook(bookData)
    await next()
  }

  static async list(ctx: Context, next: () => Promise<any>) {
    const { title, author } = ctx.query
    const { limit, page } = ctx.query
    ctx.body = await BookLogic.getBooks({
        title,
        author,
      }, {
        limit: StringHelper.parseNumber(limit, 10),
        page: StringHelper.parseNumber(page, 0),
      },
    )
    await next()
  }

  static async deleteById(ctx: Context, next: () => Promise<any>) {
    const { id } = ctx.params
    await BookLogic.deleteBookById(id)
    ctx.body = {
      result: 'ok',
    }
    await next()
  }

  static async getById(ctx: Context, next: () => Promise<any>) {
    const { id } = ctx.params

    ctx.body = await BookModel.findById(id)

    await next()
  }

  static async patchBook(ctx: Context, next: () => Promise<any>) {
    const bookData: IBook = ctx.request.body
    const { id } = ctx.params

    ctx.body = await BookLogic.updateBookById(bookData, id)

    await next()
  }
}
