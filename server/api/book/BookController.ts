import { Context } from 'koa'
import { BookModel, IBook } from '@Server/api/book/BookModel'
import BookLogic from '@Server/api/book/BookLogic'
import StringHelper from '@Server/hellpers/StringHelper'

export default class BookController {
  static async addBook(ctx: Context) {
    const bookData: IBook = ctx.request.body

    if (bookData.date) {
      bookData.date = new Date(bookData.date)
    }

    ctx.body = await BookLogic.createBook(bookData)
  }

  static async list(ctx: Context) {
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
  }


  // static async list(ctx: Context) {
  //   const { limit, page } = ctx.query
  //   ctx.body = await BookModel.findWithOffset({
  //     limit: StringHelper.parseNumber(limit, 10),
  //     page: StringHelper.parseNumber(page, 0),
  //   })
  // }

  static async getById(ctx: Context) {
    const { id } = ctx.params
    ctx.body = await BookModel.findById(id)
  }
}
