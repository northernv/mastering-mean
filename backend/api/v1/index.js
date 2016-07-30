'use strict'

const router = require('express').Router()
router.use('/masters', require('./masters'))
router.use('/ships', require('./ships'))
router.use('/weapons', require('./weapons'))
router.use('/users', require('./users'))
module.exports = router
