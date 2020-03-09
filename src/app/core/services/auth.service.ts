import { Injectable, EventEmitter } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "./../../../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { NotificacaoService } from './notificacao.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _jwtHelper: JwtHelperService,
    private _notificador: NotificacaoService
  ) { }

  static usuarioLogado = new EventEmitter();

  private _clientAcessOauthBase64 = "YW5ndWxhcjpAbmd1bEByMA==";

  logar(usuario) {
    let url = `${environment.base_url}/oauth/token`;

    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${this._clientAcessOauthBase64}`
    });

    let params = new HttpParams()
    params = params.set('username', usuario.email);
    params = params.set('password', usuario.senha);
    params = params.set('grant_type', 'password');

    return this._http
      .post<any>(url, null, { headers: headers, params: params })
      .pipe(
        map(token => {
          localStorage.setItem("access_token", token.access_token);
          AuthService.usuarioLogado.emit(true);
        }),
        catchError(erro => {
          throw erro;
        })
      );
  }

  revalidarToken() {
    let url = `${environment.base_url}/oauth/token`;

    let params = new HttpParams().set('grant_type', 'refresh_token');

    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${this._clientAcessOauthBase64}`
    });

    return this._http
      .post<any>(url, null, { headers, params })
      .pipe(
        map(token => {
          localStorage.setItem("access_token", token.access_token);
          AuthService.usuarioLogado.emit(true);
        }),
        catchError(erro => {
          this._notificador.notificarErro("Sessão inspirada necessário fazer o login novamente!");
          this.logout();
          throw erro;
        })
      );
  }

  estaComTokenInvalido() {
    return this._jwtHelper.isTokenExpired();
  }

  estaLogado() {
    let token = this._recuperarToken();
    return token && !this._jwtHelper.isTokenExpired();
  }

  temToken() {
    return !!this._recuperarToken()
  }

  logout() {
    AuthService.usuarioLogado.emit(false);
    localStorage.clear();
  }

  buscaDadosUsuario(): any {
    const payload = this._jwtHelper.decodeToken();
    if (payload) {
      const lstPermissoes = payload.authorities;
      let usuario = {
        nome: payload.user_name,
        estaComTokenExpirado: this._jwtHelper.isTokenExpired(),
        dataToken: this._jwtHelper.getTokenExpirationDate(),
        permissoes: {
          lancamento: {
            criacao: this._temPerm(lstPermissoes, "ROLE_CADASTRAR_LANCAMENTO"),
            visualizacao: this._temPerm(
              lstPermissoes,
              "ROLE_PESQUISAR_LANCAMENTO"
            ),
            exclusao: this._temPerm(lstPermissoes, "ROLE_REMOVER_LANCAMENTO"),
            atualizacao: this._temPerm(
              lstPermissoes,
              "ROLE_ATUALIZAR_LANCAMENTO"
            )
          },
          categoria: {
            criacao: this._temPerm(lstPermissoes, "ROLE_CADASTRAR_CATEGORIA"),
            visualizacao: this._temPerm(
              lstPermissoes,
              "ROLE_PESQUISAR_CATEGORIA"
            ),
            exclusao: this._temPerm(lstPermissoes, "ROLE_REMOVER_CATEGORIA"),
            atualizacao: this._temPerm(
              lstPermissoes,
              "ROLE_ATUALIZAR_CATEGORIA"
            )
          },
          pessoa: {
            criacao: this._temPerm(lstPermissoes, "ROLE_CADASTRAR_PESSOA"),
            visualizacao: this._temPerm(lstPermissoes, "ROLE_PESQUISAR_PESSOA"),
            exclusao: this._temPerm(lstPermissoes, "ROLE_REMOVER_PESSOA"),
            atualizacao: this._temPerm(lstPermissoes, "ROLE_ATUALIZAR_PESSOA")
          }
        }
      };
      return usuario;
    }

    return null;
  }

  private _recuperarToken() {
    return localStorage.getItem("access_token");
  }

  private _temPerm(lstPermissoes, permissao) {
    return lstPermissoes.includes(permissao);
  }

  temPermAlgumaDessasPermisoes(lstPermissoes) {

    let retorno = false;

    const payload = this._jwtHelper.decodeToken();
    if (payload) {
      const permissoes = payload.authorities;

      for (let permissao of lstPermissoes) {
        if (permissoes.includes(permissao)) {
          retorno = true;
          break;
        }
      };
    }
    return retorno;


  }
}
