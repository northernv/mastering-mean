import {Component, View} from 'angular2/core'
import {Router} from 'angular2/router'
import MasterForm from './form'
import MasterService from './service'
import {Master} from './master'

import SaveButton from '../common/save-button'

@Component({
  selector: 'master-new',
  providers: [MasterService]
})
@View({
  directives: [MasterForm, SaveButton],
  template: `
  <h1>New Jedi Master</h1>
  <master-form [master]="master" (formData)="handleFormUpdate($event)">
    <button type="button" class="btn btn-secondary" (click)="handleCancel()"><i class="fa fa-ban"></i> Cancel</button>
    <save-button id="create" (click)="handleSave()" name="Create" [isSaving]="isSaving" [disableSave]="disableSave"></save-button>
  </master-form>
`
})
export default class MasterNew {
  constructor (service: MasterService, router: Router) {
    this.router = router
    this.master = new Master()
    this.service = service
  }
  handleFormUpdate (data) {
    this.formData = data
    let isValid = this.master.isValid(data)
    this.disableSave = !isValid
  }
  handleCancel () {
    this.router.navigate(['/Masters'])
  }
  handleSave ($event) {
    this.isSaving = true
    this.service
      .createMaster(this.formData)
      .subscribe((res) => {
        this.router.navigate(['/MasterView', {id: res._id}])
      }, (err) => {
        this.isSaving = false
        console.error(err)
        this.alert.show('Error saving Jedi master')
      })
  }
}
