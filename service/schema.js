const client = require('../client/firestore')

exports.find = async payload => {
  throw new Error("NOT IMPLEMENTED")
}

exports.list = async payload => {
  throw new Error("NOT IMPLEMENTED")
}

exports.provision = async payload => {
  await client.listCollectionIds()

  return {}
}
