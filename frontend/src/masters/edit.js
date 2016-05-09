import _ from 'lodash'
import { Component, View } from 'angular2/core'
import { RouteParams, Router } from 'angular2/router'

import MasterService from './service'
import MasterForm from './form'
import Alert from '../common/alert/service'
import SaveButton from '../common/save-button'

@Component({
  selector: 'master-edit',
  providers: [MasterService, Alert]
})
@View({
  directives: [MasterForm, SaveButton],
  template: `
  <h1>Edit Master {{master.fullname}}, you will</h1>
  <p>Do or do not, there is no try id: {{id}}</p>
  <master-form [master]="master" (formData)="handleFormUpdate($event)">
    <button type="button" class="btn btn-secondary" (click)="handleCancel()"><i class="fa fa-ban"></i> Cancel</button>
    <save-button id="save" (click)="handleSave()" [isSaving]="isSaving" [disableSave]="disableSave"></save-button>
  </master-form>
`
})
export default class MasterEdit {
  constructor (params: RouteParams, service: MasterService, router: Router, alert: Alert) {
    this.alert = Alert
    this.disableSave = false
    this.isSaving = false
    this.formData = {}
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

  handleFormUpdate (data) {
    this.formData = data
    let isValid = this.master.isValid(data)
    this.disableSave = !isValid
  }

  handleValid (e) {
    this.disableSave = !e
  }

  handleCancel () {
    this.router.navigate(['/MasterView', {id: this.id}])
  }

  handleSave ($event) {
    this.isSaving = true
    const data = _.assign(this.formData, {_id: this.id})
    this.service
      .saveMaster(data)
      .subscribe((res) => {
        this.router.navigate(['/MasterView', {id: res._id}])
      }, (err) => {
        this.isSaving = false
        console.error(err)
        this.alert.show('Error saving Jedi master')
      })
  }
}
