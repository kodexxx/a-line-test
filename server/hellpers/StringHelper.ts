import moment = require('moment')

export interface IKeyValue {
  key: string,
  value: string
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

  static getPreparedData<T extends { [index: string]: any }>(fields: string[], data: T): IKeyValue[] {
    const result: IKeyValue[] = []

    for (let key of fields) {
      if (!data.hasOwnProperty(key)) {
        continue
      }

      let value = data[key]
      if (value instanceof Date) {
        value = moment(value).format('YYYY-MM-DD').toString()
      }
      result.push({
        key: `\`${key}\``,
        value: this.getPreparedValue(value),
      } as IKeyValue)

    }

    return result
  }

  static parseNumber(value: string, defaultValue: number): number {
    if (value === undefined) {
      return defaultValue
    }
    const result = +value
    if (!result) {
      return defaultValue
    }

    return result
  }
}
