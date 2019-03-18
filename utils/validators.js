const BadRequestError = require('../model/error/bad-request')

exports.configValidator = config => {
  if (!config.googleServiceAccount) {
    throw new BadRequestError('Missing Google service account data in configuration.')
  }

  if (!config.secretKey) {
    throw new BadRequestError('Missing secret key data in configuration.')
  }

  return config
}
