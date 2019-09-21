import moment = require('moment')

export interface IPreparedData {
  keys: string[],
  values: string[]
}

{

}

export default class StringHelper {
  static escapeString(str: string) {
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

  static getPreparedValue(value: any): string {
    if (value) {
      return `'${this.escapeString(value)}'`
    }

    return 'NULL'
  }

  static getPreparedData<T>(data: T): IPreparedData {
    const keys: [string?] = []
    const values: [string?] = []
    
    for (let [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        value = moment(value).format('YYYY-MM-DD').toString()
      }
      keys.push(`\`${key}\``)
      values.push(this.getPreparedValue(value))
    }

    return {
      keys,
      values,
    } as IPreparedData
  }

}
