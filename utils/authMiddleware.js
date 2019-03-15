const BadRequestError = require('../error/bad-request')
const UnauthorizedError = require('../error/unauthorized')
const load = require('./fileLoader')
const { configValidator } = require('../utils/validators')

const configuredSecretKey = configValidator(load('config.json')).secretKey

const extractSecretKey = requestContext => {
  if (!requestContext) {
    throw new BadRequestError('Missing request context')
  }

  if (!requestContext.secretKey) {
    throw new UnauthorizedError('Missing secret key in request context')
  }
  
  return requestContext.secretKey
}

const authMiddleware = (req, _, next) => {
  const secretKey = extractSecretKey(req.body.requestContext)

  if (configuredSecretKey !== secretKey) {
    throw new UnauthorizedError('Provided secret key does not match')
  }
  
  next()
}

module.exports = authMiddleware
