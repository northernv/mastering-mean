'use strict'

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('app/config')
const key = config.get('JWT_KEY')

const DEFAULT_OPTS = {
  expiresIn: '7d'
}

exports.mw = expressJwt({ secret: key })

exports.signToken = function (data, options) {
  const opts = _.assign({}, DEFAULT_OPTS, options)
  return jwt.sign(data, key, opts)
}
