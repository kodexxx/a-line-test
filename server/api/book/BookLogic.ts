import { BookModel, IBook } from '@Server/api/book/BookModel'
import get from 'lodash/get'
import BookQueryBuilder, { IFilter, IOffsetFilter } from '@Server/api/book/BookQueryBuilder'

export interface IOffsetResult {
  docs: BookModel[]
  total: number
  totalPages: number
  currentPage: number
  limit: number
}

export default class BookLogic {
  public static async createBook(book: IBook): Promise<number> {
    const bookModel = new BookModel(book)

    const [result] = await bookModel.save()
    return get(result, 'insertId')
  }

  public static async getBooks(filter: IFilter, offsetFilter: IOffsetFilter): Promise<IOffsetResult> {
    const filterData = BookQueryBuilder.getFilter(filter)
    const offsetFilterData = BookQueryBuilder.getFilterLimit(offsetFilter)
    const findFilter = BookQueryBuilder.mergeFilters(filterData, offsetFilterData)

    const books = await BookModel.find(findFilter)
    const total = await BookModel.getTotalBooks(filterData)

    return {
      docs: books,
      total,
      totalPages: Math.ceil(total / offsetFilter.limit),
      currentPage: offsetFilter.page,
      limit: offsetFilter.limit,
    }
  }

  public static async deleteBookById(id: number): Promise<void> {
    await BookModel.deleteById(id)
  }

  public static async updateBookById(book: IBook, id: number): Promise<void> {
    await BookModel.updateById(book, id)
  }
}
