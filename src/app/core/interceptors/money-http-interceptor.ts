import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { tokenName } from '@angular/compiler';

  @Injectable()
  export class MoneyHttpInterceptor implements HttpInterceptor {

      constructor(private _auth: AuthService) {}

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        let token =  this._auth.estaComTokenInvalido();

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
                  })
              );
          }

          return next.handle(req);
      }
  }
