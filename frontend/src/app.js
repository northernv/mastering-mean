import './app.scss'
import 'zone.js/dist/zone-microtask'
import 'reflect-metadata'

import {enableProdMode} from 'angular2/core'
import {bind, Component, View, provide} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import {
  RouteConfig,
  APP_BASE_HREF,
  ROUTER_BINDINGS,
  ROUTER_DIRECTIVES
} from 'angular2/router'
import {Headers, HTTP_PROVIDERS, RequestOptions} from 'angular2/http'

import config from './config'
import TokenService from './users/token'
import Alert from './common/alert/alert'

// Pages for the routes below
import Login from './users/login'
import Signup from './users/signup'
import Profile from './users/profile'

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
import NavBar from './nav/navbar'

@Component({
  selector: 'master-app'
})
@View({
  directives: [ROUTER_DIRECTIVES, NavBar, Alert],
  template: `
  <div class="container">
    <navbar></navbar>
    <alert-box></alert-box>
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([
  {path: '/', component: Home, name: 'Home'},

  {path: '/login', component: Login, name: 'Login'},
  {path: '/signup', component: Signup, name: 'Signup'},
  {path: '/profile/:id', component: Profile, name: 'Profile'},

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

if (config.NODE_ENV === 'production') {
  enableProdMode()
}

class MyOptions extends RequestOptions {
  constructor () {
    super({
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
  }
}

bootstrap(App, [
  ROUTER_BINDINGS,
  HTTP_PROVIDERS,
  provide(RequestOptions, {useClass: MyOptions}),
  TokenService,
  bind(APP_BASE_HREF).toValue('/')
])
