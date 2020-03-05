import { AuthService } from "./../../services/auth.service";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { runInThisContext } from "vm";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  usuarioLogado;

  constructor(private _rota: Router, private _auth: AuthService) {}

  menu = false;
  usuario: any;
  permissoes: any;

  ngOnInit(): void {

    if(this._auth.estaLogado()){
      this.usuarioLogado = true;
      this.usuario = this._auth.buscaDadosUsuario();
      this.permissoes = this.usuario.permissoes;
    }

    AuthService.usuarioLogado.subscribe(logado => {
      this.usuarioLogado = logado;
      if (logado) {
        this.usuario = this._auth.buscaDadosUsuario();
        this.permissoes = this.usuario.permissoes;
      }
    });
  }

  irLancamentos() {
    this._rota.navigate(["lancamentos"]);
  }

  irPessoas() {
    this._rota.navigate(["pessoas"]);
  }

  logout() {
    this.usuarioLogado = false;
    this.menu = false;
    this._auth.logout();
    this._rota.navigate(["login"]);
  }

  abrirMenu() {
    this.menu = !this.menu;
  }
}
