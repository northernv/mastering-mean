'use strict'

const express = require('express')
const compression = require('compression')
const mongoose = require('mongoose')
const Bluebird = require('bluebird')

const app = express()
const api = require('./api')
const config = require('./config')

// Connect to mongo
mongoose.Promise = Bluebird
if (!mongoose.connection.db) mongoose.connect(config.get('DB_URI'))
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connected to mongodb'))

app.use(compression())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', api)

module.exports = app
