const BaseQueryGenerator = require('./generator/base')
const HasSomeQueryGenerator = require('./generator/has-some')

const FILTER_GENERATOR_MAPPINGS = {
  $hasSome: HasSomeQueryGenerator,
}

const makeQueries = (firestore, collectionName, filter) => {
  if (filter) {
    if (filter.operator in FILTER_GENERATOR_MAPPINGS) {
      const Generator = FILTER_GENERATOR_MAPPINGS[filter.operator]
      return new Generator(firestore, collectionName).generate(filter)
    }
  
    throw new BadRequestError(`Unsupported filter of type ${filter.operator}`)
  }
  
  return new BaseQueryGenerator(firestore, collectionName).generate()
}

module.exports = makeQueries
