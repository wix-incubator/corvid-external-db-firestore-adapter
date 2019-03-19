module.exports = (items, filter) => {
  return items.filter(item => filter.value.includes(item[filter.fieldName]))
}
