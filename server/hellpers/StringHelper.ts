import moment = require('moment')

export interface IKeyValue {
  key: string,
  value: string
}

export default class StringHelper {
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
        value: value,
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
