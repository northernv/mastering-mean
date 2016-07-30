'use strict'

const monq = require('monq')
const config = require('app/config')

const client = monq(config.get('DB_URI'), { safe: true })
const queue = client.queue('mean')

module.exports = queue
