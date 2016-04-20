import {Http, Headers} from 'angular2/http'
import {Injectable} from 'angular2/core'
import 'rxjs/add/operator/map'
import config from '../config'

const headers = new Headers({
  'Content-Type': 'application/json'
})

@Injectable()
export default class MasterService {
  constructor (http: Http) {
    this.http = http
  }
  getMasters () {
    return this.http
      .get(`${config.API_URL}/masters`)
      .map((res) => res.json())
  }
  getMaster (id) {
    return this.http
      .get(`${config.API_URL}/masters/${id}`)
      .map((res) => res.json())
  }
  createMaster (master) {
    return this.http
      .post(`${config.API_URL}/masters`, JSON.stringify(master), {
        headers: headers
      })
      .map((res) => res.json())
  }
  saveMaster (master) {
    return this.http
      .put(`${config.API_URL}/masters/${master._id}`, JSON.stringify(master), {
        headers: headers
      })
      .map((res) => res.json())
  }
}
