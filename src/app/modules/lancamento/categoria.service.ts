import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _http: HttpClient, private notificador: NotificacaoService) { }

  buscaTodos() {
    return this._http.get(`${environment.base_url}/categorias`, { headers: this.getHeaders() }).pipe(
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
