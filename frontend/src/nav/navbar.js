import { Component, View } from 'angular2/core'
import { Router, ROUTER_DIRECTIVES } from 'angular2/router'
import Alert from './alert'

@Component({
  selector: 'navbar'
})
@View({
  directives: [ROUTER_DIRECTIVES, Alert],
  template: `
    <nav class="navbar navbar-dark bg-inverse">
      <a class="navbar-brand" [routerLink]="['/Home']">Mastering MEAN</a>
      <ul class="nav navbar-nav hidden-sm-down">
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Masters']">Masters <alert num="1"></alert></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Weapons']">Weapons <alert num="15"></alert></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Ships']">Ships <alert num="0"></alert></a>
        </li>
        <li class="nav-item">
          <a class="nav-link">About</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item hidden-sm-down">
          <a class="nav-link">Login</a>
        </li>
        <li class="nav-item hidden-md-up">
          <button type="button" (click)="onClick()" class="btn btn-secondary-online"><i class="fa fa-bars"></i></button>
        </li>
      </ul>
    </nav>
  `
})
export default class NavBar {
}
