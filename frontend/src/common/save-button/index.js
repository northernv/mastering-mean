import {AttributeMetadata, Component, View} from 'angular2/core'
import {NgIf} from 'angular2/common'

@Component({
  selector: 'save-button',
  inputs: ['disableSave', 'isSaving']
})
@View({
  directives: [NgIf],
  template: `
  <button type="submit" class="btn btn-primary" [disabled]="disableSave || isSaving">
    <i *ngIf="isSaving" class="fa fa-refresh fa-spin"></i>
    <i *ngIf="!isSaving" class="fa {{icon}}"></i>
    {{name}}
  </button>
`
})
@Reflect.metadata('parameters', [[new AttributeMetadata('name')], [new AttributeMetadata('icon')]])
export default class SaveButton {
  constructor (name, icon) {
    this.name = name || 'Save'
    this.icon = icon || 'fa-floppy-o'
  }
}
