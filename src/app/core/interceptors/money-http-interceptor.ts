import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, from, empty } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { NotificacaoService } from '../services/notificacao.service';
import { Router } from '@angular/router';

@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  constructor(
    private _auth: AuthService,
    private _notificador: NotificacaoService,
    private _route: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

    let token = this._auth.estaComTokenInvalido();

    if (!req.url.includes('/oauth/token') && this._auth.estaComTokenInvalido()) {

      return from(this._auth.revalidarToken())
        .pipe(
          mergeMap(() => {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            return next.handle(req);
          }),
          catchError(erro => {
            this._notificador.notificarErro('Sessão expirada, necessário fazer login novamente!');
            this._auth.logout();
            this._route.navigate(['login']);
            return Observable.create(empty);
          })
        );
    }

    return next.handle(req);
  }
}
