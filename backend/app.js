'use strict'

const express = require('express')
const app = express()
const api = require('./api')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', api)

module.exports = app
