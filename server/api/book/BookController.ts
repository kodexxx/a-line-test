import { Context } from 'koa'
import { BookModel, IBook } from '@Server/api/book/BookModel'

export default class BookController {
  static async addBook(ctx: Context) {
    const bookData: IBook = ctx.request.body

    if (bookData.date) {
      bookData.date = new Date(bookData.date)
    }

    const book = new BookModel(bookData)

    ctx.body = await book.save()
  }

  static async list(ctx: Context) {
    const result = await BookModel.find()
    ctx.body = result
  }

  static async getById(ctx: Context) {
    const { id } = ctx.params
    ctx.body = await BookModel.findById(id)
  }
}
