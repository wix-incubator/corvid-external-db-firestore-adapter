const uuid = require('uuid/v4');
const BadRequestError = require('../model/error/bad-request');
const NotFoundError = require('../model/error/not-found');
const client = require('../client/firestore');
const Firestore = require('@google-cloud/firestore');

exports.find = async payload => {

    //console.log('got payload: ' + JSON.stringify(payload));
    const query = { collectionName, filter, sort, skip, limit } = payload;
    if (!query.collectionName)
        throw new BadRequestError('Missing collectionName in request body')
    if (!query.skip && query.skip !== 0)
        throw new BadRequestError('Missing skip in request body')
    if (!query.limit) throw new BadRequestError('Missing limit in request body')

    const results = await client.query(query);
    const enhanced = results.docs.map(doc => { return wrapDates({ ...doc.data(), _id: doc.id }) })

    return {
        items: enhanced,
        totalCount: enhanced.length
    }
};

exports.get = async payload => {
    const { collectionName, itemId } = payload;
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body');
    if (!itemId) throw new BadRequestError('Missing itemId in request body');

    // console.log('get: ' + JSON.stringify(payload));

    const document = await client.get(collectionName, itemId);

    if (!document.exists) {
        throw new NotFoundError(`item ${itemId} not found`);
    }

    return {
        item: wrapDates({
            _id: document.id,
            ...document.data()
        })
    }
};

exports.insert = async payload => {
    const { collectionName, item } = payload;
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body');
    if (!item) throw new BadRequestError('Missing item in request body');

    // console.log('insert: ' + JSON.stringify(payload));

    if (!item._id) item._id = uuid();
    await client.insert(collectionName, extractDates(item));

    return { item: wrapDates(item) };
};

exports.update = async payload => {
    const { collectionName, item } = payload;
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body');
    if (!item) throw new BadRequestError('Missing item in request body');

    // console.log('update: ' + JSON.stringify(payload));

    await client.update(collectionName, extractDates(item));

    return { item: wrapDates(item) };
};

exports.remove = async payload => {
    const { collectionName, itemId } = payload;
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body');
    if (!itemId) throw new BadRequestError('Missing itemId in request body');

    const item = await client.get(collectionName, itemId);
    await client.delete(collectionName, itemId);

    return { item: wrapDates(item) };
};

exports.count = async payload => {
    const { collectionName } = payload;
    if (!collectionName) throw new BadRequestError('Missing collectionName in request body');

    const results = await client.query({ collectionName: collectionName, limit: 1000, skip: 0, select: 'id' });

    return {
        totalCount: results.size
    };
};

const extractDates = item => {
    Object.keys(item).map(key => {
        const value = item[key];
        if (value === null) return;

        const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        if (typeof value === 'string') {
            const re = reISO.exec(value);
            if (re) {
                item[key] = Firestore.Timestamp.fromDate(new Date(value));
            }
        }

        if (typeof value === 'object' && '$date' in value) {
            item[key] = Firestore.Timestamp.fromDate(value['$date']);
        }
    })

    return item
}

const wrapDates = item => {
    Object.keys(item)
        .map(key => {
            const value = item[key];
            if (value instanceof Firestore.Timestamp) {
                item[key] = { $date: item[key].toDate() }
            }
        })

    return item
}
