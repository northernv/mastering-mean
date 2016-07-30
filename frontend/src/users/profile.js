import {Component, View} from 'angular2/core'
import {ROUTER_DIRECTIVES, RouteParams, Router} from 'angular2/router'

import Alert from '../common/alert/service'
import Service from './service'
import Form from './form'
import SaveButton from '../common/save-button'

@Component({
  selector: 'signup',
  providers: [Service, Alert]
})
@View({
  directives: [ROUTER_DIRECTIVES, Form, SaveButton],
  template: `
  <signup (formData)="handleChange($event)" [user]="user">
    <save-button (click)="handleUpdate()" [disableSave]="isDisabled" icon="fa-rocket" name="Save" [isSaving]="isSaving"></save-button>
    <a [routerLink]="['/Home']">Cancel</a>
  </signup>
`
})
export default class UserProfile {
  constructor (service: Service, alert: Alert, params: RouteParams, router: Router) {
    this.id = params.get('id')
    this.user = {}
    this.service = service
    this.alert = alert
    this.router = router
    this.isDisabled = true
    this.isSaving = false
    this.service
      .getUser(this.id)
      .subscribe(
        (res) => {
          this.user = res
        },
        (err) => {
          console.error(err)
          this.router.navigate(['/Home'])
          this.alert.error(err)
        }
      )
  }
  isValid (data) {
    return data.email !== ''
  }
  handleChange (data) {
    this.data = data
    this.isDisabled = !this.isValid(data)
  }
  handleUpdate () {
    this.isSaving = true
    this.service
      .update(this.id, this.data)
      .subscribe((res) => {
        this.router.navigate(['/Home'])
      }, (err) => {
        this.isSaving = false
        this.alert.error(err)
      })
  }
}
