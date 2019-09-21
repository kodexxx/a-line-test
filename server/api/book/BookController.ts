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

  static list(ctx: Context) {
    ctx.body = [
      {
        title: 'Book1',
      },
    ]
  }
}
