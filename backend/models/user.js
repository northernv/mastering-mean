'use strict'

const _ = require('lodash')
const mongoose = require('mongoose')
const Bluebird = require('bluebird')
const crypto = require('crypto')
const Jwt = require('app/services/jwt')
const Errors = require('app/errors')
const Schema = mongoose.Schema

/**
 * User Schema
 */
var UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: String,
  role: {
    type: String,
    default: 'user'
  },
  email: {
    required: true,
    unique: true,
    type: String,
    set: val => val.toLowerCase()
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    default: function () {
      var now = new Date().getTime()
      return crypto
        .createHash('md5')
        .update('MEAN Stack' + now)
        .digest('hex')
    }
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
})

UserSchema.virtual('fullname').get(function () {
  const firstName = this.firstName || ''
  const lastName = this.lastName || ''
  return _.trim(`${firstName} ${lastName}`)
})

UserSchema.virtual('obfuscatedEmail').get(function () {
  const e = this.email
  const regexp = /(?!^.)(.*)(?=[\w]@)/i
  return e.replace(regexp, '...')
})

UserSchema.virtual('response').get(function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    token: this.token
  }
})

UserSchema.virtual('token').get(function () {
  const payload = {
    _id: this._id,
    role: this.role
  }

  return Jwt.signToken(payload)
})

UserSchema.pre('save', function (next) {
  // Update the timestamp
  this.updatedOn = Date.now()

  return next()
})

/**
 * Check if password is valid
 *
 * @param {String} password
 *
 * @return {Boolean}
 */
UserSchema.methods.validatePassword = function validatePassword (password) {
  password = password || ''

  const pwHash = crypto
    .createHash('sha1')
    .update(password + this.salt)
    .digest('hex')

  return this.password === pwHash
}

/**
 * Set the password for this user
 *
 * @param {String} password
 */
UserSchema.methods.setPassword = function setPassword (password) {
  this.password = crypto
    .createHash('sha1')
    .update(password + this.salt)
    .digest('hex')

  return this
}

/**
 * Find a user by their email
 *
 * @param {String} email
 *
 * @return {Promise}
 */
UserSchema.statics.findByEmail = function findByEmail (email) {
  // We need to have an email to search upon
  if (_.isEmpty(email)) {
    return Bluebird.reject(new Errors.BadData('Missing email'))
  }

  return this
    .findOne({ 'email': email.toLowerCase() })
    .select('+password')
    .then(function (user) {
      // If null, we didn't find a match
      return _.isNull(user)
        ? Bluebird.reject(new Errors.NotFound(`No user found with ${email}`))
        : user
    })
}

module.exports = mongoose.model('User', UserSchema, 'users')
