'use strict'

const router = require('express').Router()
const controller = require('app/controllers/masters')
const jwt = require('app/services/jwt')

router.route('/')
  .get(controller.list)
  .post(jwt.mw, controller.new)

router.route('/:id')
  .get(controller.get)
  .put(jwt.mw, controller.update)
  .delete(jwt.mw, controller.delete)

router.param('id', controller.masterId)

module.exports = router
