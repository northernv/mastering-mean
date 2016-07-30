'use strict'

const _ = require('lodash')
const Bluebird = require('bluebird')
const Master = require('app/models/master')
const User = require('app/models/user')
const view = require('app/views/new-master-email')
const email = require('app/services/email')

module.exports = function newMaster (params, callback) {
  const id = params._id

  // Get Master
  const master = Master
    .findById(id)
    .populate('masters')
    .populate('apprentices')

  const users = User.find()

  Bluebird.join(master, users, function sendEmail (_master, _users) {
    // If no master found, we just bail here
    if (_master === null) return Bluebird.reject('No master found')

    const recipients = _users.map((user) => {
      return {
        address: {
          email: user.email,
          name: _.isEmpty(user.fullname) ? user.email : user.fullname
        }
      }
    })

    const data = {master: _master}

    const html = view.html(data)
    const text = view.text(data)

    email.send(recipients, 'A new Jedi Master', html, text, callback)
  })
  .catch(callback)
}
