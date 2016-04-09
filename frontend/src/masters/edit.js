import { Component, View } from 'angular2/core'

import { RouteParams } from 'angular2/router'

@Component({
  selector: 'master-edit'
})
@View({
  template: `
  <h1>Edit Master Yoda, you will</h1>
  <p>Do or do not, there is no try id: {{id}}</p>
`
})
export default class MasterEdit {
  constructor (params: RouteParams) {
    this.id = params.get('id')
  }
}
