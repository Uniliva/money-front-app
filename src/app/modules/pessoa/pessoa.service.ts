import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { NotificacaoService } from 'src/app/core/services/notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private _http: HttpClient, private notificador: NotificacaoService) { }

  buscaTodos() {
    return this._http.get(`${environment.base_url}/pessoas`, { headers: this.getHeaders() }).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    )
  }

  removerPorCodigo(codigo) {
    return this._http.delete(`${environment.base_url}/pessoas/${codigo}`, { headers: this.getHeaders() }).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    )
  }

  ativarOuDesativar(codigo,status){
    return this._http.put(`${environment.base_url}/pessoas/${codigo}/ativo?status=${!status}`, null , { headers: this.getHeaders() }).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    )
  }
  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODMzNDE1MTQsInVzZXJfbmFtZSI6ImFkbWluQHVtb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0FUVUFMSVpBUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIiwiUk9MRV9BVFVBTElaQVJfQ0FURUdPUklBIiwiUk9MRV9BVFVBTElaQVJfUEVTU09BIl0sImp0aSI6IjIyYWUwNDllLWFhODctNGM1Yy1hMjkwLWY2OGM0NDNiN2NmYSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.24PbB-Da9pF-L1qFq_ythU2jSQBfFnsdyvofeFt5wx0'
    })
  }

}
