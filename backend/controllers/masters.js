'use strict'

const _ = require('lodash')

let db = [{
  firstName: 'Luke',
  lastName: 'Skywalker',
  level: 8
}, {
  firstName: 'Mace',
  lastName: 'Windu',
  level: 9
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}, {
  firstName: 'Yoda',
  lastName: '',
  level: 10
}]

exports.masterId = function (req, res, next, param) {
  req.master = {
    firstName: 'Luke',
    lastName: 'Skywalker',
    level: 10
  }
  next()
}

exports.get = function (req, res, next) {
  if (req.master) return res.send(req.master)

  res.sendStatus(404)
}

exports.list = function (req, res, next) {
  const sort = req.query.sort
  const fields = req.query.fields
  const level = req.query.level
  let masters = _.clone(db)

  if (sort !== undefined) {
    masters = _.sortBy(masters, sort)
  }

  if (level !== undefined) {
    masters = _.filter(masters, {level: parseInt(level, 10)})
  }

  if (fields !== undefined) {
    const fieldArr = fields.split(',')
    masters = _.map(masters, (master) => {
      return _.pick(master, fieldArr)
    })
  }
  res.send(masters)
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
