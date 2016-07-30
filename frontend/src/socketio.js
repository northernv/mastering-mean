import {Injectable} from 'angular2/core'
import io from 'socket.io-client'
import config from './config'

@Injectable()
export default class SocketService {
  constructor () {
    this._socket = io(config.SOCKET_URL)
  }
  get socket () {
    return this._socket
  }
}
