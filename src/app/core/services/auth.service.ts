import { Lancamento } from "src/app/shared/models/lancamento";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { UtilsService } from "src/app/core/services/utils.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _jwtHelper: JwtHelperService
  ) {}

  private _clientAcessOauthBase64 = "YW5ndWxhcjpAbmd1bEByMA==";

  logar(usuario) {
    let url = `${environment.base_url}/oauth/token?username=${usuario.email}&password=${usuario.senha}&grant_type=password`;

    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${this._clientAcessOauthBase64}`
    });

    return this._http
      .post<any>(url, null, { headers: headers })
      .pipe(
        map(token => {
          localStorage.setItem("access_token", token.access_token);
        }),
        catchError(erro => {
          throw erro;
        })
      );
  }

  estaLogado() {
    let token = this._recuperarToken();
    return token && !this._jwtHelper.isTokenExpired();
  }

  logout() {
    localStorage.clear();
  }

  buscaDadosUsuario():any {
    const payload = this._jwtHelper.decodeToken();
    if(payload){
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
            atualizacao: this._temPerm(lstPermissoes, "ROLE_ATUALIZAR_LANCAMENTO")
          },
          categoria: {
            criacao: this._temPerm(lstPermissoes, "ROLE_CADASTRAR_CATEGORIA"),
            visualizacao: this._temPerm(
              lstPermissoes,
              "ROLE_PESQUISAR_CATEGORIA"
            ),
            exclusao: this._temPerm(lstPermissoes, "ROLE_REMOVER_CATEGORIA"),
            atualizacao: this._temPerm(lstPermissoes, "ROLE_ATUALIZAR_CATEGORIA")
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
}
