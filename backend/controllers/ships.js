'use strict'

exports.shipId = function (req, res, next, param) {
  req.ship = {
    name: 'Millennium Falcon'
  }
  next()
}

exports.get = function (req, res, next) {
  if (req.ship) return res.send(req.ship)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  res.send([])
}

exports.new = function (req, res, next) {
  res.send({})
}

exports.update = function (req, res, next) {
  if (!req.ship) return res.sendStatus(404)

  res.send({})
}

exports.delete = function (req, res, next) {
  if (!req.ship) return res.sendStatus(404)
  res.sendStatus(200)
}
