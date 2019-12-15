const BadRequestError = require('../../model/error/bad-request');
const hasSomeFilter = require('./has-some');
const urlizedFilter = require('./urlized');

const FILTER_MAPPINGS = {
  $hasSome: hasSomeFilter,
  $urlized: urlizedFilter
};

module.exports = (items, filter) => {
  if (filter && filter.operator) {
    if (filter.operator in FILTER_MAPPINGS) {
      return FILTER_MAPPINGS[filter.operator](items, filter);
    }
  
    throw new BadRequestError(`Unsupported filter of type ${filter.operator}`);
  }
  
  return items;
};
