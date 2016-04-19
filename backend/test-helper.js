'use strict'

const Bluebird = require('bluebird')
const config = require('./config')
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
