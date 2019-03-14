'use strict';

const express = require('express')

const items = require('./controller/items');
const schemas = require('./controller/schemas');
const provision = require('./controller/provision');

const app = express()
const port = 3000

app.post('/schemas/find', schemas.findSchemas)
app.post('/schemas/list', schemas.listSchemas)
app.post('/data/find', items.findItems)
app.post('/data/get', items.getItem)
app.post('/data/insert', items.insertItem)
app.post('/data/update', items.updateItem)
app.post('/data/remove', items.removeItem)
app.post('/data/count', items.countItems)
app.post('/provision', provision.provision)

app.listen(
  port, 
  () => console.log(`Firestore connector listening on port ${port}!`))
