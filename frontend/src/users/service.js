import {Http, Headers} from 'angular2/http'
import {Injectable} from 'angular2/core'
import 'rxjs/add/operator/map'
import config from '../config'
import TokenService from './token'

const headers = new Headers({
  'Content-Type': 'application/json'
})

@Injectable()
export default class UserService {
  constructor (http: Http, token: TokenService) {
    this.http = http
    this.token = token
  }
  signup (data) {
    return this.http
      .post(`${config.API_URL}/users`, JSON.stringify(data), {
        headers: headers
      })
      .map((res) => res.json())
      .map((res) => {
        this.token.saveUserData(res)
        return res
      })
  }
  login (data) {
    let opts = this.token.getOptions()
    return this.http
      .post(`${config.API_URL}/users/login`, JSON.stringify(data), opts)
      .map((res) => res.json())
      .map((res) => {
        this.token.saveUserData(res)
        return res
      })
  }
  getUser (id) {
    let opts = this.token.getOptions()
    return this.http
      .get(`${config.API_URL}/users/${id}`, opts)
      .map((res) => res.json())
      .map((res) => {
        return res
      })
  }
  update (id, data) {
    let opts = this.token.getOptions()
    return this.http
      .put(`${config.API_URL}/users/${id}`, JSON.stringify(data), opts)
      .map((res) => res.json())
      .map((res) => {
        this.token.saveUserData(res)
        return res
      })
  }
  logout () {
    this.token.removeUserData()
  }
}
