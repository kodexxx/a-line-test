import { Connection } from '@Server/ops/MySQLConnection'
import moment = require('moment')

export interface IBook {
  id?: number
  title: string,
  date: Date | string,
  author: string,
  description?: string,
  image?: string,
}

interface PreparedData {
  keys: string[],
  values: string[]
}

export class BookModel {
  public book: IBook

  constructor(book: IBook) {
    this.book = book
  }

  save() {
    const data = this.getPreparedData(this.book)

    const query = `INSERT 
       INTO books(${data.keys.join(',')}) 
       VALUES(${data.values.join(',')})`

    return Connection.execute(query)
  }

  private getPreparedData(book: IBook): PreparedData {
    const keys: [string?] = []
    const values: [string?] = []

    if (book.date instanceof Date) {
      book.date = moment(book.date).format('YYYY-MM-DD').toString()
    }

    for (const [key, value] of Object.entries(book)) {
      keys.push(`\`${key}\``)
      values.push(this.getPreparedValue(value))
    }

    return {
      keys,
      values,
    } as PreparedData
  }

  private getPreparedValue(value: any): string {
    if (value) {
      return `'${this.escapeString(value)}'`
    }

    return 'NULL'
  }

  private escapeString(str: string) {
    return str.toString().replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char: string): string => {
      switch (char) {
        case '\0':
          return '\\0'
        case '\x08':
          return '\\b'
        case '\x09':
          return '\\t'
        case '\x1a':
          return '\\z'
        case '\n':
          return '\\n'
        case '\r':
          return '\\r'
        case '"':
        case '\'':
        case '\\':
        case '%':
          return '\\' + char
      }
      return char
    })
  }
}
