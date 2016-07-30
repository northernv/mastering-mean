'use strict'

const Weapon = require('app/models/weapon')

exports.weaponId = function (req, res, next, param) {
  Weapon
    .findById(param)
    .then(function (weapon) {
      req.weapon = weapon
      next()
    })
    .catch(next)
}

exports.get = function (req, res, next) {
  if (req.weapon) return res.send(req.weapon)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  const sort = req.query.sort || null
  const fields = req.query.fields || null

  let query = Weapon.find()

  if (sort !== null) {
    query.sort(sort.replace(',', ' '))
  }

  if (fields !== null) {
    query.select(Weapon.reduceFields(fields))
  }

  query
    .then(function (weapons) {
      res.send(weapons)
    })
    .catch(next)
}

exports.new = function (req, res, next) {
  const data = req.body

  const newWeapon = new Weapon(data)
  newWeapon
    .save()
    .then(function (weapon) {
      res.send(weapon)
    })
    .catch(next)
}

exports.update = function (req, res, next) {
  if (!req.weapon) return res.sendStatus(404)

  const data = req.body

  req.weapon
    .set(data)
    .save()
    .then(function (weapon) {
      res.send(weapon)
    })
    .catch(next)
}

exports.delete = function (req, res, next) {
  if (!req.weapon) return res.sendStatus(404)

  req.weapon
    .remove()
    .then(function () {
      res.sendStatus(200)
    })
    .catch(next)
}
