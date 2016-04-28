import {Component, View} from 'angular2/core'
import {ROUTER_DIRECTIVES, Router} from 'angular2/router'

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
  <signup (formData)="handleChange($event)">
    <save-button (click)="handleSignup()" [disableSave]="isDisabled" icon="fa-rocket" name="Signup" [isSaving]="isSaving"></save-button>
  </signup>
`
})
export default class UserSignup {
  constructor (service: Service, alert: Alert, router: Router) {
    this.service = service
    this.alert = alert
    this.router = router
    this.isDisabled = true
    this.isSaving = false
  }
  isValid (data) {
    return data.email !== '' && data.password !== ''
  }
  handleChange (data) {
    this.data = data
    this.isDisabled = !this.isValid(data)
  }
  handleSignup () {
    this.isSaving = true
    this.service
      .signup(this.data)
      .subscribe(res => {
        this.router.navigate(['/Home'])
      }, err => {
        this.isSaving = false
        this.alert.error('Unable to create user')
      })
  }
}
