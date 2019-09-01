const EMPTY = ''

exports.parseSort = (sort, collRef) => {
  if (sort) {
    sort.forEach( sortOp => {
      collRef.orderBy(sortOp.fieldName, sortOp.direction);
    })
  }

  return EMPTY
}

const parseInternal = entry => {
  return `${entry.fieldName} ${entry.direction.toUpperCase()}`
}
