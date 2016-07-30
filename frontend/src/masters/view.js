import {Component, View} from 'angular2/core'
import {NgFor} from 'angular2/common'
import {RouteParams, Router} from 'angular2/router'
import MasterService from './service'

@Component({
  selector: 'master-view',
  providers: [MasterService]
})
@View({
  directives: [NgFor],
  template: `
  <h1 class="master-name">{{ master.fullname }}
  <button type="button" (click)="handleClick($event)" class="btn btn-primary"><i class="fa fa-edit fa-lg"></i></button>
  </h1>
  <p>id: {{id}}</p>
  <p>Planet: {{master.origin || 'Unknown'}}</p>
  <p>Skill Level: {{master.level || 'Unknown'}}</p>
  <p>Skills: {{master.skills}}</p>
`
})
export default class MasterView {
  constructor (params: RouteParams, router: Router, service: MasterService) {
    this.id = params.get('id')
    this.router = router
    this.master = {}
    this.service = service
    service
      .getMaster(this.id)
      .subscribe(
        (res) => {
          this.master = res
        },
        (err) => {
          console.error(err)
          if (err.status === 401) this.router.navigate(['/Login'])
        }
      )
  }

  handleClick ($event) {
    this.router.navigate(['/MasterEdit', {id: this.id}])
  }
}
