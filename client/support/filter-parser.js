const BadRequestError = require('../../model/error/bad-request');
const EMPTY = '';

exports.parseFilter = (filter, query) => {
  if (filter && filter.operator) {
    return  parseInternal(filter, query);
    //return parsed ? `WHERE ${parsed}` : EMPTY;
  }
  return query;
};

const parseInternal = (filter, query) => {

  switch (filter.operator) {

    case '$and': {
      let fiteredQuery = query;
      filter.value.forEach( filterOp => {
        fiteredQuery = parseInternal(filterOp, query);
        });
      //return value ? `(${value})` : value;
      return fiteredQuery;
    }
    
    case '$or': {
      const value = filter.value.map(parseInternal).join(' OR ');
      return value ? `(${value})` : value;
    }
    // case '$not': {
    //   const value = parseInternal(filter.value);
    //   return value ? `NOT (${value})` : value;
    // }
    // case '$ne':
    //   return query.where(`${filter.fieldName}`, '!=', `${mapValue(filter.value)}`);
    case '$lt':
      return query.where(`${filter.fieldName}`, '<', `${mapValue(filter.value)}`);
    case '$lte':
      return query.where(`${filter.fieldName}`,  '<=', `${mapValue(filter.value)}`);
    case '$gt':
      return query.where(`${filter.fieldName}`, '>', `${mapValue(filter.value)}`);
    case '$gte':
      return query.where(`${filter.fieldName}`, '>=', `${mapValue(filter.value)}`);
    case '$hasSome':
    case '$contains': {
      const list = filter.value
        .map(mapValue)
        .map(date => date)
        .join(', ')
      return list ? `${filter.fieldName} IN (${list})` : EMPTY
    }
    // case '$urlized': {
    //   const list = filter.value.map(s => s.toLowerCase()).join('[- ]')
    //   return list ? `LOWER(${filter.fieldName}) RLIKE '${list}'` : EMPTY
    // }
    // case '$startsWith':
    //   return `${filter.fieldName} LIKE ${mysql.escape(`${filter.value}%`)}`
    // case '$endsWith':
    //   return `${filter.fieldName} LIKE ${mysql.escape(`%${filter.value}`)}`
    case '$eq': {
      return filter.value === null || filter.value === undefined
        ? `${filter.fieldName} IS NULL`
        : query.where(`${filter.fieldName}`, '==', `${mapValue(filter.value)}`);
    }
    default:
      throw new BadRequestError(
        `Filter of type ${filter.operator} is not supported.`
      )
  }
}

const mapValue = value => {
  return Date.parse(value) ? new Date(value) : value
}
