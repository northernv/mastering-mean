import {Component, View} from 'angular2/core'
import {FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common'
import {ROUTER_DIRECTIVES, Router} from 'angular2/router'

import Service from './service'
import Alert from '../common/alert/service'

@Component({
  selector: 'login',
  providers: [Service, Alert]
})
@View({
  directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <form #f="ngForm" class="mean-form skinny" [ngFormModel]="loginForm">
  <h1>Login</h1>
  <section class="inputs">
    <fieldset class="one-col">
      <div class="input-group margin-bottom-sm input-group-lg">
        <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
        <input class="form-control" type="text" placeholder="Email address" ngControl="email" required>
      </div>
    </fieldset>
    <fieldset class="one-col">
      <div class="input-group input-group-lg">
        <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
        <input class="form-control" type="password" placeholder="Password" ngControl="password" required>
      </div>
    </fieldset>
  </section>
  <button type="button" class="primary" (click)="handleLogin()" [disabled]="!f.valid">Login</button>
  <a [routerLink]="['/Signup']">Signup</a>
  </form>
`
})
export default class Login {
  constructor (alert: Alert, service: Service, fb: FormBuilder, router: Router) {
    this.alert = alert
    this.service = service
    this.router = router

    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  handleLogin () {
    this.service
      .login(this.loginForm.value)
      .subscribe((res) => {
        this.router.navigate(['/Home'])
      }, (err) => {
        console.error(err)
        this.alert.error({
          title: 'Error',
          desc: err.text(),
          autoDismiss: true
        })
      })
  }
}
