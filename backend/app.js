'use strict'

const express = require('express')
const compression = require('compression')

const app = express()
const api = require('./api')

app.use(compression())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', api)

module.exports = app
