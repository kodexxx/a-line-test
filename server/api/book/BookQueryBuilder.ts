import StringHelper from '@Server/hellpers/StringHelper'

export interface IOffsetFilter {
  limit: number
  page: number
}

export interface IFilter {
  title?: string,
  author?: string,
  description?: string,
  dateStart?: Date,
  dateEnd?: Date
}

export default class BookQueryBuilder {
  static getFilterLimit(filter: IOffsetFilter): string {
    const from = filter.limit * filter.page

    return `LIMIT ${from}, ${filter.limit}`
  }

  static getFilter(filter: IFilter): string {
    const result = []
    if (filter.title) {
      result.push('`title` LIKE \'%' + StringHelper.escapeString(filter.title) + '%\'')
    }

    if (filter.author) {
      result.push('`author` LIKE \'%' + StringHelper.escapeString(filter.author) + '%\'')
    }

    if (filter.description) {
      result.push('`description` LIKE \'%' + StringHelper.escapeString(filter.description) + '%\'')
    }


    if (!result.length) {
      return ''
    }

    return 'WHERE ' + result
      .join(' AND ')
  }
}
