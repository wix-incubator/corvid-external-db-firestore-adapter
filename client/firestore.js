const Firestore = require('@google-cloud/firestore')
const loadConfig = require('../utils/configLoader')

const serviceAccount = loadConfig().googleServiceAccount
const firestore = new Firestore({
  client_email: serviceAccount.client_email,
  private_key: serviceAccount.private_key,
  projectId: serviceAccount.project_id,
})

exports.query = () => {
  throw new Error("NOT IMPLEMENTED")
}

exports.get = (collectionName, itemId) => {
  return firestore
    .doc(`${collectionName}/${itemId}`)
    .get()
}

exports.listCollectionIds = () => {
  throw new Error("NOT IMPLEMENTED")
}

exports.delete = (collectionName, itemId) => {
  return firestore
    .doc(`${collectionName}/${itemId}`)
    .delete({ exists: true })
}

exports.update = () => {
  throw new Error("NOT IMPLEMENTED")
}

exports.insert = (collectionName, item) => {
  return firestore
    .doc(`${collectionName}/${item._id}`)
    .create(item)
}
