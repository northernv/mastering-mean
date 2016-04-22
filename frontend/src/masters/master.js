import _ from 'lodash'

function firstNameValidator (data) {
  return !_.isEmpty(data)
}

function emailValidator (data) {
  return _.isEmpty(data) ? true : /^.*@.+\..+$/.test(data)
}

function levelValidator (data) {
  return data < 11 && data > -1
}

export const VALIDATORS = {
  firstName: firstNameValidator,
  email: emailValidator,
  level: levelValidator
}

export class Master {
  constructor (_data) {
    const data = _data || {}

    _.assign(this, data)
  }
  get fullname () {
    return `${this.firstName || ''} ${this.lastName || ''}`
  }
  isValid (data) {
    const validators = this.validators()
    return _.every(data, (val, key) => {
      const fn = validators[key]
      return _.isFunction(fn) ? fn.call(this, val) : true
    })
  }
  toJSON () {
    return _.pick(this, ['_id', 'firstName', 'lastName'])
  }
  validators () {
    return VALIDATORS
  }
}
