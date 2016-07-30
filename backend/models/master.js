'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const RESTRICTED = new Set(['email'])

/**
 * Jedi Master Schema
 */
const MasterSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  origin: String,
  masters: [{
    type: ObjectId,
    ref: 'Master'
  }],
  apprentices: [{
    type: ObjectId,
    ref: 'Master'
  }],
  skills: [String],
  level: Number,
  email: {
    type: String,
    select: false
  },
  phoneNumber: String,
  createdOn: {
    type: Date,
    default: Date.now
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
})

MasterSchema.pre('save', function (next) {
  // Update the timestamp
  this.updatedOn = Date.now()

  return next()
})

// Convert from 'firstName,lastName' to
// { firstName: 1, lastName: 1}
MasterSchema.statics.reduceFields = function (fields) {
  return fields.split(',').reduce((memo, field) => {
    if (RESTRICTED.has(field)) return memo
    memo[field] = 1
    return memo
  }, {})
}

module.exports = mongoose.model('Master', MasterSchema, 'masters')
