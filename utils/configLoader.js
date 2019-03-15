const fs = require('fs')

let config = null

const load = () => {
    if (!config) {
        try {
            const file = fs.readFileSync('config.json')
            const parsed = JSON.parse(file)

            verifyConfig(parsed)
            config = parsed
        } catch (e) {
            console.error('Failed loading the config.json file.', e)
            throw e
        }
    }
    
    return config
}

const verifyConfig = config => {
    if (!config.googleServiceAccount) {
        throw new Error('Missing Google service account data in configuration.')
    }

    if (!config.secretKey) {
        throw new Error('Missing secret key data in configuration.')
    }
}

module.exports = load
