const Schema = require('../service/schema')

exports.findSchemas = async (req, res) => {
  const findResult = await Schema.findSchemas(req)

  res.json(findResult)
}
  
exports.listSchemas = async (req, res) => {
  const findResult = await Schema.listSchemas(req)

  res.json(findResult)
}
