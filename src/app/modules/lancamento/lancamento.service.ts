import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private _http: HttpClient) { }

  getHeaders(){
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODMyMjg4NTYsInVzZXJfbmFtZSI6Im1hcmlhQHVtb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIl0sImp0aSI6IjZjODU0OWYxLWVjZjctNDNkNS04N2RjLTljZWU2ZjY0ZTMxYSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.XKUV2VN-i92BT0Ms1zZldyFN6RGwQPDzUSM2002jr8k'
    })
  }



  buscarResumo(){
    return this._http.get(`${environment.base_url}/lancamentos?resumo`, { headers: this.getHeaders() })
  }
}
