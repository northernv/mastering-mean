import {Component, View, EventEmitter} from 'angular2/core'
import {FORM_DIRECTIVES, NgIf, FormBuilder, Validators} from 'angular2/common'

@Component({
  selector: 'signup',
  inputs: ['user'],
  outputs: ['formData']
})
@View({
  directives: [NgIf, FORM_DIRECTIVES],
  template: `
  <form #f="ngForm" class="mean-form" [ngFormModel]="loginForm">
  <section class="inputs">
    <fieldset class="two-col">
      <label for="firstName">First Name</label>
      <input type="text" [ngModel]="user.firstName" id="firstName" ngControl="firstName">
    </fieldset>
    <fieldset class="two-col">
      <label for="lastName">Last Name</label>
      <input type="text" [ngModel]="user.lastName" id="lastName" ngControl="lastName">
    </fieldset>
    <fieldset class="two-col">
      <label for="email">Email</label>
      <input type="email" [ngModel]="user.email" id="email" ngControl="email">
    </fieldset>
    <fieldset class="two-col">
      <label for="password">Password</label>
      <input type="password" id="password" ngControl="password" #password>
    </fieldset>
  </section>
  <ng-content></ng-content>
  </form>
`
})
export default class UserForm {
  constructor (fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: [''],
      lastName: ['']
    })
    this.user = {}
    this.formData = new EventEmitter()
    this.loginForm.valueChanges.subscribe((change) => {
      this.formData.next(change)
    })
  }
}
