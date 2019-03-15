const client = require('../client/firestore')

exports.find = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.get = async payload => {
    const { collectionName, itemId } = payload
    //TODO add request payload validation
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
    const { collectionName, item } = payload
    await client.insert(collectionName, item)
    //TODO handle already existing item case
    //TODO handle missing _id case (autogeneration)

    return item
}

exports.update = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.remove = async payload => {
    const { collectionName, itemId } = payload
    //TODO add request payload validation
    await client.delete(collectionName, itemId)
    //TODO handle nonexistent case

    return {
        _id: itemId
    }
}

exports.count = async payload => {
    throw new Error("NOT IMPLEMENTED")
}
