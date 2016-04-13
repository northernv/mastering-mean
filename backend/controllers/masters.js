'use strict'

exports.masterId = function (req, res, next, param) {
  req.master = {
    firstName: 'Luke',
    lastName: 'Skywalker'
  }
  next()
}

exports.get = function (req, res, next) {
  if (req.master) return res.send(req.master)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  res.send([])
}

exports.new = function (req, res, next) {
  res.send({})
}

exports.update = function (req, res, next) {
  if (!req.master) return res.sendStatus(404)

  res.send({})
}

exports.delete = function (req, res, next) {
  if (!req.master) return res.sendStatus(404)
  res.sendStatus(200)
}
