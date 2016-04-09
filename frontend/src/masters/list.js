import { Component, View } from 'angular2/core'
import { ROUTER_DIRECTIVES } from 'angular2/router'

@Component({
  selector: 'master-list'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <h1>Jedi Masters <a class="btn btn-primary" [routerLink]="['/MasterNew']" title="Create a new Jedi">New</a></h1>
  <ul>
    <li><a [routerLink]="['/MasterView', {id: 12345}]">Yoda</a></li>
  </ul>
`
})
export default class MasterList {}
