const Storage = require('../service/storage')

exports.findItems = async (req, res) => {
  const findResult = await Storage.find(req)

  res.json(findResult)
}

exports.getItem = async (req, res) => {
  const getResult = await Storage.get(req)

  res.json(getResult)
}

exports.insertItem = async (req, res) => {
  const insertResult = await Storage.insert(req)

  res.json(insertResult)
}

exports.updateItem = async (req, res) => {
  const updateResult = await Storage.update(req)

  res.json(updateResult)
}

exports.removeItem = async (req, res) => {
  const removeResult = await Storage.remove(req)

  res.json(removeResult)
}

exports.countItems = async (req, res) => {
  const countResult = await Storage.count(req)

  res.json(countResult)
}
