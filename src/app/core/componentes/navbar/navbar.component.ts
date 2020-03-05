import { AuthService } from './../../services/auth.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private _rota: Router,
    private _auth: AuthService) { }

  @Input() mostrarBarra = false;

  menu= false;

  irLancamentos(){
    this._rota.navigate(['lancamentos']);
  }

  irPessoas(){
    this._rota.navigate(['pessoas']);
  }

  logout(){
    this.menu = false;
    this._auth.logout();
    this._rota.navigate(['login']);
  }

  abrirMenu(){
      this.menu = !this.menu;
  }


}
