const uuid = require('uuid/v4')
const BadRequestError = require('../model/error/bad-request')
const client = require('../client/firestore')

exports.find = async payload => {
    const { collectionName } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')

    const results = await client.query(collectionName)
    const enhanced = results.docs.map(doc => { return { ...doc.data(), _id: doc.id } })
    
    return {
        items: enhanced, 
        totalCount: enhanced.length
    }
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
        item: {
            _id: document.id,
            ...document.data()
        }
    }
}

exports.insert = async payload => {
    const { collectionName, item } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!item) throw new BadRequestError('Missing item in request body')
    
    if (!item._id) item._id = uuid()
    await client.insert(collectionName, item)

    return { item }
}

exports.update = async payload => {
    const { collectionName, item } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!item) throw new BadRequestError('Missing item in request body')

    await client.update(collectionName, item)

    return { item }
}

exports.remove = async payload => {
    const { collectionName, itemId } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')
    if (!itemId) throw new BadRequestError('Missing itemId in request body')

    const item = await client.get(collectionName, itemId)
    await client.delete(collectionName, itemId)

    return { item }
}

exports.count = async payload => {
    const { collectionName } = payload
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body')

    const results = await client.query(collectionName)

    return {
        totalCount: results.size
    }
}
