import {AttributeMetadata, Component, View} from 'angular2/core'
import {NgIf, NgClass} from 'angular2/common'

@Component({
  selector: 'alert'
})
@View({
  directives: [NgIf, NgClass],
  template: `<span *ngIf='showEl' class='nv-alert' [ngClass]='{danger: isDanger}'>{{num}}</span>`
})
@Reflect.metadata('parameters', [[new AttributeMetadata('num')]])
export default class Alert {
  constructor (num) {
    this.num = parseInt(num, 10)
    this.showEl = this.num > 0;
    this.isDanger = this.num > 10;
  }
}
