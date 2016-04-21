import { Component, View } from 'angular2/core'
import { RouteParams, Router } from 'angular2/router'
import MasterService from './service'

@Component({
  selector: 'master-view',
  providers: [MasterService]
})
@View({
  template: `
  <h1>
  {{master.fullname}}
    <button type="button" (click)="handleClick($event)" class="btn btn-primary"><i class="fa fa-edit fa-lg"></i></button>
  </h1>
  <p>id: {{id}}</p>
`
})
export default class MasterView {
  constructor (params: RouteParams, router: Router, service: MasterService) {
    this.id = params.get('id')
    this.master = {}
    this.service = service
    this.router = router
    service
      .getMaster(this.id)
      .subscribe((res) => {
        this.master = res
      })
  }

  handleClick ($event) {
    this.router.navigate(['/MasterEdit', {id: this.id}])
  }
}
