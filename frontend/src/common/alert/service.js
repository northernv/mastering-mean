import _ from 'lodash'
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable'

let observer

@Injectable()
export default class AlertBox {
  constructor () {
    this.myob = Observable.create((o) => {
      observer = o
    })
  }
  getOb () {
    return this.myob
  }

  showAlert (opts) {
    observer.next({
      title: opts.title,
      desc: opts.desc,
      type: opts.type || 'alert-info',
      autoDismiss: opts.autoDismiss
    })
  }

  show (opts) {
    let _opts = typeof opts === 'string' ? {title: opts} : opts
    this.showAlert(_.defaults({
      type: 'alert-info',
      autoDismiss: true
    }, _opts))
  }

  error (err) {
    let _err = typeof err === 'string' ? {title: err} : err
    this.showAlert(_.defaults({
      type: 'alert-danger',
      autoDismiss: false
    }, _err))
  }
}
