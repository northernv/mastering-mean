import {Http} from 'angular2/http'
import {Injectable} from 'angular2/core'
import 'rxjs/add/operator/map'
import config from '../config'
import {Master} from './master'
import TokenService from '../users/token'

function convertToMaster (data) {
  return new Master(data)
}

@Injectable()
export default class MasterService {
  constructor (http: Http, token: TokenService) {
    this.http = http
    this.token = token
  }
  getMasters () {
    return this.http
      .get(`${config.API_URL}/masters`)
      .map((res) => res.json())
      .map((res) => {
        return res.map(convertToMaster)
      })
  }
  getMaster (id) {
    return this.http
      .get(`${config.API_URL}/masters/${id}`)
      .map((res) => res.json())
      .map(convertToMaster)
  }
  createMaster (master) {
    const opts = this.token.getOptions()
    return this.http
      .post(`${config.API_URL}/masters`, JSON.stringify(master), opts)
      .map((res) => res.json())
  }
  saveMaster (master) {
    const opts = this.token.getOptions()
    return this.http
      .put(`${config.API_URL}/masters/${master._id}`, JSON.stringify(master), opts)
      .map((res) => res.json())
  }
}
