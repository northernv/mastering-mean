import { Component, View } from 'angular2/core'

@Component({
  selector: 'home'
})
@View({
  template: `
    <div class="hidden-md-up">
      <h2 class="text-xs-center">Mastering MEAN</h2>
    </div>
    <div class="hero hidden-sm-down">
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
  `
})
export default class Home {}
