import {Headers, RequestOptions} from 'angular2/http'
import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import config from '../config'

const KEY = config.TOKEN_KEY
const ID = 'id'

let observer

@Injectable()
export default class TokenService {
  constructor (defaultOpts: RequestOptions) {
    this.defaultOpts = defaultOpts

    this.myToken = Observable.create((o) => {
      observer = o
      observer.next(this.getNext())
    })
  }
  getNext () {
    return {
      isLoggedIn: this.hasToken(),
      id: this.getId()
    }
  }
  getOb () {
    return this.myToken
  }
  hasToken () {
    return this.getToken() !== null
  }
  getToken () {
    return window.localStorage.getItem(KEY)
  }
  setToken (token) {
    window.localStorage.setItem(KEY, token)
  }
  removeToken () {
    window.localStorage.removeItem(KEY)
  }
  removeId () {
    return window.localStorage.removeItem(ID)
  }
  getId () {
    return window.localStorage.getItem(ID)
  }
  setId (id) {
    window.localStorage.setItem(ID, id)
  }
  saveUserData (data) {
    this.setToken(data.token)
    this.setId(data._id)
    observer.next(this.getNext())
  }
  removeUserData () {
    this.removeToken()
    this.removeId()
    observer.next(this.getNext())
  }
  getOptions () {
    return this.defaultOpts.merge({
      headers: this.getAuthHeader(this.defaultOpts.headers)
    })
  }
  getAuthHeader (_headers) {
    let headers = _headers || new Headers()
    let auth = `Bearer ${this.getToken()}`

    headers.set('Authorization', auth)
    return headers
  }
}
