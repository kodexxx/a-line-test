import { Connection } from '@Server/ops/MySQLConnection'
import StringHelper from '@Server/hellpers/StringHelper'

export interface IBook {
  id?: number
  title: string,
  date: Date | string,
  author: string,
  description?: string,
  image?: string,
}


export class BookModel {
  public book: IBook

  constructor(book: IBook) {
    this.book = book
  }

  static async find(): Promise<BookModel[]> {
    const [data, _] = await Connection.execute('SELECT * FROM books')

    const result: BookModel[] = []

    for (const item of data) {
      result.push(new BookModel(item))
    }
    return result
  }

  static async findById(id: number): Promise<BookModel> {
    const [data, _] = await Connection.execute(`SELECT * FROM books WHERE \`id\`=${StringHelper.getPreparedValue(id)}`)

    if (typeof data[0] === 'undefined') {
      throw new Error(`Book with id=${id} not found`)
    }

    return new BookModel(data[0])
  }

  toJSON(): IBook {
    return this.book
  }

  save() {
    const data = StringHelper.getPreparedData(this.book)

    const query = `INSERT 
       INTO books(${data.keys.join(',')}) 
       VALUES(${data.values.join(',')})`

    return Connection.execute(query)
  }


}
