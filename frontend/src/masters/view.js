import { Component, View } from 'angular2/core'
import { RouteParams, Router } from 'angular2/router'

@Component({
  selector: 'master-view'
})
@View({
  template: `
  <h1>
    Yoda
    <button type="button" (click)="handleClick($event)" class="btn btn-primary"><i class="fa fa-edit fa-lg"></i></button>
  </h1>
  <p>id: {{id}}</p>
`
})
export default class MasterView {
  constructor (params: RouteParams, router: Router) {
    this.id = params.get('id')
    this.router = router
  }

  handleClick ($event) {
    this.router.navigate(['/MasterEdit', {id: this.id}])
  }
}
