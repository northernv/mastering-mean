import { Component, View } from 'angular2/core'

import { RouteParams } from 'angular2/router'

@Component({
  selector: 'ship-edit'
})
@View({
  template: `
  <h1>Edit Millennium Falcon</h1>
  <p>She may not look like much, but she's got it where it counts, kid. {{id}}</p>
`
})
export default class ShipEdit {
  constructor (params: RouteParams) {
    this.id = params.get('id')
  }
}
