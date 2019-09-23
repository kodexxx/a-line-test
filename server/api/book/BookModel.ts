import { Connection } from '@Server/ops/MySQLConnection'
import StringHelper from '@Server/hellpers/StringHelper'
import get from 'lodash/get'

export interface IBook {
  id?: number
  title: string,
  date: Date | string,
  author: string,
  description?: string,
  image?: string,
}

export const FIELDS = ['id', 'title', 'date', 'author', 'description', 'image']


export class BookModel {
  public book: IBook

  constructor(book: IBook) {
    this.book = book
  }

  static async find(subQuery: string = ''): Promise<BookModel[]> {
    const query = `SELECT ${FIELDS.join(', ')} FROM books ${subQuery}`
    const [data, _] = await Connection.execute(query)

    const result: BookModel[] = []

    for (const item of data) {
      result.push(new BookModel(item))
    }
    return result
  }

  static async getTotalBooks(condition: string = ''): Promise<number> {
    const [data, _] = await Connection.execute('SELECT COUNT(*) FROM books ' + condition)
    const result = get(data, '0.COUNT(*)')

    if (typeof result === 'undefined') {
      throw new Error('Can`t get total count of books')
    }

    return result as number
  }

  static async deleteById(id: number): Promise<void> {
    const result = await Connection.execute(`DELETE FROM books WHERE \`id\`=${StringHelper.getPreparedValue(id)}`)

    if (get(result, '0.affectedRows') !== 1) {
      throw new Error(`Book with id=${id} not found`)
    }
  }

  static async findById(id: number): Promise<BookModel> {
    const [data, _] = await Connection.execute(`SELECT ${FIELDS.join(',')} FROM books WHERE \`id\`=${StringHelper.getPreparedValue(id)}`)

    if (typeof data[0] === 'undefined') {
      throw new Error(`Book with id=${id} not found`)
    }

    return new BookModel(data[0])
  }

  static async updateById(book: IBook, id: number) {
    const data = StringHelper.getPreparedData(FIELDS, book)
    const preparedData = data.reduce((accum: string[], item) => accum.concat(item.key + '=' + item.value), []).join(',')

    const query = `UPDATE 
       books
       SET ${preparedData} 
       WHERE \`id\`=${StringHelper.getPreparedValue(id)}`

    return Connection.execute(query)
  }

  toJSON(): IBook {
    return this.book
  }

  save() {
    const data = StringHelper.getPreparedData(FIELDS, this.book)

    const query = `INSERT 
       INTO books(${Object.keys(data).join(',')}) 
       VALUES(${Object.values(data).join(',')})`

    return Connection.execute(query)
  }
}
