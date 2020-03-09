import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificacaoService } from 'src/app/core/services/notificacao.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { UtilsService } from 'src/app/core/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _http: HttpClient, private _utilsService: UtilsService, private notificador: NotificacaoService) { }

  buscaTodos() {
    return this._http.get(`${environment.base_url}/categorias`).pipe(
      catchError(err => {
        this.notificador.notificarErro(err)
        throw err
      }
      )
    )
  }

}
