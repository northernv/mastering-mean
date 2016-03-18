import 'zone.js/dist/zone-microtask'
import 'reflect-metadata'

import {bind, Component, View} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'
import {APP_BASE_HREF} from 'angular2/router'

@Component({
  selector: 'master-app'
})
@View({
  template: `
    <h1>Hello World</h1>
    <h2>Welcome to Mastering MEAN Web Development</h2>
  `
})
class App {
}

bootstrap(App, [
  bind(APP_BASE_HREF).toValue('/')
])
