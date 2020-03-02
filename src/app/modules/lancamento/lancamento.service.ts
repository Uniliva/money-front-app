import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FiltroLancamento } from 'src/app/shared/models/filtro-lancamento';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private _http: HttpClient,private datePipe: DatePipe) { }

  getHeaders(){
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODMyMjg4NTYsInVzZXJfbmFtZSI6Im1hcmlhQHVtb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIl0sImp0aSI6IjZjODU0OWYxLWVjZjctNDNkNS04N2RjLTljZWU2ZjY0ZTMxYSIsImNsaWVudF9pZCI6ImFuZ3VsYXIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.XKUV2VN-i92BT0Ms1zZldyFN6RGwQPDzUSM2002jr8k'
    })
  }



  buscarResumo(filtro:FiltroLancamento):Observable<any>{
    let params = new HttpParams();
    const headers = this.getHeaders()

    params = params.append('size',filtro.tamanho.toString());
    params = params.append('page',filtro.pagina.toString());

    if(filtro.dataLancamentoDe)
      params = params.append('dataLancamentoDe',this.converteData(filtro.dataLancamentoDe));

    if(filtro.dataLancamentoAte)
      params = params.append('dataLancamentoAte',this.converteData(filtro.dataLancamentoAte));

    if(filtro.descricao)
      params = params.append('descricao',filtro.descricao.toLowerCase());

    return this._http.get(`${environment.base_url}/lancamentos?resumo`, { headers, params});
  }


  private converteData(data:Date){
    return this.datePipe.transform(data,'dd-MM-yyyy').toString();
  }
}
