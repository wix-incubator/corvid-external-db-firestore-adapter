const Firestore = require('@google-cloud/firestore');
const NotFoundError = require('../model/error/not-found');
const AlreadyExistsError = require('../model/error/already-exists');

const { parseFilter } = require('./support/filter-parser')
const { parseSort } = require('./support/sort-parser')

const firestore = new Firestore({
  // client_email: serviceAccount.client_email,
  // private_key: serviceAccount.private_key,
  // projectId: serviceAccount.project_id,
});

exports.query = (query) => {

  console.log('got query: ' + JSON.stringify(query));
  const collRef = firestore.collection(query.collectionName);

  let fsQuery = parseSort(query.sort, collRef);  
  fsQuery = parseFilter(query.filter, fsQuery);
  
  if (query.select){
    fsQuery = fsQuery.select(query.select);
  }
  
  return fsQuery
    .limit(query.limit)
    .offset(query.skip)
    .get()
};

exports.get = (collectionName, itemId) => {
  return firestore
    .doc(`${collectionName}/${itemId}`)
    .get();
};

exports.listCollectionIds = () => {
  return firestore
    .listCollections()
    .then(coll => coll.map(data => { return { id: data.id } }));
};

exports.delete = async (collectionName, itemId) => {
  try {
    await firestore
      .doc(`${collectionName}/${itemId}`)
      .delete({ exists: true });

  } catch (e) {
    switch (e.code) {
      case 5: throw new NotFoundError();
      default: throw e;
    }

  }
};

exports.update = async (collectionName, item, merge = true) => {

  //console.log('got update: ' + JSON.stringify(item));
  
  try {
    const reference = firestore.doc(`${collectionName}/${item._id}`);
    await reference.set(item, {merge: merge});

  } catch (e) {
    switch (e.code) {
      case 5: throw new NotFoundError();
      default: throw e;
    }

  }
};

exports.insert = async (collectionName, item) => {
  try {
    await firestore
      .doc(`${collectionName}/${item._id}`)
      .create(item);

  } catch (e) {
    switch (e.code) {
      case 6: throw new AlreadyExistsError();
      default: throw e;
    }

  }
};

const getFirstDoc = async (collectionName) => {
  
  const collectionRef = firestore.collection(collectionName).limit(1);

  const doc = await collectionRef.get();
  const data = doc.docs[0].data();

  return data;
}

exports.describeDoc = async (collectionId) => {

  const aDoc = await getFirstDoc(collectionId)

  return {
    displayName: collectionId,
    id: collectionId,
    allowedOperations: ["get", "find", "count", "update", "insert", "remove"],
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
          // 'not',
          // 'ne',
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

  const type = typeof val;
  
  switch (type) {
    case 'string':
      return 'text'
    case 'object':      
      if (val instanceof Firestore.Timestamp){
        return 'datetime'
      }
    default:
      return type
  }
}
