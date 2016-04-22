import {Component, View} from 'angular2/core'
import {NgIf, NgClass} from 'angular2/common'

import Service from './service'

@Component({
  selector: 'alert-box',
  providers: [Service]
})
@View({
  directives: [NgIf, NgClass],
  template: `
<div *ngIf="showAlert" class="alert alert-dismissible fade" [ngClass]="classes" role="alert">
  <button type="button" class="close" (click)="close()" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>{{title}}</strong> {{desc}}
</div>
`
})
export default class AlertBox {
  constructor (service: Service) {
    this.title = ''
    this.desc = ''
    this.showAlert = false
    this.classes = {
      in: false
    }
    service
      .getOb()
      .subscribe(res => {
        this.title = res.title || ''
        this.desc = res.desc || ''
        this.showAlert = true
        this.classes[res.type ? res.type : 'alert-warn'] = true
        if (res.autoDismiss) setTimeout(() => this.close(), 5000)
        setTimeout(() => { this.classes.in = true }, 300)
      })
  }
  close () {
    this.classes.in = false
    setTimeout(() => { this.showAlert = false }, 1000)
  }
}
