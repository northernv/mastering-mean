import _ from 'lodash'
import {Component, View, EventEmitter} from 'angular2/core'
import {FORM_DIRECTIVES, NgIf, NgClass, NgFor, FormBuilder} from 'angular2/common'

import {VALIDATORS} from './master'

function emailValidator (c) {
  let isValid = VALIDATORS.email(c.value)
  return isValid ? null : {notValid: 'Email address is not valid'}
}

function nameValidator (c) {
  let isValid = VALIDATORS.firstName(c.value)
  return isValid ? null : { nameReq: 'Name Required' }
}

function levelValidator (c) {
  let isValid = VALIDATORS.level(c.value)
  return isValid ? null : {notValid: 'Level needs to be between 0 and 10'}
}

@Component({
  selector: 'master-form',
  inputs: ['master', 'masters'],
  outputs: ['formData']
})
@View({
  directives: [FORM_DIRECTIVES, NgIf, NgClass, NgFor],
  template: `
  <form #f="ngForm" class="mean-form" [ngFormModel]="masterForm">
  <section class="inputs">
    <fieldset class="two-col">
      <label for="firstname">First Name</label>
      <input type="text" id="firstName" [ngModel]="master.firstName" ngControl="firstName">
      <small class="text-danger" *ngIf="firstName.errors">{{firstName.errors && firstName.errors.nameReq}}</small>
    </fieldset>
    <fieldset class="two-col">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastName" [ngModel]="master.lastName" ngControl="lastName">
    </fieldset>
    <fieldset class="two-col">
      <label for="planet">Planet of Origin</label>
      <input type="text" id="planet" [ngModel]="master.origin" ngControl="origin">
    </fieldset>
    <fieldset class="two-col">
      <label for="email">Email</label>
      <input type="text" id="email" [ngModel]="master.email" ngControl="email">
      <small class="text-danger" *ngIf="email.errors">{{email.errors && email.errors.notValid}}</small>
    </fieldset>
    <fieldset class="two-col">
      <label for="level">Level</label>
      <input type="number" min="0" max="10" step="1" id="level" [ngModel]="master.level" ngControl="level">
      <small class="text-danger" *ngIf="level.errors">{{level.errors && level.errors.notValid}}"</small>
    </fieldset>
    <fieldset class="two-col" ngControlGroup="skills">
      <h3>Skills</h3>
      <label class="checkbox-inline" *ngFor="#skillBox of skillBoxes; #i = index">
        <input type="checkbox" [ngModel]="skills[skillBox.name]" ngControl="{{skillBox.name}}" > <span class="capital">{{skillBox.name}}</span>
      </label>
    </fieldset>

    <fieldset class="two-col">
      <h3>Master</h3>
      <select #select ngControl="masters" [ngModel]="selectedMaster">
        <option *ngFor="#m of masters; #i = index" [value]="i">
          {{m.firstName}} {{m.lastName}}
        </option>
      </select>
    </fieldset>

    <fieldset class="two-col">
      <h3>Apprentice</h3>
      <select #select ngControl="apprentices" [ngModel]="selectedApprentice">
        <option *ngFor="#m of masters; #i = index" [value]="i">
          {{m.firstName}} {{m.lastName}}
        </option>
      </select>
    </fieldset>

    </section>
    <ng-content></ng-content>
  </form>
`
})
export default class MasterForm {
  constructor (fb: FormBuilder) {
    this.skillBoxes = [
      {name: 'speed'},
      {name: 'strength'},
      {name: 'stamina'},
      {name: 'agility'},
      {name: 'wisdom'}
    ]
    this.skills = fb.group({
      speed: [],
      strength: [],
      stamina: [],
      agility: [],
      wisdom: []
    })
    this.masterForm = fb.group({
      firstName: ['', nameValidator],
      lastName: [''],
      origin: [''],
      skills: this.skills,
      level: ['', levelValidator],
      email: ['', emailValidator],
      masters: [''],
      apprentices: ['']
    })

    this.email = this.masterForm.controls['email']
    this.level = this.masterForm.controls['level']
    this.firstName = this.masterForm.controls['firstName']
    this.formData = new EventEmitter()

    this.masterForm.valueChanges.subscribe((change) => {
      if (!this.master.isValid) return
      change.skills = this.convertSkillsToArray(change.skills)
      change.masters = [this.convertMasterToObject(change.masters)]
      change.apprentices = [this.convertMasterToObject(change.apprentices)]
      this.formData.next(change)
    })
  }

  ngOnChanges () {
    this.skills = this.convertSkillsToObject(this.master.skills)
    const masters = this.masters || []
    const apprentices = this.apprentices || []

    const masterId = _.first(this.master.masters)
    this.selectedMaster = masters.findIndex((m) => { return m._id === masterId })

    const apprenticeId = _.first(this.master.apprentices)
    this.selectedApprentice = apprentices.findIndex((m) => { return m._id === apprenticeId })
  }

  convertSkillsToArray (skills) {
    return _.reduce(skills, (memo, v, k) => {
      if (v) {
        memo.push(k)
      }
      return memo
    }, [])
  }

  convertMasterToObject (master) {
    const idx = parseInt(master, 10)
    return isNaN(idx) || idx === -1 ? undefined : this.masters[idx]
  }

  convertSkillsToObject (skills) {
    if (!skills) return {}
    return skills.reduce((memo, value) => {
      memo[value] = true
      return memo
    }, {})
  }
}
