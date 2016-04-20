import _ from 'lodash'
import { Component, View } from 'angular2/core'
import { RouteParams, Router } from 'angular2/router'
import { NgModel } from 'angular2/common'

import MasterService from './service'

@Component({
  selector: 'master-edit',
  providers: [MasterService]
})
@View({
  directives: [NgModel],
  template: `
  <h1>Edit Master Yoda, you will</h1>
  <p>Do or do not, there is no try id: {{id}}</p>
  <form>
    <fieldset class="form-group">
      <label>First Name</label>
      <input type="text" id="firstName" [(ngModel)]="master.firstName">
    </fieldset>
    <fieldset class="form-group">
      <label>Last Name</label>
      <input type="text" id="firstName" [(ngModel)]="master.lastName">
    </fieldset>
    <button type="button" class="btn btn-primary" (click)="handleSave()">Save</button>
  </form>
`
})
export default class MasterEdit {
  constructor (params: RouteParams, service: MasterService, router: Router) {
    this.router = router
    this.id = params.get('id')
    this.master = {}
    this.service = service
    service
      .getMaster(this.id)
      .subscribe((res) => {
        this.master = res
      })
  }

  handleSave ($event) {
    this.isSaving = true
    const data = _.assign(this.master, {_id: this.id})
    this.service
      .saveMaster(data)
      .subscribe((res) => {
        this.router.navigate(['/MasterView', {id: res._id}])
      }, (err) => {
        this.isSaving = false
        console.error(err)
      })
  }
}
