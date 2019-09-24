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

export interface IFilterResult {
  queryString: string,
  values: (string | number)[],
}

export default class BookQueryBuilder {
  static getFilterLimit(filter: IOffsetFilter): IFilterResult {
    const from = filter.limit * filter.page

    return {
      queryString: `LIMIT ?, ?`,
      values: [from, filter.limit],
    }
  }

  static getFilter(filter: IFilter): IFilterResult {
    const result = []
    const values = []
    if (filter.title) {
      result.push('`title` LIKE ?')
      values.push(`%${filter.title}%`)
    }

    if (filter.author) {
      result.push('`author` LIKE ?')
      values.push(`%${filter.author}%`)
    }

    if (filter.description) {
      result.push('`description` LIKE ?')
      values.push(`%${filter.description}%`)
    }


    if (!result.length) {
      return {
        queryString: '',
        values: [],
      }
    }

    return {
      queryString: `WHERE ${result.join(' AND ')}`,
      values: values,
    }
  }

  static mergeFilters(filterA: IFilterResult, filterB: IFilterResult): IFilterResult {
    return {
      queryString: `${filterA.queryString} ${filterB.queryString}`,
      values: [
        ...filterA.values,
        ...filterB.values,
      ],
    }
  }
}
