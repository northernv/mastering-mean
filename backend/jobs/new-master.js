'use strict'

const _ = require('lodash')
const Bluebird = require('bluebird')
const Master = require('app/models/master')
const User = require('app/models/user')

module.exports = function newMaster (params, callback) {
  const id = params._id

  // Get Master
  const master = Master
    .findById(id)

  const users = User.find()

  Bluebird.join(master, users, function sendEmail (_master, _users) {
    // If no master found, we just bail here
    if (_master === null) return Bluebird.reject('No master found')
    console.log('Users:')
    console.log(_users)

    callback(null, _users)

  })
  .catch(callback)
}
