const Firestore = require('@google-cloud/firestore');
const NotFoundError = require('../model/error/not-found');
const AlreadyExistsError = require('../model/error/already-exists');
const load = require('../utils/fileLoader');
const { configValidator } = require('../utils/validators');

const { parseFilter } = require('./support/filter-parser')
const { parseSort } = require('./support/sort-parser')


const serviceAccount = configValidator(load('config.json')).googleServiceAccount;

const firestore = new Firestore({
  // client_email: serviceAccount.client_email,
  // private_key: serviceAccount.private_key,
  // projectId: serviceAccount.project_id,
});

exports.query = (query) => {

  console.log('got query: ' + JSON.stringify(query));
  const collRef = firestore.collection(query.collectionName);

  let sortedQuery = parseSort(query.sort, collRef);
  const filteredQuery = parseFilter(query.filter, sortedQuery);


  return filteredQuery
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

exports.update = async (collectionName, item) => {
  try {
    const reference = firestore.doc(`${collectionName}/${item._id}`);
    await firestore
      .batch()
      .delete(reference, { exists: true })
      .create(reference, item)
      .commit();

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

exports.getFirstDoc = async (collectionName) => {
  
  let collectionRef = firestore.collection(collectionName).limit(1);

  const doc = await collectionRef.get();
  const data = doc.docs[0].data();

  console.log('data: ' + JSON.stringify(data));

  return data;
}

