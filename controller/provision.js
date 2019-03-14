const Schema = require('../service/schema')

exports.provision = async (req, res) => {
  const provisionResult = await Schema.provision(req)

  res.json(provisionResult)
}
