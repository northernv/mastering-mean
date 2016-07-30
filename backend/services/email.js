'use strict'

const Sparky = require('sparkpost')
const config = require('app/config')
const client = new Sparky(config.get('EMAIL_API_KEY'))
const from = config.get('EMAIL_FROM')

exports.client = client

exports.send = function send (to, subject, html, text, callback) {
  client.transmissions.send({
    transmissionBody: {
      content: {
        from: {
          name: 'Mastering MEAN',
          email: from
        },
        subject: subject,
        html: html,
        text: text
      },
      recipients: to
    }
  }, function (err, res) {
    callback(err, res.body)
  })
}
