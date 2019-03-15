const client = require('../client/firestore')

exports.find = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.get = async payload => {
    const { collectionName, itemId } = payload
    const document = await client.get(collectionName, itemId)

    if (!document.exists) {
        throw new NotFoundError()
    }

    return {
        _id: document.id,
        ...document.data()
    }
}

exports.insert = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.update = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.remove = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.count = async payload => {
    throw new Error("NOT IMPLEMENTED")
}
