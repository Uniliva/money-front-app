import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _rota: Router) { }


  exibirBarra() {
    return this._rota.url !== '/login' && this._rota.url !== '/' ;
  }

}
