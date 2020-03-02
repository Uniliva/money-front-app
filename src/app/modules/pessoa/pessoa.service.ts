import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private _http: HttpClient) { }

  buscaTodos() {
    return this._http.get(`${environment.base_url}/pessoas`, { headers: this.getHeaders() });
  }

  removerPorCodigo(codigo) {
    return this._http.delete(`${environment.base_url}/pessoas/${codigo}`, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODMyNjg3NjgsInVzZXJfbmFtZSI6ImFkbWluQHVtb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0FUVUFMSVpBUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiLCJST0xFX1JFTU9WRVJfQ0FURUdPUklBIiwiUk9MRV9BVFVBTElaQVJfQ0FURUdPUklBIiwiUk9MRV9BVFVBTElaQVJfUEVTU09BIl0sImp0aSI6IjBhMGQxYjNhLTJjZTAtNDhlYS1hNWI3LTlkYjQ4ZTM2YzdmZSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.2MpdIcy4NM79m_zFoRcOD4jWmtlvxorTatCbjU1aIBg'
    })
  }

}
