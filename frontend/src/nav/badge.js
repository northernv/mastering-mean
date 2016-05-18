import {Component, View} from 'angular2/core'
import {NgIf, NgClass} from 'angular2/common'

@Component({
  selector: 'badge',
  inputs: ['num']
})
@View({
  directives: [NgIf, NgClass],
  template: `<span *ngIf="showEl" class="nv-alert" [ngClass]="{danger: isDanger}">{{num}}</span>`
})
export default class Badge {
  constructor () {
    this.showEl = false
    this.isDanger = false
  }

  ngOnChanges (changes) {
    this.showEl = changes.num.currentValue > 0
    this.isDanger = changes.num.currentValue > 10
  }
}
