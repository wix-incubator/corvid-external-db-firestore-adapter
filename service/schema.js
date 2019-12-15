const client = require('../client/firestore')

exports.find = async payload => {
  const { schemaIds } = payload

//  console.log('Finding schema for request: ' + JSON.stringify(payload));

  if (!schemaIds) throw new BadRequestError('Missing schemaIds in request body')

  return { schemas: [await describeDoc(schemaIds[0])] };

  // const filtered = schemas.filter(schema => schemaIds.includes(schema.id))

  // return {
  //   schemas : filtered
  // }
}

exports.list = async payload => {
  const schemasIds = await client.listCollectionIds();

  const schemas = schemasIds.map( schema => {
    return describeDoc(schema.id);
  });

  return { schemas: await Promise.all(schemas) };
}

exports.provision = async payload => {
  return await client.listCollectionIds();
}

async function describeDoc(collectionId) {

  const aDoc = await client.getFirstDoc(collectionId)

  return {
    displayName: collectionId,
    id: collectionId,
    // allowedOperations: load('config.json').allowedOperations,
    maxPageSize: 50,
    ttl: 3600,
    fields: jsonFieldsToCorvidFields(Object.entries(aDoc))
  }
}

const jsonFieldsToCorvidFields = columns => {
  return columns
    .map(field => {
      return {
        displayName: field[0],
        type: jsonValueTypeToCorvid(field[1]),
        queryOperators: [
          'eq',
          'lt',
          'gt',
          'hasSome',
          'and',
          'lte',
          'gte',
          'or',
          'not',
          'ne',
          'startsWith',
          'endsWith'
        ]
      }
    })
    .reduce((map, obj) => {
      map[obj.displayName] = obj
      return map
    }, {})
}

const jsonValueTypeToCorvid = val => {

  return typeof val === 'string' ? 'text' : typeof val;

  // switch (type) {
  //   case 'string':
  //     return 'text'
  //   default:
  //     return 'object'
  // }
}
