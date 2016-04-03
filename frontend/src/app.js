import './style.scss'
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
  <div class="container">
    <nav class="navbar navbar-dark bg-inverse">
      <a class="navbar-brand" href="#">Mastering MEAN</a>
      <ul class="nav navbar-nav ">
        <li class="nav-item">
          <a class="nav-link" href="#">Masters <span class="label label-pill label-primary">1</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Weapons <span class="label label-pill label-danger">15</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Ships</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item ">
          <a class="nav-link" href="#">Login</a>
        </li>
      </ul>
    </nav>
    <div class="hero">
      <h1 class="display-3">Mastering MEAN</h1>
      <p class="lead">Full Stack Expert Javascript</p>
    </div>

      <div class="card-deck home-sections ">
        <div class="card yoda">
          <div class="card-img-top"></div>
          <div class="card-block">
            <h4 class="card-title">Jedi Masters</h4>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div class="card weapons">
          <div class="card-img-top"></div>
          <div class="card-block">
            <h4 class="card-title">Weapons</h4>
            <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
        <div class="card ships">
          <div class="card-img-top"></div>
          <div class="card-block">
            <h4 class="card-title">Ships</h4>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>

    <div class="row">
    <section class="new-jedi">
      <header>
        <h5><span class="highlight">New</span> Jedi</h5>
      </header>
      <div class="list-group list-group-lg">
        <div class="list-group-item">
         <p>Yoda</p>
        </div>
        <div class="list-group-item">
         <p>Obi Wan</p>
        </div>
        <div class="list-group-item">
         <p>Luke Skywalker</p>
        </div>
      </div>
    </section>

    <section class="new-logins">
      <header>
        <h5><span class="highlight">Lastest</span> Logins</h5>
      </header>
      <div class="list-group list-group-lg">
        <div class="list-group-item">
         <p>Darth Maul</p>
        </div>
        <div class="list-group-item">
         <p>Darth Vader</p>
        </div>
        <div class="list-group-item">
         <p>Senator Palpatine</p>
        </div>
      </div>
    </section>
    </div>
  </div>
  `
})
class App {
}

bootstrap(App, [
  bind(APP_BASE_HREF).toValue('/')
])
