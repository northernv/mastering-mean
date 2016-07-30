import {Component, View} from 'angular2/core'
import {Router, RouterLink} from 'angular2/router'
import {COMMON_DIRECTIVES} from 'angular2/common'

import Alert from 'app/common/alert/service'
import Badge from './badge'
import TokenService from 'app/users/token'
import Socketio from 'app/socketio'

@Component({
  selector: 'navbar',
  providers: [TokenService, Alert, Socketio]
})
@View({
  directives: [RouterLink, Badge, COMMON_DIRECTIVES],
  template: `
    <nav class="navbar navbar-dark bg-inverse top-nav">
      <a class="navbar-brand" [routerLink]="['/Home']">Mastering MEAN</a>
      <ul class="nav navbar-nav hidden-sm-down">
        <li class="nav-item">
          <button type="button" class="btn btn-link nav-link" (click)="clickMaster()">Masters <badge [num]="newMasters"></badge></button>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Weapons']">Weapons</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Ships']">Ships</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right">
        <li class="nav-item hidden-sm-down">
          <a *ngIf="!isLoggedIn" class="nav-link" [routerLink]="['/Login']">Login</a>
          <a *ngIf="isLoggedIn" class="nav-link" [routerLink]="['/Profile', {id: userId}]">Profile</a>
        </li>
        <li class="nav-item hidden-sm-down">
          <a *ngIf="isLoggedIn" class="nav-link" href="#" (click)="logout()">Logout</a>
          <a *ngIf="!isLoggedIn" class="nav-link" [routerLink]="['/Signup']">Signup</a>
        </li>
        <li class="nav-item hidden-md-up">
          <button type="button" (click)="onClick()" class="btn btn-secondary-online"><i class="fa fa-bars"></i></button>
        </li>
      </ul>
    </nav>

    <nav class="navbar navbar-dark bg-inverse hamburger-menu" *ngIf="showNav">
      <ul class="nav navbar-nav pull-left">
        <li class="nav-item">
          <button type="button" class="btn btn-link nav-link" (click)="clickMaster()">Masters</button>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Weapons']">Weapons</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['/Ships']">Ships</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-right">
        <li class="nav-item">
          <a *ngIf="!isLoggedIn" class="nav-link" [routerLink]="['/Login']">Login</a>
          <a *ngIf="isLoggedIn" class="nav-link" [routerLink]="['/Profile', {id: userId}]">Profile</a>
        </li>
        <li class="nav-item">
          <a *ngIf="isLoggedIn" class="nav-link" href="#" (click)="logout()">Logout</a>
          <a *ngIf="!isLoggedIn" class="nav-link" [routerLink]="['/Signup']">Signup</a>
        </li>
      </ul>
    </nav>
  `
})
export default class NavBar {
  constructor (router: Router, token: TokenService, alert: Alert, io: Socketio) {
    this.router = router
    this.newMasters = 0
    this.newWeapons = 0
    this.token = token
    this.isLoggedIn = false
    this.userId = null
    this.showNav = false
    token
      .getOb()
      .subscribe((res) => {
        this.isLoggedIn = res.isLoggedIn
        this.userId = res.id
      })

    io.socket.on('user login', data => {
      alert.show(`User ${data.user.firstName || ''} ${data.user.lastName || ''} (${data.user.obfuscatedEmail || ''}) just logged in`)
    })

    io.socket.on('new master', data => {
      this.newMasters++
    })
  }

  clickMaster () {
    this.newMasters = 0
    this.router.navigate(['/Masters'])
  }

  onClick () {
    this.showNav = !this.showNav
  }

  logout () {
    this.token.removeUserData()
  }
}
