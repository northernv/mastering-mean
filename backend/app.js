'use strict'

const express = require('express')
const compression = require('compression')
const cors = require('cors')
const db = require('app/db')

const app = express()
const api = require('./api')
const bodyParser = require('body-parser')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connected to mongodb'))

app.use(cors())
app.use(compression())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', api)

module.exports = app
