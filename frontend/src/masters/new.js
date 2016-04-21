import _ from 'lodash'
import { Component, View } from 'angular2/core'
import { Router } from 'angular2/router'
import { NgModel } from 'angular2/common'
import { Master } from './master'

import MasterService from './service'


@Component({
  selector: 'master-new',
  providers: [MasterService]
})
@View({
  directives: [NgModel],
  template: `
  <h1>New Jedi Master</h1>
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
export default class MasterNew {
  constructor (service: MasterService, router: Router) {
    this.router = router
    this.master = new Master()
    this.service = service
  }

  handleSave ($event) {
    this.isSaving = true
    const data = _.assign(this.master)
    this.service
      .createMaster(data)
      .subscribe((res) => {
        this.router.navigate(['/MasterView', {id: res._id}])
      }, (err) => {
        this.isSaving = false
        console.error(err)
      })
  }
}
