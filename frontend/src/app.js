import './style.scss'
import 'zone.js/dist/zone-microtask'
import 'reflect-metadata'

import {bind, Component, View} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import {
  RouteConfig,
  APP_BASE_HREF,
  ROUTER_BINDINGS,
  ROUTER_DIRECTIVES
} from 'angular2/router'

// Pages for the routes below
import Masters from './masters/list'
import MasterView from './masters/view'
import MasterEdit from './masters/edit'
import MasterNew from './masters/new'

import Ships from './ships/list'
import ShipView from './ships/view'
import ShipEdit from './ships/edit'
import ShipNew from './ships/new'

import Weapons from './weapons/list'
import WeaponView from './weapons/view'
import WeaponEdit from './weapons/edit'
import WeaponNew from './weapons/new'

import Home from './home'

@Component({
  selector: 'master-app'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div class="container">
    <nav class="navbar navbar-dark bg-inverse">
      <a class="navbar-brand" href="#">Mastering MEAN</a>
      <ul class="nav navbar-nav hidden-sm-down">
        <li class="nav-item">
          <a class="nav-link" href="#">Masters <span class="label label-pill label-primary">1</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Weapons <span class="label label-pill label-danger">15</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Ships</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item hidden-sm-down">
          <a class="nav-link" href="#">Login</a>
        </li>
        <li class="nav-item hidden-md-up">
          <button type="button" (click)="onClick()" class="btn btn-secondary-online"><i class="fa fa-bars"></i></button>
        </li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},

  {path: '/masters', component: Masters, name: 'Masters'},
  {path: '/master/:id', component: MasterView, name: 'MasterView'},
  {path: '/master/:id/edit', component: MasterEdit, name: 'MasterEdit'},
  {path: '/master', component: MasterNew, name: 'MasterNew'},

  {path: '/weapons', component: Weapons, name: 'Weapons'},
  {path: '/weapon/:id', component: WeaponView, name: 'WeaponView'},
  {path: '/weapon/:id/edit', component: WeaponEdit, name: 'WeaponEdit'},
  {path: '/weapon', component: WeaponNew, name: 'WeaponNew'},

  {path: '/ships', component: Ships, name: 'Ships'},
  {path: '/ship/:id', component: ShipView, name: 'ShipView'},
  {path: '/ship/:id/edit', component: ShipEdit, name: 'ShipEdit'},
  {path: '/ship', component: ShipNew, name: 'ShipNew'}
])
class App {
}

bootstrap(App, [
  ROUTER_BINDINGS,
  bind(APP_BASE_HREF).toValue('/')
])
