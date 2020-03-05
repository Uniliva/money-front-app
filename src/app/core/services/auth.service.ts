import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { UtilsService } from "src/app/core/services/utils.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, catchError } from "rxjs/operators";

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

  estaLogado(){
      let token = this._recuperarToken();
      return token && !this._jwtHelper.isTokenExpired();
  }



  logout() {
    localStorage.clear();
  }


  private _recuperarToken(){
    return localStorage.getItem('access_token');
  }

}
