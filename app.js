const express = require('express')
const bodyParser = require('body-parser');
const items = require('./controller/items');
const schemas = require('./controller/schemas');
const provision = require('./controller/provision');
const errorMiddleware = require('./utils/errorMiddleware')
const authMiddleware = require('./utils/authMiddleware')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(authMiddleware)

app.post('/schemas/find', errorMiddleware(schemas.findSchemas))
app.post('/schemas/list', errorMiddleware(schemas.listSchemas))
app.post('/data/find', errorMiddleware(items.findItems))
app.post('/data/get', errorMiddleware(items.getItem))
app.post('/data/insert', errorMiddleware(items.insertItem))
app.post('/data/update', errorMiddleware(items.updateItem))
app.post('/data/remove', errorMiddleware(items.removeItem))
app.post('/data/count', errorMiddleware(items.countItems))
app.post('/provision', errorMiddleware(provision.provision))

app.listen(
  port, 
  () => console.log(`Firestore connector listening on port ${port}!`))
