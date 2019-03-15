const uuid = require('uuid/v4')
const BadRequestError = require('../error/bad-request')
const client = require('../client/firestore')

exports.find = async payload => {
    throw new Error("NOT IMPLEMENTED")
}

exports.get = async payload => {
    const { collectionName, itemId } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!itemId) throw new BadRequestError('Missing itemId in request body')

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
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!item) throw new BadRequestError('Missing item in request body')
    
    if (!item._id) item._id = uuid()
    await client.insert(collectionName, item)

    return item
}

exports.update = async payload => {
    const { collectionName, item } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!item) throw new BadRequestError('Missing item in request body')

    await client.update(collectionName, item)

    return item
}

exports.remove = async payload => {
    const { collectionName, itemId } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!itemId) throw new BadRequestError('Missing itemId in request body')

    await client.delete(collectionName, itemId)

    return {
        _id: itemId
    }
}

exports.count = async payload => {
    throw new Error("NOT IMPLEMENTED")
}
