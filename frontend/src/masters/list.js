import { Component, View } from 'angular2/core'
import { ROUTER_DIRECTIVES } from 'angular2/router'
import { NgFor } from 'angular2/common'
import MasterService from './service'

@Component({
  selector: 'master-list',
  providers: [MasterService]
})
@View({
  directives: [ROUTER_DIRECTIVES, NgFor],
  template: `
  <h1 class="title">Jedi Masters <a class="btn btn-primary" [routerLink]="['/MasterNew']" title="Create a new Jedi">New</a></h1>
  <ul class="master-list">
    <li *ngFor="#master of masters"><a [routerLink]="['/MasterView', {id: master._id}]">{{ master.fullname }}</a></li>
  </ul>
`
})
export default class MasterList {
  constructor (service: MasterService) {
    service
      .getMasters()
      .subscribe((res) => {
        this.masters = res
      })
  }
}
