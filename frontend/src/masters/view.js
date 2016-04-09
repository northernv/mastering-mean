import { Component, View } from 'angular2/core'

import { RouteParams } from 'angular2/router'

@Component({
  selector: 'master-view'
})
@View({
  template: `
  <h1>Yoda</h1>
  <p>id: {{id}}</p>
`
})
export default class MasterView {
  constructor (params: RouteParams) {
    this.id = params.get('id')
  }
}
