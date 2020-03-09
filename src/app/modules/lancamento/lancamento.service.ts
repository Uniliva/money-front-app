import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FiltroLancamento } from 'src/app/shared/models/filtro-lancamento';
import { catchError } from 'rxjs/operators';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Lancamento } from 'src/app/shared/models/lancamento';
import { Resumolancamento } from 'src/app/shared/models/resumolancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private _http: HttpClient, private _utilsService: UtilsService, private notificador: NotificacaoService) { }



  buscarResumo(filtro: FiltroLancamento): Observable<any> {
    let params = new HttpParams();

    params = params.append('size', filtro.tamanho.toString());
    params = params.append('page', filtro.pagina.toString());

    if (filtro.dataLancamentoDe)
      params = params.append('dataLancamentoDe', this._utilsService.converteData(filtro.dataLancamentoDe));

    if (filtro.dataLancamentoAte)
      params = params.append('dataLancamentoAte', this._utilsService.converteData(filtro.dataLancamentoAte));

    if (filtro.descricao)
      params = params.append('descricao', filtro.descricao.toLowerCase());

    return this._http.get<Resumolancamento>(`${environment.base_url}/lancamentos?resumo`, {params}).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    )
  }

  buscarPorCodigo(codigo): Observable<any> {
    return this._http.get<Lancamento>(`${environment.base_url}/lancamentos/${codigo}`).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    )
  }

  removerPorCodigo(codigo) {
    return this._http.delete(`${environment.base_url}/lancamentos/${codigo}`).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    );
  }

  salvar(lancamento:Lancamento){
    return this._http.post<Lancamento>(`${environment.base_url}/lancamentos`, lancamento).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    );
  }

  atualizar(lancamento:Lancamento){
    return this._http.put<Lancamento>(`${environment.base_url}/lancamentos/${lancamento.codigo}`, lancamento).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    );
  }






}
