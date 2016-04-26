'use strict'

const _ = require('lodash')
const Bluebird = require('bluebird')
const config = require('./config')
const Jwt = require('./services/jwt')
// use a test db instead of the real one
const dbUrl = config.get('DB_URI') + '-test'

config.set('DB_URI', dbUrl)
config.set('DEBUG', false)
config.set('ENV', 'test')

exports.app = require('./app')

// Drop a collection
exports.dropCollection = function (Model) {
  if (config.get('ENV') !== 'test') return Bluebird.reject()
  return Model.remove({})
}

exports.generateToken = function generateToken (payload, opts) {
  let hash = Jwt.signToken(_.assign({}, { _id: 123, role: 'user' }, payload), opts)
  return `Bearer ${hash}`
}
