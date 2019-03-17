exports.configValidator = config => {
  if (!config.googleServiceAccount) {
    throw new Error('Missing Google service account data in configuration.')
  }

  if (!config.secretKey) {
    throw new Error('Missing secret key data in configuration.')
  }

  return config
}
