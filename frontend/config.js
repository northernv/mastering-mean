'use strict'
const nconf = require('nconf')

module.exports = nconf
  .argv()
  .env()
  .file({
    file: './.env.json'
  })
  .defaults({
    API_URL: 'http://localhost:3000/api/v1'
  })
