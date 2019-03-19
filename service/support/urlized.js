module.exports = (items, filter) => {
    const toMatch = filter.value.map(s => s.toLowerCase()).join('-')
    return items.filter(item => item[filter.fieldName].toString().toLowerCase().replace(' ', '-') === toMatch)
  }
  