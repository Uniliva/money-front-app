import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = "localhost:8090"

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(private _http: HttpClient) { }



  buscarResumo(){
     return this._http.get(`${host}/lancamentos?resumo`)
      .subscribe(
         (data) => data,
         (error) => `Erro ao buscar resumo dos lançamentos`
      )
  }
}
