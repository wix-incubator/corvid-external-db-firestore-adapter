const Schema = require('../service/schema')

exports.findSchemas = async (req, res) => {
  const findResult = await Schema.find(req.body)

  // console.log('Schema find returned: ' + JSON.stringify(findResult));

  res.json(findResult)
}
  
exports.listSchemas = async (req, res) => {
  const findResult = await Schema.list(req.body)

  res.json(findResult)
}
