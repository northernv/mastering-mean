import _ from 'lodash'

export class Master {
  constructor (_data) {
    let data = _data || {}

    _.assign(this, data)
  }
  get fullname () {
    return `${this.firstName || ''} ${this.lastName || ''}`
  }
  toJSON () {
    return _.pick(this, ['_id', 'firstName', 'lastName'])
  }
}
