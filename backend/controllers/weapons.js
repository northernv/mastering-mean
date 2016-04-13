'use strict'

exports.weaponId = function (req, res, next, param) {
  req.weapon = {
    name: 'Light Saber'
  }
  next()
}

exports.get = function (req, res, next) {
  if (req.weapon) return res.send(req.weapon)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  res.send([])
}

exports.new = function (req, res, next) {
  res.send({})
}

exports.update = function (req, res, next) {
  if (!req.weapon) return res.sendStatus(404)

  res.send({})
}

exports.delete = function (req, res, next) {
  if (!req.weapon) return res.sendStatus(404)
  res.sendStatus(200)
}
