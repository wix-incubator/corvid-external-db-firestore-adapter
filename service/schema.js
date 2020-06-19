const client = require('../client/firestore')

exports.find = async payload => {
  const { schemaIds } = payload

//  console.log('Finding schema for request: ' + JSON.stringify(payload));

  if (!schemaIds) throw new BadRequestError('Missing schemaIds in request body')

  return { schemas: [await client.describeDoc(schemaIds[0])] };

  // const filtered = schemas.filter(schema => schemaIds.includes(schema.id))

  // return {
  //   schemas : filtered
  // }
}

exports.list = async payload => {
  const schemasIds = await client.listCollectionIds();

  const schemas = schemasIds.map( schema => {
    return client.describeDoc(schema.id);
  });

  return { schemas: await Promise.all(schemas) };
}

exports.provision = async payload => {
  return await client.listCollectionIds();
}
