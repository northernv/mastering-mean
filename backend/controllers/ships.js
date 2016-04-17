'use strict'

const Ship = require('app/models/ship')

exports.shipId = function (req, res, next, param) {
  Ship
    .findById(param)
    .then(function (ship) {
      req.ship = ship
      next()
    })
    .catch(next)
}

exports.get = function (req, res, next) {
  if (req.ship) return res.send(req.ship)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  const sort = req.query.sort || null
  const fields = req.query.fields || null
  const level = req.query.level || null

  let query = Ship.find()

  if (sort !== null) {
    query.sort(sort.replace(',', ' '))
  }

  if (level !== null) {
    query.where({level: parseInt(level, 10)})
  }

  if (fields !== null) {
    query.select(Ship.reduceFields(fields))
  }

  query
    .then(function (ships) {
      res.send(ships)
    })
    .catch(next)
}

exports.new = function (req, res, next) {
  const data = req.body

  const newShip = new Ship(data)
  newShip
    .save()
    .then(function (ship) {
      res.send(ship)
    })
    .catch(next)
}

exports.update = function (req, res, next) {
  if (!req.ship) return res.sendStatus(404)

  const data = req.body

  req.ship
    .set(data)
    .save()
    .then(function (ship) {
      res.send(ship)
    })
    .catch(next)
}

exports.delete = function (req, res, next) {
  if (!req.ship) return res.sendStatus(404)

  req.ship
    .remove()
    .then(function () {
      res.sendStatus(200)
    })
    .catch(next)
}
