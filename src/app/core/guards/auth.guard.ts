import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificacaoService } from '../services/notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _route: Router,
    private _notificador: NotificacaoService
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (next.data.roles && !this._auth.temPermAlgumaDessasPermisoes(next.data.roles)) {
      if (this._auth.estaLogado()) {
        this._route.navigate(['acesso-negado']);
      } else {
        this._notificador.notificarErro('Necessário esta logado para ter acesso a essa funcionalidade')
        this._route.navigate(['login']);
      }
      return false
    }
    return true;
  }

}
