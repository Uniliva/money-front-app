import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { catchError } from "rxjs/operators";

import { NotificacaoService } from "src/app/core/services/notificacao.service";
import { UtilsService } from "src/app/core/services/utils.service";
import { Pessoa } from "src/app/shared/models/pessoa";

@Injectable({
  providedIn: "root"
})
export class PessoaService {
  constructor(
    private _http: HttpClient,
    private notificador: NotificacaoService,
    private _utilsService: UtilsService
  ) {}

  buscaTodos() {
    return this._http
      .get<Pessoa[]>(`${environment.base_url}/pessoas`, {
        headers: this._utilsService.getHeaders()
      })
      .pipe(
        catchError(err => {
          this.notificador.notificarErro(err);
          throw err;
        })
      );
  }

  buscaPorCodigo(codigo) {
    return this._http
      .get<Pessoa>(`${environment.base_url}/pessoas/${codigo}`, {
        headers: this._utilsService.getHeaders()
      })
      .pipe(
        catchError(err => {
          this.notificador.notificarErro(err);
          throw err;
        })
      );
  }

  removerPorCodigo(codigo) {
    return this._http
      .delete(`${environment.base_url}/pessoas/${codigo}`, {
        headers: this._utilsService.getHeaders()
      })
      .pipe(
        catchError(err => {
          this.notificador.notificarErro(err);
          throw err;
        })
      );
  }

  ativarOuDesativar(codigo, status) {
    return this._http
      .put(
        `${environment.base_url}/pessoas/${codigo}/ativo?status=${!status}`,
        null,
        { headers: this._utilsService.getHeaders() }
      )
      .pipe(
        catchError(err => {
          this.notificador.notificarErro(err);
          throw err;
        })
      );
  }

  salvar(pessoa: Pessoa) {
    return this._http
      .post(`${environment.base_url}/pessoas`, pessoa, {
        headers: this._utilsService.getHeaders()
      })
      .pipe(
        catchError(err => {
          this.notificador.notificarErro(err);
          throw err;
        })
      );
  }

  atualizar(pessoa: Pessoa) {
    return this._http
      .put<Pessoa>(`${environment.base_url}/pessoas/${pessoa.codigo}`, pessoa, {
        headers: this._utilsService.getHeaders()
      })
      .pipe(
        catchError(err => {
          this.notificador.notificarErro(err);
          throw err;
        })
      );
  }
}
