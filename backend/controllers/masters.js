'use strict'

const Master = require('app/models/master')

exports.masterId = function (req, res, next, param) {
  Master
    .findById(param)
    .then(function (master) {
      req.master = master
      next()
    })
    .catch(next)
}

exports.get = function (req, res, next) {
  if (req.master) return res.send(req.master)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  const sort = req.query.sort || null
  const fields = req.query.fields || null
  const level = req.query.level || null

  let query = Master.find()

  if (sort !== null) {
    query.sort(sort.replace(',', ' '))
  }

  if (level !== null) {
    query.where({level: parseInt(level, 10)})
  }

  if (fields !== null) {
    query.select(Master.reduceFields(fields))
  }

  query
    .then(function (masters) {
      res.send(masters)
    })
    .catch(next)
}

exports.new = function (req, res, next) {
  const data = req.body

  const newMaster = new Master(data)
  newMaster
    .save()
    .then(function (master) {
      res.send(master)
    })
    .catch(next)
}

exports.update = function (req, res, next) {
  if (!req.master) return res.sendStatus(404)

  const data = req.body

  req.master
    .set(data)
    .save()
    .then(function (master) {
      res.send(master)
    })
    .catch(next)
}

exports.delete = function (req, res, next) {
  if (!req.master) return res.sendStatus(404)

  req.master
    .remove()
    .then(function () {
      res.sendStatus(200)
    })
    .catch(next)
}
