const Storage = require('../service/storage')

exports.findItems = async (req, res) => {
  const findResult = await Storage.findItems(req)

  res.json(findResult)
}

exports.getItem = async (req, res) => {
  const getResult = await Storage.getItem(req)

  res.json(getResult)
}

exports.insertItem = async (req, res) => {
  const insertResult = await Storage.insertItem(req)

  res.json(insertResult)
}

exports.updateItem = async (req, res) => {
  const updateResult = await Storage.updateItem(req)

  res.json(updateResult)
}

exports.removeItem = async (req, res) => {
  const removeResult = await Storage.removeItem(req)

  res.json(removeResult)
}

exports.countItems = async (req, res) => {
  const countResult = await Storage.countItems(req)

  res.json(countResult)
}
